import { useCallback, useEffect, useRef, useState } from "react";
import { createSupabaseClient } from "./client";

const supabase = createSupabaseClient();

export function useSupabase<
  T extends (client: ReturnType<typeof createSupabaseClient>) => any
>(queryFn: T, options?: { disabled?: boolean }) {
  const queryFnRef = useRef(queryFn);
  const [result, setResult] = useState<Awaited<ReturnType<T>>>();

  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const fetchQuery = useCallback(async () => {
    if (options?.disabled) return;
    try {
      const result = await queryFnRef.current(supabase);
      setResult(result);
    } catch (error) {
      console.log(error);
    }
  }, [options?.disabled]);

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery]);

  return { query: result, refetch: fetchQuery };
}
