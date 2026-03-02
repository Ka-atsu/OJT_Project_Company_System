import { useEffect, useState } from "react";
import { ClientProjectsService } from "./projects.service";

export function useShowcaseProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let abort = new AbortController();

    const fetchProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await ClientProjectsService.showcase({
          signal: abort.signal,
        });
        setProjects(data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError("Failed to load featured projects");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => abort.abort();
  }, []);

  return { projects, loading, error };
}
