import { get } from './api';

export async function getSessions() {
  return await get("/api/sessions");
}

export async function getTeam() {
  return await get("/api/team");
}