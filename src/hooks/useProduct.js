import { useEffect, useState, useCallback } from "react";
import client from "@/api/client.js";
import { logger } from "@/lib/logger";
export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await client.get(`/products/${id}`, {
          signal: controller.signal,
        });

        if (!res.data || typeof res.data !== "object" || Array.isArray(res.data)) {
          throw new Error("Unexpected response shape");
        }

        setProduct(res.data);
      } catch (err) {
        if (controller.signal.aborted) return;
        logger.error(err);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [id, reloadKey]);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { product, isLoading, error, refetch };
}