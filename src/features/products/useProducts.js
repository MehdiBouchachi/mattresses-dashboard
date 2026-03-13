import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/apiProducts";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("category_id") || "all";

  const {
    isLoading,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Client-side filtering
  const filteredProducts =
    filterValue === "all"
      ? products
      : products.filter((p) => p.categoryValue === filterValue);

  return { isLoading, products: filteredProducts, error };
}
