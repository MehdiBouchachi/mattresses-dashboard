import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function ProductTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="featured"
        options={[
          { value: "all", label: "All" },
          { value: "featured", label: "Featured" },
          { value: "not-featured", label: "Not featured" },
        ]}
      />
    </TableOperations>
  );
}

export default ProductTableOperations;
