import { products } from "../../data/data-products";

export function useProducts() {
  return {
    isLoading: false,
    products,
  };
}
