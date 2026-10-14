import { useEffect, useState, useCallback } from "react";
import client from "@/api/client.js";
import { logger } from "@/lib/logger";
const ALL_OPTION = { slug: "all", name: "All" };

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await client.get("/products/categories", {
          signal: controller.signal,  
        });
  if (!Array.isArray(res.data)) {
          throw new Error("Unexpected response shape");
        }

        setCategories([ALL_OPTION, ...res.data]);
      } catch (err) {
         if (controller.signal.aborted) return;
        setError(err);
        logger.error(err);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();

    return () => {
      controller.abort(); // Abort the fetch if the component unmounts
    };
  }, [reloadKey]);

  const refetch = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  return { categories, isLoading, error, refetch };
}