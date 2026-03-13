import styled from "styled-components";
import OrderDetails from "../features/orders/OrderDetails";
const StyledOrders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
function OrdersDetails() {
  return (
    <StyledOrders>
      <OrderDetails />
    </StyledOrders>
  );
}

export default OrdersDetails;
