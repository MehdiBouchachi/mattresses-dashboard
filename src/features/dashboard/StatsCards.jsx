import styled from "styled-components";
import {
  HiOutlineShoppingCart,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import { useDashboardStats } from "./useDashboardStats";
import { useDarkMode } from "../../context/DarkModeContext";
import { device } from "../../styles/breakpoints";

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
  }

  @media ${device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
`;

const StatCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2rem 2.4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.6rem 1rem;
    gap: 0.8rem;
  }
`;

const IconBox = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${(props) => props.$bgColor};

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: ${(props) => props.$iconColor};
  }

  @media ${device.mobile} {
    width: 4.2rem;
    height: 4.2rem;

    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  @media ${device.mobile} {
    align-items: center;
    gap: 0.4rem;
  }
`;

const StatLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--color-grey-500);

  @media ${device.mobile} {
    font-size: 1rem;
    letter-spacing: 0.2px;
  }
`;

const StatValue = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-800);
  line-height: 1;

  @media ${device.mobile} {
    font-size: 1.5rem;
  }
`;

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US").format(value) + " DA";
}

function StatsCards({ days }) {
  const { isLoading, stats } = useDashboardStats(days);
  const { chartColors } = useDarkMode();

  if (isLoading) return <Spinner />;
  if (!stats) return null;

  const cards = [
    {
      label: "Total Orders",
      value: stats.totalOrders,
      bgColor: chartColors.blue100,
      iconColor: chartColors.blue700,
      icon: <HiOutlineShoppingCart />,
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      bgColor: chartColors.green100,
      iconColor: chartColors.green700,
      icon: <HiOutlineBanknotes />,
    },
    {
      label: "Avg Order Value",
      value: formatCurrency(stats.avgOrderValue),
      bgColor: chartColors.yellow100,
      iconColor: chartColors.yellow700,
      icon: <HiOutlineChartBar />,
    },
    {
      label: "Orders Today",
      value: stats.ordersToday,
      bgColor: chartColors.indigo100,
      iconColor: chartColors.indigo700,
      icon: <HiOutlineCalendarDays />,
    },
  ];

  return (
    <StatsGrid>
      {cards.map((card) => (
        <StatCard key={card.label}>
          <IconBox $bgColor={card.bgColor} $iconColor={card.iconColor}>
            {card.icon}
          </IconBox>
          <StatContent>
            <StatLabel>{card.label}</StatLabel>
            <StatValue>{card.value}</StatValue>
          </StatContent>
        </StatCard>
      ))}
    </StatsGrid>
  );
}

export default StatsCards;
