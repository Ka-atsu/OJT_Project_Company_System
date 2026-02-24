import api, { csrf } from "../../../api/api";

/* =========================
   Status Constants
========================= */

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

/* =========================
   Routes
========================= */

const routes = {
  projects: "/api/admin/projects",
  clients: "/api/admin/projects/clients",
};

/* =========================
   Helpers
========================= */

function normalizeList(data) {
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

  if (Array.isArray(data)) {
    return { items: data, total: data.length };
  }

  return { items: [], total: 0 };
}

function normalizeArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

function toFormData(draft = {}) {
  const fd = new FormData();

  const fields = {
    name: draft.name,
    status: draft.status,
    clientId: draft.clientId,
    startDate: draft.startDate,
    dueDate: draft.dueDate,
    budget: draft.budget ?? 0,
    progress: draft.progress ?? 0,
    description: draft.description,
    address: draft.address,
    completedDate: draft.completedDate,
  };

  Object.entries(fields).forEach(([key, value]) => {
    fd.append(key, value ?? "");
  });

  fd.append("milestones", JSON.stringify(draft.milestones ?? []));

  (draft.photos ?? []).forEach((file, i) => {
    if (file instanceof File) {
      fd.append(`photos[${i}]`, file);
    }
  });

  return fd;
}

function friendlyError(e, fallback) {
  if (e?.message === "Network Error") {
    return "Network error. Check API / CORS configuration.";
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

/* =========================
   Service
========================= */

export const ProjectsService = {
  async list(params = {}, signal) {
    try {
      const { page, pageSize, status, q, sort } = params;

      const query = {
        page,
        pageSize,
        ...(status && status !== "all" && { status }),
        ...(q?.trim() && { q: q.trim() }),
        ...(sort && { sort }),
      };

      const { data } = await api.get(routes.projects, {
        params: query,
        signal,
      });

      return normalizeList(data);
    } catch (e) {
      throw new Error(friendlyError(e, "Failed to load projects"));
    }
  },

  async clients(signal) {
    try {
      const { data } = await api.get(routes.clients, { signal });
      return normalizeArray(data);
    } catch (e) {
      throw new Error(friendlyError(e, "Failed to load clients"));
    }
  },

  async create(draft) {
    try {
      await csrf();
      const { data } = await api.post(routes.projects, toFormData(draft), {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data?.item ?? data?.data ?? data;
    } catch (e) {
      throw new Error(friendlyError(e, "Failed to create project"));
    }
  },

  async update(id, draft) {
    try {
      await csrf();
      const fd = toFormData(draft);
      fd.append("_method", "PATCH");

      const { data } = await api.post(
        `${routes.projects}/${encodeURIComponent(id)}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return data?.item ?? data?.data ?? data;
    } catch (e) {
      throw new Error(friendlyError(e, "Failed to update project"));
    }
  },

  async remove(id) {
    try {
      await csrf();
      await api.delete(`${routes.projects}/${encodeURIComponent(id)}`);
      return true;
    } catch (e) {
      throw new Error(friendlyError(e, "Failed to delete project"));
    }
  },

  async deletePhoto(photoId) {
    try {
      await csrf();
      await api.delete(`/api/admin/projects/photos/${photoId}`);
      return true;
    } catch (e) {
      throw new Error(friendlyError(e, "Failed to delete photo"));
    }
  },
};
