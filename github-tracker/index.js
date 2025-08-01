import PromptSync from "prompt-sync";
import { allActivities } from "./utils.js";

const prompt = PromptSync();
let attempts = 0;
let profileData = null;

async function fetchData(profileName) {
  const url = `https://api.github.com/users/${profileName}/events`;
  const response = await fetch(url);
  return await response.json();
}

while (attempts < 3) {
  const profileName = prompt("Enter your GitHub profile name: ");
  const data = await fetchData(profileName);

  if (data.message === "Not Found") {
    console.log("User does not exist");
    attempts++;
  } else {
    profileData = data;
    break;
  }
}

if (!profileData) {
  console.log("Too many attempts");
  process.exit(1);
}

const activityTimeline = allActivities(profileData);
console.log(activityTimeline);
