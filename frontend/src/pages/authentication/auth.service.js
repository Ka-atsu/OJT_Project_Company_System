import api, { csrf } from "../../api/api"; // adjust if your path differs

export async function login(email, password, remember = false) {
  await csrf();
  await api.post("/login", { email, password, remember });
  const me = await api.get("/api/user");
  return me.data;
}

export async function register(name, email, password, password_confirmation) {
  await csrf();
  await api.post("/register", { name, email, password, password_confirmation });
  const me = await api.get("/api/user");
  return me.data;
}

export async function logout() {
  await csrf();
  await api.post("/logout");
  localStorage.removeItem("user");
}
