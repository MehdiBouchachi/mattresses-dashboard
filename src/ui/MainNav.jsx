import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 1024px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    gap: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  & .nav-label {
    display: inline;
  }

  /* MOBILE / TABLET MODE */
  @media (max-width: 1024px) {
    &:link,
    &:visited {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0.8rem 1rem;
      gap: 0.4rem;
      font-size: 1.1rem;
      font-weight: 500;
      background: none;
      border-radius: 0.8rem;
      position: relative;
      min-width: 6rem;
    }

    & .nav-label {
      display: block;
      font-size: 1.1rem;
      line-height: 1.3;
      white-space: nowrap;
      color: var(--color-grey-500);
      transition: all 0.3s;
    }

    & svg {
      width: 2.6rem;
      height: 2.6rem;
    }

    &.active:link,
    &.active:visited {
      background-color: transparent;
    }

    &.active .nav-label {
      color: var(--color-brand-600);
      font-weight: 600;
    }

    &.active svg {
      color: var(--color-brand-600);
    }

    &.active::before {
      content: "";
      position: absolute;
      top: -0.8rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2.4rem;
      height: 0.3rem;
      background-color: var(--color-brand-600);
      border-radius: 0 0 0.4rem 0.4rem;
    }

    &:hover,
    &:active {
      background-color: var(--color-grey-50);
    }
  }

  /* Extra small screens */
  @media (max-width: 374px) {
    &:link,
    &:visited {
      min-width: 5.2rem;
      padding: 0.8rem 0.4rem;
    }

    & .nav-label {
      font-size: 1rem;
    }

    & svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;
function MainNav() {
  return (
    <nav style={{ width: "100%" }}>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span className="nav-label">Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/products">
            <HiOutlineShoppingBag />
            <span className="nav-label">Products</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/categories">
            <HiOutlineSquares2X2 />
            <span className="nav-label">Categories</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/orders">
            <HiOutlineClipboardDocumentList />
            <span className="nav-label">Orders</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span className="nav-label">Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
