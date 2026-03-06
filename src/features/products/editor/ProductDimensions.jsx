import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";

function ProductDimensions({ register }) {
  return (
    <>
      <h3>Dimensions & Pricing</h3>

      <FormRow label="Size">
        <Input {...register("dimensions.0.size")} placeholder="90 x 190" />
      </FormRow>

      <FormRow label="Thickness">
        <Input
          type="number"
          {...register("dimensions.0.options.0.thickness")}
        />
      </FormRow>

      <FormRow label="Price (DA)">
        <Input type="number" {...register("dimensions.0.options.0.price")} />
      </FormRow>
    </>
  );
}

export default ProductDimensions;
