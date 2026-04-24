// pages/UpdateProduct.jsx

import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useProduct } from "../features/products/useProduct";
import CreateProductForm from "../features/products/CreateProductForm";
import { useMoveBack } from "../hooks/useMoveBack";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const StyledUpdateProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 0.8rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-600);
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-400);
    color: var(--color-grey-800);
  }
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Heading = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-800);

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

const ProductIdBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1.2rem;
  border-radius: 10rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-600);
  font-size: 1.2rem;
  font-weight: 600;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const SkeletonBlock = styled.div`
  height: ${(props) => props.$height || "20rem"};
  border-radius: 1rem;
  background: linear-gradient(
    90deg,
    var(--color-grey-100) 25%,
    var(--color-grey-50) 50%,
    var(--color-grey-100) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 6rem 2rem;
  background-color: var(--color-grey-50);
  border: 1.5px solid var(--color-red-100);
  border-radius: 1rem;
  text-align: center;
`;

const ErrorText = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const ErrorSubtext = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

const RetryButton = styled.button`
  padding: 1rem 2.4rem;
  border: none;
  border-radius: 0.8rem;
  background-color: var(--color-brand-600);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const SecondaryButton = styled(RetryButton)`
  background-color: var(--color-grey-200);
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { product, isLoading, error } = useProduct(productId);

  /* ── Loading ── */
  if (isLoading) {
    return (
      <StyledUpdateProduct>
        <Header>
          <HeaderLeft>
            <BackButton onClick={moveBack}>←</BackButton>
            <Heading>Loading product…</Heading>
          </HeaderLeft>
        </Header>
        <LoadingWrapper>
          <SkeletonBlock $height="6rem" />
          <SkeletonBlock $height="36rem" />
          <SkeletonBlock $height="20rem" />
          <SkeletonBlock $height="28rem" />
        </LoadingWrapper>
      </StyledUpdateProduct>
    );
  }

  /* ── Error ── */
  if (error || !product) {
    return (
      <StyledUpdateProduct>
        <Header>
          <HeaderLeft>
            <BackButton onClick={moveBack}>←</BackButton>
            <Heading>Edit Product</Heading>
          </HeaderLeft>
        </Header>
        <ErrorBox>
          <span style={{ fontSize: "4rem" }}>😕</span>
          <ErrorText>Could not load product</ErrorText>
          <ErrorSubtext>
            {error?.message || "The product may have been deleted."}
          </ErrorSubtext>
          <div style={{ display: "flex", gap: "1.2rem" }}>
            <RetryButton onClick={() => navigate(0)}>Try Again</RetryButton>
            <SecondaryButton onClick={() => navigate("/products")}>
              Back to Products
            </SecondaryButton>
          </div>
        </ErrorBox>
      </StyledUpdateProduct>
    );
  }

  /* ══════════════════════════════════════
     Transform DB data → form-compatible
  ══════════════════════════════════════ */

  // Build price matrix from existing variants
  const priceMatrix = {};
  if (product.variants?.length) {
    product.variants.forEach((v) => {
      priceMatrix[`price_${v.dimension_id}_${v.thickness_id}`] = v.price;
    });
  }

  const productForForm = {
    // ID for edit mode detection
    id: product.id,

    // Basic fields
    slug: product.slug,
    name: product.name,
    name_en: product.name?.en || "",
    name_fr: product.name?.fr || "",
    name_ar: product.name?.ar || "",
    description: product.description,
    description_en: product.description?.en || "",
    description_fr: product.description?.fr || "",
    description_ar: product.description?.ar || "",

    // Category IDs — raw numbers from DB
    category_id: product.category_id || "",
    subcategory_id: product.subcategory_id || "",
    type_id: product.type_id || "",

    // Options
    discount: product.discount || 0,
    available: product.available ?? true,
    featured: product.featured ?? false,

    // Images — URL strings for existing uploads
    existingImages: product.images?.map((img) => img.url) || [],

    // Price matrix — flat object for RHF fields
    priceMatrix,

    // Specs
    specs:
      product.specs?.length > 0
        ? product.specs.map((s) => ({ label: s.label, value: s.value }))
        : [{ label: "", value: "" }],

    // Features — unwrap translations
    features:
      product.features?.length > 0
        ? product.features.map((f) => ({
            en: f.translations?.en || "",
            fr: f.translations?.fr || "",
            ar: f.translations?.ar || "",
          }))
        : [{ en: "", fr: "", ar: "" }],
  };

  return (
    <StyledUpdateProduct>
      <Header>
        <HeaderLeft>
          <BackButton onClick={moveBack} title="Go back">
            ←
          </BackButton>
          <HeaderText>
            <Heading>Edit Product</Heading>
            <HeaderSubtitle>
              Editing{" "}
              {product.name?.en ||
                product.name?.fr ||
                product.name?.ar ||
                "Product"}
            </HeaderSubtitle>
          </HeaderText>
        </HeaderLeft>
        <ProductIdBadge>ID: {product.id}</ProductIdBadge>
      </Header>

      <CreateProductForm
        productToEdit={productForForm}
        onCloseModal={() => navigate("/products")}
      />
    </StyledUpdateProduct>
  );
}

export default UpdateProduct;
