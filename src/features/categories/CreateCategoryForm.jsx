import { useForm } from "react-hook-form";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";
import { useCategories } from "./useCategories";
import {
  getParentOptions,
  getCategoryDisplayName,
} from "./categoryTreeHelpers";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 0.4rem;

  @media ${device.mobile} {
    font-size: 1.8rem;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
  margin-top: 0.2rem;
`;

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-700);
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

const TranslationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TranslationGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const TranslationLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--color-grey-100);
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 0.8rem;

  @media ${device.mobile} {
    flex-direction: column;

    & button {
      width: 100%;
    }
  }
`;

function CreateCategoryForm({ categoryToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const { createCategory, isCreating } = useCreateCategory();
  const { updateCategory, isUpdating } = useUpdateCategory();
  const { categories } = useCategories();

  const isWorking = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          value: editValues.value || "",
          type: editValues.type || "main",
          parent_id: editValues.parent_id || "",
          "translations.en": editValues.translations?.en || "",
          "translations.fr": editValues.translations?.fr || "",
          "translations.ar": editValues.translations?.ar || "",
        }
      : {
          value: "",
          type: "main",
          parent_id: "",
          "translations.en": "",
          "translations.fr": "",
          "translations.ar": "",
        },
  });

  const selectedType = watch("type");
  const parentOptions = getParentOptions(categories || [], selectedType);

  function onSubmit(data) {
    const categoryData = {
      value: data.value,
      translations: {
        en: data["translations.en"],
        fr: data["translations.fr"],
        ar: data["translations.ar"],
      },
      type: data.type,
      parent_id: data.type === "main" ? null : Number(data.parent_id) || null,
    };

    if (isEditSession) {
      updateCategory(
        { id: editId, updatedFields: categoryData },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createCategory(categoryData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>
        {isEditSession ? "Edit Category" : "Create Category"}
      </FormTitle>

      <Divider />

      {/* Value */}
      <FieldGroup>
        <Label htmlFor="value">Value (slug)</Label>
        <Input
          type="text"
          id="value"
          placeholder="e.g. classic, roll, d30"
          disabled={isWorking}
          {...register("value", { required: "Value is required" })}
        />
        {errors?.value?.message && <Error>{errors.value.message}</Error>}
      </FieldGroup>

      {/* Translations */}
      <FieldGroup>
        <Label>Translations</Label>
        <TranslationsGrid>
          <TranslationGroup>
            <TranslationLabel>English</TranslationLabel>
            <Input
              type="text"
              placeholder="English name"
              disabled={isWorking}
              {...register("translations.en", {
                required: "English translation is required",
              })}
            />
            {errors?.["translations.en"]?.message && (
              <Error>{errors["translations.en"].message}</Error>
            )}
          </TranslationGroup>

          <TranslationGroup>
            <TranslationLabel>French</TranslationLabel>
            <Input
              type="text"
              placeholder="Nom français"
              disabled={isWorking}
              {...register("translations.fr", {
                required: "French translation is required",
              })}
            />
            {errors?.["translations.fr"]?.message && (
              <Error>{errors["translations.fr"].message}</Error>
            )}
          </TranslationGroup>

          <TranslationGroup>
            <TranslationLabel>Arabic</TranslationLabel>
            <Input
              type="text"
              placeholder="الاسم بالعربية"
              disabled={isWorking}
              dir="rtl"
              {...register("translations.ar", {
                required: "Arabic translation is required",
              })}
            />
            {errors?.["translations.ar"]?.message && (
              <Error>{errors["translations.ar"].message}</Error>
            )}
          </TranslationGroup>
        </TranslationsGrid>
      </FieldGroup>

      <Divider />

      {/* Type */}
      <FieldGroup>
        <Label htmlFor="type">Type</Label>
        <StyledSelect
          id="type"
          disabled={isWorking}
          {...register("type", { required: "Type is required" })}
        >
          <option value="main">Main Category</option>
          <option value="subcategory">Subcategory</option>
          <option value="type">Type</option>
        </StyledSelect>
        {errors?.type?.message && <Error>{errors.type.message}</Error>}
      </FieldGroup>

      {/* Parent — hidden for "main" */}
      {selectedType !== "main" && (
        <FieldGroup>
          <Label htmlFor="parent_id">Parent Category</Label>
          <StyledSelect
            id="parent_id"
            disabled={isWorking || parentOptions.length === 0}
            {...register("parent_id", {
              required:
                selectedType !== "main" ? "Parent category is required" : false,
            })}
          >
            <option value="">
              {parentOptions.length === 0
                ? `No ${selectedType === "subcategory" ? "main categories" : "subcategories"} found`
                : "Select parent..."}
            </option>
            {parentOptions.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {getCategoryDisplayName(cat)}
              </option>
            ))}
          </StyledSelect>
          {errors?.parent_id?.message && (
            <Error>{errors.parent_id.message}</Error>
          )}
        </FieldGroup>
      )}

      <Divider />

      {/* Actions */}
      <ButtonRow>
        <Button
          variation="secondary"
          type="button"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini />
          ) : isEditSession ? (
            "Update Category"
          ) : (
            "Create Category"
          )}
        </Button>
      </ButtonRow>
    </StyledForm>
  );
}

export default CreateCategoryForm;
