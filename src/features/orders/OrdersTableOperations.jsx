import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import SearchInput from "../../ui/SearchInput";

function OrdersTableOperations() {
  return (
    <TableOperations>
      <SearchInput
        placeholder="Search by order code or customer..."
        queryKey="search"
      />

      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "unconfirmed", label: "Unconfirmed" },
          { value: "confirmed", label: "Confirmed" },
          { value: "in_delivering", label: "In Delivering" },
          { value: "delivered", label: "Delivered" },
          { value: "cancelled", label: "Cancelled" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "created_at-desc",
            label: "Sort by date (newest)",
          },
          {
            value: "created_at-asc",
            label: "Sort by date (oldest)",
          },
          {
            value: "total_price-desc",
            label: "Sort by amount (high)",
          },
          {
            value: "total_price-asc",
            label: "Sort by amount (low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default OrdersTableOperations;
