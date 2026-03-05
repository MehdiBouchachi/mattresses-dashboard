import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { device } from "../styles/breakpoints";

const LoginLayout = styled.main`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 3.2rem;
  padding: 3.2rem;

  background-color: var(--color-grey-50);

  @media ${device.mobile} {
    padding: 2rem;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 42rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;



function Login() {
  return (
    <LoginLayout>
      <LoginContainer>
        <Logo />
        <Heading as="h4">Log in to your account</Heading>
        <LoginForm />
      </LoginContainer>
    </LoginLayout>
  );
}

export default Login;
