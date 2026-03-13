import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { device } from "../styles/breakpoints";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;

  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);

  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.4rem 4.8rem;
  min-height: 6.4rem;

  /* Tablet */
  @media ${device.tablet} {
    padding: 3rem 2.4rem;
  }

  /* Mobile */
  @media ${device.mobile} {
    padding: 2rem 1.6rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <LeftSection>{/*   <UserAvatar /> */} Mehdi Mohamed</LeftSection>

      <Actions>
        <HeaderMenu />
      </Actions>
    </StyledHeader>
  );
}

export default Header;
