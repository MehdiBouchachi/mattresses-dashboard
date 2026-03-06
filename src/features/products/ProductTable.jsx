import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";

import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";

function ProductTable() {
  const { isLoading, products } = useProducts();

  if (isLoading) return <Spinner />;

  if (!products.length) return <Empty resourceName="products" />;

  return (
    <Table columns="0.6fr 2fr 1fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Product</div>
        <div>Category</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={products}
        render={(product) => <ProductRow product={product} key={product.id} />}
      />
    </Table>
  );
}

export default ProductTable;
