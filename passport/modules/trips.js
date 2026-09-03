// Trips: device-local today, structured so a future accounts backend can adopt
// each record without a migration. Every trip carries a stable id plus a unique
// human-friendly code, and reserves ownerId/sharedWith/accountId fields that a
// sync service can populate once login and hosting exist.

const SCHEMA_VERSION = 1;

export const TRIP_CATEGORIES = Object.freeze([
  { id: "family", label: "Family" },
  { id: "friends", label: "Friends" },
  { id: "couple", label: "Couple" },
  { id: "solo", label: "Solo" },
  { id: "work", label: "Work" }
]);

const CODE_WORDS = [
  "SUNRISE", "DECCAN", "KAKATIYA", "PEARL", "GODAVARI", "CHARMINAR",
  "NIZAM", "BANJARA", "MUSI", "WARANGAL", "KRISHNA", "TANK", "LOTUS",
  "MONSOON", "BAOLI", "MINAR", "GOLCONDA", "IKAT"
];

function generateId() {
  return `trip_${crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`;
}

function generateUniqueCode(existingCodes) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const word = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)];
    const number = String(Math.floor(1000 + Math.random() * 9000));
    const code = `TS-${word}-${number}`;
    if (!existingCodes.has(code)) return code;
  }
  return `TS-TRIP-${Date.now().toString().slice(-6)}`;
}

function normalizeCompanions(raw) {
  return raw
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((name) => ({ name, accountId: null }));
}

export function createTrips({ config, getVerifiedLocationIds, locations }) {
  const elements = {
    grid: document.querySelector("#tripGrid"),
    form: document.querySelector("#tripForm"),
    title: document.querySelector("#tripTitle"),
    category: document.querySelector("#tripCategory"),
    companions: document.querySelector("#tripCompanions"),
    placeChoices: document.querySelector("#tripPlaceChoices"),
    newButton: document.querySelector("#newTripButton"),
    cancelButton: document.querySelector("#tripCancel"),
    filter: document.querySelector("#tripFilter"),
    status: document.querySelector("#personalStatus")
  };

  let trips = loadTrips();
  let activeCategory = "all";

  function loadTrips() {
    const value = localStorage.getItem(config.storage.trips);
    if (!value) return [];
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) throw new Error("Saved trip data has an invalid format.");
    return parsed;
  }

  function saveTrips() {
    localStorage.setItem(config.storage.trips, JSON.stringify(trips));
  }

  function setStatus(message) {
    elements.status.textContent = message;
  }

  function tripProgress(trip) {
    const verifiedIds = getVerifiedLocationIds();
    const total = trip.locationIds.length;
    const done = trip.locationIds.filter((id) => verifiedIds.has(id)).length;
    const percentage = total ? Math.round((done / total) * 100) : 0;
    let state = "wishlist";
    if (total && done === total) state = "completed";
    else if (done > 0) state = "active";
    return { total, done, percentage, state };
  }

  function categoryLabel(id) {
    return TRIP_CATEGORIES.find((category) => category.id === id)?.label || "Trip";
  }

  function renderPlaceChoices() {
    elements.placeChoices.replaceChildren();
    for (const location of locations) {
      const label = document.createElement("label");
      label.className = "trip-choice";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = location.id;
      checkbox.name = "trip-place";
      const text = document.createElement("span");
      text.textContent = location.name;
      label.append(checkbox, text);
      elements.placeChoices.append(label);
    }
  }

  function renderFilter() {
    elements.filter.replaceChildren();
    const options = [{ id: "all", label: "All" }, ...TRIP_CATEGORIES];
    for (const option of options) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "trip-chip";
      chip.textContent = option.label;
      chip.setAttribute("aria-pressed", String(option.id === activeCategory));
      chip.addEventListener("click", () => {
        activeCategory = option.id;
        renderFilter();
        renderTrips();
      });
      elements.filter.append(chip);
    }
  }

  function buildPlaceList(trip, progress) {
    const verifiedIds = getVerifiedLocationIds();
    const list = document.createElement("ul");
    list.className = "trip-card__places";
    for (const id of trip.locationIds) {
      const location = locations.find((item) => item.id === id);
      if (!location) continue;
      const item = document.createElement("li");
      const done = verifiedIds.has(id);
      item.className = done ? "is-done" : "";
      item.textContent = `${done ? "✓" : "○"} ${location.name}`;
      list.append(item);
    }
    if (!trip.locationIds.length) {
      const item = document.createElement("li");
      item.textContent = "No places added yet.";
      list.append(item);
    }
    void progress;
    return list;
  }

  function shareTrip(trip) {
    const progress = tripProgress(trip);
    const companions = trip.companions.map((person) => person.name).join(", ");
    const lines = [
      `${trip.title} (${categoryLabel(trip.category)}) — Bharat Stampbook trip ${trip.code}`,
      `${progress.done} of ${progress.total} places collected.`,
      companions ? `Travelers: ${companions}.` : null,
      "This trip will appear in your companions' Stampbooks once shared accounts launch."
    ].filter(Boolean);
    const text = lines.join(" ");
    if (navigator.share) {
      navigator
        .share({ title: `Trip ${trip.code}`, text, url: window.location.href })
        .then(() => setStatus(`Trip ${trip.code} shared.`))
        .catch((error) => {
          if (error.name !== "AbortError") setStatus("This trip could not be shared from this browser.");
        });
      return;
    }
    navigator.clipboard
      .writeText(`${text} ${window.location.href}`)
      .then(() => setStatus(`Trip ${trip.code} summary copied to clipboard.`))
      .catch(() => setStatus("This trip could not be copied from this browser."));
  }

  function removeTrip(trip) {
    trips = trips.filter((item) => item.id !== trip.id);
    saveTrips();
    renderTrips();
    setStatus(`Trip ${trip.code} deleted from this device.`);
  }

  function renderTrips() {
    elements.grid.replaceChildren();
    const visibleTrips = trips.filter(
      (trip) => activeCategory === "all" || trip.category === activeCategory
    );

    if (!visibleTrips.length) {
      const empty = document.createElement("p");
      empty.className = "memory-timeline__empty";
      empty.textContent = trips.length
        ? "No trips in this group yet."
        : "Create your first trip to plan places and travel together.";
      elements.grid.append(empty);
      return;
    }

    const statusCopy = { wishlist: "Wishlist", active: "In progress", completed: "Completed" };

    for (const trip of visibleTrips) {
      const progress = tripProgress(trip);
      const card = document.createElement("article");
      card.className = "trip-card";
      card.dataset.status = progress.state;

      const head = document.createElement("header");
      const code = document.createElement("span");
      code.className = "trip-card__code";
      code.textContent = trip.code;
      const badge = document.createElement("span");
      badge.className = `trip-card__cat trip-card__cat--${trip.category}`;
      badge.textContent = categoryLabel(trip.category);
      head.append(code, badge);

      const title = document.createElement("h4");
      title.textContent = trip.title;

      const companions = document.createElement("p");
      companions.className = "trip-card__companions";
      companions.textContent = trip.companions.length
        ? `With ${trip.companions.map((person) => person.name).join(", ")}`
        : "Solo journey";

      const meter = document.createElement("div");
      meter.className = "circuit-card__meter";
      meter.setAttribute("role", "progressbar");
      meter.setAttribute("aria-label", `${trip.title} progress`);
      meter.setAttribute("aria-valuemin", "0");
      meter.setAttribute("aria-valuemax", String(progress.total));
      meter.setAttribute("aria-valuenow", String(progress.done));
      const fill = document.createElement("span");
      fill.style.width = `${progress.percentage}%`;
      meter.append(fill);

      const summary = document.createElement("strong");
      summary.className = "trip-card__summary";
      summary.textContent = `${progress.done} of ${progress.total} places · ${statusCopy[progress.state]}`;

      const actions = document.createElement("div");
      actions.className = "trip-card__actions";
      const shareButton = document.createElement("button");
      shareButton.type = "button";
      shareButton.className = "trip-card__action";
      shareButton.textContent = "Share";
      shareButton.addEventListener("click", () => shareTrip(trip));
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "trip-card__action trip-card__action--danger";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => removeTrip(trip));
      actions.append(shareButton, deleteButton);

      card.append(head, title, companions, meter, summary, buildPlaceList(trip, progress), actions);
      elements.grid.append(card);
    }
  }

  function openForm() {
    elements.form.hidden = false;
    elements.title.focus();
  }

  function closeForm() {
    elements.form.reset();
    elements.form.hidden = true;
  }

  function createTrip(event) {
    event.preventDefault();
    try {
      const title = elements.title.value.trim();
      if (!title) throw new Error("Give your trip a name.");
      const selectedPlaces = [...elements.placeChoices.querySelectorAll("input:checked")].map(
        (input) => input.value
      );
      const existingCodes = new Set(trips.map((trip) => trip.code));
      const now = new Date().toISOString();
      trips.push({
        schemaVersion: SCHEMA_VERSION,
        id: generateId(),
        code: generateUniqueCode(existingCodes),
        title,
        category: elements.category.value,
        companions: normalizeCompanions(elements.companions.value),
        locationIds: selectedPlaces,
        ownerId: null,
        sharedWith: [],
        createdAt: now,
        updatedAt: now
      });
      saveTrips();
      closeForm();
      renderTrips();
      setStatus("Trip created and saved privately on this device.");
    } catch (error) {
      console.error("Could not create trip.", error);
      setStatus(error.message || "This trip could not be created.");
    }
  }

  function refresh() {
    try {
      renderTrips();
    } catch (error) {
      console.error("Could not refresh trips.", error);
      setStatus("Your trips could not be loaded. Check browser storage access.");
    }
  }

  function initialize() {
    renderPlaceChoices();
    renderFilter();
    elements.newButton.addEventListener("click", openForm);
    elements.cancelButton.addEventListener("click", closeForm);
    elements.form.addEventListener("submit", createTrip);
    renderTrips();
  }

  return { initialize, refresh };
}
