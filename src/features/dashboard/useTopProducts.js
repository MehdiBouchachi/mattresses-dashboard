import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../services/apiDashboard";

export function useTopProducts(days, limit = 5) {
  const {
    isLoading,
    data: topProducts,
    error,
  } = useQuery({
    queryKey: ["top-products", days, limit],
    queryFn: () => getTopProducts(days, limit),
  });

  return { isLoading, topProducts, error };
}
