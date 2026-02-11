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
  async list({ status = "active", page = 1, limit = 6 } = {}, signal) {
    const params = { page, limit, status };

    // Log the URL being used for the request
    const url = `/api/projects?${new URLSearchParams(params).toString()}`;
    console.log("Request URL:", url); // Log the URL here

    const { data } = await api.get(url, { signal });
    return normalizeProjectsResponse(data);
  },
};
