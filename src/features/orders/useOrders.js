import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, searchOrders } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // ── Filter ──
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // ── Sort ──
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // ── Search ──
  const search = searchParams.get("search")?.trim() || "";

  // ── Pagination ──
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // ── Determine which function to call ──
  const isSearching = search.length > 0;

  // ── Query ──
  const {
    isLoading,
    data: { data: orders, count } = {},
    error,
  } = useQuery({
    queryKey: ["orders", filter, sortBy, page, search],
    queryFn: () => {
      if (isSearching) {
        return searchOrders({ search, filter, sortBy });
      }
      return getOrders({ filter, sortBy, page, search: "" });
    },
  });

  // ── Prefetching (only when NOT searching) ──
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (!isSearching && page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, sortBy, page + 1, search],
      queryFn: () => getOrders({ filter, sortBy, page: page + 1, search: "" }),
    });
  }

  if (!isSearching && page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, sortBy, page - 1, search],
      queryFn: () => getOrders({ filter, sortBy, page: page - 1, search: "" }),
    });
  }

  return { isLoading, orders, error, count };
}
