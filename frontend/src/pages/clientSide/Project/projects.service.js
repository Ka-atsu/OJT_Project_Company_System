import api from "../../../api/api";

const statusToApi = {
  All: "all",
  Active: "active",
  Completed: "completed",
  "In Progress": "active", // change if you actually store "in_progress"
};

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
  async list({ status = "All", page = 1, limit = 6 } = {}, signal) {
    const params = { page, limit };

    const apiStatus = statusToApi[status] ?? "all";
    if (apiStatus !== "all") params.status = apiStatus;

    const { data } = await api.get("/api/projects", { params, signal });
    return normalizeProjectsResponse(data);
  },
};
