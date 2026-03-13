import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateOrderStatus as updateOrderStatusApi,
  updatePaymentStatus as updatePaymentStatusApi,
} from "../../services/apiOrders";
import toast from "react-hot-toast";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateOrderStatus, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ orderId, status, paymentStatus }) => {
      // 1) Update order status
      const orderData = await updateOrderStatusApi(orderId, status);

      // 2) If delivered → automatically mark payment as "paid"
      if (paymentStatus) {
        await updatePaymentStatusApi(orderId, paymentStatus);
      }

      return orderData;
    },

    onSuccess: (data) => {
      toast.success(`Order status updated to "${data.status}"`);

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["order", String(data.id)],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateOrderStatus, isUpdating };
}
