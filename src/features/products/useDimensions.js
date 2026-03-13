// hooks/useDimensions.js
import { useQuery } from "@tanstack/react-query";
import { getDimensions } from "../../services/apiCategories";

export function useDimensions() {
  const {
    isLoading,
    data: dimensions = [],
    error,
  } = useQuery({
    queryKey: ["dimensions"],
    queryFn: getDimensions,
  });

  return { isLoading, dimensions, error };
}
