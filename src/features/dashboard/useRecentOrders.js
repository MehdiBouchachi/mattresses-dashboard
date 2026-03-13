import { useQuery } from "@tanstack/react-query";
import { getRecentOrders } from "../../services/apiDashboard";

export function useRecentOrders(days, limit = 10) {
  const {
    isLoading,
    data: recentOrders,
    error,
  } = useQuery({
    queryKey: ["recent-orders", days, limit],
    queryFn: () => getRecentOrders(days, limit),
  });

  return { isLoading, recentOrders, error };
}
