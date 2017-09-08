import { get, post, put } from './api';

export async function getSpeakers() {
  return await get("/api/speakers")
}

export async function getTeam() {
  return await get("/api/team");
}