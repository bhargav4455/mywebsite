export const ACHIEVEMENTS = Object.freeze([
  { id: "first-stamp", icon: "✦", title: "First Arrival", description: "Collect your first stamp.", threshold: 1 },
  { id: "hyderabad-five", icon: "◉", title: "Hyderabad Insider", description: "Collect 5 stamps in Hyderabad.", threshold: 5, region: "Hyderabad" },
  { id: "trailblazer", icon: "◇", title: "Telangana Trailblazer", description: "Collect 10 Telangana stamps.", threshold: 10 },
  { id: "state-master", icon: "♛", title: "Telangana Master", description: "Complete the full Telangana passport.", complete: true }
]);

export function getAchievementProgress(achievement, locations, collected) {
  const eligibleLocations = achievement.region
    ? locations.filter((location) => location.region === achievement.region)
    : locations;
  const count = eligibleLocations.filter((location) => collected.has(location.id)).length;
  const target = achievement.complete ? locations.length : achievement.threshold;
  return { count, target, unlocked: count >= target };
}
