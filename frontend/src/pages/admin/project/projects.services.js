import api, { csrf } from "../../../api/api";

// ------------------ CONSTANTS ------------------
// Define the possible statuses for projects and milestones
export const PSTATUS = {
  draft: "Draft", // The project is in the draft state
  active: "Active", // The project is actively being worked on
  on_hold: "On hold", // The project is temporarily paused
  completed: "Completed", // The project has been finished
};

export const MSTATUS = {
  todo: "To do", // The milestone is yet to start
  doing: "In progress", // The milestone is currently being worked on
  done: "Done", // The milestone is finished
};

// ------------------ NORMALIZERS ------------------
// Normalize the list of projects and total count
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

// Normalize the response containing client data
function normalizeClientsResponse(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

// ------------------ FORM DATA ------------------
// Convert draft project data into FormData for submission
function toFormData(draft) {
  const fd = new FormData();

  // Append basic project data
  fd.append("name", draft.name);
  fd.append("status", draft.status);
  fd.append("clientId", draft.clientId || "");
  fd.append("startDate", draft.startDate || "");
  fd.append("dueDate", draft.dueDate || "");
  fd.append("budget", draft.budget || 0);
  fd.append("progress", draft.progress || 0);
  fd.append("description", draft.description || "");

  // Milestones must be serialized as JSON
  fd.append("milestones", JSON.stringify(draft.milestones || []));

  // Only append real File objects for photos
  (draft.photos || []).forEach((file, i) => {
    if (file instanceof File) {
      fd.append(`photos[${i}]`, file);
    }
  });

  return fd;
}

// ------------------ API PATHS ------------------
// Define API routes for projects and clients
const routes = {
  projects: "/api/admin/projects", // Path to manage projects
  clients: "/api/admin/projects/clients", // Path to fetch client data
};

// ------------------ ERRORS ------------------
// Convert API errors to user-friendly messages
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
// Service object to interact with the backend API for projects
export const ProjectsService = {
  // Fetch a list of projects with optional filters, sorting, and pagination
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
      return normalizeListResponse(data); // Normalize the API response
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to load projects"));
    }
  },

  // Fetch the list of clients
  async clients(signal) {
    try {
      const { data } = await api.get(routes.clients, { signal });
      return normalizeClientsResponse(data); // Normalize client data response
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to load clients"));
    }
  },

  // Create a new project by sending FormData
  async create(draft) {
    try {
      await csrf(); // Ensure CSRF protection
      const fd = toFormData(draft); // Convert project draft to FormData

      const { data } = await api.post(routes.projects, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data?.item ?? data?.data ?? data; // Return the created project data
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to create project"));
    }
  },

  // Update an existing project by sending FormData
  async update(id, draft) {
    try {
      await csrf(); // Ensure CSRF protection
      const fd = toFormData(draft); // Convert project draft to FormData

      // Laravel method spoofing for PATCH
      fd.append("_method", "PATCH");

      const { data } = await api.post(
        `${routes.projects}/${encodeURIComponent(id)}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return data?.item ?? data?.data ?? data; // Return the updated project data
    } catch (e) {
      throw new Error(toFriendlyError(e, "Failed to update project"));
    }
  },

  // Delete a photo associated with a project
  async deletePhoto(photoId) {
    await csrf(); // Ensure CSRF protection
    await api.delete(`/api/admin/projects/photos/${photoId}`); // Send DELETE request
  },
};
