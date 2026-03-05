import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

import { device } from "../styles/breakpoints";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;

  grid-template-areas:
    "sidebar header"
    "sidebar main";

  min-height: 100dvh;

  @media ${device.tablet} {
    grid-template-columns: 8rem 1fr;
  }

  @media ${device.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;

    grid-template-areas:
      "header"
      "main"
      "sidebar";
  }
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4rem 6.4rem;
  grid-area: main;
  overflow-y: auto;
  @media ${device.tablet} {
    padding: 3rem 3rem;
  }

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
    padding-bottom: 8rem;
  }
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media ${device.laptop} {
    max-width: 100rem;
  }

  @media ${device.tablet} {
    max-width: 80rem;
  }

  @media ${device.mobile} {
    max-width: 100%;
  }
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />

      <SideBar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
