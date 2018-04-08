import { get, post, delete2 } from './api';

export async function getProposals() {
  return await get("/api/proposal");
}

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

export async function uploadPhoto(id, data) {
  return await post("/api/profileImage", { id, imageBinary: data });
}

export async function getMessages() {
  return await get("/api/messages");
}

export async function addMessage(text) {
  return await post("/api/message", { data: text });
}

export async function removeMessage(id) {
  return await delete2(`/api/message/${id}`);
}

export async function getInitialData() {
  return await get('/api/initial');
}

