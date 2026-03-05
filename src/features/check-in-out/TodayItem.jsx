import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { device } from "../../styles/breakpoints";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1.2rem;
  align-items: center;

  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.4rem;

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  /* TABLET */
  @media ${device.tablet} {
    grid-template-columns: auto 1fr auto;
  }

  /* MOBILE */
  @media ${device.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 0.6rem;
  }
`;

const GuestRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
`;

const Guest = styled.span`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.mobile} {
    margin-top: 0.2rem;
  }
`;

const Nights = styled.span`
  color: var(--color-grey-500);
  font-size: 1.3rem;
`;

const ActionWrapper = styled.div`
  justify-self: end;

  @media ${device.mobile} {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      <Tag type={status === "unconfirmed" ? "green" : "blue"}>
        {status === "unconfirmed" ? "Arriving" : "Departing"}
      </Tag>

      <GuestRow>
        <Flag src={guests?.countryFlag} alt={`Flag of ${guests?.country}`} />
        <Guest>{guests?.fullName}</Guest>
      </GuestRow>

      <BottomRow>
        <Nights>{numNights} nights</Nights>

        <ActionWrapper>
          {status === "unconfirmed" && (
            <Button
              size="small"
              variation="primary"
              as={Link}
              to={`/checkin/${id}`}
            >
              Check in
            </Button>
          )}

          {status === "checked-in" && <CheckoutButton bookingId={id} />}
        </ActionWrapper>
      </BottomRow>
    </StyledTodayItem>
  );
}

export default TodayItem;
