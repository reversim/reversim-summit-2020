import { get, post, put, delete2 } from './api';

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

export async function createProposal(data) {
  return await post("/api/proposal", data);
}

export async function updateProposal(id, proposal) {
  return await put(`/api/proposal/${id}`, proposal);
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

export async function updateUser(user) {
  return await put('/api/user', user);
}

export async function registerTeamMember(token) {
  return await put('/api/team', { token });
}

export async function attend(proposalId, isAttending) {
  return await post(`/api/proposal/${proposalId}/attend`, { value: !!isAttending });
}

export async function addSponsor(data) {
  return await post('/api/sponsor', data);
}

export async function updateSponsor(id, data) {
  return await put(`/api/sponsor/${id}`, data);
}

export async function deleteSponsor(id) {
  return await delete2(`/api/sponsor/${id}`);
}