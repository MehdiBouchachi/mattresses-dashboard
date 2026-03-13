import styled from "styled-components";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import { useCategories } from "../categories/useCategories";
import { device } from "../../styles/breakpoints";

const ScrollableOps = styled.div`
  @media ${device.mobile} {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

function ProductTableOperations() {
  const { categories = [], isLoading } = useCategories();

  // Only main categories (no parent)
  const mainCategories = categories.filter((c) => !c.parent_id);

  const options = [
    { value: "all", label: "All" },
    ...mainCategories.map((cat) => ({
      // Use cat.value — this must match what getProducts returns as categoryValue
      value: String(cat.value),
      label: cat.translations?.en || cat.value,
    })),
  ];

  if (isLoading) return null;

  return (
    <ScrollableOps>
      <TableOperations>
        <Filter filterField="category_id" options={options} />
      </TableOperations>
    </ScrollableOps>
  );
}

export default ProductTableOperations;
