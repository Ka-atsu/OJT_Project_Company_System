// frontend/src/pages/clientSide/Project/useClientProject.js
import { useEffect, useMemo, useRef, useState } from "react";
import { ClientProjectsService } from "./projects.service"; // Import the service for API calls

// Frontend-to-backend status mapping for filters (from the service)
export const projectFilters = ["All", "Active", "Completed", "On hold"];

export function useClientProjects({ limit = 6 } = {}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const abortRef = useRef(null);

  const pageProjects = useMemo(() => items, [items]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr("");

      const apiStatus = projectFiltersToApi(activeFilter);
      console.log("API Request - Sending Status:", apiStatus);

      try {
        const response = await ClientProjectsService.list({
          status: apiStatus,
          page,
          limit,
          signal: abortRef.current?.signal,
        });

        setItems(response.items);
        setTotalPages(response.totalPages);

        // Ensure page is within valid bounds if backend totalPages changed
        if (page > response.totalPages) setPage(response.totalPages);
      } catch (error) {
        if (error?.name === "AbortError") return;
        setErr(error?.message ?? "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup on component unmount or when the effect dependencies change
    return () => abortRef.current?.abort?.();
  }, [activeFilter, page, limit]);

  const handleFilter = (filter) => {
    console.log("Selected Filter:", filter); // Log the selected filter
    setActiveFilter(filter); // Update the filter
    setPage(1); // Reset to the first page when filter changes
  };

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  // Helper function to convert frontend filter status to backend-friendly status
 function projectFiltersToApi(status) {
   const statusMapping = {
     All: "all",
     Active: "active",
     Completed: "completed",
     "On hold": "on_hold", // Fixed the issue by matching frontend filter
   };
   const apiStatus = statusMapping[status] || "all"; // Default to "all" if no match
   console.log(`Active Filter: ${status} -> API Status: ${apiStatus}`); // Log activeFilter mapping
   return apiStatus;
 }

  return {
    // data
    activeFilter,
    page,
    totalPages,
    loading,
    err,
    pageProjects,
    selected,

    // actions
    setSelected,
    handleFilter,
    prevPage,
    nextPage,
  };
}

export function getStatusClass(status) {
  return String(status || "")
    .toLowerCase()
    .replace(/\s+/g, "-"); // Converts status to lowercase and replaces spaces with dashes
}
