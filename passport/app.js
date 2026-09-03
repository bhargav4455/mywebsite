const UNLOCK_RADIUS_METERS = 500;
const STORAGE_KEY = "telangana-stamp-passport:collected";

const locations = [
  {
    id: "charminar",
    name: "Charminar",
    region: "Hyderabad",
    category: "Heritage",
    lat: 17.3616,
    lng: 78.4747,
    summary: "The four-minaret icon of Hyderabad and the heart of the old city.",
    stamp: "CM"
  },
  {
    id: "golconda-fort",
    name: "Golconda Fort",
    region: "Hyderabad",
    category: "Fort",
    lat: 17.3833,
    lng: 78.4011,
    summary: "A granite fortress known for acoustics, gateways, and Deccan history.",
    stamp: "GF"
  },
  {
    id: "ramappa-temple",
    name: "Ramappa Temple",
    region: "Mulugu",
    category: "UNESCO",
    lat: 18.2593,
    lng: 79.9437,
    summary: "A UNESCO World Heritage Kakatiya temple with floating-brick engineering.",
    stamp: "RP"
  },
  {
    id: "yadadri",
    name: "Yadadri Lakshmi Narasimha Temple",
    region: "Yadadri Bhuvanagiri",
    category: "Spiritual",
    lat: 17.5875,
    lng: 78.9437,
    summary: "A major hill shrine dedicated to Sri Lakshmi Narasimha Swamy.",
    stamp: "YD"
  },
  {
    id: "warangal-fort",
    name: "Warangal Fort",
    region: "Warangal",
    category: "Fort",
    lat: 17.9567,
    lng: 79.615,
    summary: "Kakatiya-era gateways and stone ruins that anchor Warangal's heritage.",
    stamp: "WF"
  },
  {
    id: "thousand-pillars",
    name: "Thousand Pillar Temple",
    region: "Hanamkonda",
    category: "Heritage",
    lat: 18.0037,
    lng: 79.5747,
    summary: "A sculptural Kakatiya temple famed for polished pillars and Nandi.",
    stamp: "TP"
  },
  {
    id: "bhadrachalam",
    name: "Bhadrachalam Temple",
    region: "Bhadradri Kothagudem",
    category: "Spiritual",
    lat: 17.6688,
    lng: 80.888,
    summary: "A revered Sri Rama temple town on the banks of the Godavari.",
    stamp: "BD"
  },
  {
    id: "nagarjuna-sagar",
    name: "Nagarjuna Sagar",
    region: "Nalgonda",
    category: "Nature",
    lat: 16.5753,
    lng: 79.3125,
    summary: "A vast dam landscape with reservoir views and Buddhist heritage nearby.",
    stamp: "NS"
  },
  {
    id: "kuntala-waterfall",
    name: "Kuntala Waterfall",
    region: "Adilabad",
    category: "Nature",
    lat: 19.2814,
    lng: 78.5121,
    summary: "One of Telangana's tallest waterfalls, set in forested Adilabad terrain.",
    stamp: "KW"
  },
  {
    id: "bogatha-waterfall",
    name: "Bogatha Waterfall",
    region: "Mulugu",
    category: "Nature",
    lat: 18.7053,
    lng: 80.4139,
    summary: "A wide seasonal cascade popularly called the Niagara of Telangana.",
    stamp: "BW"
  },
  {
    id: "pocharam",
    name: "Pocharam Wildlife Sanctuary",
    region: "Medak",
    category: "Wildlife",
    lat: 18.0498,
    lng: 78.2095,
    summary: "A reservoir and sanctuary landscape for birds, deer, and quiet trails.",
    stamp: "PW"
  },
  {
    id: "ananthagiri",
    name: "Ananthagiri Hills",
    region: "Vikarabad",
    category: "Nature",
    lat: 17.312,
    lng: 77.8632,
    summary: "Forest roads, viewpoints, and weekend trails near Hyderabad.",
    stamp: "AH"
  },
  {
    id: "ranganayaka-sagar",
    name: "Ranganayaka Sagar",
    region: "Siddipet",
    category: "Nature",
    lat: 18.0709,
    lng: 78.8529,
    summary: "A scenic reservoir that has become a popular Siddipet leisure stop.",
    stamp: "RS"
  },
  {
    id: "medak-cathedral",
    name: "Medak Cathedral",
    region: "Medak",
    category: "Heritage",
    lat: 18.0459,
    lng: 78.2631,
    summary: "A landmark Gothic Revival cathedral known for stained glass and scale.",
    stamp: "MC"
  },
  {
    id: "qutb-shahi-tombs",
    name: "Qutb Shahi Tombs",
    region: "Hyderabad",
    category: "Heritage",
    lat: 17.395,
    lng: 78.3968,
    summary: "Domed royal tombs that preserve the Qutb Shahi architectural landscape.",
    stamp: "QT"
  },
  {
    id: "hussain-sagar",
    name: "Hussain Sagar",
    region: "Hyderabad",
    category: "City",
    lat: 17.4239,
    lng: 78.4738,
    summary: "Hyderabad's central lake, known for the Buddha statue and Tank Bund.",
    stamp: "HS"
  },
  {
    id: "salar-jung",
    name: "Salar Jung Museum",
    region: "Hyderabad",
    category: "Museum",
    lat: 17.3713,
    lng: 78.4804,
    summary: "A major museum collection spanning art, artifacts, clocks, and manuscripts.",
    stamp: "SJ"
  },
  {
    id: "birla-mandir",
    name: "Birla Mandir",
    region: "Hyderabad",
    category: "Spiritual",
    lat: 17.4062,
    lng: 78.4691,
    summary: "A white marble hilltop temple with wide views over the city and lake.",
    stamp: "BM"
  },
  {
    id: "chilkur",
    name: "Chilkur Balaji Temple",
    region: "Ranga Reddy",
    category: "Spiritual",
    lat: 17.3587,
    lng: 78.2988,
    summary: "A popular temple near Osman Sagar known for its distinctive visitor ritual.",
    stamp: "CB"
  },
  {
    id: "basar",
    name: "Basar Saraswati Temple",
    region: "Nirmal",
    category: "Spiritual",
    lat: 18.8806,
    lng: 77.9546,
    summary: "A celebrated Saraswati temple where many children begin learning rituals.",
    stamp: "BS"
  },
  {
    id: "laknavaram",
    name: "Laknavaram Lake",
    region: "Mulugu",
    category: "Nature",
    lat: 18.1442,
    lng: 80.0642,
    summary: "A forest-fringed lake known for islands, hanging bridges, and monsoon views.",
    stamp: "LL"
  },
  {
    id: "komaram-bheem",
    name: "Jodeghat",
    region: "Kumram Bheem Asifabad",
    category: "Culture",
    lat: 19.4099,
    lng: 79.2257,
    summary: "A memorial landscape associated with tribal leader Komaram Bheem.",
    stamp: "JG"
  },
  {
    id: "nizamabad-fort",
    name: "Nizamabad Fort",
    region: "Nizamabad",
    category: "Fort",
    lat: 18.6725,
    lng: 78.0941,
    summary: "A hill fort site with temple structures and views over Nizamabad.",
    stamp: "NF"
  },
  {
    id: "pillalamarri",
    name: "Pillalamarri Banyan Tree",
    region: "Mahabubnagar",
    category: "Nature",
    lat: 16.7434,
    lng: 77.9811,
    summary: "A centuries-old banyan tree complex and one of the state's beloved natural landmarks.",
    stamp: "PM"
  },
  {
    id: "alampur",
    name: "Alampur Jogulamba Temple",
    region: "Jogulamba Gadwal",
    category: "Spiritual",
    lat: 15.8797,
    lng: 78.1336,
    summary: "A Shakti Peetha and Navabrahma temple cluster near the Tungabhadra.",
    stamp: "AL"
  },
  {
    id: "hyderabad-biryani",
    name: "Hyderabadi Biryani Trail",
    region: "Hyderabad",
    category: "Food",
    lat: 17.385,
    lng: 78.4867,
    summary: "A food-culture stamp for the city's signature biryani neighborhoods.",
    stamp: "HB"
  },
  {
    id: "bathukamma",
    name: "Bathukamma Festival Spot",
    region: "Statewide",
    category: "Culture",
    lat: 17.4399,
    lng: 78.4983,
    summary: "A seasonal cultural stamp celebrating Telangana's floral festival gatherings.",
    stamp: "BT"
  },
  {
    id: "pochampally",
    name: "Pochampally Ikat Village",
    region: "Yadadri Bhuvanagiri",
    category: "Craft",
    lat: 17.3478,
    lng: 78.8242,
    summary: "A weaving town associated with Telangana's globally known Ikat craft.",
    stamp: "PI"
  }
];

const indiaRegions = [
  { slug: "andhra-pradesh", name: "Andhra Pradesh", type: "State", capital: "Amaravati" },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", type: "State", capital: "Itanagar" },
  { slug: "assam", name: "Assam", type: "State", capital: "Dispur" },
  { slug: "bihar", name: "Bihar", type: "State", capital: "Patna" },
  { slug: "chhattisgarh", name: "Chhattisgarh", type: "State", capital: "Raipur" },
  { slug: "goa", name: "Goa", type: "State", capital: "Panaji" },
  { slug: "gujarat", name: "Gujarat", type: "State", capital: "Gandhinagar" },
  { slug: "haryana", name: "Haryana", type: "State", capital: "Chandigarh" },
  { slug: "himachal-pradesh", name: "Himachal Pradesh", type: "State", capital: "Shimla" },
  { slug: "jharkhand", name: "Jharkhand", type: "State", capital: "Ranchi" },
  { slug: "karnataka", name: "Karnataka", type: "State", capital: "Bengaluru" },
  { slug: "kerala", name: "Kerala", type: "State", capital: "Thiruvananthapuram" },
  { slug: "madhya-pradesh", name: "Madhya Pradesh", type: "State", capital: "Bhopal" },
  { slug: "maharashtra", name: "Maharashtra", type: "State", capital: "Mumbai" },
  { slug: "manipur", name: "Manipur", type: "State", capital: "Imphal" },
  { slug: "meghalaya", name: "Meghalaya", type: "State", capital: "Shillong" },
  { slug: "mizoram", name: "Mizoram", type: "State", capital: "Aizawl" },
  { slug: "nagaland", name: "Nagaland", type: "State", capital: "Kohima" },
  { slug: "odisha", name: "Odisha", type: "State", capital: "Bhubaneswar" },
  { slug: "punjab", name: "Punjab", type: "State", capital: "Chandigarh" },
  { slug: "rajasthan", name: "Rajasthan", type: "State", capital: "Jaipur" },
  { slug: "sikkim", name: "Sikkim", type: "State", capital: "Gangtok" },
  { slug: "tamil-nadu", name: "Tamil Nadu", type: "State", capital: "Chennai" },
  {
    slug: "telangana",
    name: "Telangana",
    type: "State",
    capital: "Hyderabad",
    status: "live"
  },
  { slug: "tripura", name: "Tripura", type: "State", capital: "Agartala" },
  { slug: "uttar-pradesh", name: "Uttar Pradesh", type: "State", capital: "Lucknow" },
  { slug: "uttarakhand", name: "Uttarakhand", type: "State", capital: "Dehradun" },
  { slug: "west-bengal", name: "West Bengal", type: "State", capital: "Kolkata" },
  {
    slug: "andaman-nicobar",
    name: "Andaman & Nicobar Islands",
    type: "Union Territory",
    capital: "Sri Vijaya Puram"
  },
  { slug: "chandigarh", name: "Chandigarh", type: "Union Territory", capital: "Chandigarh" },
  {
    slug: "dadra-nagar-haveli-daman-diu",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    type: "Union Territory",
    capital: "Daman"
  },
  { slug: "delhi", name: "Delhi", type: "Union Territory", capital: "New Delhi" },
  {
    slug: "jammu-kashmir",
    name: "Jammu & Kashmir",
    type: "Union Territory",
    capital: "Srinagar / Jammu"
  },
  { slug: "ladakh", name: "Ladakh", type: "Union Territory", capital: "Leh" },
  { slug: "lakshadweep", name: "Lakshadweep", type: "Union Territory", capital: "Kavaratti" },
  { slug: "puducherry", name: "Puducherry", type: "Union Territory", capital: "Puducherry" }
];

const storedStamps = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const collected = new Set(Array.isArray(storedStamps) ? storedStamps : []);
const initialParams = new URLSearchParams(window.location.search);
let currentRegion = findRegion(initialParams.get("state")) || findRegion("telangana");
let currentSearch = initialParams.get("q") || "";
let currentCategory = initialParams.get("category") || "all";
let userPosition = null;
let locationWatchId = null;
let nearbyLocation = null;
let dismissedArrivalId = null;
let deferredInstallPrompt = null;

const elements = {
  arrivalCloseButton: document.querySelector("#arrivalCloseButton"),
  arrivalCollectButton: document.querySelector("#arrivalCollectButton"),
  arrivalDistance: document.querySelector("#arrivalDistance"),
  arrivalPlace: document.querySelector("#arrivalPlace"),
  arrivalPrompt: document.querySelector("#arrivalPrompt"),
  categoryFilter: document.querySelector("#categoryFilter"),
  grid: document.querySelector("#locationGrid"),
  installButton: document.querySelector("#installButton"),
  locateButton: document.querySelector("#locateButton"),
  mobileInstallButton: document.querySelector("#mobileInstallButton"),
  nearestText: document.querySelector("#nearestText"),
  networkStatus: document.querySelector("#networkStatus"),
  progressRing: document.querySelector("#progressRing"),
  progressText: document.querySelector("#progressText"),
  regionRail: document.querySelector("#regionRail"),
  searchInput: document.querySelector("#searchInput"),
  stampSection: document.querySelector("#stampSection"),
  stateBreadcrumb: document.querySelector("#stateBreadcrumb"),
  stateOverview: document.querySelector("#stateOverview"),
  stateSelect: document.querySelector("#stateSelect"),
  statusMessage: document.querySelector("#statusMessage"),
  template: document.querySelector("#locationCardTemplate")
};

function findRegion(slug) {
  return indiaRegions.find((region) => region.slug === slug);
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function distanceMeters(from, to) {
  const earthRadius = 6371000;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(meters) {
  if (meters === null) return "Enable GPS";
  const meterFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
  const kilometerFormatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  if (meters < 1000) return `${meterFormatter.format(meters)} m`;
  return `${kilometerFormatter.format(meters / 1000)} km`;
}

function getLocationState(location) {
  const distance = userPosition ? distanceMeters(userPosition, location) : null;
  const isCollected = collected.has(location.id);
  const isNearby = distance !== null && distance <= UNLOCK_RADIUS_METERS;
  return { distance, isCollected, isNearby };
}

function saveCollected() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...collected]));
}

function updateProgress() {
  const total = locations.length;
  const count = locations.filter((location) => collected.has(location.id)).length;
  const percentage = total ? Math.round((count / total) * 100) : 0;
  elements.progressText.textContent = `${count} of ${total} stamps collected`;
  elements.progressRing.style.setProperty("--progress", `${percentage}%`);

  if (!userPosition) {
    elements.nearestText.textContent = "Enable location to find your nearest stamp.";
    return;
  }

  const nearest = locations
    .map((location) => ({ location, distance: distanceMeters(userPosition, location) }))
    .sort((a, b) => a.distance - b.distance)[0];

  elements.nearestText.textContent = nearest
    ? `Nearest: ${nearest.location.name} · ${formatDistance(nearest.distance)} away.`
    : "No locations available.";
}

function updateUrlState() {
  const params = new URLSearchParams();
  params.set("country", "india");
  params.set("state", currentRegion.slug);
  if (currentSearch) params.set("q", currentSearch);
  if (currentCategory !== "all") params.set("category", currentCategory);
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

function renderRegionNavigator() {
  for (const type of ["State", "Union Territory"]) {
    const optionGroup = document.createElement("optgroup");
    optionGroup.label = type === "State" ? "States" : "Union Territories";
    for (const region of indiaRegions.filter((item) => item.type === type)) {
      const option = document.createElement("option");
      option.value = region.slug;
      option.textContent = `${region.name}${region.status === "live" ? " — Available" : " — In Progress"}`;
      optionGroup.append(option);
    }
    elements.stateSelect.append(optionGroup);
  }

  for (const region of indiaRegions) {
    const button = document.createElement("button");
    button.className = "region-chip";
    button.type = "button";
    button.dataset.region = region.slug;
    button.dataset.status = region.status || "progress";
    button.textContent = region.name;
    button.addEventListener("click", () => selectRegion(region.slug));
    elements.regionRail.append(button);
  }
}

function renderStateOverview() {
  const isLive = currentRegion.status === "live";
  elements.stateBreadcrumb.textContent = currentRegion.name;
  elements.stateSelect.value = currentRegion.slug;
  elements.stampSection.hidden = !isLive;

  for (const chip of elements.regionRail.querySelectorAll(".region-chip")) {
    chip.setAttribute("aria-pressed", String(chip.dataset.region === currentRegion.slug));
  }

  const top = document.createElement("div");
  top.className = "state-overview__top";
  const copy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = currentRegion.name;
  const description = document.createElement("p");
  description.textContent = isLive
    ? "Your first active state passport has illustrated landmarks, GPS arrival checks, and 28 collectible stamps."
    : `${currentRegion.name} is reserved in your India passport. Landmark research, artwork, and verified stamp points are in progress.`;
  copy.append(title, description);

  const status = document.createElement("span");
  status.className = `state-overview__status${isLive ? " is-live" : ""}`;
  status.textContent = isLive ? "Available Now" : "In Progress";
  top.append(copy, status);

  const facts = document.createElement("div");
  facts.className = "state-overview__facts";
  const capitalFact = document.createElement("div");
  const capitalLabel = document.createElement("span");
  capitalLabel.textContent = "Capital / Headquarters";
  const capital = document.createElement("strong");
  capital.textContent = currentRegion.capital;
  capitalFact.append(capitalLabel, capital);

  const collectionFact = document.createElement("div");
  const collectionLabel = document.createElement("span");
  collectionLabel.textContent = "Passport Collection";
  const collection = document.createElement("strong");
  collection.textContent = isLive
    ? `${locations.length} landmark stamps`
    : "Coming in a future release";
  collectionFact.append(collectionLabel, collection);
  facts.append(capitalFact, collectionFact);

  elements.stateOverview.replaceChildren(top, facts);
}

function selectRegion(slug) {
  const region = findRegion(slug);
  if (!region) return;
  currentRegion = region;
  updateUrlState();
  updateUrlState();
  renderStateOverview();
  const selectedChip = elements.regionRail.querySelector(`[data-region="${region.slug}"]`);
  selectedChip?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function renderCategoryOptions() {
  const categories = [...new Set(locations.map((location) => location.category))].sort();
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    elements.categoryFilter.append(option);
  }
}

function filteredLocations() {
  const normalizedSearch = currentSearch.trim().toLowerCase();
  return locations
    .map((location) => ({ ...location, state: getLocationState(location) }))
    .filter((location) => {
      const matchesCategory = currentCategory === "all" || location.category === currentCategory;
      const matchesSearch =
        !normalizedSearch ||
        [location.name, location.region, location.category, location.summary]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (a.state.isCollected !== b.state.isCollected) return Number(b.state.isCollected) - Number(a.state.isCollected);
      if (a.state.distance === null && b.state.distance === null) return a.name.localeCompare(b.name);
      if (a.state.distance === null) return 1;
      if (b.state.distance === null) return -1;
      return a.state.distance - b.state.distance;
    });
}

function renderLocations() {
  elements.grid.replaceChildren();
  const visibleLocations = filteredLocations();

  if (!visibleLocations.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No Telangana stamps match that search yet.";
    elements.grid.append(empty);
    updateProgress();
    return;
  }

  for (const location of visibleLocations) {
    const card = elements.template.content.firstElementChild.cloneNode(true);
    const category = card.querySelector(".location-card__topline strong");
    const stateLabel = card.querySelector(".location-card__topline span");
    const title = card.querySelector("h3");
    const summary = card.querySelector("p");
    const region = card.querySelector('[data-field="region"]');
    const distance = card.querySelector('[data-field="distance"]');
    const button = card.querySelector("button");
    const illustration = card.querySelector(".landmark-illustration");

    category.textContent = location.category;
    stateLabel.textContent = location.state.isCollected
      ? "Collected"
      : location.state.isNearby
        ? "Nearby"
        : "Locked";
    title.textContent = location.name;
    summary.textContent = location.summary;
    region.textContent = location.region;
    distance.textContent = formatDistance(location.state.distance);
    if (illustration) {
      illustration.querySelector("title").textContent = `Illustration of ${location.name}`;
      illustration.querySelector("use").setAttribute("href", `assets/landmarks.svg#${location.id}`);
    } else {
      const legacySeal = card.querySelector(".stamp-seal");
      legacySeal.querySelector("span").textContent = location.stamp;
      legacySeal.querySelector("small").textContent = location.state.isCollected
        ? "Stamped"
        : location.category;
    }
    button.textContent = location.state.isCollected
      ? "Stamp Collected"
      : location.state.isNearby
        ? "Collect Stamp"
        : userPosition
          ? "Visit to Unlock"
          : "Check Location to Unlock";
    button.disabled = location.state.isCollected || !location.state.isNearby;
    button.setAttribute("aria-label", `Collect ${location.name} stamp`);

    card.dataset.category = location.category.toLowerCase();
    if (location.state.isCollected) card.classList.add("is-collected");
    if (location.state.isNearby && !location.state.isCollected) card.classList.add("is-nearby");

    button.addEventListener("click", () => {
      collectStamp(location);
    });

    elements.grid.append(card);
  }

  updateProgress();
}

function setStatus(message) {
  elements.statusMessage.textContent = message;
}

function collectStamp(location) {
  const state = getLocationState(location);
  if (!state.isNearby || state.isCollected) return;
  collected.add(location.id);
  saveCollected();
  nearbyLocation = null;
  elements.arrivalPrompt.hidden = true;
  setStatus(`${location.name} stamp added to your Telangana passport.`);
  renderLocations();
}

function updateArrivalPrompt() {
  const nearest = locations
    .filter((location) => !collected.has(location.id))
    .map((location) => ({ location, distance: distanceMeters(userPosition, location) }))
    .sort((a, b) => a.distance - b.distance)[0];

  nearbyLocation =
    nearest && nearest.distance <= UNLOCK_RADIUS_METERS ? nearest.location : null;

  if (!nearbyLocation || dismissedArrivalId === nearbyLocation.id) {
    elements.arrivalPrompt.hidden = true;
    return;
  }

  elements.arrivalPlace.textContent = `${nearbyLocation.name} Stamp Is Ready`;
  elements.arrivalDistance.textContent = `${formatDistance(nearest.distance)} from the stamp point`;
  elements.arrivalCollectButton.textContent = `Collect ${nearbyLocation.stamp} Stamp`;
  elements.arrivalPrompt.hidden = false;
  if ("vibrate" in navigator && document.visibilityState === "visible") {
    navigator.vibrate(80);
  }
}

function handlePosition(position) {
  userPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  dismissedArrivalId = null;
  elements.locateButton.disabled = false;
  elements.locateButton.textContent = "Location Active";
  setStatus(
    `Location active with about ${formatDistance(position.coords.accuracy)} accuracy. A stamp becomes ready within ${formatDistance(UNLOCK_RADIUS_METERS)}.`
  );
  updateArrivalPrompt();
  renderLocations();
}

function handleLocationError(error) {
  if (locationWatchId !== null) {
    navigator.geolocation.clearWatch(locationWatchId);
    locationWatchId = null;
  }
  elements.locateButton.disabled = false;
  elements.locateButton.textContent = "Find Stamps Near Me";
  if (error.code === error.PERMISSION_DENIED) {
    setStatus("Location is blocked. Enable it in browser settings, then tap Find Stamps Near Me.");
    return;
  }
  if (error.code === error.TIMEOUT) {
    setStatus("Location timed out. Move near a window or outdoors, then try again.");
    return;
  }
  setStatus("Your location is unavailable right now. Check GPS and network access, then try again.");
}

function startLocationWatch(requestPermission = true) {
  if (!navigator.geolocation) {
    setStatus("This browser does not support location. You can still browse the passport.");
    return;
  }

  if (locationWatchId !== null) return;
  elements.locateButton.disabled = true;
  elements.locateButton.textContent = "Finding Your Location…";
  if (requestPermission) {
    setStatus("Checking your location on this device. Coordinates are never sent to a server.");
  }

  locationWatchId = navigator.geolocation.watchPosition(
    handlePosition,
    handleLocationError,
    { enableHighAccuracy: true, maximumAge: 30000, timeout: 15000 }
  );
}

function resumeLocationIfGranted() {
  if (!navigator.permissions?.query || !navigator.geolocation) return;
  navigator.permissions.query({ name: "geolocation" }).then(
    (permission) => {
      if (permission.state === "granted") startLocationWatch(false);
      permission.addEventListener("change", () => {
        if (permission.state === "granted") startLocationWatch(false);
      });
    },
    (error) => {
      console.warn("Could not inspect saved location permission.", error);
    }
  );
}

function updateNetworkStatus() {
  const online = navigator.onLine;
  elements.networkStatus.textContent = online ? "Online" : "Offline · Saved Pages Ready";
  elements.networkStatus.classList.toggle("is-offline", !online);
}

function showInstallControls() {
  elements.installButton.hidden = false;
  elements.mobileInstallButton.hidden = false;
}

async function installApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    setStatus(
      choice.outcome === "accepted"
        ? "Passport installation started."
        : "Installation dismissed. You can install it later from your browser menu."
    );
    deferredInstallPrompt = null;
    elements.installButton.hidden = true;
    elements.mobileInstallButton.hidden = true;
    return;
  }

  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  setStatus(
    isIos
      ? "On iPhone or iPad, tap Share, then choose Add to Home Screen."
      : "Open your browser menu and choose Install app or Add to Home screen."
  );
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.error("Service worker registration failed.", error);
      setStatus("Offline install could not be prepared, but the app still works online.");
    });
  }
}

elements.locateButton.addEventListener("click", () => startLocationWatch(true));
elements.arrivalCollectButton.addEventListener("click", () => {
  if (nearbyLocation) collectStamp(nearbyLocation);
});
elements.arrivalCloseButton.addEventListener("click", () => {
  dismissedArrivalId = nearbyLocation?.id || null;
  elements.arrivalPrompt.hidden = true;
});
elements.installButton.addEventListener("click", installApp);
elements.mobileInstallButton.addEventListener("click", installApp);
elements.stateSelect.addEventListener("change", (event) => selectRegion(event.target.value));
elements.searchInput.addEventListener("input", (event) => {
  currentSearch = event.target.value;
  updateUrlState();
  renderLocations();
});
elements.categoryFilter.addEventListener("change", (event) => {
  currentCategory = event.target.value;
  updateUrlState();
  renderLocations();
});
window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  showInstallControls();
});
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  elements.installButton.hidden = true;
  elements.mobileInstallButton.hidden = true;
  setStatus("India Stamp Passport is installed and ready for your next trip.");
});

renderRegionNavigator();
renderCategoryOptions();
elements.searchInput.value = currentSearch;
if ([...elements.categoryFilter.options].some((option) => option.value === currentCategory)) {
  elements.categoryFilter.value = currentCategory;
} else {
  currentCategory = "all";
}
renderStateOverview();
renderLocations();
updateNetworkStatus();
registerServiceWorker();
resumeLocationIfGranted();

const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const isMobileSafari = /iphone|ipad|ipod/i.test(navigator.userAgent);
if (!isStandalone && isMobileSafari) showInstallControls();
