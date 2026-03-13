import styled from "styled-components";
import { device } from "../../styles/breakpoints";

const DashboardCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;

  @media ${device.mobile} {
    padding: 1.6rem;
    overflow: hidden;
  }
`;

export default DashboardCard;
