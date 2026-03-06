import { useParams } from "react-router-dom";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateProductForm from "../features/products/CreateProductForm";

function EditProduct() {
  const { productId } = useParams();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Edit product</Heading>
      </Row>

      <Row>
        <CreateProductForm productId={productId} />
      </Row>
    </>
  );
}

export default EditProduct;
