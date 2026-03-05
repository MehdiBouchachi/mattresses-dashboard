import styled, { css } from "styled-components";
import { device } from "../styles/breakpoints";

const Heading = styled.h1`
  line-height: 1.4;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;

      @media ${device.mobile} {
        font-size: 2.4rem;
      }
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;

      @media ${device.mobile} {
        font-size: 1.8rem;
      }
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;

      @media ${device.mobile} {
        font-size: 1.7rem;
      }
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;

      @media ${device.mobile} {
        font-size: 2rem;
      }
    `}
`;

export default Heading;
