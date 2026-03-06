import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";

function ProductSettings({ register }) {
  return (
    <>
      <h3>Settings</h3>

      <FormRow label="Discount (DA)">
        <Input type="number" {...register("discount")} />
      </FormRow>

      <FormRow label="Featured">
        <input type="checkbox" {...register("featured")} />
      </FormRow>

      <FormRow label="Available">
        <input type="checkbox" {...register("available")} />
      </FormRow>
    </>
  );
}

export default ProductSettings;
