import { TRAVEL_CIRCUITS } from "./circuits.js";
import { deletePrivateImage, getPrivateImage, savePrivateImage } from "./media-store.js";

const PROFILE_IMAGE_KEY = "profile-photo";

function createMemoryId() {
  return crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function loadJson(key, fallback) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

function validateImage(file, maximumImageBytes) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file such as JPEG, PNG, or WebP.");
  }
  if (file.size > maximumImageBytes) {
    throw new Error(`Images must be smaller than ${Math.round(maximumImageBytes / 1024 / 1024)} MB.`);
  }
}

export function createPersonalExperience({
  config,
  getVerifiedLocationIds,
  locations
}) {
  const elements = {
    circuitGrid: document.querySelector("#circuitGrid"),
    memoryCount: document.querySelector("#memoryCount"),
    memoryDate: document.querySelector("#memoryDate"),
    memoryForm: document.querySelector("#memoryForm"),
    memoryLocation: document.querySelector("#memoryLocation"),
    memoryNote: document.querySelector("#memoryNote"),
    memoryPhoto: document.querySelector("#memoryPhoto"),
    memoryTimeline: document.querySelector("#memoryTimeline"),
    personalStatus: document.querySelector("#personalStatus"),
    profileForm: document.querySelector("#profileForm"),
    profileHome: document.querySelector("#profileHome"),
    profileName: document.querySelector("#profileName"),
    profilePhoto: document.querySelector("#profilePhoto"),
    profilePhotoPreview: document.querySelector("#profilePhotoPreview"),
    profilePlaceholder: document.querySelector("#profilePlaceholder"),
    saveMemoryButton: document.querySelector("#saveMemoryButton"),
    shareJourneyButton: document.querySelector("#shareJourneyButton"),
    exportButton: document.querySelector("#exportJourneyButton"),
    importButton: document.querySelector("#importJourneyButton"),
    importInput: document.querySelector("#importJourneyInput")
  };

  let profile = loadJson(config.storage.profile, { name: "", home: "", hasPhoto: false });
  let memories = loadJson(config.storage.memories, []);
  let profileObjectUrl = null;
  let memoryObjectUrls = [];
  let renderSequence = 0;

  if (!Array.isArray(memories)) {
    throw new Error("Saved memory data has an invalid format.");
  }

  function setStatus(message) {
    elements.personalStatus.textContent = message;
  }

  function saveMetadata() {
    localStorage.setItem(config.storage.profile, JSON.stringify(profile));
    localStorage.setItem(config.storage.memories, JSON.stringify(memories));
  }

  function revokeObjectUrls() {
    memoryObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    memoryObjectUrls = [];
  }

  async function renderProfile() {
    elements.profileName.value = profile.name || "";
    elements.profileHome.value = profile.home || "";
    elements.profilePlaceholder.textContent = (profile.name || "B").trim().charAt(0).toUpperCase() || "B";

    if (profileObjectUrl) URL.revokeObjectURL(profileObjectUrl);
    profileObjectUrl = null;
    elements.profilePhotoPreview.hidden = true;
    elements.profilePlaceholder.hidden = false;

    if (!profile.hasPhoto) return;
    const photo = await getPrivateImage(PROFILE_IMAGE_KEY);
    if (!photo) return;
    profileObjectUrl = URL.createObjectURL(photo);
    elements.profilePhotoPreview.src = profileObjectUrl;
    elements.profilePhotoPreview.alt = `${profile.name || "Traveler"} profile photo`;
    elements.profilePhotoPreview.hidden = false;
    elements.profilePlaceholder.hidden = true;
  }

  function renderLocationOptions() {
    const verifiedIds = getVerifiedLocationIds();
    const eligibleLocations = locations.filter((location) => verifiedIds.has(location.id));
    elements.memoryLocation.replaceChildren();

    const prompt = document.createElement("option");
    prompt.value = "";
    prompt.textContent = eligibleLocations.length
      ? "Choose a verified stamp…"
      : "Collect a verified stamp first";
    elements.memoryLocation.append(prompt);

    for (const location of eligibleLocations) {
      const option = document.createElement("option");
      option.value = location.id;
      option.textContent = location.name;
      elements.memoryLocation.append(option);
    }

    const disabled = eligibleLocations.length === 0;
    elements.memoryLocation.disabled = disabled;
    elements.saveMemoryButton.disabled = disabled;
  }

  function renderCircuits() {
    const verifiedIds = getVerifiedLocationIds();
    elements.circuitGrid.replaceChildren();

    for (const circuit of TRAVEL_CIRCUITS) {
      const completed = circuit.locationIds.filter((id) => verifiedIds.has(id)).length;
      const percentage = Math.round((completed / circuit.locationIds.length) * 100);
      const card = document.createElement("article");
      card.className = "circuit-card";

      const eyebrow = document.createElement("span");
      eyebrow.textContent = completed === circuit.locationIds.length ? "Circuit Complete" : "Travel Circuit";
      const title = document.createElement("h4");
      title.textContent = circuit.title;
      const description = document.createElement("p");
      description.textContent = circuit.description;
      const meter = document.createElement("div");
      meter.className = "circuit-card__meter";
      meter.setAttribute("role", "progressbar");
      meter.setAttribute("aria-label", `${circuit.title} progress`);
      meter.setAttribute("aria-valuemin", "0");
      meter.setAttribute("aria-valuemax", String(circuit.locationIds.length));
      meter.setAttribute("aria-valuenow", String(completed));
      const fill = document.createElement("span");
      fill.style.width = `${percentage}%`;
      meter.append(fill);
      const progress = document.createElement("strong");
      progress.textContent = `${completed} of ${circuit.locationIds.length} stamps`;
      card.append(eyebrow, title, description, meter, progress);
      elements.circuitGrid.append(card);
    }
  }

  async function renderTimeline() {
    const sequence = ++renderSequence;
    revokeObjectUrls();
    elements.memoryTimeline.replaceChildren();
    const sortedMemories = [...memories].sort(
      (first, second) =>
        second.date.localeCompare(first.date) || second.createdAt.localeCompare(first.createdAt)
    );
    elements.memoryCount.textContent = `${sortedMemories.length} ${sortedMemories.length === 1 ? "memory" : "memories"}`;

    if (!sortedMemories.length) {
      const empty = document.createElement("p");
      empty.className = "memory-timeline__empty";
      empty.textContent = "Your first verified visit memory will appear here.";
      elements.memoryTimeline.append(empty);
      return;
    }

    const dateFormatter = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    for (const memory of sortedMemories) {
      const location = locations.find((item) => item.id === memory.locationId);
      if (!location) continue;
      const card = document.createElement("article");
      card.className = "memory-card";

      if (memory.hasPhoto) {
        const photo = await getPrivateImage(`memory:${memory.id}`);
        if (sequence !== renderSequence) return;
        if (photo) {
          const imageUrl = URL.createObjectURL(photo);
          memoryObjectUrls.push(imageUrl);
          const image = document.createElement("img");
          image.src = imageUrl;
          image.alt = `${location.name} visit memory`;
          image.loading = "lazy";
          card.append(image);
        }
      }

      const content = document.createElement("div");
      content.className = "memory-card__content";
      const date = document.createElement("time");
      date.dateTime = memory.date;
      date.textContent = dateFormatter.format(new Date(`${memory.date}T00:00:00`));
      const title = document.createElement("h4");
      title.textContent = location.name;
      const note = document.createElement("p");
      note.textContent = memory.note || "A verified stop in your Bharat Stampbook journey.";
      const remove = document.createElement("button");
      remove.className = "memory-card__remove";
      remove.type = "button";
      remove.textContent = "Delete memory";
      remove.addEventListener("click", () => {
        removeMemory(memory).catch((error) => {
          console.error("Could not delete visit memory.", error);
          setStatus("This memory could not be deleted from browser storage.");
        });
      });
      content.append(date, title, note, remove);
      card.append(content);
      elements.memoryTimeline.append(card);
    }
  }

  async function removeMemory(memory) {
    if (memory.hasPhoto) await deletePrivateImage(`memory:${memory.id}`);
    memories = memories.filter((item) => item.id !== memory.id);
    saveMetadata();
    await renderTimeline();
    setStatus("Memory deleted from this device.");
  }

  async function saveProfile(event) {
    event.preventDefault();
    try {
      const photo = elements.profilePhoto.files[0];
      validateImage(photo, config.maximumImageBytes);
      if (photo) await savePrivateImage(PROFILE_IMAGE_KEY, photo);
      profile = {
        name: elements.profileName.value.trim(),
        home: elements.profileHome.value.trim(),
        hasPhoto: photo ? true : profile.hasPhoto
      };
      saveMetadata();
      elements.profilePhoto.value = "";
      await renderProfile();
      setStatus("Your private traveler profile is saved on this device.");
    } catch (error) {
      console.error("Could not save traveler profile.", error);
      setStatus(error.message || "Your traveler profile could not be saved.");
    }
  }

  async function saveMemory(event) {
    event.preventDefault();
    try {
      const locationId = elements.memoryLocation.value;
      if (!getVerifiedLocationIds().has(locationId)) {
        throw new Error("Only a verified collected stamp can receive a permanent memory.");
      }
      if (!elements.memoryDate.value) throw new Error("Choose the date of your visit.");
      const photo = elements.memoryPhoto.files[0];
      validateImage(photo, config.maximumImageBytes);
      const id = createMemoryId();
      if (photo) await savePrivateImage(`memory:${id}`, photo);
      memories.push({
        id,
        locationId,
        date: elements.memoryDate.value,
        note: elements.memoryNote.value.trim(),
        hasPhoto: Boolean(photo),
        createdAt: new Date().toISOString()
      });
      saveMetadata();
      elements.memoryForm.reset();
      await renderTimeline();
      setStatus("Visit memory saved privately on this device.");
    } catch (error) {
      console.error("Could not save visit memory.", error);
      setStatus(error.message || "Your visit memory could not be saved.");
    }
  }

  async function shareJourney() {
    const collectedCount = getVerifiedLocationIds().size;
    const traveler = profile.name ? `${profile.name}'s` : "My";
    const text = `${traveler} Bharat Stampbook: ${collectedCount} verified Telangana stamps, ${memories.length} visit memories, and more journeys ahead.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bharat Stampbook Journey", text, url: window.location.href });
        setStatus("Journey shared without including private notes or photos.");
        return;
      }
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setStatus("Journey summary copied. Private notes and photos were not included.");
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Could not share journey.", error);
      setStatus("Your journey could not be shared from this browser.");
    }
  }

  async function refresh() {
    try {
      renderLocationOptions();
      renderCircuits();
      await renderTimeline();
    } catch (error) {
      console.error("Could not refresh personal journey.", error);
      setStatus("Your private journey could not be loaded. Check browser storage access.");
    }
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.addEventListener("error", () => reject(reader.error));
      reader.readAsDataURL(blob);
    });
  }

  async function collectImages() {
    const images = {};
    if (profile.hasPhoto) {
      const photo = await getPrivateImage(PROFILE_IMAGE_KEY);
      if (photo) images[PROFILE_IMAGE_KEY] = await blobToDataUrl(photo);
    }
    for (const memory of memories) {
      if (!memory.hasPhoto) continue;
      const photo = await getPrivateImage(`memory:${memory.id}`);
      if (photo) images[`memory:${memory.id}`] = await blobToDataUrl(photo);
    }
    return images;
  }

  async function exportJourney() {
    try {
      setStatus("Preparing your backup…");
      const backup = {
        app: "bharat-stampbook",
        type: "journey-backup",
        version: 1,
        exportedAt: new Date().toISOString(),
        data: {
          profile,
          memories,
          trips: JSON.parse(localStorage.getItem(config.storage.trips) || "[]"),
          collected: JSON.parse(localStorage.getItem(config.storage.collected) || "[]"),
          saved: JSON.parse(localStorage.getItem(config.storage.saved) || "[]")
        },
        images: await collectImages()
      };
      const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `bharat-stampbook-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setStatus("Backup downloaded. Keep it safe to restore on another device.");
    } catch (error) {
      console.error("Could not export journey.", error);
      setStatus("Your backup could not be created in this browser.");
    }
  }

  async function importJourney(file) {
    try {
      setStatus("Restoring your journey…");
      const backup = JSON.parse(await file.text());
      if (backup?.app !== "bharat-stampbook" || backup?.type !== "journey-backup") {
        throw new Error("This file is not a Bharat Stampbook backup.");
      }
      const { data = {}, images = {} } = backup;
      if (data.profile) localStorage.setItem(config.storage.profile, JSON.stringify(data.profile));
      if (data.memories) localStorage.setItem(config.storage.memories, JSON.stringify(data.memories));
      if (data.trips) localStorage.setItem(config.storage.trips, JSON.stringify(data.trips));
      if (data.collected) localStorage.setItem(config.storage.collected, JSON.stringify(data.collected));
      if (data.saved) localStorage.setItem(config.storage.saved, JSON.stringify(data.saved));

      for (const [key, dataUrl] of Object.entries(images)) {
        const imageBlob = await (await fetch(dataUrl)).blob();
        await savePrivateImage(key, imageBlob);
      }
      setStatus("Journey restored. Reloading…");
      setTimeout(() => window.location.reload(), 600);
    } catch (error) {
      console.error("Could not restore journey.", error);
      setStatus(error.message || "This backup could not be restored.");
    }
  }

  async function initialize() {
    elements.profileForm.addEventListener("submit", saveProfile);
    elements.memoryForm.addEventListener("submit", saveMemory);
    elements.shareJourneyButton.addEventListener("click", shareJourney);
    elements.exportButton.addEventListener("click", exportJourney);
    elements.importButton.addEventListener("click", () => elements.importInput.click());
    elements.importInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) importJourney(file);
      event.target.value = "";
    });
    window.addEventListener("pagehide", () => {
      if (profileObjectUrl) URL.revokeObjectURL(profileObjectUrl);
      revokeObjectUrls();
    });
    elements.memoryDate.max = new Date().toISOString().slice(0, 10);
    await renderProfile();
    await refresh();
  }

  return { initialize, refresh };
}
