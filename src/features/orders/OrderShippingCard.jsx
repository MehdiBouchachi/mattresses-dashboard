import styled from "styled-components";
import { HiOutlineTruck, HiOutlineMapPin } from "react-icons/hi2";
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
`;

const MapButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.6rem;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  border: none;
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-brand-700);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

function OrderShippingCard({ shipping }) {
  if (!shipping) return null;

  const { wilaya, city, street, map_link } = shipping;

  return (
    <Card>
      <CardTitle>
        <HiOutlineTruck />
        Shipping Address
      </CardTitle>

      <InfoGrid>
        <InfoItem>
          <Label>Wilaya</Label>
          <Value>{wilaya || "—"}</Value>
        </InfoItem>

        <InfoItem>
          <Label>City</Label>
          <Value>{city || "—"}</Value>
        </InfoItem>

        <InfoItem>
          <Label>Street</Label>
          <Value>{street || "—"}</Value>
        </InfoItem>
      </InfoGrid>

      {map_link && (
        <MapButton href={map_link} target="_blank" rel="noopener noreferrer">
          <HiOutlineMapPin />
          Open Map
        </MapButton>
      )}
    </Card>
  );
}

export default OrderShippingCard;
