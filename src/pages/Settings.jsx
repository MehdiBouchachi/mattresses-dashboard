import styled from "styled-components";
import Heading from "../ui/Heading";
import DimensionsSection from "../features/settings/DimensionsSection";
import ThicknessSection from "../features/settings/ThicknessSection";
import MetaPixelSection from "../features/settings/MetaPixelSection";
import { device } from "../styles/breakpoints";

const StyledSettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media ${device.mobile} {
    gap: 2.4rem;
  }
`;

function Settings() {
  return (
    <StyledSettingsLayout>
      <Heading as="h1">Settings</Heading>
      <DimensionsSection />
      <ThicknessSection />
      <MetaPixelSection />
    </StyledSettingsLayout>
  );
}

export default Settings;
