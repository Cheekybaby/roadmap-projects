export const allActivities = ( events ) => {
  const activityTimeline = [];

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    if (e.type === "PushEvent" || e.type === "PullRequestEvent") {
      activityTimeline.push({
        date: e.created_at.split("T")[0],
        type: e.type,
        repo: e.repo.name,
        timestamp: e.created_at,
      });
    }
  }

  return activityTimeline;
};