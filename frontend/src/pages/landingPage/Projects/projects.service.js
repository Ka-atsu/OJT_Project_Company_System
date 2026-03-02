// frontend/src/pages/clientSide/Project/projects.service.js
import api from "../../../api/api";

function normalizeProjectsResponse(data) {
  const items = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
      ? data
      : [];

  return {
    items,
    page: Number(data?.page ?? 1),
    totalPages: Number(data?.totalPages ?? 1),
    total: Number(data?.total ?? items.length),
  };
}

export const ClientProjectsService = {
  // Dashboard (paginated)
  async list({ status = "active", page = 1, limit = 6, signal } = {}) {
    const params = { page, limit, status };
    const url = `/api/projects?${new URLSearchParams(params).toString()}`;
    const { data } = await api.get(url, { signal });

    return normalizeProjectsResponse(data);
  },

  // Landing page showcase
  async showcase({ signal } = {}) {
    const { data } = await api.get("/api/projects/showcase", { signal });

    // Laravel Resource format
    return Array.isArray(data?.data) ? data.data : [];
  },
};
