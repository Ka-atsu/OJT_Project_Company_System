import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-document.css";

import { fetchAdminClients } from "./documents.services";

export default function AdminDocuments() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadClients = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchAdminClients();
      setClients(Array.isArray(data) ? data : []);
    } catch (e) {
      setClients([]);
      setError(
        e?.response?.data?.message || e?.message || "Failed to load clients.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return clients;
    return clients.filter((c) =>
      (c?.name ?? "").toLowerCase().includes(needle),
    );
  }, [clients, search]);

  const handleClientClick = (clientId) => {
    navigate(`/w/admin/clientDocuments/${clientId}`);
  };

  return (
    <div className="admin-documents">
      <h2 className="title">Manage Documents</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search clients..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="loading-text">Loading clients...</p>}
      {error && !loading && (
        <p className="loading-text">
          {error}{" "}
          <button
            type="button"
            className="dash-btn ghost"
            onClick={loadClients}
          >
            Retry
          </button>
        </p>
      )}

      {!loading && !error && filteredClients.length === 0 ? (
        <p className="loading-text">No clients found.</p>
      ) : (
        <div className="client-grid">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="client-card"
              onClick={() => handleClientClick(client.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="logo-placeholder">
                <span>LOGO</span>
              </div>
              <p className="client-name">{client.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
