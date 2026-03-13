import styled from "styled-components";

import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import DashboardCard from "./DashboardCard";
import { useTopProducts } from "./useTopProducts";
import { useDarkMode } from "../../context/DarkModeContext";
import { device } from "../../styles/breakpoints";

const ChartHeader = styled.div`
  margin-bottom: 2.4rem;

  @media ${device.mobile} {
    margin-bottom: 1.6rem;
  }
`;

const NoData = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
  padding: 4rem 0;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media ${device.mobile} {
    gap: 1.4rem;
  }
`;

const ProductRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 0;
`;

const ProductName = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;

  @media ${device.mobile} {
    font-size: 1.3rem;
  }
`;

const ProductCount = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-grey-800);
  white-space: nowrap;
  flex-shrink: 0;

  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 1rem;
  border-radius: 10rem;
  background-color: ${(props) => props.$trackColor};
  overflow: hidden;

  @media ${device.mobile} {
    height: 0.6rem;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 10rem;
  width: ${(props) => props.$percent}%;
  background: ${(props) => props.$fillColor};
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: ${(props) => (props.$percent > 0 ? "0.8rem" : "0")};
`;

const RankBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};

  @media ${device.mobile} {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  overflow: hidden;

  @media ${device.mobile} {
    gap: 0.6rem;
  }
`;

function getRankColors(index, chartColors) {
  const ranks = [
    { bg: chartColors.brand600, text: "#fff" },
    { bg: chartColors.blue600, text: "#fff" },
    { bg: chartColors.green600, text: "#fff" },
    { bg: chartColors.yellow600, text: "#fff" },
    { bg: chartColors.orange600, text: "#fff" },
  ];
  return ranks[index] || ranks[4];
}

function getBarColor(index, chartColors) {
  const colors = [
    chartColors.brand600,
    chartColors.blue600,
    chartColors.green600,
    chartColors.yellow600,
    chartColors.orange600,
  ];
  return colors[index] || colors[4];
}

function TopProductsChart({ days }) {
  const { isLoading, topProducts } = useTopProducts(days);
  const { chartColors } = useDarkMode();

  if (isLoading) return <Spinner />;

  const hasData = topProducts?.length > 0;

  const maxQuantity = hasData
    ? Math.max(...topProducts.map((p) => p.totalQuantity))
    : 0;

  return (
    <DashboardCard>
      <ChartHeader>
        <Heading as="h3">Top 5 Products</Heading>
      </ChartHeader>

      {!hasData ? (
        <NoData>No product sales data for this period.</NoData>
      ) : (
        <ProductList>
          {topProducts.map((product, index) => {
            const percent =
              maxQuantity > 0 ? (product.totalQuantity / maxQuantity) * 100 : 0;

            const rankColors = getRankColors(index, chartColors);
            const barColor = getBarColor(index, chartColors);

            return (
              <ProductRow key={product.name}>
                <ProductInfo>
                  <NameRow>
                    <RankBadge
                      $bgColor={rankColors.bg}
                      $textColor={rankColors.text}
                    >
                      {index + 1}
                    </RankBadge>
                    <ProductName>{product.name}</ProductName>
                  </NameRow>
                  <ProductCount>{product.totalQuantity} units</ProductCount>
                </ProductInfo>
                <ProgressTrack $trackColor={chartColors.progressTrack}>
                  <ProgressFill $percent={percent} $fillColor={barColor} />
                </ProgressTrack>
              </ProductRow>
            );
          })}
        </ProductList>
      )}
    </DashboardCard>
  );
}

export default TopProductsChart;
