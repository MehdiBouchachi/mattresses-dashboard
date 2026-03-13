import styled, { css } from "styled-components";

const statusStyles = {
  unconfirmed: css`
    background-color: var(--color-grey-200, #e5e7eb);
    color: var(--color-grey-700, #374151);
  `,
  confirmed: css`
    background-color: var(--color-blue-100, #dbeafe);
    color: var(--color-blue-700, #1d4ed8);
  `,
  in_delivering: css`
    background-color: var(--color-yellow-100, #fef3c7);
    color: var(--color-yellow-700, #b45309);
  `,
  delivered: css`
    background-color: var(--color-green-100, #dcfce7);
    color: var(--color-green-700, #15803d);
  `,
  cancelled: css`
    background-color: var(--color-red-100, #fee2e2);
    color: var(--color-red-700, #b91c1c);
  `,
};

const StyledBadge = styled.span`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  white-space: nowrap;

  ${(props) => statusStyles[props.status]}
`;

const statusLabels = {
  unconfirmed: "Unconfirmed",
  confirmed: "Confirmed",
  in_delivering: "In Delivering",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function OrderStatusBadge({ status }) {
  return (
    <StyledBadge status={status}>{statusLabels[status] || status}</StyledBadge>
  );
}

export default OrderStatusBadge;
