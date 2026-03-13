import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import CategoryRow from "./CategoryRow";
import { useCategories } from "./useCategories";
import { buildCategoryTree, flattenTree } from "./categoryTreeHelpers";
import { device } from "../../styles/breakpoints";

const StyledEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContainer = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;

  @media ${device.mobile} {
    border-radius: var(--border-radius-sm);
  }
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledTable = styled.div`
  min-width: 60rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 0.6fr;
  align-items: center;
  padding: 1.4rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
  gap: 1.6rem;

  @media ${device.mobile} {
    padding: 1.2rem 1.6rem;
  }
`;

const HeaderCell = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-grey-600);
`;

function CategoriesTable() {
  const { isLoading, categories } = useCategories();

  if (isLoading) return <Spinner />;
  if (!categories?.length)
    return <StyledEmpty>No categories yet. Start by adding one.</StyledEmpty>;

  const tree = buildCategoryTree(categories);
  const flatList = flattenTree(tree);

  return (
    <Menus>
      <TableContainer>
        <ScrollWrapper>
          <StyledTable>
            <TableHeader>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Parent</HeaderCell>
              <HeaderCell></HeaderCell>
            </TableHeader>

            {flatList.map((cat) => (
              <CategoryRow
                key={cat.id}
                category={cat}
                allCategories={categories}
              />
            ))}
          </StyledTable>
        </ScrollWrapper>
      </TableContainer>
    </Menus>
  );
}

export default CategoriesTable;
