import styled from "styled-components";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import DashboardCard from "./DashboardCard";
import { useRevenueChart } from "./useRevenueChart";
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

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatRevenue(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
  return value;
}

function RevenueChart({ days }) {
  const { isLoading, revenueData } = useRevenueChart(days);
  const { chartColors } = useDarkMode();

  if (isLoading) return <Spinner />;

  const hasData = revenueData?.some((d) => d.revenue > 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        style={{
          background: chartColors.tooltipBg,
          border: `1px solid ${chartColors.tooltipBorder}`,
          borderRadius: "8px",
          padding: "1rem 1.4rem",
          fontSize: "1.3rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            marginBottom: "0.4rem",
            color: chartColors.text,
          }}
        >
          {formatDate(label)}
        </p>
        <p style={{ color: chartColors.brand600 }}>
          Revenue:{" "}
          <strong>
            {new Intl.NumberFormat("en-US").format(payload[0].value)} DA
          </strong>
        </p>
      </div>
    );
  };

  return (
    <DashboardCard>
      <ChartHeader>
        <Heading as="h3">Revenue Over Time</Heading>
      </ChartHeader>

      {!hasData ? (
        <NoData>No revenue data for this period.</NoData>
      ) : (
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartColors.brand600}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors.brand600}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.gridLine}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: chartColors.textMuted }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={formatRevenue}
                tick={{ fontSize: 11, fill: chartColors.textMuted }}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={chartColors.brand600}
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
                dot={false}
                activeDot={{ r: 5, fill: chartColors.brand600 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </DashboardCard>
  );
}

export default RevenueChart;
