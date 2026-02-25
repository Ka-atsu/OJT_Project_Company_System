import api, { csrf } from "../../../api/api";

// UI constants (dropdowns)
export const DOC_TYPES = [
  "Contract",
  "Purchase Order",
  "Report",
  "Plan",
  "Invoice",
];
export const DOC_TYPES_ALL = ["All Types", ...DOC_TYPES];

export const DATE_RANGES = [
  "Last 3 Months",
  "Last 6 Months",
  "This Year",
  "All Time",
];

export const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

// backend expects type=all, but UI uses "All Types"
const normalizeType = (type) => {
  if (!type) return "all";
  return type === "All Types" ? "all" : type;
};

/**
 * ADMIN: list clients
 * GET /api/admin/documents/clients
 * returns: [{id, name}, ...]
 */
export async function fetchAdminClients(params = {}) {
  await csrf();
  const res = await api.get("/api/admin/documents/clients", {
    params,
  });
  return res.data;
  // expects: { data, page, totalPages, total }
}

/**
 * CLIENT: list documents for logged-in user
 * GET /api/documents?q=&type=&dateRange=&sort=&page=&limit=
 * returns: { data, page, totalPages, total }
 */
export async function fetchMyDocuments(params = {}) {
  await csrf();
  const res = await api.get("/api/documents", {
    params: { ...params, type: normalizeType(params.type) },
  });
  return res.data;
}

/**
 * ADMIN: list documents for a specific client
 * GET /api/admin/clients/{clientId}/documents?q=&type=&dateRange=&sort=&page=&limit=
 * returns: { data, page, totalPages, total }
 */
export async function fetchClientDocumentsAdmin(clientId, params = {}) {
  await csrf();
  const res = await api.get(`/api/admin/clients/${clientId}/documents`, {
    params: { ...params, type: normalizeType(params.type) },
  });
  return res.data;
}

/**
 * ADMIN: upload a document
 * POST /api/admin/documents
 * formData:
 * - user_id
 * - type
 * - document_date
 * - shared_by (optional)
 * - file (pdf)
 */
export async function uploadAdminDocument(formData) {
  await csrf();
  const res = await api.post("/api/admin/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * ADMIN: update doc metadata OR replace file
 * PATCH /api/admin/documents/{documentId}
 */
export async function updateAdminDocument(documentId, payload) {
  await csrf();
  const isForm = typeof FormData !== "undefined" && payload instanceof FormData;

  const res = await api.patch(`/api/admin/documents/${documentId}`, payload, {
    headers: isForm ? { "Content-Type": "multipart/form-data" } : undefined,
  });

  return res.data;
}

/**
 * ADMIN: delete a document
 * DELETE /api/admin/documents/{documentId}
 */
export async function deleteAdminDocument(documentId) {
  await csrf();
  const res = await api.delete(`/api/admin/documents/${documentId}`);
  return res.data;
}
