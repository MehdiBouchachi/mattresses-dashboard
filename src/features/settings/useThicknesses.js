import { useQuery } from "@tanstack/react-query";
import { getThicknesses } from "../../services/apiSettings";

export function useThicknesses() {
  const {
    isLoading,
    data: thicknesses,
    error,
  } = useQuery({
    queryKey: ["thicknesses"],
    queryFn: getThicknesses,
  });

  return { isLoading, thicknesses, error };
}
