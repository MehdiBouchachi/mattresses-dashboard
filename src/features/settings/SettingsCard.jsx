import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 1.2rem 1.6rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--color-grey-600);

  &:last-child {
    text-align: right;
    width: 8rem;
  }
`;

export const Td = styled.td`
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.4rem;
  color: var(--color-grey-700);

  &:last-child {
    text-align: right;
  }
`;

export const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

export const AddRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const EmptyMessage = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
  padding: 2.4rem 0;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-red-100);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-red-700);
  }
`;
