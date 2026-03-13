import { useQuery } from "@tanstack/react-query";
import { getRevenueChart } from "../../services/apiDashboard";

export function useRevenueChart(days) {
  const {
    isLoading,
    data: revenueData,
    error,
  } = useQuery({
    queryKey: ["revenue-chart", days],
    queryFn: () => getRevenueChart(days),
  });

  return { isLoading, revenueData, error };
}
