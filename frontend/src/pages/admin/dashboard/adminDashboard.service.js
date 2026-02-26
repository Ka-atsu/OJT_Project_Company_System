// src/pages/admin/dashboard/adminDashboard.service.js
import api, {csrf} from "../../../api/api";

export async function adminGetDashboard({
  apptLimit = 10,
  projectLimit = 8,
  docLimit = 8,
  milestoneDays = 7,
} = {}) {
  await csrf(); // safe for Sanctum
  const res = await api.get("/api/admin/dashboard", {
    params: { apptLimit, projectLimit, docLimit, milestoneDays },
  });
  return res.data;
}
