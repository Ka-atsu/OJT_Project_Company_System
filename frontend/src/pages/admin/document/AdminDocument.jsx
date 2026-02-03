import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-document.css";

const DEFAULT_CLIENTS = [
  { id: 1, name: "Cliberduche Corporation" },
  { id: 2, name: "Northbridge Solutions" },
  { id: 3, name: "Aurelius Tech Group" },
  { id: 4, name: "Vertex Industries" },
  { id: 5, name: "Bluehaven Enterprise" },
  { id: 6, name: "Ironclad Systems" },
  { id: 7, name: "Silverline Holdings" },
  { id: 8, name: "Pinnacle Works" },
  { id: 9, name: "Evercrest Corporation" },
];

export default function AdminDocuments() {
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/documents/clients"
      );
      if (!response.ok) throw new Error("API not ready");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) setClients(data);
      else setClients(DEFAULT_CLIENTS);
    } catch (error) {
      console.warn("Using fallback client data:", error.message);
      setClients(DEFAULT_CLIENTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

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
    </div>
  );
}
