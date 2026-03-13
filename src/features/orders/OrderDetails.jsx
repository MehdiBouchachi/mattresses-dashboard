import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiArrowLeft } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderStatusSelect from "./OrderStatusSelect";
import OrderCustomerCard from "./OrderCustomerCard";
import OrderShippingCard from "./OrderShippingCard";
import OrderItemsTable from "./OrderItemsTable";
import OrderSummaryCard from "./OrderSummaryCard";
import PaymentStatusToggle from "./PaymentStatusToggle";
import { useOrder } from "./useOrder";
import { device } from "../../styles/breakpoints";

const StyledOrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  flex-wrap: wrap;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media ${device.mobile} {
    width: 100%;
    flex-direction: column;
  }
`;

const OrderMeta = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-brand-600);
  cursor: pointer;
  padding: 0.4rem 0;
  transition: color 0.2s;

  &:hover {
    color: var(--color-brand-700);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;

const PaymentInfo = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
  }
`;

const PaymentTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentLabel = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PaymentValue = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  text-transform: capitalize;
`;

function formatPaymentMethod(method) {
  if (!method) return "—";
  return method.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function OrderDetails() {
  const { isLoading, order, orderId } = useOrder();
  const navigate = useNavigate();

  if (!orderId) return null;
  if (isLoading) return <Spinner />;
  if (!order) return <p>Order not found.</p>;

  const {
    id,
    order_code,
    status,
    created_at,
    order_customer,
    order_shipping,
    order_payment,
    order_summary,
    order_items,
  } = order;

  // Normalize related data (Supabase can return array or object)
  const customer = Array.isArray(order_customer)
    ? order_customer[0]
    : order_customer;
  const shipping = Array.isArray(order_shipping)
    ? order_shipping[0]
    : order_shipping;
  const payment = Array.isArray(order_payment)
    ? order_payment[0]
    : order_payment;
  const summary = Array.isArray(order_summary)
    ? order_summary[0]
    : order_summary;
  const items = Array.isArray(order_items) ? order_items : [];

  return (
    <StyledOrderDetails>
      {/* Back link */}
      <BackButton onClick={() => navigate("/orders")}>
        <HiArrowLeft />
        Back to orders
      </BackButton>

      {/* Header */}
      <Header>
        <HeaderLeft>
          <Heading as="h1">Order {order_code}</Heading>
          <OrderStatusBadge status={status} />
          <OrderMeta>
            Placed on {format(new Date(created_at), "MMM d yyyy")}
          </OrderMeta>
        </HeaderLeft>

        <HeaderRight>
          <OrderStatusSelect orderId={id} currentStatus={status} />
        </HeaderRight>
      </Header>

      {/* Customer & Shipping */}
      <CardsGrid>
        <OrderCustomerCard customer={customer} />
        <OrderShippingCard shipping={shipping} />
      </CardsGrid>

      {/* Payment Info — now with toggle */}
      {payment && (
        <PaymentInfo>
          <PaymentTitle>Payment</PaymentTitle>
          <PaymentRow>
            <PaymentLabel>Method</PaymentLabel>
            <PaymentValue>{formatPaymentMethod(payment.method)}</PaymentValue>
          </PaymentRow>
          <PaymentRow>
            <PaymentLabel>Status</PaymentLabel>
            <PaymentStatusToggle
              orderId={id}
              currentPaymentStatus={payment.status || "pending"}
            />
          </PaymentRow>
        </PaymentInfo>
      )}

      {/* Items Table */}
      <OrderItemsTable items={items} />

      {/* Summary */}
      <OrderSummaryCard summary={summary} />
    </StyledOrderDetails>
  );
}

export default OrderDetails;
