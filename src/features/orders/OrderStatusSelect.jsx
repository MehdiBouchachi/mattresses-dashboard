import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  @media ${device.mobile} {
    width: 100%;
    padding: 1rem 1.2rem;
    font-size: 1.5rem;
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const STATUS_OPTIONS = [
  { value: "cancelled", label: "Cancelled" },
  { value: "unconfirmed", label: "Unconfirmed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_delivering", label: "In Delivering" },
  { value: "delivered", label: "Delivered" },
];

function OrderStatusSelect({ orderId, currentStatus }) {
  const { updateOrderStatus, isUpdating } = useUpdateOrderStatus();

  function handleChange(e) {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;
    updateOrderStatus({ orderId, status: newStatus });
  }

  return (
    <StyledSelect
      value={currentStatus}
      onChange={handleChange}
      disabled={isUpdating}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default OrderStatusSelect;
