import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DOC_TYPES_ALL,
  DATE_RANGES,
  toOptions,
  fetchClientDocumentsAdmin,
  uploadAdminDocument,
  deleteAdminDocument,
} from "../services/documents.services";

export default function useAdminClientDocuments() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  /* =======================
     Filters & Pagination
  ======================= */

  const [q, setQ] = useState("");
  const [type, setType] = useState("All Types");
  const [dateRange, setDateRange] = useState("All Time");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const limit = 6;

  const [docs, setDocs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  /* =======================
     Upload State
  ======================= */

  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedUploadType, setSelectedUploadType] = useState("Contract");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPdfUploaded, setIsPdfUploaded] = useState(false);

  /* =======================
     Options
  ======================= */

  const typeOptions = useMemo(() => toOptions(DOC_TYPES_ALL), []);
  const dateOptions = useMemo(() => toOptions(DATE_RANGES), []);

  const typeValue = useMemo(
    () => typeOptions.find((o) => o.value === type) || typeOptions[0],
    [typeOptions, type],
  );

  const dateValue = useMemo(
    () => dateOptions.find((o) => o.value === dateRange) || dateOptions[0],
    [dateOptions, dateRange],
  );

  /* =======================
     Fetch Documents
  ======================= */

  const loadDocs = async () => {
    if (!clientId) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetchClientDocumentsAdmin(clientId, {
        q,
        type,
        dateRange,
        sort,
        page,
        limit,
      });

      setDocs(Array.isArray(res?.data) ? res.data : []);
      setTotalPages(Number(res?.totalPages ?? 1));
      setTotal(Number(res?.total ?? 0));
    } catch (e) {
      setDocs([]);
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, [clientId, q, type, dateRange, sort, page, refreshKey]);

  /* =======================
     Actions
  ======================= */

  const toggleSort = () => {
    setSort((s) => (s === "newest" ? "oldest" : "newest"));
    setPage(1);
  };

  const handleUpdate = () => setRefreshKey((x) => x + 1);

  const onView = (doc) => {
    if (!doc?.fileUrl) return;
    window.open(doc.fileUrl, "_blank", "noopener,noreferrer");
  };

  const onDownload = (doc) => {
    if (!doc?.fileUrl) return;
    const a = document.createElement("a");
    a.href = doc.fileUrl;
    a.download = doc.name || "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const onDelete = async (doc) => {
    if (!doc?.id) return;

    const ok = window.confirm(`Delete "${doc.name}"?`);
    if (!ok) return;

    try {
      await deleteAdminDocument(doc.id);
      setRefreshKey((x) => x + 1);
    } catch {
      setError("Delete failed.");
    }
  };

  /* =======================
     Upload
  ======================= */

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
    setIsPdfUploaded(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setIsPdfUploaded(false);
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }

    setIsPdfUploaded(true);
    setSelectedFile(file);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("user_id", clientId);
      fd.append("type", selectedUploadType);
      fd.append("document_date", new Date().toISOString());
      fd.append("shared_by", "Admin");
      fd.append("file", selectedFile);

      await uploadAdminDocument(fd);

      setShowUploadModal(false);
      setSelectedFile(null);
      setSelectedUploadType("Contract");
      setPage(1);
      setRefreshKey((x) => x + 1);
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setIsPdfUploaded(false);
    setError("");
  };

  /* =======================
     Return
  ======================= */

  return {
    navigate,
    q,
    setQ,
    type,
    setType,
    dateRange,
    setDateRange,
    sort,
    toggleSort,
    page,
    setPage,
    docs,
    totalPages,
    total,
    loading,
    error,
    typeOptions,
    dateOptions,
    typeValue,
    dateValue,
    handleUpdate,
    loadDocs,

    // upload
    uploading,
    showUploadModal,
    selectedUploadType,
    setSelectedUploadType,
    selectedFile,
    isPdfUploaded,
    handleOpenUploadModal,
    handleFileChange,
    handleUploadSubmit,
    closeUploadModal,

    // actions
    onView,
    onDownload,
    onDelete,
  };
}
