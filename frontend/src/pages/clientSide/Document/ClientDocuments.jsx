import Select from "react-select";
import "./documents.css";
import "../globalClient.css";
import { useClientDocuments } from "./document.service";

export default function ClientDocuments() {
  const {
    docs,
    page,
    totalPages,
    total,
    q,
    sort,
    typeOptions,
    dateOptions,
    typeValue,
    dateValue,
    loading,
    error,
    onSearchChange,
    onTypeChange,
    onDateRangeChange,
    toggleSort,
    goPrev,
    goNext,
  } = useClientDocuments({ pageSize: 6 });

  const onView = (doc) => {
    if (!doc.fileUrl) return;
    window.open(doc.fileUrl, "_blank", "noopener,noreferrer");
  };

  const onDownload = (doc) => {
    if (!doc.fileUrl) return;
    const a = document.createElement("a");
    a.href = doc.fileUrl;
    a.download = doc.name || "";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section >
      <header className="docs-header">
        <h1 className="dash-title">Documents</h1>
        <p className="dash-subtitle">
          View documents shared between you and the company.
        </p>
      </header>

      <div className="docs-toolbar">
        <div className="docs-search">
          <span className="docs-search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            className="dash-input docs-search-input"
            value={q}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder="Search Document"
          />
        </div>

        <div className="docs-controls">
          <div className="docs-control">
            <span className="docs-control-label">Document Type:</span>
            <div className="docs-select-wrap">
              <Select
                classNamePrefix="appt-select"
                options={typeOptions}
                value={typeValue}
                onChange={(opt) => onTypeChange(opt?.value)}
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
                onChange={(opt) => onDateRangeChange(opt?.value)}
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="docs-surface">
        {error ? <div className="docs-empty">{error}</div> : null}

        {loading ? (
          <div className="docs-list">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="docs-row">
                <div className="docs-file">
                  {/* PDF badge */}
                  <div className="skeleton docs-badge-skeleton"></div>

                  <div className="docs-file-meta">
                    {/* File name */}
                    <div className="skeleton docs-name-skeleton"></div>

                    {/* Meta inline row */}
                    <div className="docs-file-sub skeleton-inline">
                      <div className="skeleton docs-meta-skeleton"></div>
                      <div className="skeleton docs-meta-skeleton short"></div>
                      <div className="skeleton docs-meta-skeleton long"></div>
                    </div>
                  </div>
                </div>

                <div className="docs-actions">
                  <div className="skeleton docs-icon-skeleton"></div>
                  <div className="skeleton docs-icon-skeleton"></div>
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
                        <span className="docs-dot">•</span>
                        <span>Type: {d.type}</span>
                      </div>
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>
                        <span>Shared by: {d.sharedBy}</span>
                      </div>
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>
                        <span>Date: {d.date}</span>
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
                    title={d.fileUrl ? "View" : "No file yet"}
                  >
                    👁
                  </button>

                  <button
                    className="docs-action-btn"
                    type="button"
                    onClick={() => onDownload(d)}
                    aria-label="Download document"
                    disabled={!d.fileUrl}
                    title={d.fileUrl ? "Download" : "No file yet"}
                  >
                    ⤓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="docs-footer">
          <div className="dash-item-meta">
            {total
              ? `${total} document(s) found`
              : "Documents shared with you will appear here"}
          </div>

          <div className="docs-pagination">
            <button
              className="dash-btn ghost"
              type="button"
              onClick={goPrev}
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
              onClick={goNext}
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
