import styled from "styled-components";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import DashboardCard from "./DashboardCard";
import { useOrderStatusStats } from "./useOrderStatusStats";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartHeader = styled.div`
  margin-bottom: 2rem;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 30rem;
`;

const NoData = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
  padding: 4rem 0;
`;

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent === 0) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function OrdersStatusChart({ days }) {
  const { isLoading, statusData } = useOrderStatusStats(days);
  const { chartColors } = useDarkMode();

  if (isLoading) return <Spinner />;

  const statusConfig = {
    unconfirmed: {
      label: "Unconfirmed",
      color: chartColors.statusUnconfirmed,
    },
    confirmed: { label: "Confirmed", color: chartColors.statusConfirmed },
    in_delivering: {
      label: "In Delivery",
      color: chartColors.statusDelivering,
    },
    delivered: { label: "Delivered", color: chartColors.statusDelivered },
  };

  const chartData = statusData
    ?.map((item) => ({
      name: statusConfig[item.status]?.label || item.status,
      value: item.count,
      color: statusConfig[item.status]?.color || "#94a3b8",
    }))
    .filter((item) => item.value > 0);

  const hasData = chartData?.length > 0;

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];

    return (
      <div
        style={{
          background: chartColors.tooltipBg,
          border: `1px solid ${chartColors.tooltipBorder}`,
          borderRadius: "8px",
          padding: "1rem 1.4rem",
          fontSize: "1.3rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          color: chartColors.text,
        }}
      >
        <p>
          {name}: <strong>{value} orders</strong>
        </p>
      </div>
    );
  };

  return (
    <DashboardCard>
      <ChartHeader>
        <Heading as="h3">Order Status Distribution</Heading>
      </ChartHeader>

      {!hasData ? (
        <NoData>No orders in this period.</NoData>
      ) : (
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: chartColors.textMuted,
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </DashboardCard>
  );
}

export default OrdersStatusChart;
