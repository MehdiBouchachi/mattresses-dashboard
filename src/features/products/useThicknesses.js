// hooks/useThicknesses.js
import { useQuery } from "@tanstack/react-query";
import { getThicknesses } from "../../services/apiCategories";

export function useThicknesses() {
  const {
    isLoading,
    data: thicknesses = [],
    error,
  } = useQuery({
    queryKey: ["thicknesses"],
    queryFn: getThicknesses,
  });

  return { isLoading, thicknesses, error };
}
