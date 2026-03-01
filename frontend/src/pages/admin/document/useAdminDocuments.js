import { useEffect, useMemo, useState, useRef } from "react";
import { fetchAdminClients } from "./documents.services";

export default function useAdminDocuments() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abortRef = useRef(null);

  const totalDocuments = useMemo(() => {
    return clients.reduce((sum, c) => sum + (c.documents_count ?? 0), 0);
  }, [clients]);

  const loadClients = async () => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const res = await fetchAdminClients(
        { q: search, page, limit },
        controller.signal,
      );

      setClients(Array.isArray(res?.data) ? res.data : []);
      setTotalPages(Number(res?.totalPages ?? 1));
      setTotal(Number(res?.total ?? 0));
    } catch (e) {
      if (e.name === "AbortError") return;
      setClients([]);
      setError("Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
    return () => abortRef.current?.abort?.();
  }, [search, page]);

  return {
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
  };
}
