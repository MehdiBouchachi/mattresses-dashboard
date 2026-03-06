import FormRow from "../../../ui/FormRow";
import FileInput from "../../../ui/FileInput";

function ProductImages({ register }) {
  return (
    <>
      <h3>Product Images</h3>

      <FormRow label="Main image">
        <FileInput {...register("images.0")} />
      </FormRow>

      <FormRow label="Image 2">
        <FileInput {...register("images.1")} />
      </FormRow>

      <FormRow label="Image 3">
        <FileInput {...register("images.2")} />
      </FormRow>
    </>
  );
}

export default ProductImages;
