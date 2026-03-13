import styled from "styled-components";
import Heading from "../ui/Heading";
import CategoriesTable from "../features/categories/CategoriesTable";
import AddCategory from "../features/categories/AddCategory";
import { device } from "../styles/breakpoints";

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media ${device.mobile} {
    gap: 1.6rem;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  flex-wrap: wrap;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 1.6rem;
  }
`;

function Categories() {
  return (
    <StyledCategories>
      <Row>
        <Heading as="h1">Categories</Heading>
        <AddCategory />
      </Row>

      <CategoriesTable />
    </StyledCategories>
  );
}

export default Categories;