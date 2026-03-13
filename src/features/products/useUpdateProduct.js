// hooks/useUpdateProduct.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProduct, id }) => createEditProduct(newProduct, id),
    onSuccess: () => {
      toast.success("Product successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editProduct, isEditing };
}
