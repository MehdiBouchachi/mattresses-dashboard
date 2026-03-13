import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,

    onSuccess: () => {
      toast.success("Product deleted");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}
