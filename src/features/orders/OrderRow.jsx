import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import OrderStatusBadge from "./OrderStatusBadge";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi2";
import { format } from "date-fns";

const OrderCode = styled.span`
  font-family: "Sono", monospace;
  font-weight: 600;
  color: var(--color-grey-600);
  font-size: 1.4rem;
`;

const Customer = styled.span`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Items = styled.span`
  font-weight: 500;
  color: var(--color-grey-500);
`;

const Amount = styled.span`
  font-family: "Sono", monospace;
  font-weight: 600;
`;

const Payment = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
  color: var(--color-grey-500);
`;

const DateCell = styled.span`
  color: var(--color-grey-500);
  font-size: 1.3rem;
`;

function formatCurrency(value) {
  return new Intl.NumberFormat("fr-DZ").format(value) + " DA";
}

function formatPaymentMethod(method) {
  if (!method) return "—";
  return method.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function OrderRow({ order }) {
  const navigate = useNavigate();

  const {
    id,
    order_code,
    status,
    created_at,
    order_summary,
    order_customer,
    order_payment,
  } = order;

  // Supabase returns related data as arrays or objects depending on the relationship
  const summary = Array.isArray(order_summary)
    ? order_summary[0]
    : order_summary;
  const customer = Array.isArray(order_customer)
    ? order_customer[0]
    : order_customer;
  const payment = Array.isArray(order_payment)
    ? order_payment[0]
    : order_payment;

  return (
    <Table.Row>
      <OrderCode>{order_code}</OrderCode>

      <Customer>
        {customer?.first_name} {customer?.last_name}
      </Customer>

      <Items>{summary?.items_count || 0} items</Items>

      <Amount>{formatCurrency(summary?.total_price || 0)}</Amount>

      <Payment>{formatPaymentMethod(payment?.method)}</Payment>

      <OrderStatusBadge status={status} />

      <DateCell>{format(new Date(created_at), "MMM d yyyy")}</DateCell>

      <Menus.Menu>
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/orders/${id}`)}
          >
            View
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default OrderRow;
