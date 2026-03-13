import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";

export function useProduct(id) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return { product, isLoading, error };
}
