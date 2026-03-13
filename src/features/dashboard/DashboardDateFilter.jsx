import styled from "styled-components";
import { device } from "../../styles/breakpoints";

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  overflow-x: auto;

  @media ${device.mobile} {
    justify-content: center;
  }
`;

const FilterBtn = styled.button`
  border: none;
  background-color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--color-brand-50, #fff)" : "var(--color-grey-600)"};
  font-size: 1.3rem;
  font-weight: 500;
  padding: 0.6rem 1.4rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--color-brand-700)" : "var(--color-grey-100)"};
  }
`;

const FILTER_OPTIONS = [
  { label: "7 Days", value: 7 },
  { label: "15 Days", value: 15 },
  { label: "30 Days", value: 30 },
  { label: "60 Days", value: 60 },
  { label: "90 Days", value: 90 },
];

function DashboardDateFilter({ activeDays, onFilterChange }) {
  return (
    <FilterRow>
      <FilterGroup>
        {FILTER_OPTIONS.map((option) => (
          <FilterBtn
            key={option.value}
            $active={activeDays === option.value}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </FilterBtn>
        ))}
      </FilterGroup>
    </FilterRow>
  );
}

export default DashboardDateFilter;
