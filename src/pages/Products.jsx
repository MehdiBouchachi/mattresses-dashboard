import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import ProductTableOperations from "../features/products/ProductTableOperations";
import ProductTable from "../features/products/ProductTable";
import { device } from "../styles/breakpoints";

const ProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

function Products() {
  const navigate = useNavigate();

  return (
    <>
      <ProductsHeader>
        <Heading as="h1">All products</Heading>

        <ActionsRow>
          <ProductTableOperations />
          <Button onClick={() => navigate("/products/new")}>
            Add new product
          </Button>
        </ActionsRow>
      </ProductsHeader>

      <Row>
        <ProductTable />
      </Row>
    </>
  );
}

export default Products;
