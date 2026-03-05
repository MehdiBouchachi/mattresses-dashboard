import styled from "styled-components";
import { device } from "../styles/breakpoints";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;

  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};

  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;

  box-shadow: var(--shadow-sm);

  cursor: pointer;

  /* Tablet */
  @media ${device.tablet} {
    width: 100%;
  }

  /* Mobile */
  @media ${device.mobile} {
    width: 100%;
    padding: 1rem 1.2rem;
    font-size: 1.5rem;
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
