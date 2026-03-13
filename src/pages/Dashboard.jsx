import styled from "styled-components";
import Heading from "../ui/Heading";
import RevenueChart from "../features/dashboard/RevenueChart";
import OrdersStatusChart from "../features/dashboard/OrdersStatusChart";
import TopProductsChart from "../features/dashboard/TopProductsChart";
import RecentOrders from "../features/dashboard/RecentOrders";
import { device } from "../styles/breakpoints";
import StatsCards from "../features/dashboard/StatsCards";
import DashboardDateFilter from "../features/dashboard/DashboardDateFilter";
import { useState } from "react";
const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;
function Dashboard() {
  const [days, setDays] = useState(30);
  return (
    <StyledDashboardLayout>
      <HeaderRow>
        <Heading as="h1">Dashboard</Heading>
        <DashboardDateFilter activeDays={days} onFilterChange={setDays} />
      </HeaderRow>

      <StatsCards days={days} />

      <ChartsGrid>
        <RevenueChart days={days} />
        <OrdersStatusChart days={days} />
      </ChartsGrid>

      <ChartsGrid>
        <TopProductsChart days={days} />
        <RecentOrders days={days} />
      </ChartsGrid>
    </StyledDashboardLayout>
  );
}

export default Dashboard;
