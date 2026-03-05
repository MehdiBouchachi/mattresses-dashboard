import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <MenuItem>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </MenuItem>

      <MenuItem>
        <DarkModeToggle />
      </MenuItem>

      <MenuItem>
        <Logout />
      </MenuItem>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
