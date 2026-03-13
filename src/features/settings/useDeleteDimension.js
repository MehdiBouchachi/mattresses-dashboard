import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDimension as deleteDimensionApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useDeleteDimension() {
  const queryClient = useQueryClient();

  const { mutate: deleteDimension, isLoading: isDeleting } = useMutation({
    mutationFn: deleteDimensionApi,
    onSuccess: () => {
      toast.success("Dimension successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["dimensions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteDimension, isDeleting };
}
