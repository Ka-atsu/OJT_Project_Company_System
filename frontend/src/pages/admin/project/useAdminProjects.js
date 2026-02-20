import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectsService } from "./projects.services";

// ------------------ UTILITY FUNCTIONS ------------------

// Calculate progress from milestones
function calcProgressFromMilestones(milestones) {
  const list = Array.isArray(milestones) ? milestones : [];
  const total = list.length; // Total number of milestones
  if (total === 0) return 0; // No milestones, so return 0 progress
  const done = list.filter((m) => m.status === "done").length; // Count the "done" milestones
  return Math.round((done / total) * 100); // Calculate progress percentage
}

// ------------------ EMPTY PROJECT ------------------
// Function to return an empty draft project with default values
export function emptyProject() {
  return {
    name: "",
    clientName: "",
    startDate: "",
    dueDate: "",
    status: "active", // Default status is "active"
    milestones: [], // Empty array of milestones
    photos: [], // Empty array of photos
  };
}

export default function useAdminProjects() {
  // ------------------ STATE MANAGEMENT ------------------

  // State to store the list of clients
  const [clients, setClients] = useState([]);

  // State for filters and pagination
  const [status, setStatus] = useState("active");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("due_asc");
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);

  // State for storing fetched projects and total count
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // State for tracking the selected project
  const [selectedId, setSelectedId] = useState(null);

  // State to track if we are creating a new project
  const [isCreating, setIsCreating] = useState(false);

  // State for client search query
  const [clientQuery, setClientQuery] = useState("");

  // Memoized value to get the selected project based on its ID
  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId],
  );

  // State for the project draft (used when creating or editing a project)
  const [draft, setDraft] = useState(emptyProject());

  // Reference to cancel the API request if needed (abort controller)
  const abortRef = useRef(null);

  // Pagination calculation
  const pageCount = Math.max(1, Math.ceil(total / pageSize)); // Total page count
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1; // From which item number is being shown
  const to = Math.min(total, page * pageSize); // To which item number is being shown

  // ------------------ CLIENT SEARCH ------------------
  // Memoized list of clients based on the search query
  const filteredClients = useMemo(() => {
    if (!clientQuery.trim()) return clients; // If no query, return all clients

    const q = clientQuery.trim().toLowerCase(); // Normalize search query to lowercase
    console.log("Client Query:", q); // Log the query

    // Filter clients based on name or email
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(q) ||
        client.email?.toLowerCase().includes(q),
    );

    console.log("Filtered Clients:", filtered); // Log filtered results for debugging

    return filtered;
  }, [clients, clientQuery]);

  const onNext = () => {
    setPage((p) => Math.min(pageCount, p + 1));
  };

  const onPrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  // Define the "showing" variable for the UI, based on whether we're creating a new project or selecting one
  const showing = isCreating
    ? "New project"
    : selected
      ? selected.id
      : "Select a project";

  // ------------------ EFFECT HOOKS ------------------

  // Reset the page when any of the filter settings change
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [status, q, sort, pageSize]);

  // Fetch the list of clients when the component is mounted
  useEffect(() => {
    const controller = new AbortController();
    const fetchClients = async () => {
      try {
        setLoading(true);
        setErr(""); // Clear previous errors

        const clientsData = await ProjectsService.clients(controller.signal); // Fetch clients
        console.log("Fetched clients:", clientsData); // Log fetched clients for debugging

        // Only update the state if the request hasn't been aborted
        if (!controller.signal.aborted) {
          setClients(clientsData); // Update clients state
        }
      } catch (err) {
        // Handle errors
        if (err.name !== "AbortError") {
          console.error("Error fetching clients:", err);
          setErr("Error fetching clients");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchClients(); // Call the function to fetch clients

    return () => {
      controller.abort(); // Abort request if component unmounts
    };
  }, []);

  // This effect logs when the clients state is updated
  useEffect(() => {
    console.log("Clients state updated:", clients);
  }, [clients]);

  // This effect logs when the client query is updated
  useEffect(() => {
    console.log("Client Query Updated:", clientQuery);
  }, [clientQuery]);

  // Fetch the list of projects based on filters and pagination
  useEffect(() => {
    abortRef.current?.abort?.(); // Cancel previous requests
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setErr("");

    // Fetch the project list
    ProjectsService.list(
      { page, limit: pageSize, status, q, sort },
      controller.signal,
    )
      .then(({ items: nextItems, total: nextTotal }) => {
        setItems(nextItems); // Update project list
        setTotal(nextTotal); // Update total project count

        // If no project is selected and a new project is created, select the first project
        if (!isCreating && !selectedId && nextItems[0])
          setSelectedId(nextItems[0].id);
      })
      .catch((e) => {
        if (
          e?.name === "AbortError" ||
          e?.message === "canceled" ||
          e?.code === "ERR_CANCELED"
        ) {
          return; // ignore canceled requests
        }

        setErr(e?.message ?? "Failed to load projects");
      })
      .finally(() => setLoading(false)); // Stop loading after the request

    return () => controller.abort(); // Abort the request on cleanup
  }, [page, pageSize, status, q, sort, isCreating]);

  // Update the draft state when the selected project changes
  useEffect(() => {
    if (!selected || isCreating) return; // Only update if not creating a new project

    const milestones = Array.isArray(selected.milestones)
      ? selected.milestones
      : []; // Extract milestones

    setDraft({
      ...selected,
      budget: String(selected.budget ?? ""),
      milestones,
      photos: [], // Clear photos when editing
      progress: calcProgressFromMilestones(milestones), // Recalculate progress based on milestones
    });

    setClientQuery(""); // Clear the client search query after selecting a project
  }, [selected, isCreating]);

  // ------------------ HANDLERS ------------------

  // Start the creation of a new project
  const startCreate = () => {
    setIsCreating(true);
    setSelectedId(null); // Deselect any selected project
    setDraft(emptyProject()); // Reset the draft to empty project
  };

  // Cancel project creation and re-select the first project
  function cancelCreate() {
    setIsCreating(false);
    if (items[0]) setSelectedId(items[0].id); // Select the first project if available
  }

  // Apply the selected client to the draft
  function applyClient(clientId) {
    const c = clients.find((x) => String(x.id) === String(clientId));

    console.log("Selected client:", c); // Log selected client

    setDraft((d) => ({
      ...d,
      clientId,
      clientName: c?.name ?? "",
      clientEmail: c?.email ?? "",
    }));

    setClientQuery(""); // Reset client search query after applying
    console.log("Updated client query:", ""); // Log the query reset
  }

  // Save the current project (create or update)
  async function saveProject() {
    if (!draft.name.trim()) return alert("Project name is required."); // Validate project name
    console.log("SENDING TO BACKEND:", draft);

    try {
      setLoading(true);
      setErr("");

      const payloadDraft = {
        ...draft,
        progress: calcProgressFromMilestones(draft.milestones), // Recalculate progress
      };

      if (isCreating) {
        const created = await ProjectsService.create(payloadDraft); // Create project
        setIsCreating(false);
        setPage(1);
        if (created?.id) setSelectedId(created.id); // Select the newly created project
        return;
      }

      const updated = await ProjectsService.update(
        payloadDraft.id,
        payloadDraft,
      ); // Update project

      if (updated?.id) {
        setItems(
          (prev) => prev.map((p) => (p.id === updated.id ? updated : p)), // Update project in the list
        );
      }
    } catch (e) {
      setErr(e?.message ?? "Save failed");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // Add a new milestone to the project
  function addMilestone() {
    const id = `MS-${Date.now()}`; // Unique ID for the new milestone
    setDraft((d) => {
      const milestones = [
        ...(d.milestones || []),
        { id, title: "New milestone", due: "", status: "todo" },
      ];
      return {
        ...d,
        milestones,
        progress: calcProgressFromMilestones(milestones), // Recalculate progress
      };
    });
  }

  // Update an existing milestone in the project
  function updateMilestone(msId, patch) {
    setDraft((d) => {
      const milestones = (d.milestones || []).map(
        (m) => (m.id === msId ? { ...m, ...patch } : m), // Update milestone with patch
      );
      return {
        ...d,
        milestones,
        progress: calcProgressFromMilestones(milestones), // Recalculate progress
      };
    });
  }

  // Remove a milestone from the project
  function removeMilestone(msId) {
    setDraft((d) => {
      const milestones = (d.milestones || []).filter((m) => m.id !== msId); // Filter out the milestone to remove
      return {
        ...d,
        milestones,
        progress: calcProgressFromMilestones(milestones), // Recalculate progress
      };
    });
  }

  // ------------------ RETURN VALUES ------------------
  return {
    clients,
    items,
    setItems,
    total,
    loading,
    err,
    selectedId,
    isCreating,
    selected,
    draft,

    status,
    setStatus,
    q,
    setQ,
    sort,
    setSort,
    pageSize,
    setPageSize,
    page,
    setPage,
    pageCount,
    from,
    to,
    showing,

    startCreate,
    cancelCreate,
    applyClient,
    saveProject,
    addMilestone,
    updateMilestone,
    removeMilestone,
    setIsCreating,
    setSelectedId,
    setDraft,

    onNext,
    onPrev,

    clientQuery,
    setClientQuery,
    filteredClients,
  };
}
