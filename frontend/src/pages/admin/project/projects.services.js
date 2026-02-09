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
    photos: [], // 👈 REQUIRED
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

// ------------------ FORM DATA ------------------
function toFormData(draft) {
  const fd = new FormData();

  fd.append("name", draft.name);
  fd.append("status", draft.status);
  fd.append("clientId", draft.clientId || "");
  fd.append("startDate", draft.startDate || "");
  fd.append("dueDate", draft.dueDate || "");
  fd.append("budget", draft.budget || 0);
  fd.append("progress", draft.progress || 0);
  fd.append("description", draft.description || "");

  // milestones must be JSON when using FormData
  fd.append("milestones", JSON.stringify(draft.milestones || []));

  // ONLY append real File objects
  (draft.photos || []).forEach((file, i) => {
    if (file instanceof File) {
      fd.append(`photos[${i}]`, file);
    }
  });

  return fd;
}

// ------------------ API PATHS ------------------
const routes = {
  projects: "/api/admin/projects",
  clients: "/api/admin/projects/clients",
};

// ------------------ ERRORS ------------------
function toFriendlyError(e, fallback) {
  if (e?.message === "Network Error") {
    return "Network Error (API unreachable / CORS / wrong URL).";
  }
  if (e?.response) {
    return (
      e.response.data?.message ||
      e.response.data?.error ||
      `${fallback} (HTTP ${e.response.status})`
    );
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
      const fd = toFormData(draft);

      const { data } = await api.post(routes.projects, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data?.item ?? data?.data ?? data;
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to create project"));
    }
  },

  async update(id, draft) {
    try {
      await csrf();
      const fd = toFormData(draft);

      // Laravel method spoofing
      fd.append("_method", "PATCH");

      const { data } = await api.post(
        `${routes.projects}/${encodeURIComponent(id)}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return data?.item ?? data?.data ?? data;
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to update project"));
    }
  },

  async deletePhoto(photoId) {
    await csrf();
    await api.delete(`/api/admin/projects/photos/${photoId}`);
  },
};
