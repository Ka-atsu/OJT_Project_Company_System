import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import "./client-documents.css";

// Document types, clients, and names for random generation
const DOC_TYPES = ["Contract", "Purchase Order", "Report", "Plan", "Invoice"];
const CLIENTS = ["Cliberduche Corp.", "Acme Inc.", "Globex Ltd.", "Umbrella Co.", "Wayne Enterprises"];
const NAMES = ["Agreement", "Invoice", "Report", "Plan", "Proposal", "Budget", "Timeline", "Summary"];
const DATE_RANGES = ["Last 3 Months", "Last 6 Months", "This Year", "All Time"];

// helpers
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = () => {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const m = random(month);
  const d = Math.floor(Math.random() * 28) + 1; // 1-28
  const y = Math.floor(Math.random() * 8) + 2018; // 2018-2026
  return `${m}. ${d}, ${y}`;
};

// generate 50 random mock documents
const mockDocs = Array.from({ length: 50 }, (_, i) => {
  const type = random(DOC_TYPES);
  const name = `${random(NAMES)}${type === "Invoice" ? ` #${Math.floor(Math.random() * 500 + 1)}` : ""}.pdf`;
  return {
    id: i + 1,
    name,
    type,
    sharedBy: random(CLIENTS),
    date: randomDate(),
    fileUrl: null,
  };
});

const DOC_TYPES_ALL = ["All Types", ...DOC_TYPES];
const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

export default function ClientDocuments() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All Types");
  const [dateRange, setDateRange] = useState("All Time");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 6;
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    setDocs(mockDocs);
    setSort("newest");
  }, []);

    const filtered = useMemo(() => {
        let data = [...docs];

        // Filter by type
        if (type !== "All Types") {
            data = data.filter((d) => d.type.toLowerCase() === type.toLowerCase());
        }

        // Filter by search query
        if (q.trim()) {
            data = data.filter((d) => d.name.toLowerCase().includes(q.trim().toLowerCase()));
        }

        // Filter by date range
        if (dateRange !== "All Time") {
            const now = new Date();
            data = data.filter((d) => {
            const parts = d.date.replace(",", "").split(" "); // e.g., ["Jan.", "12", "2021"]
            const monthMap = {
                    "Jan.": 0,
                    "Feb.": 1,
                    "Mar.": 2,
                    "Apr.": 3,
                    "May": 4,
                    "Jun.": 5,
                    "Jul.": 6,
                    "Aug.": 7,
                    "Sep.": 8,
                    "Oct.": 9,
                    "Nov.": 10,
                    "Dec.": 11
                };
            const docDate = new Date(parseInt(parts[2]), monthMap[parts[0]], parseInt(parts[1]));

            if (dateRange === "Last 3 Months") {
                const cutoff = new Date(now);
                cutoff.setMonth(now.getMonth() - 3);
                return docDate >= cutoff;
            }
            if (dateRange === "Last 6 Months") {
                const cutoff = new Date(now);
                cutoff.setMonth(now.getMonth() - 6);
                return docDate >= cutoff;
            }
            if (dateRange === "This Year") {
                return docDate.getFullYear() === now.getFullYear();
            }

            return true;
            });
        }

        // Sorting
        data.sort((a, b) => {
            const parse = (str) => {
            const parts = str.replace(",", "").split(" ");
            const monthMap = {
                    "Jan.": 0,
                    "Feb.": 1,
                    "Mar.": 2,
                    "Apr.": 3,
                    "May": 4,
                    "Jun.": 5,
                    "Jul.": 6,
                    "Aug.": 7,
                    "Sep.": 8,
                    "Oct.": 9,
                    "Nov.": 10,
                    "Dec.": 11
                };
            return new Date(parseInt(parts[2]), monthMap[parts[0]], parseInt(parts[1]));
            };
            return sort === "newest" ? parse(b.date) - parse(a.date) : parse(a.date) - parse(b.date);
        });

        return data;
    }, [docs, q, type, dateRange, sort]);


    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const pageDocs = useMemo(
    () => filtered.slice((page - 1) * limit, (page - 1) * limit + limit),
    [filtered, page]
  );

  const toggleSort = () => {
    setSort((s) => (s === "newest" ? "oldest" : "newest"));
    setPage(1);
  };

  if (page > totalPages) setPage(totalPages);

  const typeOptions = useMemo(() => toOptions(DOC_TYPES_ALL), []);
  const dateOptions = useMemo(() => toOptions(DATE_RANGES), []);

  const typeValue = useMemo(() => typeOptions.find((o) => o.value === type) || typeOptions[0], [typeOptions, type]);
  const dateValue = useMemo(() => dateOptions.find((o) => o.value === dateRange) || dateOptions[0], [dateOptions, dateRange]);

  const handleUpdate = () => {
    alert("Documents updated! (connect to backend API here)");
    // TODO: Send `docs` state to backend to update documents
  };

  return (
    <section className="docs-page">
      <header className="docs-header">
        <h1 className="dash-title">Documents</h1>
        <p className="dash-subtitle">View documents shared Client Name.</p>
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
          <div className="docs-upload-button" onClick={() => alert("Upload Document (not implemented)")}>
            Upload
          </div>

          <div className="docs-update-wrapper">
            <button className="docs-update-btn" type="button" onClick={handleUpdate}>
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

          <button className="dash-btn ghost docs-sort" type="button" onClick={toggleSort}>
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
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>Type: {d.type}
                      </div>
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>Shared by: {d.sharedBy}
                      </div>
                      <div className="doc-file-sub-categ">
                        <span className="docs-dot">•</span>Date: {d.date}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="docs-actions">
                  <button className="docs-action-btn" aria-label="View document">
                    <a
                      className="docs-action-link"
                      href="https://drive.google.com/file/d/1P6eeeph-igHN2kz22J4ooTfXALkjd454/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      👁
                    </a>
                  </button>

                  <button className="docs-action-btn" aria-label="Download document">
                    <a
                      className="docs-action-link"
                      href="https://drive.google.com/uc?export=download&id=1P6eeeph-igHN2kz22J4ooTfXALkjd454"
                      download="WeeklyReport.pdf"
                    >
                      ⤓
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="docs-footer">
          <div className="dash-item-meta">Documents shared with you (Client Name) appear here</div>

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
