import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";


function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (!cabins) return <Empty resourceName={"bookings"} />;

  if (isLoading) return <Spinner />;

  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";

  let filterdCabins;
  if (filterValue === "all") filterdCabins = cabins;
  else if (filterValue === "no-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount === 0);
  else filterdCabins = cabins.filter((cabin) => cabin.discount !== 0);

  // 2 Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabin = filterdCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabin}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
