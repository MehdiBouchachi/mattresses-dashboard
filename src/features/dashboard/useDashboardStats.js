import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../services/apiDashboard";

export function useDashboardStats(days) {
  const {
    isLoading,
    data: stats,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats", days],
    queryFn: () => getDashboardStats(days),
  });

  return { isLoading, stats, error };
}
