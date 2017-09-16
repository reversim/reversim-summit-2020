import { get, post } from './api';

export async function getSessions() {
  return await get("/api/sessions");
}

export async function getTeam() {
  return await get("/api/team");
}

export async function getMe() {
  return await get("/api/me");
}

export async function logout() {
  return await post("/api/logout");
}

export async function getProposal(id) {
  return await get("/api/proposal/" + id);
}