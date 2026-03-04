import api, { csrf } from "../../../api/api";

/* =========================
   Get Authenticated User
========================= */
export const getUser = async () => {
  await csrf();
  const res = await api.get("/api/user");
  return res.data;
};

/* =========================
   Update Profile Name
========================= */
export const updateProfile = async (data) => {
  await csrf();
  const res = await api.put("/api/user/profile", data);
  return res.data;
};

/* =========================
   Update Email
========================= */
export const updateEmail = async (email) => {
  await csrf();
  const res = await api.put("/api/user/email", { email });
  return res.data;
};

/* =========================
   Change Password
========================= */
export const changePassword = async (data) => {
  await csrf();
  const res = await api.put("/api/user/password", data);
  return res.data;
};

/* =========================
   Toggle 2FA
========================= */
export const toggleTwoFactor = async (enabled) => {
  await csrf();
  const res = await api.put("/api/user/2fa", { enabled });
  return res.data;
};

/* =========================
   Delete Account
========================= */
export const deleteAccount = async () => {
  await csrf();
  const res = await api.delete("/api/user");
  return res.data;
};
