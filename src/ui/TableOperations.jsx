import styled from "styled-components";
import { device } from "../styles/breakpoints";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  /* Tablet */
  @media ${device.tablet} {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 1.2rem;
  }

  /* Mobile */
  @media ${device.mobile} {
    width: 100%;
  }
`;

export default TableOperations;
