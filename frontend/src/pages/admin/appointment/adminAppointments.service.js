// adminAppointments.service.js
import api, {csrf} from "../../../api/api";

export async function adminListAppointments({
  status = "all", // all|pending|accepted|declined
  page = 1,
  limit = 12,
  q = "",
  sort = "scheduled_at_asc", // scheduled_at_asc|scheduled_at_desc|created_at_desc
} = {}) {
  const res = await api.get("/api/admin/appointments", {
    params: { status, page, limit, q, sort },
  });

  return res.data;
}

export async function adminUpdateAppointment(id, payload) {
  await csrf();
  const res = await api.patch(`/api/admin/appointments/${id}`, payload);
  return res.data;
}
