import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import "./documents.css";

// backend-ready: later replace this with service call
const mockDocs = [
  {
    id: 1,
    name: "Contract Agreement.pdf",
    type: "Contract",
    sharedBy: "Cliberduche Corp.",
    date: "Jan. 20, 2026",
    fileUrl: null,
  },
  {
    id: 2,
    name: "Purchase Order #123.pdf",
    type: "Purchase Order",
    sharedBy: "Cliberduche Corp.",
    date: "Jan. 20, 2026",
    fileUrl: null,
  },
  {
    id: 3,
    name: "Building Plan.pdf",
    type: "Contract",
    sharedBy: "Cliberduche Corp.",
    date: "Jan. 20, 2026",
    fileUrl: null,
  },
  {
    id: 4,
    name: "Project Report.pdf",
    type: "Report",
    sharedBy: "Cliberduche Corp.",
    date: "Jan. 20, 2026",
    fileUrl: null,
  },
];

const DOC_TYPES = ["All Types", "Contract", "Purchase Order", "Report", "Plan"];
const DATE_RANGES = ["Last 3 Months", "Last 6 Months", "This Year", "All Time"];

const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

export default function ClientDocuments() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All Types");
  const [dateRange, setDateRange] = useState("Last 3 Months");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = 6;

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    setDocs(mockDocs);
  }, []);

  const filtered = useMemo(() => {
    let data = [...docs];

    if (type !== "All Types") {
      data = data.filter((d) => d.type.toLowerCase() === type.toLowerCase());
    }

    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      data = data.filter((d) => d.name.toLowerCase().includes(needle));
    }

    // dateRange is UI only for now (backend-ready hook)
    // later: send dateRange to API

    if (sort === "oldest") data = [...data].reverse();

    return data;
  }, [docs, q, type, dateRange, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

  const pageDocs = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const toggleSort = () => {
    setSort((s) => (s === "newest" ? "oldest" : "newest"));
    setPage(1);
  };

  if (page > totalPages) setPage(totalPages);

  const typeOptions = useMemo(() => toOptions(DOC_TYPES), []);
  const dateOptions = useMemo(() => toOptions(DATE_RANGES), []);

  const typeValue = useMemo(
    () => typeOptions.find((o) => o.value === type) || typeOptions[0],
    [typeOptions, type],
  );

  const dateValue = useMemo(
    () => dateOptions.find((o) => o.value === dateRange) || dateOptions[0],
    [dateOptions, dateRange],
  );

  return (
    <section className="docs-page">
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
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
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
        {pageDocs.length === 0 ? (
          <div className="docs-empty">No documents found.</div>
        ) : (
          <div className="docs-list">
            {pageDocs.map((d) => (
              <div key={d.id} className="docs-row">
                <div className="docs-file">
                  <div className="docs-badge">PDF</div>
                  <div className="docs-file-meta">
                    <div className="docs-file-name">{d.name}</div>
                    <div className="docs-file-sub">
                      <span>Type: {d.type}</span>
                      <span className="docs-dot">•</span>
                      <span>Shared by: {d.sharedBy}</span>
                      <span className="docs-dot">•</span>
                      <span>Date: {d.date}</span>
                    </div>
                  </div>
                </div>

                <div className="docs-actions">
                  <button
                    className="docs-action-btn"
                    type="button"
                    onClick={() => alert("View (connect to fileUrl later)")}
                    aria-label="View document"
                  >
                    👁
                  </button>

                  <button
                    className="docs-action-btn"
                    type="button"
                    onClick={() => alert("Download (connect to fileUrl later)")}
                    aria-label="Download document"
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
            Documents shared with you will appear here
          </div>

          <div className="docs-pagination">
            <button
              className="dash-btn ghost"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
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
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
