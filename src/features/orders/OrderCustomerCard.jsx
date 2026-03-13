import styled from "styled-components";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
} from "react-icons/hi2";
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;

  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  display: flex;
  align-items: center;
  gap: 0.6rem;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
  }
`;

function OrderCustomerCard({ customer }) {
  if (!customer) return null;

  const { first_name, last_name, email, phone } = customer;

  return (
    <Card>
      <CardTitle>
        <HiOutlineUser />
        Customer
      </CardTitle>

      <InfoGrid>
        <InfoItem>
          <Label>First Name</Label>
          <Value>{first_name}</Value>
        </InfoItem>

        <InfoItem>
          <Label>Last Name</Label>
          <Value>{last_name}</Value>
        </InfoItem>

        <InfoItem>
          <Label>Email</Label>
          <Value>
            <HiOutlineEnvelope />
            {email || "—"}
          </Value>
        </InfoItem>

        <InfoItem>
          <Label>Phone</Label>
          <Value>
            <HiOutlinePhone />
            {phone || "—"}
          </Value>
        </InfoItem>
      </InfoGrid>
    </Card>
  );
}

export default OrderCustomerCard;
