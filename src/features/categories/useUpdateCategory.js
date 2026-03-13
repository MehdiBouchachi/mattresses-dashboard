import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory as updateCategoryApi } from "../../services/apiCategories";
import toast from "react-hot-toast";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, updatedFields }) => updateCategoryApi(id, updatedFields),

    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateCategory, isUpdating };
}
