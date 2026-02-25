import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-document.css";
import { fetchAdminClients } from "./documents.services";

export default function AdminDocuments() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalDocuments = useMemo(() => {
    return clients.reduce((sum, c) => sum + (c.documents_count ?? 0), 0);
  }, [clients]);

  const loadClients = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchAdminClients({
        q: search,
        page,
        limit,
      });

      setClients(Array.isArray(res?.data) ? res.data : []);
      setTotalPages(Number(res?.totalPages ?? 1));
      setTotal(Number(res?.total ?? 0));
    } catch (e) {
      setClients([]);
      setTotalPages(1);
      setTotal(0);
      setError(
        e?.response?.data?.message || e?.message || "Failed to load clients.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
    // eslint-disable-next-line
  }, [search, page]);

  const handleClientClick = (clientId) => {
    navigate(`/w/admin/clientDocuments/${clientId}`);
  };

  return (
    <div className="admin-documents">
      {/* Header */}
      <div className="page-header">
        <h2>Manage Client Documents</h2>
        <p className="subtitle">
          {total} clients • {totalDocuments} total documents
        </p>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search clients..."
          className="search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="content-card">
        {loading && <div className="empty-state">Loading clients…</div>}

        {error && !loading && (
          <div className="empty-state">
            {error}{" "}
            <button type="button" className="retry-btn" onClick={loadClients}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && clients.length === 0 && (
          <div className="empty-state">No clients found.</div>
        )}

        {!loading && !error && clients.length > 0 && (
          <>
            <table className="client-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>ID</th>
                  <th>Documents</th>
                  <th className="th-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td className="client-name">{client.name}</td>

                    <td className="muted">{client.id}</td>

                    <td>
                      <span className="doc-count">
                        {client.documents_count ?? 0}
                      </span>
                    </td>

                    <td className="td-action">
                      <button
                        className="view-btn"
                        onClick={() => handleClientClick(client.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-footer">
              <span>
                Showing {clients.length} of {total} clients
              </span>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                  >
                    Prev
                  </button>

                  <span className="page-meta">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    className="page-btn"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
