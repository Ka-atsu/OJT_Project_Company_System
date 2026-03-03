import { useNavigate } from "react-router-dom";
import "./admin-document.css";
import "./skeleton.css";
import useAdminDocuments from "../hooks/useAdminDocuments";

export default function AdminDocuments() {
  const navigate = useNavigate();
  const state = useAdminDocuments();

  const {
    clients,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    total,
    loading,
    error,
    totalDocuments,
    loadClients,
  } = state;

  const handleClientClick = (clientId) => {
    navigate(`/admin/clientDocuments/${clientId}`);
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
        {loading && (
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
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="client-row-skeleton">
                  <td>
                    <div className="skel skel-name" />
                  </td>
                  <td>
                    <div className="skel skel-id" />
                  </td>
                  <td>
                    <div className="skel skel-count" />
                  </td>
                  <td>
                    <div className="skel skel-view" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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
