import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import { device } from "../styles/breakpoints";
import { useUser } from "../features/authentication/useUser";
import { FiUser } from "react-icons/fi";
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

  @media ${device.tablet} {
    padding: 3rem 2.4rem;
  }

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

function Header() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  const fullName = user?.user_metadata?.fullName || "Admin";

  return (
    <StyledHeader>
      <LeftSection>
        <FiUser size={18} />
        {fullName}
      </LeftSection>

      <Actions>
        <HeaderMenu />
      </Actions>
    </StyledHeader>
  );
}

export default Header;
