import api, { csrf } from "../../../api/api";

// ------------------ CONSTANTS ------------------
export const PSTATUS = {
  draft: "Draft",
  active: "Active",
  on_hold: "On hold",
  completed: "Completed",
};

export const MSTATUS = {
  todo: "To do",
  doing: "In progress",
  done: "Done",
};

export function emptyProject() {
  return {
    id: "",
    name: "",
    status: "draft",
    clientId: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    dueDate: "",
    budget: "",
    progress: 0,
    description: "",
    milestones: [],
    updatedAt: "",
  };
}

// ------------------ NORMALIZERS ------------------
function normalizeListResponse(data) {
  if (!data) return { items: [], total: 0 };

  if (Array.isArray(data.items)) {
    return {
      items: data.items,
      total: Number(data.total ?? data.items.length),
    };
  }

  if (Array.isArray(data.data)) {
    return {
      items: data.data,
      total: Number(data?.meta?.total ?? data?.total ?? data.data.length),
    };
  }

  if (Array.isArray(data)) return { items: data, total: data.length };

  return { items: [], total: 0 };
}

function normalizeClientsResponse(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

function normalizeProjectPayload(draft) {
  return {
    ...draft,
    budget: Number(draft.budget || 0),
    progress: Number(draft.progress || 0),
    milestones: (draft.milestones || []).map((m) => ({
      id: m.id,
      title: m.title,
      due: m.due || null,
      status: m.status,
    })),
  };
}

// ------------------ API PATHS ------------------
const routes = {
  projects: "/api/admin/projects",
  clients: "/api/admin/projects/clients",
};

// Provide better error messaging (helps debug)
function toFriendlyError(e, fallback) {
  // Axios "Network Error" => no response (CORS, wrong host, server down, mixed content)
  if (e?.message === "Network Error") {
    return "Network Error (API unreachable / CORS / wrong URL). Check VITE_API_URL and Request URL in DevTools Network tab.";
  }
  // If server responded with status
  if (e?.response) {
    const msg =
      e.response.data?.message ||
      e.response.data?.error ||
      `${fallback} (HTTP ${e.response.status})`;
    return msg;
  }
  return e?.message ?? fallback;
}

// ------------------ SERVICE ------------------
export const ProjectsService = {
  async list({ page, pageSize, status, q, sort } = {}, signal) {
    try {
      const params = {
        page,
        pageSize,
        ...(status && status !== "all" ? { status } : {}),
        ...(q && q.trim() ? { q: q.trim() } : {}),
        ...(sort ? { sort } : {}),
      };

      const { data } = await api.get(routes.projects, { params, signal });
      return normalizeListResponse(data);
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to load projects"));
    }
  },

  async clients(signal) {
    try {
      const { data } = await api.get(routes.clients, { signal });
      return normalizeClientsResponse(data);
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to load clients"));
    }
  },

  async create(draft) {
    try {
      await csrf();
      const payload = normalizeProjectPayload(draft);
      const { data } = await api.post(routes.projects, payload);
      return data?.item ?? data?.data ?? data;
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to create project"));
    }
  },

  async update(id, draft) {
    try {
      await csrf();
      const payload = normalizeProjectPayload(draft);
      const { data } = await api.patch(
        `${routes.projects}/${encodeURIComponent(id)}`,
        payload,
      );

      return data?.item ?? data?.data ?? data;
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to update project"));
    }
  },
};
