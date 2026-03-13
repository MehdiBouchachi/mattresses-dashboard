import styled from "styled-components";
import { HiOutlineCalculator } from "react-icons/hi2";
import { device } from "../../styles/breakpoints";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

const SummaryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const SummaryLabel = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  font-weight: 500;
`;

const SummaryValue = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-700);
  font-family: "Sono", monospace;
`;

const TotalRow = styled(SummaryRow)`
  border-bottom: none;
  padding-top: 1.2rem;
  border-top: 2px solid var(--color-grey-200);
`;

const TotalLabel = styled(SummaryLabel)`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const TotalValue = styled(SummaryValue)`
  font-size: 1.8rem;
  color: var(--color-brand-600);
`;

function formatCurrency(value) {
  return new Intl.NumberFormat("fr-DZ").format(value) + " DA";
}

function OrderSummaryCard({ summary }) {
  if (!summary) return null;

  const { items_count, total_quantity, total_price } = summary;

  return (
    <Card>
      <CardTitle>
        <HiOutlineCalculator />
        Order Summary
      </CardTitle>

      <SummaryGrid>
        <SummaryRow>
          <SummaryLabel>Items</SummaryLabel>
          <SummaryValue>{items_count}</SummaryValue>
        </SummaryRow>

        <SummaryRow>
          <SummaryLabel>Quantity</SummaryLabel>
          <SummaryValue>{total_quantity}</SummaryValue>
        </SummaryRow>

        <TotalRow>
          <TotalLabel>Total</TotalLabel>
          <TotalValue>{formatCurrency(total_price)}</TotalValue>
        </TotalRow>
      </SummaryGrid>
    </Card>
  );
}

export default OrderSummaryCard;
