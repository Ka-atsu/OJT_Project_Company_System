import { useCallback, useEffect, useMemo, useState } from "react";
import api, { csrf } from "../../../api/api";

const DOC_TYPES = ["All Types", "Contract", "Purchase Order", "Report", "Plan"];
const DATE_RANGES = ["Last 3 Months", "Last 6 Months", "This Year", "All Time"];
const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

export function useClientDocuments({ pageSize = 6 } = {}) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All Types");
  const [dateRange, setDateRange] = useState("Last 3 Months");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = pageSize;

  const [docs, setDocs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    csrf().catch(() => {});
  }, []);

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

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/api/documents", {
        params: { q, type, dateRange, sort, page, limit },
      });

      const json = res.data;

      setDocs(Array.isArray(json?.data) ? json.data : []);
      setTotalPages(Number(json?.totalPages ?? 1));
      setTotal(Number(json?.total ?? 0));

      if (json?.page && Number(json.page) !== page) {
        setPage(Number(json.page));
      }
    } catch (e) {
      setDocs([]);
      setTotalPages(1);
      setTotal(0);

      setError(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }, [q, type, dateRange, sort, page, limit]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const onSearchChange = (value) => {
    setQ(value);
    setPage(1);
  };

  const onTypeChange = (value) => {
    setType(value ?? "All Types");
    setPage(1);
  };

  const onDateRangeChange = (value) => {
    setDateRange(value ?? "Last 3 Months");
    setPage(1);
  };

  const toggleSort = () => {
    setSort((s) => (s === "newest" ? "oldest" : "newest"));
    setPage(1);
  };

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return {
    docs,
    totalPages,
    total,
    q,
    type,
    dateRange,
    sort,
    page,
    limit,
    typeOptions,
    dateOptions,
    typeValue,
    dateValue,
    loading,
    error,
    setPage,
    onSearchChange,
    onTypeChange,
    onDateRangeChange,
    toggleSort,
    goPrev,
    goNext,
    refetch: fetchDocs,
  };
}
