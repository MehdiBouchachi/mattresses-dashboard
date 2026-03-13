import { useQuery } from "@tanstack/react-query";
import { getOrderStatusStats } from "../../services/apiDashboard";

export function useOrderStatusStats(days) {
    
  const {
    isLoading,
    data: statusData,
    error,
  } = useQuery({
    queryKey: ["order-status-stats", days],
    queryFn: () => getOrderStatusStats(days),
  });

  return { isLoading, statusData, error };
}
