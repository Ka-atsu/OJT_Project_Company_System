import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import "./client-documents.css";

import {
  DOC_TYPES_ALL,
  DATE_RANGES,
  toOptions,
  fetchClientDocumentsAdmin,
  uploadAdminDocument,
  deleteAdminDocument,
} from "./documents.services";

export default function AdminClientDocuments() {
  const { clientId } = useParams();

  const [q, setQ] = useState("");
  const [type, setType] = useState("All Types");
  const [dateRange, setDateRange] = useState("All Time");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = 6;

  const [docs, setDocs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // manual refresh trigger (Update button)
  const [refreshKey, setRefreshKey] = useState(0);

  const typeOptions = useMemo(() => toOptions(DOC_TYPES_ALL), []);
  const dateOptions = useMemo(() => toOptions(DATE_RANGES), []);

  const [uploading, setUploading] = useState(false);

  const typeValue = useMemo(
    () => typeOptions.find((o) => o.value === type) || typeOptions[0],
    [typeOptions, type],
  );

  const dateValue = useMemo(
    () => dateOptions.find((o) => o.value === dateRange) || dateOptions[0],
    [dateOptions, dateRange],
  );

  const loadDocs = async () => {
    if (!clientId) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetchClientDocumentsAdmin(clientId, {
        q,
        type,
        dateRange,
        sort,
        page,
        limit,
      });

      setDocs(Array.isArray(res?.data) ? res.data : []);
      setTotalPages(Number(res?.totalPages ?? 1));
      setTotal(Number(res?.total ?? 0));

      if (res?.page && Number(res.page) !== page) {
        setPage(Number(res.page));
      }
    } catch (e) {
      setDocs([]);
      setTotalPages(1);
      setTotal(0);
      setError(
        e?.response?.data?.message || e?.message || "Failed to load documents.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, q, type, dateRange, sort, page, limit, refreshKey]);

  const toggleSort = () => {
    setSort((s) => (s === "newest" ? "oldest" : "newest"));
    setPage(1);
  };

  // Update button = refetch
  const handleUpdate = () => setRefreshKey((x) => x + 1);

  const onView = (doc) => {
    if (!doc?.fileUrl) return;
    window.open(doc.fileUrl, "_blank", "noopener,noreferrer");
  };

  const onDownload = (doc) => {
    if (!doc?.fileUrl) return;
    const a = document.createElement("a");
    a.href = doc.fileUrl;
    a.download = doc.name || "";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const onDelete = async (doc) => {
    if (!doc?.id) return;

    const ok = window.confirm(`Delete "${doc.name}"?`);
    if (!ok) return;

    setError("");

    try {
      await deleteAdminDocument(doc.id);

      // refresh list
      setRefreshKey((x) => x + 1);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Delete failed.",
      );
    }
  };

  const handlePickFile = () => {
    document.getElementById("doc-upload-input")?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF
    if (file.type !== "application/pdf") {
      setError("PDF files only.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("user_id", clientId);
      fd.append("type", type === "All Types" ? "Contract" : type);
      fd.append("document_date", new Date().toISOString());
      fd.append("shared_by", "Admin"); // optional
      fd.append("file", file);

      await uploadAdminDocument(fd);

      // refresh docs list
      setPage(1);
      setRefreshKey((x) => x + 1);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Upload failed.",
      );
    } finally {
      setUploading(false);
      e.target.value = ""; // allow re-upload same file
    }
  };

  return (
    <section className="docs-page">
      <header className="docs-header">
        <h1 className="dash-title">Documents</h1>
        <p className="dash-subtitle">View documents for this client.</p>
      </header>

      <div className="docs-toolbar">
        <div className="docs-search">
          <span className="docs-search-icon">⌕</span>
          <input
            className="dash-input docs-search-input"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Search Document"
          />
        </div>

        <div className="docs-btn-group">
          <div
            className="docs-upload-button"
            onClick={handlePickFile}
            style={{
              opacity: uploading ? 0.6 : 1,
              pointerEvents: uploading ? "none" : "auto",
            }}
          >
            {uploading ? "Uploading..." : "Upload"}
          </div>

          <input
            id="doc-upload-input"
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className="docs-update-wrapper">
            <button
              className="docs-update-btn"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>

        <div className="docs-controls">
          <div className="docs-control">
            <span className="docs-control-label">Document Type:</span>
            <div className="docs-select-wrap">
              <Select
                classNamePrefix="appt-select"
                options={typeOptions}
                value={typeValue}
                onChange={(opt) => {
                  setType(opt?.value ?? "All Types");
                  setPage(1);
                }}
                isSearchable={false}
              />
            </div>
          </div>

          <button
            className="dash-btn ghost docs-sort"
            type="button"
            onClick={toggleSort}
          >
            Sort: {sort === "newest" ? "Newest" : "Oldest"}
          </button>

          <div className="docs-control">
            <span className="docs-control-label">Date:</span>
            <div className="docs-select-wrap">
              <Select
                classNamePrefix="appt-select"
                options={dateOptions}
                value={dateValue}
                onChange={(opt) => {
                  setDateRange(opt?.value ?? "Last 3 Months");
                  setPage(1);
                }}
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="docs-surface">
        {error && !loading ? (
          <div className="docs-empty">
            {error}{" "}
            <button type="button" className="dash-btn ghost" onClick={loadDocs}>
              Retry
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="docs-empty">Loading documents…</div>
        ) : docs.length === 0 ? (
          <div className="docs-empty">No documents found.</div>
        ) : (
          <div className="docs-list">
            {docs.map((d) => (
              <div key={d.id} className="docs-row">
                <div className="docs-file">
                  <div className="docs-badge">PDF</div>
                  <div className="docs-file-meta">
                    <div className="docs-file-name">{d.name}</div>
                    <div className="docs-file-sub">
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>Type: {d.type}
                      </div>
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>Shared by:{" "}
                        {d.sharedBy}
                      </div>
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>Date: {d.date}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="docs-actions">
                  <button
                    className="docs-action-btn"
                    type="button"
                    onClick={() => onView(d)}
                    aria-label="View document"
                    disabled={!d.fileUrl}
                    title={d.fileUrl ? "View" : "No file"}
                  >
                    👁
                  </button>

                  <button
                    className="docs-action-btn"
                    type="button"
                    onClick={() => onDownload(d)}
                    aria-label="Download document"
                    disabled={!d.fileUrl}
                    title={d.fileUrl ? "Download" : "No file"}
                  >
                    ⤓
                  </button>

                  <button
                    className="docs-action-btn"
                    type="button"
                    onClick={() => onDelete(d)}
                    aria-label="Delete document"
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="docs-footer">
          <div className="dash-item-meta">
            {total ? `${total} document(s)` : "Documents will appear here"}
          </div>

          <div className="docs-pagination">
            <button
              className="dash-btn ghost"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
            >
              Prev
            </button>

            <span className="dash-item-meta docs-page-meta">
              Page {page} of {totalPages}
            </span>

            <button
              className="dash-btn ghost"
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
