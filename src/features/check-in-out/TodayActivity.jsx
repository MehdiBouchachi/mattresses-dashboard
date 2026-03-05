import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { device } from "../../styles/breakpoints";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  padding-top: 2.4rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  grid-column: 1 / span 2;

  @media ${device.laptop} {
    grid-column: 1 / -1;
  }

  @media ${device.tablet} {
    grid-column: 1 / -1;
    padding: 2rem;
  }
`;
const TodayList = styled.ul`
  max-height: 28rem;
  overflow-y: auto;
  overflow-x: hidden;

  list-style: none;
  padding: 0;
  margin: 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-200);
    border-radius: 10px;
  }
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
