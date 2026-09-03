export const APP_CONFIG = Object.freeze({
  unlockRadiusMeters: 500,
  defaultRegion: "telangana",
  features: Object.freeze({
    achievements: true,
    demoMode: true,
    favorites: true
  }),
  storage: Object.freeze({
    collected: "telangana-stamp-passport:collected",
    demoCollected: "india-stamp-passport:demo-collected",
    saved: "india-stamp-passport:saved"
  })
});
