import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteThickness as deleteThicknessApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useDeleteThickness() {
  const queryClient = useQueryClient();

  const { mutate: deleteThickness, isLoading: isDeleting } = useMutation({
    mutationFn: deleteThicknessApi,
    onSuccess: () => {
      toast.success("Thickness successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["thicknesses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteThickness, isDeleting };
}
