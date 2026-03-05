import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { device } from "../../styles/breakpoints";

/* -------------------------------- */
/* Container */
/* -------------------------------- */

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

/* -------------------------------- */
/* Header */
/* -------------------------------- */

const Header = styled.header`
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-400)
  );

  color: #e0e7ff;
  background: var(--color-brand-600);
  padding: 2.4rem 3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    gap: 1.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  span {
    font-family: "Sono";
    font-size: 1.9rem;
  }

  svg {
    height: 2.8rem;
    width: 2.8rem;
  }

  p:last-child {
    font-size: 1.3rem;
    opacity: 0.9;
  }
`;

/* -------------------------------- */
/* Content Section */
/* -------------------------------- */

const Section = styled.section`
  padding: 3rem 3.2rem 2rem;

  @media ${device.mobile} {
    padding: 2rem;
  }
`;

/* -------------------------------- */
/* Guest Info */
/* -------------------------------- */

const Guest = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  margin-bottom: 2rem;

  color: var(--color-grey-500);
  font-size: 1.4rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }

  & p:first-of-type {
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

/* -------------------------------- */
/* Price Card */
/* -------------------------------- */

const Price = styled.div`
  margin-top: 2.4rem;

  padding: 2rem 2.4rem;
  border-radius: var(--border-radius-md);

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};

  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  /* Force DataItem to take full width */
  & > div {
    flex: 1;
  }

  & p:last-child {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;

    & p:last-child {
      margin-top: 0.6rem;
    }
  }
`;

/* -------------------------------- */
/* Footer */
/* -------------------------------- */

const Footer = styled.footer`
  padding: 1.6rem 3rem;

  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;

  border-top: 1px solid var(--color-grey-100);

  @media ${device.mobile} {
    padding: 1.2rem 2rem;
    text-align: left;
  }
`;

/* -------------------------------- */
/* Component */
/* -------------------------------- */

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) — {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>

          <p>{email}</p>

          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
