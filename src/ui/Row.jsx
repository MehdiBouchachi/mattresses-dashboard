import styled, { css } from "styled-components";
import { device } from "../styles/breakpoints";

const Row = styled.div`
  display: flex;
  width: 100%;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;

      @media ${device.tablet} {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.6rem;
      }
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
