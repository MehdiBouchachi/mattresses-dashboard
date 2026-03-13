import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { device } from "../styles/breakpoints";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media ${device.mobile} {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 3.6rem 0.8rem 3.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-700);
  width: 28rem;
  transition: all 0.3s;

  @media ${device.tablet} {
    width: 100%;
  }

  @media ${device.mobile} {
    width: 100%;
    padding: 1rem 3.6rem;
    font-size: 1.5rem;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px var(--color-brand-100, rgba(99, 102, 241, 0.15));
  }
`;

const IconLeft = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: var(--color-grey-400);
  pointer-events: none;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  color: var(--color-grey-400);
  transition: all 0.2s;

  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function SearchInput({ placeholder = "Search...", queryKey = "search" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get(queryKey) || "";
  const [inputValue, setInputValue] = useState(currentSearch);
  const debounceRef = useRef(null);

  useEffect(() => {
    setInputValue(searchParams.get(queryKey) || "");
  }, [searchParams, queryKey]);

  function updateSearchParams(value) {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (value.trim()) {
        newParams.set(queryKey, value.trim());
      } else {
        newParams.delete(queryKey);
      }
      newParams.delete("page");
      setSearchParams(newParams);
    }, 300);
  }

  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);
    updateSearchParams(value);
  }

  function handleClear() {
    setInputValue("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(queryKey);
    newParams.delete("page");
    setSearchParams(newParams);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <Wrapper>
      <IconLeft>
        <HiMagnifyingGlass />
      </IconLeft>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <ClearButton onClick={handleClear} title="Clear search">
          <HiXMark />
        </ClearButton>
      )}
    </Wrapper>
  );
}

export default SearchInput;
