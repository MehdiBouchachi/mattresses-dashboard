import { useNavigate } from "react-router-dom";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import ProductTableOperations from "../features/products/ProductTableOperations";
import ProductTable from "../features/products/ProductTable";

function Products() {
  const navigate = useNavigate();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All products</Heading>

        <div style={{ display: "flex", gap: "12px" }}>
          <ProductTableOperations />

          <Button onClick={() => navigate("/products/new")}>
            Add new product
          </Button>
        </div>
      </Row>

      <Row>
        <ProductTable />
      </Row>
    </>
  );
}

export default Products;
