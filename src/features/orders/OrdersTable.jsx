import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import OrderRow from "./OrderRow";
import { useOrders } from "./useOrders";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const StyledEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function OrdersTable() {
  const { isLoading, orders, count } = useOrders();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!orders?.length) {
    const searchValue = searchParams.get("search")?.trim() || "";
    return (
      <StyledEmpty>
        {searchValue ? `No orders match "${searchValue}".` : "No orders found."}
      </StyledEmpty>
    );
  }

  // ── When searching, results aren't paginated server-side ──
  // ── so we paginate client-side ──
  const search = searchParams.get("search")?.trim() || "";
  const isSearching = search.length > 0;

  let displayOrders = orders;
  let totalCount = count;

  if (isSearching) {
    const currentPage = Number(searchParams.get("page")) || 1;
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    displayOrders = orders.slice(from, to);
    totalCount = orders.length;
  }

  return (
    <Menus>
      <Table columns="1.2fr 1.4fr 0.8fr 1fr 1.2fr 1fr 1fr 0.4fr">
        <Table.Header>
          <div>Order</div>
          <div>Customer</div>
          <div>Items</div>
          <div>Total</div>
          <div>Payment</div>
          <div>Status</div>
          <div>Date</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={displayOrders}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />

        <Table.Footer>
          <Pagination count={totalCount} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OrdersTable;
