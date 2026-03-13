import { useQuery } from "@tanstack/react-query";
import { getDimensions } from "../../services/apiSettings";

export function useDimensions() {
  const {
    isLoading,
    data: dimensions,
    error,
  } = useQuery({
    queryKey: ["dimensions"],
    queryFn: getDimensions,
  });

  return { isLoading, dimensions, error };
}
