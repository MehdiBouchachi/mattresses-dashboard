import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThickness as createThicknessApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useCreateThickness() {
  const queryClient = useQueryClient();

  const { mutate: createThickness, isLoading: isCreating } = useMutation({
    mutationFn: createThicknessApi,
    onSuccess: () => {
      toast.success("Thickness successfully created");
      queryClient.invalidateQueries({ queryKey: ["thicknesses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createThickness, isCreating };
}
