import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";

function ProductBasicInfo({ register }) {
  return (
    <>
      <h3>Product Information</h3>

      <FormRow label="Name (EN)">
        <Input {...register("name.en")} />
      </FormRow>

      <FormRow label="Name (FR)">
        <Input {...register("name.fr")} />
      </FormRow>

      <FormRow label="Name (AR)">
        <Input {...register("name.ar")} />
      </FormRow>

      <FormRow label="Slug">
        <Input {...register("slug")} />
      </FormRow>

      <FormRow label="Description (EN)">
        <Input {...register("description.en")} />
      </FormRow>

      <FormRow label="Description (FR)">
        <Input {...register("description.fr")} />
      </FormRow>

      <FormRow label="Description (AR)">
        <Input {...register("description.ar")} />
      </FormRow>
    </>
  );
}

export default ProductBasicInfo;
