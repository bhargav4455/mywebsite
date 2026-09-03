export const APP_CONFIG = Object.freeze({
  unlockRadiusMeters: 500,
  maximumImageBytes: 3 * 1024 * 1024,
  defaultRegion: "telangana",
  features: Object.freeze({
    achievements: true,
    demoMode: true,
    favorites: true,
    memories: true,
    profile: true,
    sharing: true,
    travelCircuits: true,
    trips: true
  }),
  storage: Object.freeze({
    collected: "telangana-stamp-passport:collected",
    demoCollected: "india-stamp-passport:demo-collected",
    memories: "bharat-stampbook:memories",
    profile: "bharat-stampbook:profile",
    saved: "india-stamp-passport:saved",
    trips: "bharat-stampbook:trips"
  })
});
