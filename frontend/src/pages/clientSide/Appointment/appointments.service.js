// appointments.service.js
import api, {csrf} from "../../../api/api";

/**
 * List appointments (paginated).
 * Backend: GET /api/appointments?status=upcoming|past&page=1&limit=7
 *
 * Returns:
 * { data: [...], page: number, totalPages: number, total: number }
 */
export async function listAppointments({
  status = "upcoming",
  page = 1,
  limit = 10,
} = {}) {
  try {
    const response = await api.get("/api/appointments", {
      params: { status, page, limit },
    });
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

/**
 * Create an appointment.
 * Backend: POST /api/appointments
 *
 * Payload:
 * { phone, scheduled_at, project, purpose, details, mode }
 */
export async function createAppointment(payload) {
  try {
    await csrf();
    const response = await api.post("/api/appointments", payload);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

function normalizeApiError(error) {
  const message =
    error?.response?.data?.message ||
    (error?.response?.data?.errors
      ? flattenLaravelErrors(error.response.data.errors)
      : null) ||
    error?.message ||
    "Request failed";

  return new Error(message);
}

function flattenLaravelErrors(errors) {
  // Laravel shape: { field: ["msg1", "msg2"], ... }
  return Object.values(errors).flat().join("\n");
}
