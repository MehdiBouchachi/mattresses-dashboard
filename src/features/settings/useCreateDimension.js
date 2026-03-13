import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDimension as createDimensionApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useCreateDimension() {
  const queryClient = useQueryClient();

  const { mutate: createDimension, isLoading: isCreating } = useMutation({
    mutationFn: createDimensionApi,
    onSuccess: () => {
      toast.success("Dimension successfully created");
      queryClient.invalidateQueries({ queryKey: ["dimensions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createDimension, isCreating };
}
