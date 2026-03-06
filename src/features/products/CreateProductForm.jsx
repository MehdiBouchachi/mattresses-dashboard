import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import slugify from "slugify";
import styled from "styled-components";

import { FiUploadCloud, FiX } from "react-icons/fi";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import FileInput from "../../ui/FileInput";

import { categories } from "../../data/data-categories";
import Textarea from "../../ui/Textarea";

/* ---------------- PAGE ---------------- */

const Page = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

/* ---------------- STEPS ---------------- */

const Stepper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.4rem;
`;

const StepItem = styled.div`
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-sm);
  background: ${(p) =>
    p.active ? "var(--color-brand-600)" : "var(--color-grey-100)"};
  color: ${(p) =>
    p.active ? "var(--color-brand-50)" : "var(--color-grey-600)"};
  font-size: 1.3rem;
  font-weight: 500;
`;

/* ---------------- SECTION ---------------- */

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
`;

/* ---------------- GRID ---------------- */

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

/* ---------------- TEXTAREA ---------------- */

/* ---------------- IMAGE UPLOAD ---------------- */
const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
`;

const UploadCard = styled.div`
  border: 2px dashed var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  padding: 2rem;
  min-height: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  position: relative;
  cursor: pointer;

  &:hover {
    border-color: var(--color-brand-600);
  }
`;

const Preview = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;

  border: none;
  background: var(--color-red-700);
  color: white;

  border-radius: 50%;
  width: 26px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const HiddenInput = styled(FileInput)`
  display: none;
`;

const Actions = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
`;

/* ------------------------------------------------ */

function CreateProductForm() {
  const [step, setStep] = useState(1);
  const [previews, setPreviews] = useState([]);
  const fileRefs = useRef([]);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      images: [{ file: "" }],
      dimensions: [{ size: "", thickness: "", price: "" }],
      whyChoose: [{ en: "", fr: "", ar: "" }],
      technicalSpecs: [{ label: "", value: "" }],
    },
  });

  /* ---------------- SLUG ---------------- */

  const nameEn = useWatch({ control, name: "name_en" });

  useEffect(() => {
    if (!nameEn) return;
    setValue("slug", slugify(nameEn, { lower: true, strict: true }));
  }, [nameEn]);

  /* ---------------- ARRAYS ---------------- */

  const images = useFieldArray({ control, name: "images" });
  const dimensions = useFieldArray({ control, name: "dimensions" });
  const whyChoose = useFieldArray({ control, name: "whyChoose" });
  const specs = useFieldArray({ control, name: "technicalSpecs" });

  /* ---------------- CATEGORY ---------------- */

  const categoryValue = useWatch({
    control,
    name: "category",
  });

  const selectedCategory = categories.find(
    (cat) => cat.value === categoryValue,
  );

  const categoryOptions = categories.map((cat) => ({
    value: cat.value,
    label: cat.translations.en,
  }));

  const subcategoryOptions =
    selectedCategory?.subcategories?.map((sub) => ({
      value: sub.value,
      label: sub.translations.en,
    })) || [];

  /* ---------------- IMAGE PREVIEW ---------------- */

  function handlePreview(e, index) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const next = [...previews];
    next[index] = url;
    setPreviews(next);
  }

  function removeImage(index) {
    images.remove(index);

    const next = [...previews];
    next.splice(index, 1);
    setPreviews(next);
  }

  function removeImage(index) {
    images.remove(index);

    const next = [...previews];
    next.splice(index, 1);
    setPreviews(next);
  }
  useEffect(() => {
    setValue("subcategory", "");
  }, [categoryValue]);
  /* ---------------- STEPS ---------------- */

  function next() {
    setStep((s) => Math.min(s + 1, 5));
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 1));
  }

  /* ---------------- SUBMIT ---------------- */

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stepper>
          {["Info", "Media", "Variants", "Specs", "Settings"].map(
            (label, i) => (
              <StepItem key={i} active={step === i + 1}>
                {i + 1}. {label}
              </StepItem>
            ),
          )}
        </Stepper>

        {/* STEP 1 */}

        {step === 1 && (
          <Section>
            <SectionTitle>Basic Information</SectionTitle>

            <FormRow label="Name EN">
              <Input {...register("name_en")} />
            </FormRow>

            <FormRow label="Name FR">
              <Input {...register("name_fr")} />
            </FormRow>

            <FormRow label="Name AR">
              <Input {...register("name_ar")} />
            </FormRow>

            <FormRow label="Slug">
              <Input disabled {...register("slug")} />
            </FormRow>

            <FormRow label="Description EN">
              <Textarea {...register("description_en")} />
            </FormRow>

            <FormRow label="Description FR">
              <Textarea {...register("description_fr")} />
            </FormRow>

            <FormRow label="Description AR">
              <Textarea {...register("description_ar")} />
            </FormRow>

            <FormRow label="Category">
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    options={categoryOptions}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </FormRow>

            <FormRow label="Subcategory">
              <Controller
                control={control}
                name="subcategory"
                render={({ field }) => (
                  <Select
                    options={subcategoryOptions}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </FormRow>
          </Section>
        )}

        {/* STEP 2 MEDIA */}

        {step === 2 && (
          <Section>
            <SectionTitle>Product Images</SectionTitle>

            <UploadGrid>
              {images.fields.map((field, index) => (
                <UploadCard
                  key={field.id}
                  onClick={() => fileRefs.current[index]?.click()}
                >
                  {previews[index] ? (
                    <>
                      <Preview src={previews[index]} />

                      <RemoveButton
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <FiX size={14} />
                      </RemoveButton>
                    </>
                  ) : (
                    <>
                      <FiUploadCloud size={32} />
                      <p>Click to upload image</p>
                    </>
                  )}

                  <HiddenInput
                    ref={(el) => (fileRefs.current[index] = el)}
                    {...register(`images.${index}.file`)}
                    onChange={(e) => handlePreview(e, index)}
                  />
                </UploadCard>
              ))}
            </UploadGrid>

            <Button
              size="small"
              type="button"
              onClick={() => images.append({ file: "" })}
            >
              + Add Image
            </Button>
          </Section>
        )}

        {/* STEP 3 VARIANTS */}

        {step === 3 && (
          <Section>
            <SectionTitle>Variants</SectionTitle>

            {dimensions.fields.map((field, i) => (
              <Grid3 key={field.id}>
                <Input
                  placeholder="Size"
                  {...register(`dimensions.${i}.size`)}
                />
                <Input
                  placeholder="Thickness"
                  {...register(`dimensions.${i}.thickness`)}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  {...register(`dimensions.${i}.price`)}
                />
              </Grid3>
            ))}

            <Button
              size="small"
              type="button"
              onClick={() =>
                dimensions.append({ size: "", thickness: "", price: "" })
              }
            >
              + Add Variant
            </Button>
          </Section>
        )}

        {/* STEP 4 SPECS */}

        {step === 4 && (
          <Section>
            <SectionTitle>Why Choose</SectionTitle>

            {whyChoose.fields.map((field, i) => (
              <Grid3 key={field.id}>
                <Input {...register(`whyChoose.${i}.en`)} placeholder="EN" />
                <Input {...register(`whyChoose.${i}.fr`)} placeholder="FR" />
                <Input {...register(`whyChoose.${i}.ar`)} placeholder="AR" />
              </Grid3>
            ))}

            <Button
              size="small"
              type="button"
              onClick={() => whyChoose.append({ en: "", fr: "", ar: "" })}
            >
              + Add Bullet
            </Button>

            <SectionTitle>Technical Specs</SectionTitle>

            {specs.fields.map((field, i) => (
              <Grid2 key={field.id}>
                <Input
                  {...register(`technicalSpecs.${i}.label`)}
                  placeholder="Label"
                />
                <Input
                  {...register(`technicalSpecs.${i}.value`)}
                  placeholder="Value"
                />
              </Grid2>
            ))}

            <Button
              size="small"
              type="button"
              onClick={() => specs.append({ label: "", value: "" })}
            >
              + Add Spec
            </Button>
          </Section>
        )}

        {/* STEP 5 SETTINGS */}

        {step === 5 && (
          <Section>
            <SectionTitle>Settings</SectionTitle>

            <FormRow label="Discount">
              <Input type="number" {...register("discount")} />
            </FormRow>

            <FormRow label="Featured">
              <Input type="checkbox" {...register("featured")} />
            </FormRow>

            <FormRow label="Available">
              <Input type="checkbox" {...register("available")} />
            </FormRow>
          </Section>
        )}

        {/* ACTIONS */}

        <Actions>
          {step > 1 && (
            <Button variation="secondary" type="button" onClick={prev}>
              Back
            </Button>
          )}

          {step < 5 && (
            <Button type="button" onClick={next}>
              Next
            </Button>
          )}

          {step === 5 && <Button size="large">Create Product</Button>}
        </Actions>
      </Form>
    </Page>
  );
}

export default CreateProductForm;
