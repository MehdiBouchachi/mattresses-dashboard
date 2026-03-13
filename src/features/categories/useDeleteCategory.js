import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../services/apiCategories";
import toast from "react-hot-toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCategoryApi,

    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { deleteCategory, isDeleting };
}
