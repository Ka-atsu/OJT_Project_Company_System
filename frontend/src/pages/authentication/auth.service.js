import api, { csrf } from "../../api/api"; // adjust if your path differs

// Adjust these checks to match your backend user fields
function computeIsAdmin(user) {
  // common possibilities
  const role =
    user?.role ?? user?.user_type ?? user?.type ?? user?.account_type;
  const isAdminFlag = user?.is_admin ?? user?.isAdmin;

  if (typeof isAdminFlag === "boolean") return isAdminFlag;
  if (typeof isAdminFlag === "number") return isAdminFlag === 1;

  return String(role || "").toLowerCase() === "admin";
}

async function fetchMe() {
  const me = await api.get("/api/user");
  return me.data;
}

function enrichUser(user) {
  const isAdmin = computeIsAdmin(user);
  return {
    ...user,
    isAdmin,
    redirectTo: isAdmin ? "/admin" : "/dashboard",
  };
}

export async function login(email, password, remember = false) {
  await csrf();
  const res = await api.post("/login", { email, password, remember });

  if (res.data?.requires_2fa) {
    return {
      requires2FA: true,
      message:
        res.data.message ?? "Enter the verification code sent to your email.",
    };
  }

  const user = await fetchMe();
  return enrichUser(user);
}

export async function verifyTwoFactor(code) {
  await csrf();
  await api.post("/login/2fa", { code });

  const user = await fetchMe();
  return enrichUser(user);
}

export async function register(name, email, password, password_confirmation) {
  await csrf();
  await api.post("/register", { name, email, password, password_confirmation });

  const user = await fetchMe();
  return enrichUser(user);
}

export async function logout() {
  await csrf();
  await api.post("/logout");
  localStorage.removeItem("user");
}
