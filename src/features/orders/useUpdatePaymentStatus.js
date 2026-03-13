import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaymentStatus as updatePaymentStatusApi } from "../../services/apiOrders";
import toast from "react-hot-toast";

export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  const { mutate: updatePaymentStatus, isLoading: isUpdating } = useMutation({
    mutationFn: ({ orderId, paymentStatus }) =>
      updatePaymentStatusApi(orderId, paymentStatus),

    onSuccess: (data, variables) => {
      toast.success(`Payment status updated to "${variables.paymentStatus}"`);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["order", String(variables.orderId)],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updatePaymentStatus, isUpdating };
}
