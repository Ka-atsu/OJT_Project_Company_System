import Select from "react-select";
import "./client-documents.css";
import "./skeleton.css";
import useAdminClientDocuments from "./useAdminClientDocuments";

export default function AdminClientDocuments() {
  const state = useAdminClientDocuments();

  const {
    navigate,
    q,
    setQ,
    docs,
    loading,
    error,
    page,
    setPage,
    totalPages,
    total,

    // filters
    typeOptions,
    typeValue,
    setType,
    toggleSort,
    sort,
    dateOptions,
    dateValue,
    setDateRange,

    // refresh
    handleUpdate,
    loadDocs,

    // upload
    uploading,
    handleOpenUploadModal,
    handleFileChange,
    showUploadModal,
    selectedUploadType,
    setSelectedUploadType,
    selectedFile,
    isPdfUploaded,
    handleUploadSubmit,
    closeUploadModal,

    // actions
    onView,
    onDownload,
    onDelete,
  } = state;

  return (
    <section className="docs-page">
      <button
        className="btn-back"
        onClick={() => navigate("/w/admin/document")}
      >
        ← Back
      </button>

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
            onClick={handleOpenUploadModal}
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
              Refresh
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
          <div className="docs-list">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="docs-row-skeleton">
                <div className="docs-file">
                  <div className="skel skel-badge" />
                  <div>
                    <div className="skel skel-file-name" />
                    <div className="skel skel-file-sub" />
                  </div>
                </div>

                <div className="docs-actions">
                  <div className="skel skel-action" />
                  <div className="skel skel-action" />
                  <div className="skel skel-action" />
                </div>
              </div>
            ))}
          </div>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload-modal-overlay">
          <div className="upload-modal">
            <h2>Upload Document</h2>

            <div className="upload-field">
              <label>Document Type</label>
              <Select
                options={typeOptions.filter((o) => o.value !== "All Types")}
                value={typeOptions.find((o) => o.value === selectedUploadType)}
                onChange={(opt) => setSelectedUploadType(opt.value)}
                isSearchable={false}
              />
            </div>

            <div className="upload-field">
              <label>Select File</label>
              <input type="file" accept=".pdf" onChange={handleFileChange} />

              {!isPdfUploaded && (
                <small style={{ color: "red" }}>
                  Only PDF files are accepted. Other file types are not allowed.
                </small>
              )}
            </div>

            <div className="upload-actions">
              <button
                className="dash-btn ghost"
                onClick={closeUploadModal}
                disabled={uploading}
              >
                Cancel
              </button>

              <button
                className="dash-btn"
                onClick={handleUploadSubmit}
                disabled={uploading || !selectedFile || !isPdfUploaded}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
