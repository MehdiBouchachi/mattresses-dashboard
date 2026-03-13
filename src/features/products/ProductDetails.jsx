// features/products/ProductDetails.jsx

import { useParams } from "react-router-dom";
import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  HiArrowLeft,
  HiCheck,
  HiXMark,
  HiStar,
  HiTag,
  HiCube,
  HiTableCells,
  HiWrenchScrewdriver,
  HiSparkles,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useProduct } from "./useProduct";
import { device } from "../../styles/breakpoints";

/* ═══════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════ */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

/* ═══════════════════════════════════════════
   LAYOUT
═══════════════════════════════════════════ */

const Page = styled.div`
  max-width: 108rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  animation: ${fadeIn} 0.4s ease-out;

  @media ${device.tablet} {
    gap: 2rem;
  }

  @media ${device.mobile} {
    gap: 1.6rem;
    overflow-x: hidden;
  }
`;

/* ── Top Navigation ── */

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.4rem;
  border: 1.5px solid var(--color-grey-200);
  border-radius: 0.8rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-600);
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &:hover {
    background-color: var(--color-grey-50);
    border-color: var(--color-grey-300);
    color: var(--color-grey-800);
  }

  @media ${device.mobile} {
    padding: 0.6rem 1rem;
    font-size: 1.2rem;
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  color: var(--color-grey-400);
  font-weight: 500;

  span {
    color: var(--color-grey-700);
    font-weight: 600;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

/* ── Language Toggle ── */

const LangToggle = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-grey-100);
  border-radius: 0.8rem;
  padding: 0.3rem;
  gap: 0.3rem;
`;

const LangButton = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: 0.6rem;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
  background-color: transparent;
  color: var(--color-grey-500);

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-grey-0);
      color: var(--color-brand-700);
      box-shadow: var(--shadow-sm);
    `}

  &:hover:not([disabled]) {
    color: var(--color-brand-600);
  }

  @media ${device.mobile} {
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
  }
`;

/* ── Hero Section ── */

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  animation: ${fadeIn} 0.5s ease-out 0.1s both;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media ${device.mobile} {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
`;

/* ── Image Gallery ── */

const GalleryCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 1.2rem;
  border: 1px solid var(--color-grey-100);
  overflow: hidden;
  box-shadow: var(--shadow-sm);

  @media ${device.mobile} {
    border-radius: 0.8rem;
  }
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: var(--color-grey-50);
  overflow: hidden;

  @media ${device.mobile} {
    aspect-ratio: 16 / 10;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  animation: ${scaleIn} 0.3s ease-out;
`;

const ImageNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  color: var(--color-grey-700);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover {
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  ${(props) =>
    props.$direction === "left"
      ? css`
          left: 1.2rem;
        `
      : css`
          right: 1.2rem;
        `}

  @media ${device.mobile} {
    width: 3.2rem;
    height: 3.2rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }

    ${(props) =>
      props.$direction === "left"
        ? css`
            left: 0.6rem;
          `
        : css`
            right: 0.6rem;
          `}
  }
`;

const ImageCounter = styled.span`
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  padding: 0.4rem 1rem;
  border-radius: 10rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
`;

const ThumbnailStrip = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 1.2rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-200);
    border-radius: 2px;
  }

  @media ${device.mobile} {
    padding: 0.8rem 1rem;
    gap: 0.8rem;
  }
`;

const Thumb = styled.button`
  width: 6.4rem;
  height: 5rem;
  border-radius: 0.6rem;
  border: 2px solid transparent;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: all 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${(props) =>
    props.$active &&
    css`
      border-color: var(--color-brand-600);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    `}

  &:hover:not([disabled]) {
    border-color: var(--color-brand-400);
  }

  @media ${device.mobile} {
    width: 5.6rem;
    height: 4.4rem;
    border-radius: 0.4rem;
  }
`;

/* ── Product Info Card ── */

const InfoCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 1.2rem;
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media ${device.tablet} {
    padding: 2rem;
  }

  @media ${device.mobile} {
    padding: 1.6rem;
    gap: 1.4rem;
    border-radius: 0.8rem;
  }
`;

const ProductTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-900);
  line-height: 1.3;
  word-break: break-word;

  @media ${device.mobile} {
    font-size: 2rem;
  }
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border-radius: 10rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.02em;

  svg {
    width: 1.3rem;
    height: 1.3rem;
  }

  ${(props) => {
    switch (props.$variant) {
      case "available":
        return css`
          background-color: var(--color-green-100);
          color: var(--color-green-700);
        `;
      case "unavailable":
        return css`
          background-color: var(--color-red-100);
          color: var(--color-red-700);
        `;
      case "featured":
        return css`
          background-color: var(--color-yellow-100);
          color: var(--color-yellow-700);
        `;
      case "discount":
        return css`
          background-color: var(--color-red-100);
          color: var(--color-red-700);
        `;
      default:
        return css`
          background-color: var(--color-grey-100);
          color: var(--color-grey-600);
        `;
    }
  }}
`;

const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  color: var(--color-grey-600);
  word-break: break-word;

  @media ${device.mobile} {
    font-size: 1.3rem;
    line-height: 1.6;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-100);
  margin: 0;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;

  @media ${device.mobile} {
    gap: 1.2rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`;

const MetaLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-grey-400);
  text-transform: uppercase;
  letter-spacing: 0.06em;

  @media ${device.mobile} {
    font-size: 1rem;
  }
`;

const MetaValue = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
  word-break: break-word;

  @media ${device.mobile} {
    font-size: 1.3rem;
  }
`;

const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.6rem;
  background: linear-gradient(
    135deg,
    var(--color-indigo-600),
    var(--color-indigo-100)
  );
  border-radius: 1rem;
  border: 1px solid var(--color-indigo-100);
  overflow: hidden;

  @media ${device.mobile} {
    padding: 1.2rem;
    border-radius: 0.8rem;
  }
`;

const PriceLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-brand-600);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const PriceValue = styled.span`
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-brand-700);
  word-break: break-word;

  @media ${device.mobile} {
    font-size: 1.6rem;
  }
`;

const PriceSuffix = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-brand-600);
  margin-left: 0.4rem;
`;

/* ── Content Sections ── */

const ContentSection = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 1.2rem;
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  animation: ${fadeIn} 0.4s ease-out ${(props) => props.$delay || "0.2s"} both;

  @media ${device.mobile} {
    border-radius: 0.8rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);

  @media ${device.mobile} {
    padding: 1.4rem 1.6rem;
    gap: 0.8rem;
  }
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 0.8rem;
  flex-shrink: 0;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  ${(props) => {
    const map = {
      blue: css`
        background-color: var(--color-blue-100);
        color: var(--color-blue-700);
      `,
      green: css`
        background-color: var(--color-green-100);
        color: var(--color-green-700);
      `,
      yellow: css`
        background-color: var(--color-yellow-100);
        color: var(--color-yellow-700);
      `,
      indigo: css`
        background-color: var(--color-indigo-100);
        color: var(--color-indigo-700);
      `,
    };
    return map[props.$color] || map.blue;
  }}

  @media ${device.mobile} {
    width: 3.2rem;
    height: 3.2rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-800);

  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-grey-400);

  @media ${device.mobile} {
    display: none;
  }
`;

const SectionCount = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.6rem;
  border-radius: 10rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-600);
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const SectionBody = styled.div`
  padding: 2rem 2.4rem;

  @media ${device.mobile} {
    padding: 1.2rem 1.6rem;
  }
`;

/* ── Variants — Desktop Table ── */

const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-200);
    border-radius: 3px;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 36rem;
  border-collapse: separate;
  border-spacing: 0;
`;

const Thead = styled.thead`
  th {
    padding: 1.2rem 1.4rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-grey-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-align: left;
    background-color: var(--color-grey-50);
    border-bottom: 2px solid var(--color-grey-100);
    white-space: nowrap;

    &:last-child {
      text-align: right;
    }
  }
`;

const Tbody = styled.tbody`
  tr {
    transition: background-color 0.15s;
    animation: ${slideIn} 0.3s ease-out both;

    &:hover {
      background-color: var(--color-grey-50);
    }

    &:not(:last-child) td {
      border-bottom: 1px solid var(--color-grey-100);
    }
  }

  td {
    padding: 1.2rem 1.4rem;
    font-size: 1.4rem;
    color: var(--color-grey-700);
    white-space: nowrap;

    &:last-child {
      text-align: right;
    }
  }
`;

const DimensionCell = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const ThicknessCell = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: 0.4rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);
  font-size: 1.2rem;
  font-weight: 600;
`;

const PriceCell = styled.span`
  font-weight: 700;
  color: var(--color-green-700);
  font-size: 1.5rem;
`;

const PriceCurrency = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-500);
  margin-left: 0.3rem;
`;

/* ── Variants — Mobile Cards ── */

const VariantCards = styled.div`
  display: none;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 1.6rem;
  }
`;

const VariantCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 1.4rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: 0.8rem;
  animation: ${fadeIn} 0.3s ease-out both;
  animation-delay: ${(props) => props.$delay || "0s"};
`;

const VariantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`;

const VariantDimension = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-grey-800);
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    width: 1.4rem;
    height: 1.4rem;
    color: var(--color-grey-400);
    flex-shrink: 0;
  }
`;

const VariantThickness = styled.span`
  font-size: 1.1rem;
  color: var(--color-grey-500);
  font-weight: 500;
`;

const VariantPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-green-700);
  white-space: nowrap;
  flex-shrink: 0;
`;

const VariantPriceCurrency = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-grey-500);
  margin-left: 0.2rem;
`;

/* ── Specs Table ── */

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }
`;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
  animation: ${slideIn} 0.25s ease-out both;
  animation-delay: ${(props) => props.$delay || "0s"};
  gap: 1.2rem;

  &:nth-child(odd) {
    background-color: var(--color-grey-50);
  }

  @media (min-width: 601px) {
    &:nth-child(odd) {
      border-right: 1px solid var(--color-grey-100);
    }
  }

  @media ${device.mobile} {
    padding: 1rem 1.2rem;
    gap: 0.8rem;
  }
`;

const SpecLabel = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  flex-shrink: 0;

  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;

const SpecValue = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-grey-800);
  text-align: right;
  word-break: break-word;

  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;

/* ── Features ── */

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 1.2rem;

  @media ${device.mobile} {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.4rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: 0.8rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  animation: ${fadeIn} 0.3s ease-out both;
  animation-delay: ${(props) => props.$delay || "0s"};

  &:hover {
    border-color: var(--color-brand-200);
    box-shadow: var(--shadow-sm);
  }

  @media ${device.mobile} {
    padding: 1.2rem;
    gap: 0.8rem;
  }
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background-color: var(--color-brand-100);
  color: var(--color-brand-700);
  flex-shrink: 0;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  @media ${device.mobile} {
    width: 2.4rem;
    height: 2.4rem;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const FeatureText = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-grey-700);
  line-height: 1.5;
  word-break: break-word;

  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;

/* ── Empty State ── */

const EmptySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.2rem 2rem;
  color: var(--color-grey-400);
  text-align: center;
  gap: 0.6rem;
`;

const EmptyIcon = styled.span`
  font-size: 2.4rem;
  opacity: 0.4;
`;

const EmptyText = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
`;

/* ═══════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════ */

function ProductDetails() {
  const { productId } = useParams();
  const { product, isLoading, error } = useProduct(productId);
  const [activeImage, setActiveImage] = useState(0);
  const [lang, setLang] = useState("en");
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  if (error || !product) {
    return (
      <Page>
        <TopBar>
          <BackButton onClick={moveBack}>
            <HiArrowLeft />
            <span>Back</span>
          </BackButton>
        </TopBar>
        <EmptySection>
          <EmptyIcon>😕</EmptyIcon>
          <EmptyText>Product not found</EmptyText>
        </EmptySection>
      </Page>
    );
  }

  /* ── Helpers ── */
  const images = product.images || [];
  const variants = product.variants || [];
  const specs = product.specs || [];
  const features = product.features || [];

  const getTranslation = (translations) =>
    translations?.[lang] ||
    translations?.en ||
    (translations ? Object.values(translations)[0] : "—");

  const getCategoryName = (cat) =>
    cat?.translations ? getTranslation(cat.translations) : "—";

  const prevImage = () =>
    setActiveImage((p) => (p > 0 ? p - 1 : images.length - 1));

  const nextImage = () =>
    setActiveImage((p) => (p < images.length - 1 ? p + 1 : 0));

  // Price range
  const prices = variants.map((v) => v.price).filter(Boolean);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const priceRangeText =
    minPrice === maxPrice
      ? `${minPrice.toLocaleString()}`
      : `${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}`;

  return (
    <Page>
      {/* ══════════════════════
         TOP BAR
      ══════════════════════ */}
      <TopBar>
        <TopBarLeft>
          <BackButton onClick={moveBack}>
            <HiArrowLeft />
            <span>Back</span>
          </BackButton>

          <Breadcrumb>
            Products / <span>{product.name}</span>
          </Breadcrumb>
        </TopBarLeft>

        <LangToggle>
          {["en", "fr", "ar"].map((l) => (
            <LangButton key={l} $active={lang === l} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </LangButton>
          ))}
        </LangToggle>
      </TopBar>

      {/* ══════════════════════
         HERO — Images + Info
      ══════════════════════ */}
      <HeroGrid>
        {/* ── Gallery ── */}
        <GalleryCard>
          <MainImageWrapper>
            {images.length > 0 ? (
              <>
                <MainImage
                  key={activeImage}
                  src={images[activeImage]?.url}
                  alt={`${product.name} - ${activeImage + 1}`}
                />

                {images.length > 1 && (
                  <>
                    <ImageNav $direction="left" onClick={prevImage}>
                      <HiChevronLeft />
                    </ImageNav>
                    <ImageNav $direction="right" onClick={nextImage}>
                      <HiChevronRight />
                    </ImageNav>
                  </>
                )}

                <ImageCounter>
                  {activeImage + 1} / {images.length}
                </ImageCounter>
              </>
            ) : (
              <EmptySection>
                <EmptyIcon>📷</EmptyIcon>
                <EmptyText>No images</EmptyText>
              </EmptySection>
            )}
          </MainImageWrapper>

          {images.length > 1 && (
            <ThumbnailStrip>
              {images.map((img, i) => (
                <Thumb
                  key={i}
                  $active={activeImage === i}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img.url} alt={`Thumb ${i + 1}`} />
                </Thumb>
              ))}
            </ThumbnailStrip>
          )}
        </GalleryCard>

        {/* ── Product Info ── */}
        <InfoCard>
          <div>
            <StatusRow>
              {product.available ? (
                <StatusBadge $variant="available">
                  <HiCheck /> Available
                </StatusBadge>
              ) : (
                <StatusBadge $variant="unavailable">
                  <HiXMark /> Unavailable
                </StatusBadge>
              )}

              {product.featured && (
                <StatusBadge $variant="featured">
                  <HiStar /> Featured
                </StatusBadge>
              )}

              {product.discount > 0 && (
                <StatusBadge $variant="discount">
                  <HiTag /> {product.discount}% OFF
                </StatusBadge>
              )}
            </StatusRow>
          </div>

          <ProductTitle>{product.name}</ProductTitle>

          {product.description && (
            <Description>{product.description}</Description>
          )}

          <Divider />

          <MetaGrid>
            <MetaItem>
              <MetaLabel>Category</MetaLabel>
              <MetaValue>{getCategoryName(product.category)}</MetaValue>
            </MetaItem>

            <MetaItem>
              <MetaLabel>Subcategory</MetaLabel>
              <MetaValue>
                {product.subcategory
                  ? getCategoryName(product.subcategory)
                  : "—"}
              </MetaValue>
            </MetaItem>

            <MetaItem>
              <MetaLabel>Variants</MetaLabel>
              <MetaValue>{variants.length} options</MetaValue>
            </MetaItem>

            <MetaItem>
              <MetaLabel>Product ID</MetaLabel>
              <MetaValue>#{product.id}</MetaValue>
            </MetaItem>
          </MetaGrid>

          {prices.length > 0 && (
            <PriceRange>
              <PriceLabel>Price Range</PriceLabel>
              <div>
                <PriceValue>{priceRangeText}</PriceValue>
                <PriceSuffix>DA</PriceSuffix>
              </div>
            </PriceRange>
          )}
        </InfoCard>
      </HeroGrid>

      {/* ══════════════════════
         VARIANTS
      ══════════════════════ */}
      {variants.length > 0 && (
        <ContentSection $delay="0.25s">
          <SectionHeader>
            <SectionIcon $color="blue">
              <HiTableCells />
            </SectionIcon>
            <SectionTitleGroup>
              <SectionTitle>Dimensions & Prices</SectionTitle>
              <SectionSubtitle>
                All available size and thickness options
              </SectionSubtitle>
            </SectionTitleGroup>
            <SectionCount>{variants.length}</SectionCount>
          </SectionHeader>

          <SectionBody style={{ padding: 0 }}>
            {/* Desktop table */}
            <TableScroll>
              <Table>
                <Thead>
                  <tr>
                    <th>#</th>
                    <th>Dimension</th>
                    <th>Thickness</th>
                    <th>Price</th>
                  </tr>
                </Thead>
                <Tbody>
                  {variants.map((v, i) => (
                    <tr key={v.id} style={{ animationDelay: `${0.05 * i}s` }}>
                      <td>
                        <span
                          style={{
                            color: "var(--color-grey-400)",
                            fontSize: "1.2rem",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </td>
                      <td>
                        <DimensionCell>
                          <HiCube
                            style={{
                              width: "1.4rem",
                              height: "1.4rem",
                              color: "var(--color-grey-400)",
                            }}
                          />
                          {v.dimension?.label || "—"}
                        </DimensionCell>
                      </td>
                      <td>
                        <ThicknessCell>
                          {v.thickness?.value || "—"} cm
                        </ThicknessCell>
                      </td>
                      <td>
                        <PriceCell>
                          {v.price?.toLocaleString()}
                          <PriceCurrency>DA</PriceCurrency>
                        </PriceCell>
                      </td>
                    </tr>
                  ))}
                </Tbody>
              </Table>
            </TableScroll>

            {/* Mobile cards */}
            <VariantCards>
              {variants.map((v, i) => (
                <VariantCard key={v.id} $delay={`${0.05 * i}s`}>
                  <VariantInfo>
                    <VariantDimension>
                      <HiCube />
                      {v.dimension?.label || "—"}
                    </VariantDimension>
                    <VariantThickness>
                      Thickness: {v.thickness?.value || "—"} cm
                    </VariantThickness>
                  </VariantInfo>
                  <VariantPrice>
                    {v.price?.toLocaleString()}
                    <VariantPriceCurrency>DA</VariantPriceCurrency>
                  </VariantPrice>
                </VariantCard>
              ))}
            </VariantCards>
          </SectionBody>
        </ContentSection>
      )}

      {/* ══════════════════════
         SPECIFICATIONS
      ══════════════════════ */}
      {specs.length > 0 && (
        <ContentSection $delay="0.3s">
          <SectionHeader>
            <SectionIcon $color="indigo">
              <HiWrenchScrewdriver />
            </SectionIcon>
            <SectionTitleGroup>
              <SectionTitle>Technical Specifications</SectionTitle>
              <SectionSubtitle>Detailed product specifications</SectionSubtitle>
            </SectionTitleGroup>
            <SectionCount>{specs.length}</SectionCount>
          </SectionHeader>

          <SectionBody style={{ padding: 0 }}>
            <SpecsGrid>
              {specs.map((s, i) => (
                <SpecRow key={i} $delay={`${0.04 * i}s`}>
                  <SpecLabel>{s.label}</SpecLabel>
                  <SpecValue>{s.value}</SpecValue>
                </SpecRow>
              ))}
            </SpecsGrid>
          </SectionBody>
        </ContentSection>
      )}

      {/* ══════════════════════
         FEATURES
      ══════════════════════ */}
      {features.length > 0 && (
        <ContentSection $delay="0.35s">
          <SectionHeader>
            <SectionIcon $color="yellow">
              <HiSparkles />
            </SectionIcon>
            <SectionTitleGroup>
              <SectionTitle>Why Choose This Product</SectionTitle>
              <SectionSubtitle>Key features and benefits</SectionSubtitle>
            </SectionTitleGroup>
            <SectionCount>{features.length}</SectionCount>
          </SectionHeader>

          <SectionBody>
            <FeaturesGrid>
              {features.map((f, i) => {
                const text = getTranslation(f.translations);
                if (!text || text === "—") return null;

                return (
                  <FeatureCard key={i} $delay={`${0.05 * i}s`}>
                    <FeatureIcon>
                      <HiCheck />
                    </FeatureIcon>
                    <FeatureText>{text}</FeatureText>
                  </FeatureCard>
                );
              })}
            </FeaturesGrid>
          </SectionBody>
        </ContentSection>
      )}
    </Page>
  );
}

export default ProductDetails;
