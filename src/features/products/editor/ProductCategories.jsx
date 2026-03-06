import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";

import { categories } from "../../../data/data-categories";

function ProductCategories({ register }) {
  const categoryOptions = categories.map((cat) => ({
    value: cat.value,
    label: cat.translations.en,
  }));

  const subcategoryOptions = [
    { value: "open", label: "Open" },
    { value: "roll", label: "Roll" },
    { value: "visco", label: "Visco" },
    { value: "spring-confort", label: "Spring Confort" },
  ];

  return (
    <>
      <h3>Categories</h3>

      <FormRow label="Category">
        <Select options={categoryOptions} {...register("category")} />
      </FormRow>

      <FormRow label="Subcategory">
        <Select options={subcategoryOptions} {...register("subcategory")} />
      </FormRow>
    </>
  );
}

export default ProductCategories;
