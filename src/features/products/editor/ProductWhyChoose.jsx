import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";

function ProductWhyChoose({ register }) {
  return (
    <>
      <h3>Why Choose</h3>

      <FormRow label="Why choose (EN)">
        <Input {...register("details.whyChoose.en.0")} />
      </FormRow>

      <FormRow label="Why choose (FR)">
        <Input {...register("details.whyChoose.fr.0")} />
      </FormRow>

      <FormRow label="Why choose (AR)">
        <Input {...register("details.whyChoose.ar.0")} />
      </FormRow>
    </>
  );
}

export default ProductWhyChoose;
