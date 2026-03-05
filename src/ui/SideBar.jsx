import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { device } from "../styles/breakpoints";
import Uploader from "./../data/Uploader";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  /* TABLET + MOBILE -> Bottom App Bar */
  @media ${device.tablet} {
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 7rem;

    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    border-right: none;
    border-top: 1px solid var(--color-grey-200);

    padding: 0 1.6rem;

    z-index: 1000;
  }
`;

const LogoWrapper = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;

function SideBar() {
  return (
    <StyledSideBar>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <MainNav />
    </StyledSideBar>
  );
}

export default SideBar;
