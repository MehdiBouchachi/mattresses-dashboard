import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Button from "../../ui/Button";

import ProductBasicInfo from "./editor/ProductBasicInfo";
import ProductCategories from "./editor/ProductCategories";
import ProductImages from "./editor/ProductImages";
import ProductDimensions from "./editor/ProductDimensions";
import ProductWhyChoose from "./editor/ProductWhyChoose";
import ProductTechnicalSpecs from "./editor/ProductTechnicalSpecs";
import ProductSettings from "./editor/ProductSettings";

function CreateProductForm({ onCloseModal }) {
  const methods = useForm();

  function onSubmit(data) {
    console.log("PRODUCT DATA ↓");
    console.log(data);
  }

  return (
    <Form onSubmit={methods.handleSubmit(onSubmit)} type="regular">
      <ProductBasicInfo register={methods.register} />

      <ProductCategories register={methods.register} />

      <ProductImages register={methods.register} />

      <ProductDimensions register={methods.register} />

      <ProductWhyChoose register={methods.register} />

      <ProductTechnicalSpecs register={methods.register} />

      <ProductSettings register={methods.register} />

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <Button variation="secondary" onClick={onCloseModal}>
          Cancel
        </Button>

        <Button>Create Product</Button>
      </div>
    </Form>
  );
}

export default CreateProductForm;
