import styled from "styled-components";
import Heading from "../ui/Heading";
import OrdersTable from "../features/orders/OrdersTable";
import OrdersTableOperations from "../features/orders/OrdersTableOperations";
import { device } from "../styles/breakpoints";

const StyledOrders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media ${device.mobile} {
    gap: 1.6rem;
    /* Allow children (filter scroll) to bleed */
    overflow: visible;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  flex-wrap: wrap;

  @media ${device.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
    overflow: visible;
  }
`;

function Orders() {
  return (
    <StyledOrders>
      <Row>
        <Heading as="h1">All Orders</Heading>
        <OrdersTableOperations />
      </Row>

      <OrdersTable />
    </StyledOrders>
  );
}

export default Orders;
