import CreateProductForm from "../features/products/CreateProductForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function CreateProduct() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Create new product</Heading>
      </Row>

      <Row>
        <CreateProductForm />
      </Row>
    </>
  );
}

export default CreateProduct;
