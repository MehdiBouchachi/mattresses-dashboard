import styled, { css } from "styled-components";
import { device } from "../../styles/breakpoints";
import { useUpdatePaymentStatus } from "./useUpdatePaymentStatus";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  width: fit-content;

  @media ${device.mobile} {
    width: 100%;
  }
`;

const ToggleOption = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: capitalize;

  @media ${device.mobile} {
    flex: 1;
    padding: 1rem 1.2rem;
    font-size: 1.4rem;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${(props) =>
    props.$active &&
    props.$variant === "paid" &&
    css`
      background-color: var(--color-green-100, #dcfce7);
      color: var(--color-green-700, #15803d);
    `}

  ${(props) =>
    props.$active &&
    props.$variant === "pending" &&
    css`
      background-color: var(--color-yellow-100, #fef3c7);
      color: var(--color-yellow-700, #b45309);
    `}

  ${(props) =>
    !props.$active &&
    css`
      background-color: var(--color-grey-0);
      color: var(--color-grey-500);

      &:hover:not(:disabled) {
        background-color: var(--color-grey-50);
      }
    `}
`;

function PaymentStatusToggle({ orderId, currentPaymentStatus }) {
  const { updatePaymentStatus, isUpdating } = useUpdatePaymentStatus();

  function handleToggle(newStatus) {
    if (newStatus === currentPaymentStatus) return;
    updatePaymentStatus({ orderId, paymentStatus: newStatus });
  }

  return (
    <ToggleWrapper>
      <ToggleOption
        $active={currentPaymentStatus === "pending"}
        $variant="pending"
        onClick={() => handleToggle("pending")}
        disabled={isUpdating}
      >
        Pending
      </ToggleOption>
      <ToggleOption
        $active={currentPaymentStatus === "paid"}
        $variant="paid"
        onClick={() => handleToggle("paid")}
        disabled={isUpdating}
      >
        Paid
      </ToggleOption>
    </ToggleWrapper>
  );
}

export default PaymentStatusToggle;
