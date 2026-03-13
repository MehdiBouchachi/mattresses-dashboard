import styled from "styled-components";
import { device } from "../styles/breakpoints";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  /* Tablet */
  @media ${device.tablet} {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  /* Mobile */
  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`;

export default TableOperations;
