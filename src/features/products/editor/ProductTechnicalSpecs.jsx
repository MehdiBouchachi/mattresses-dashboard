import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";

function ProductTechnicalSpecs({ register }) {
  return (
    <>
      <h3>Technical Specs</h3>

      <FormRow label="Label">
        <Input {...register("details.technicalSpecs.en.0.label")} />
      </FormRow>

      <FormRow label="Value">
        <Input {...register("details.technicalSpecs.en.0.value")} />
      </FormRow>
    </>
  );
}

export default ProductTechnicalSpecs;
