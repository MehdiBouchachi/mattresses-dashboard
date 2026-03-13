import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import DashboardCard from "./DashboardCard";
import { useRecentOrders } from "./useRecentOrders";
import { useDarkMode } from "../../context/DarkModeContext";
import { device } from "../../styles/breakpoints";

const TableHeader = styled.div`
  margin-bottom: 2rem;

  @media ${device.mobile} {
    margin-bottom: 1.2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem 1.2rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--color-grey-500);
  white-space: nowrap;

  @media ${device.mobile} {
    padding: 0.8rem 0.6rem;
    font-size: 1rem;
  }
`;

const Td = styled.td`
  padding: 1rem 1.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.3rem;
  color: var(--color-grey-700);
  white-space: nowrap;

  @media ${device.mobile} {
    padding: 0.8rem 0.6rem;
    font-size: 1.1rem;
  }
`;

const Tr = styled.tr`
  cursor: pointer;

  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 10rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};

  @media ${device.mobile} {
    padding: 0.2rem 0.6rem;
    font-size: 1rem;
  }
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media ${device.mobile} {
    margin: 0 -1.6rem;
    padding: 0 1.6rem;
  }
`;

const NoData = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
  padding: 4rem 0;
`;

const HideMobile = styled.span`
  @media ${device.mobile} {
    display: none;
  }
`;

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US").format(value) + " DA";
}

function formatStatus(status) {
  return status?.replace(/_/g, " ");
}

function RecentOrders({ days }) {
  const { isLoading, recentOrders } = useRecentOrders(days);
  const { chartColors } = useDarkMode();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const hasData = recentOrders?.length > 0;

  function getStatusStyle(status) {
    const map = {
      unconfirmed: {
        bg: chartColors.yellow100,
        text: chartColors.yellow700,
      },
      confirmed: {
        bg: chartColors.blue100,
        text: chartColors.blue700,
      },
      in_delivering: {
        bg: chartColors.orange100,
        text: chartColors.orange600,
      },
      delivered: {
        bg: chartColors.green100,
        text: chartColors.green700,
      },
    };
    return (
      map[status] || { bg: chartColors.progressTrack, text: chartColors.text }
    );
  }

  return (
    <DashboardCard>
      <TableHeader>
        <Heading as="h3">Recent Orders</Heading>
      </TableHeader>

      {!hasData ? (
        <NoData>No orders in this period.</NoData>
      ) : (
        <ScrollWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Order</Th>
                <Th>Customer</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <HideMobile as={Th}>Date</HideMobile>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const customerName = order.customer
                  ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim()
                  : "—";

                const totalPrice = order.summary?.total_price || 0;
                const statusStyle = getStatusStyle(order.status);

                return (
                  <Tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <Td style={{ fontWeight: 600 }}>#{order.order_code}</Td>
                    <Td>{customerName || "—"}</Td>
                    <Td>{formatCurrency(totalPrice)}</Td>
                    <Td>
                      <StatusBadge
                        $bgColor={statusStyle.bg}
                        $textColor={statusStyle.text}
                      >
                        {formatStatus(order.status)}
                      </StatusBadge>
                    </Td>
                    <HideMobile as={Td}>
                      {formatDate(order.created_at)}
                    </HideMobile>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        </ScrollWrapper>
      )}
    </DashboardCard>
  );
}

export default RecentOrders;
