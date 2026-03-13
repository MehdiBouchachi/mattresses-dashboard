import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../services/apiSettings";

export function useSetting(key) {
  const {
    isLoading,
    data: setting,
    error,
  } = useQuery({
    queryKey: ["setting", key],
    queryFn: () => getSetting(key),
  });

  return { isLoading, setting, error };
}
