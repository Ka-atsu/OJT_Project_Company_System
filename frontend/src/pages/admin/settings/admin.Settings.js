import api from "../../../api/api";

// Get authenticated user
export async function getCurrentUser() {
  const res = await api.get("/api/user");
  return res.data;
}

// Update user profile
export async function updateUserProfile(data) {
  const res = await api.put("/api/user", data);
  return res.data;
}

// Update Password
export async function updatePassword(data) {
  const res = await api.put("/api/user/password", data);
  return res.data;
}