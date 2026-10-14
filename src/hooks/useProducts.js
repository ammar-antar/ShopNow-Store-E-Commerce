import { useEffect, useState, useCallback } from "react";
import client from "@/api/client.js";
import { logger } from "@/lib/logger";
const FETCH_ALL = 0;

export default function useProducts({ category, q } = {}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        let endpoint = "/products";
        if (category && category !== "all") endpoint = `/products/category/${category}`;
        else if (q) endpoint = "/products/search";

        const params = { limit: FETCH_ALL };
        if (q) params.q = q;

        const res = await client.get(endpoint, {
          params,
          signal: controller.signal,
        });

        if (!Array.isArray(res.data?.products)) {
          throw new Error("Unexpected response shape");
        }

        setProducts(res.data.products);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err);
        logger.error(err);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [category, q, reloadKey]);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { products, isLoading, error, refetch };
}