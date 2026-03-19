// features/products/CreateProductForm.jsx — COMPLETE FIXED VERSION

import { useEffect, useMemo, useCallback, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { useCategories } from "../categories/useCategories";
import { useDimensions } from "./useDimensions";
import { useThicknesses } from "./useThicknesses";
import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import {
  FiEdit3,
  FiPlus,
  FiFileText,
  FiImage,
  FiDollarSign,
  FiSettings,
  FiStar,
  FiUploadCloud,
  FiX,
  FiInfo,
  FiAlertTriangle,
  FiCamera,
  FiLoader,
} from "react-icons/fi";
/* ═══════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════ */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
`;

/* ═══════════════════════════════════════════
   STYLED COMPONENTS
═══════════════════════════════════════════ */

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem;
  background-color: var(--color-grey-0);
  border-radius: 1.2rem;

  width: 100%;
  max-width: none;
  margin: 0;

  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 768px) {
    padding: 1.6rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    gap: 1.6rem;
  }
`;
const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const FormTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-800);
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const FormBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1.2rem;
  border-radius: 10rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  ${(props) =>
    props.$variant === "edit"
      ? css`
          background-color: var(--color-yellow-100);
          color: var(--color-yellow-700);
        `
      : css`
          background-color: var(--color-green-100);
          color: var(--color-green-700);
        `}
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StepDot = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.4rem;
  border: 1.5px solid transparent;
  border-radius: 10rem;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.25s ease;
  background-color: transparent;
  color: var(--color-grey-500);

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-700);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-50);
      color: var(--color-brand-700);
      border-color: var(--color-brand-200);
      font-weight: 600;
    `}

  @media (max-width: 600px) {
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
  }
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
  background-color: var(--color-grey-200);
  color: var(--color-grey-600);
  transition: all 0.25s ease;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: #fff;
    `}
`;

const StepConnector = styled.div`
  width: 2rem;
  height: 1.5px;
  background-color: var(--color-grey-200);
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 1rem;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.8rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  animation: ${fadeIn} 0.35s ease-out;
  animation-fill-mode: both;
  animation-delay: ${(props) => props.$delay || "0s"};

  &:hover {
    border-color: var(--color-grey-300);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.6rem;
    gap: 1.6rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  font-size: 1.8rem;
  flex-shrink: 0;

  ${(props) => {
    const colors = {
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
    return colors[props.$color] || colors.blue;
  }}

  @media (max-width: 480px) {
    width: 3.4rem;
    height: 3.4rem;
    font-size: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--color-grey-800);

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  margin-top: 0.2rem;
`;

const SectionCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.6rem;
  border-radius: 10rem;
  background-color: var(--color-grey-200);
  color: var(--color-grey-600);
  font-size: 1.1rem;
  font-weight: 700;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$cols || "repeat(auto-fit, minmax(28rem, 1fr))"};
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    gap: 1.6rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const RequiredStar = styled.span`
  color: var(--color-red-700);
  font-weight: 700;
`;

const LangTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.1rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-left: auto;

  ${(props) => {
    switch (props.$lang) {
      case "en":
        return css`
          background-color: var(--color-blue-100);
          color: var(--color-blue-700);
        `;
      case "fr":
        return css`
          background-color: var(--color-indigo-100);
          color: var(--color-indigo-700);
        `;
      case "ar":
        return css`
          background-color: var(--color-green-100);
          color: var(--color-green-700);
        `;
      default:
        return css`
          background-color: var(--color-grey-200);
          color: var(--color-grey-600);
        `;
    }
  }}
`;

const inputBase = css`
  padding: 1.1rem 1.4rem;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 0.8rem;
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
  color: var(--color-grey-800);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover:not(:disabled) {
    border-color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
  }

  &::placeholder {
    color: var(--color-grey-400);
    font-weight: 400;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-grey-100);
  }
`;

const Input = styled.input`
  ${inputBase}
`;

const Textarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 10rem;
  line-height: 1.6;
`;

const Select = styled.select`
  ${inputBase}
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.2rem;
  color: var(--color-red-700);
  font-weight: 500;
  animation: ${fadeIn} 0.2s ease-out;

  &::before {
    content: "⚠";
    font-size: 1.1rem;
  }
`;

/* ── Toggle ── */

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  flex-wrap: wrap;
  padding: 1.2rem 0;
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  user-select: none;
`;

const ToggleTrack = styled.div`
  position: relative;
  width: 4.4rem;
  height: 2.4rem;
  border-radius: 10rem;
  background-color: var(--color-grey-300);
  transition: background-color 0.25s ease;
  flex-shrink: 0;

  ${(props) =>
    props.$checked &&
    css`
      background-color: var(--color-brand-600);
    `}
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s ease;

  ${(props) =>
    props.$checked &&
    css`
      transform: translateX(2rem);
    `}
`;

const ToggleLabel = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

/* ── Images ── */

const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DropZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 3.2rem 2rem;
  border: 2px dashed var(--color-grey-300);
  border-radius: 1rem;
  background-color: var(--color-grey-0);
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;

  &:hover {
    border-color: var(--color-brand-400);
    background-color: var(--color-brand-50);
  }

  ${(props) =>
    props.$dragActive &&
    css`
      border-color: var(--color-brand-500);
      background-color: var(--color-brand-50);
      animation: ${pulseRing} 1.5s infinite;
    `}

  @media (max-width: 480px) {
    padding: 2.4rem 1.6rem;
  }
`;

const DropZoneIcon = styled.div`
  font-size: 3.2rem;
  line-height: 1;
`;

const DropZoneText = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-weight: 500;

  span {
    color: var(--color-brand-600);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const DropZoneHint = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-400);
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1.2rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
    gap: 0.8rem;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 2px solid var(--color-grey-200);
  transition:
    border-color 0.2s,
    transform 0.2s;

  &:hover {
    border-color: var(--color-grey-400);
    transform: scale(1.02);
  }

  ${(props) =>
    props.$isMain &&
    css`
      border-color: var(--color-brand-500);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
    `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.2s;

  ${ImagePreview}:hover & {
    opacity: 1;
  }
`;

const ImageBadge = styled.span`
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  background-color: var(--color-brand-600);
  color: #fff;
  font-size: 0.9rem;
  padding: 0.2rem 0.7rem;
  border-radius: 0.4rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  z-index: 2;
`;

const RemoveImageBtn = styled.button`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 2;
  opacity: 0;
  transition:
    opacity 0.2s,
    background-color 0.2s;

  ${ImagePreview}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: var(--color-red-700);
  }
`;

const ImageFileName = styled.span`
  position: absolute;
  bottom: 0.4rem;
  left: 0.4rem;
  right: 0.4rem;
  font-size: 1rem;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  z-index: 2;
  transition: opacity 0.2s;

  ${ImagePreview}:hover & {
    opacity: 1;
  }
`;

const EmptyState = styled.div`
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
  font-size: 2.8rem;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
`;

/* ── Price Matrix ── */

const MatrixContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MatrixToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const MatrixStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const MatrixStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  color: var(--color-grey-600);
  font-weight: 500;
`;

const MatrixStatValue = styled.span`
  font-weight: 700;
  color: var(--color-brand-700);
`;

const MatrixActionBtn = styled.button`
  padding: 0.5rem 1.2rem;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 0.6rem;
  background-color: var(--color-grey-0);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-grey-600);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-brand-400);
    color: var(--color-brand-600);
    background-color: var(--color-brand-50);
  }
`;

const MatrixWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1.5px solid var(--color-grey-200);
  border-radius: 0.8rem;
  background-color: var(--color-grey-0);

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 0 0 0.8rem 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 3px;
  }
`;

const MatrixTable = styled.table`
  width: 100%;
  min-width: 50rem;
  border-collapse: separate;
  border-spacing: 0;

  th,
  td {
    padding: 1rem 1.2rem;
    text-align: center;
    font-size: 1.3rem;
    border-bottom: 1px solid var(--color-grey-100);
    border-right: 1px solid var(--color-grey-100);

    &:last-child {
      border-right: none;
    }
  }

  thead th {
    background-color: var(--color-grey-50);
    font-weight: 700;
    color: var(--color-grey-700);
    white-space: nowrap;
    position: sticky;
    top: 0;
    z-index: 1;
    border-bottom: 2px solid var(--color-grey-200);
    font-size: 1.2rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  tbody tr {
    transition: background-color 0.15s;

    &:hover {
      background-color: var(--color-brand-50);
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  td:first-child {
    background-color: var(--color-grey-50);
    font-weight: 700;
    color: var(--color-grey-700);
    text-align: left;
    white-space: nowrap;
    position: sticky;
    left: 0;
    z-index: 1;
    border-right: 2px solid var(--color-grey-200);
    font-size: 1.3rem;
  }

  thead th:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }
`;

const PriceInput = styled.input`
  width: 100%;
  min-width: 9rem;
  padding: 0.8rem 1rem;
  border: 1.5px solid var(--color-grey-200);
  border-radius: 0.6rem;
  text-align: right;
  font-size: 1.3rem;
  font-weight: 500;
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    background-color: #fff;
  }

  &::placeholder {
    color: var(--color-grey-300);
  }

  ${(props) =>
    props.$hasValue &&
    css`
      background-color: var(--color-green-100);
      border-color: var(--color-green-700);
      color: var(--color-green-700);
      font-weight: 600;

      &:focus {
        border-color: var(--color-brand-500);
        background-color: #fff;
        color: var(--color-grey-800);
      }
    `}
`;

const MatrixHint = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  padding: 0.8rem 1.2rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 0.6rem;
`;

/* ── Dynamic Rows ── */

const DynamicRowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const DynamicRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.6rem;
  background-color: var(--color-grey-0);
  border: 1.5px solid var(--color-grey-200);
  border-radius: 0.8rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  animation: ${fadeIn} 0.25s ease-out;

  &:hover {
    border-color: var(--color-grey-300);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.4rem;
  }
`;

const DynamicRowNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DynamicRowFields = styled.div`
  display: flex;
  gap: 1.2rem;
  flex: 1;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const DynamicRowInput = styled(Input)`
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AddRowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1.2rem 2rem;
  border: 2px dashed var(--color-grey-300);
  border-radius: 0.8rem;
  background-color: transparent;
  color: var(--color-grey-500);
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: var(--color-brand-400);
    color: var(--color-brand-600);
    background-color: var(--color-brand-50);
  }
`;

const RemoveRowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border: none;
  border-radius: 0.6rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
  font-size: 1.6rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
  margin-top: 0.2rem;

  &:hover {
    background-color: var(--color-red-100);
    color: var(--color-red-700);
  }

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

/* ── Footer ── */

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 2rem 0 0;
  border-top: 1.5px solid var(--color-grey-200);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FooterLeft = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-400);
  font-style: italic;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const FooterActions = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column-reverse;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 2.8rem;
  border: none;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 1.3rem 2rem;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(
    135deg,
    var(--color-brand-600),
    var(--color-brand-700)
  );
  color: #fff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);

  &:hover:not(:disabled) {
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
    transform: translateY(-1px);
  }
`;

const CancelButton = styled(Button)`
  background-color: var(--color-grey-0);
  color: var(--color-grey-600);
  border: 1.5px solid var(--color-grey-300);

  &:hover:not(:disabled) {
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-400);
  }
`;

const SpinnerIcon = styled.span`
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem;
  max-width: 116rem;
  margin: 0 auto;
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

/* ═══════════════════════════════════════════
   STEPS CONFIG
═══════════════════════════════════════════ */

const STEPS = [
  { id: "basic", label: "Basic Info" },
  { id: "images", label: "Images" },
  { id: "pricing", label: "Pricing" },
  { id: "specs", label: "Specs" },
  { id: "features", label: "Features" },
];

/* ═══════════════════════════════════════════
   TOGGLE COMPONENT
═══════════════════════════════════════════ */

function ToggleField({ label, checked, onChange, disabled }) {
  return (
    <ToggleSwitch>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <ToggleTrack $checked={checked}>
        <ToggleThumb $checked={checked} />
      </ToggleTrack>
      <ToggleLabel>{label}</ToggleLabel>
    </ToggleSwitch>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */

function CreateProductForm({ productToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState("basic");
  const [dragActive, setDragActive] = useState(false);

  /* ── Data Fetching ── */
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { dimensions, isLoading: isLoadingDimensions } = useDimensions();
  const { thicknesses, isLoading: isLoadingThicknesses } = useThicknesses();

  /* ── Mutations ── */
  const { createProduct, isCreating } = useCreateProduct();
  const { editProduct, isEditing } = useUpdateProduct();
  const isWorking = isCreating || isEditing;

  /* ── Category Tree ── */
  const topCategories = useMemo(
    () => categories.filter((c) => !c.parent_id),
    [categories],
  );

  /* ═══════════════════════════════════════════
     DEFAULT VALUES — THE KEY FIX
  ═══════════════════════════════════════════ */

  const defaultValues = useMemo(() => {
    if (isEditSession) {
      // Build price matrix from variants
      const priceDefaults = {};
      if (editValues.priceMatrix) {
        Object.entries(editValues.priceMatrix).forEach(([key, val]) => {
          priceDefaults[key] = val;
        });
      }

      return {
        name_en: editValues.name_en || editValues.name || "",
        name_fr: editValues.name_fr || "",
        name_ar: editValues.name_ar || "",
        description_en:
          editValues.description_en || editValues.description || "",
        description_fr: editValues.description_fr || "",
        description_ar: editValues.description_ar || "",

        // Convert to strings for <select> elements
        category_id: String(editValues.category_id || ""),
        subcategory_id: String(editValues.subcategory_id || ""),
        type_id: String(editValues.type_id || ""),

        discount: editValues.discount || 0,
        available: editValues.available ?? true,
        featured: editValues.featured ?? false,

        // IMAGES: existing URLs as strings
        _imageFiles: editValues.existingImages || [],

        specs: editValues.specs?.length
          ? editValues.specs
          : [{ label: "", value: "" }],

        features: editValues.features?.length
          ? editValues.features
          : [{ en: "", fr: "", ar: "" }],

        // PRICE MATRIX: spread all price_X_Y fields
        ...priceDefaults,
      };
    }

    return {
      name_en: "",
      name_fr: "",
      name_ar: "",
      description_en: "",
      description_fr: "",
      description_ar: "",
      category_id: "",
      subcategory_id: "",
      type_id: "",
      discount: 0,
      available: true,
      featured: false,
      _imageFiles: [],
      specs: [{ label: "", value: "" }],
      features: [{ en: "", fr: "", ar: "" }],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditSession]);

  /* ── React Hook Form ── */
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({ control, name: "specs" });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: "features" });

  /* ── Category Cascading ── */
  const watchCategory = watch("category_id");
  const watchSubcategory = watch("subcategory_id");

  const subcategories = useMemo(
    () =>
      watchCategory
        ? categories.filter((c) => c.parent_id === Number(watchCategory))
        : [],
    [categories, watchCategory],
  );

  const types = useMemo(
    () =>
      watchSubcategory
        ? categories.filter((c) => c.parent_id === Number(watchSubcategory))
        : [],
    [categories, watchSubcategory],
  );

  /* ── IMPORTANT: Only reset children on USER changes, not initial load ── */
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    setValue("subcategory_id", "");
    setValue("type_id", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCategory, setValue]);

  useEffect(() => {
    if (initialLoad) return;
    setValue("type_id", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSubcategory, setValue]);

  /* ── Image Handling ── */
  const handleImageChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      const currentFiles = watch("_imageFiles") || [];
      setValue("_imageFiles", [...currentFiles, ...files]);
    },
    [setValue, watch],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (files.length) {
        const currentFiles = watch("_imageFiles") || [];
        setValue("_imageFiles", [...currentFiles, ...files]);
      }
    },
    [setValue, watch],
  );

  const removeImage = useCallback(
    (index) => {
      const current = watch("_imageFiles") || [];
      setValue(
        "_imageFiles",
        current.filter((_, i) => i !== index),
      );
    },
    [setValue, watch],
  );

  /* ── Price Matrix Stats ── */
  const allPriceKeys = useMemo(
    () =>
      dimensions.flatMap((dim) =>
        thicknesses.map((thick) => `price_${dim.id}_${thick.id}`),
      ),
    [dimensions, thicknesses],
  );

  const watchedPrices = watch(allPriceKeys);

  const filledVariantCount = useMemo(
    () =>
      watchedPrices
        ? Object.values(watchedPrices).filter((v) => v && Number(v) > 0).length
        : 0,
    [watchedPrices],
  );

  const clearAllPrices = useCallback(() => {
    allPriceKeys.forEach((key) => setValue(key, ""));
  }, [allPriceKeys, setValue]);

  /* ── Slug Generator ── */
  const generateSlug = useCallback((name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }, []);

  /* ── Scroll to section ── */
  const scrollToSection = useCallback((id) => {
    setActiveStep(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ══════════════════════
     SUBMIT
  ══════════════════════ */

  function onSubmit(data) {
    const variants = [];
    dimensions.forEach((dim) => {
      thicknesses.forEach((thick) => {
        const key = `price_${dim.id}_${thick.id}`;
        const price = data[key];
        if (price && Number(price) > 0) {
          variants.push({
            dimension_id: dim.id,
            thickness_id: thick.id,
            price: Number(price),
          });
        }
      });
    });

    if (variants.length === 0) {
      scrollToSection("pricing");
      return;
    }

    // Images: mix of URL strings (existing) and File objects (new uploads)
    const images = data._imageFiles || [];
    const specs = (data.specs || []).filter((s) => s.label && s.value);
    const features = (data.features || []).filter((f) => f.en || f.fr || f.ar);

    const payload = {
      slug: generateSlug(data.name_en),
      name_en: data.name_en,
      name_fr: data.name_fr,
      name_ar: data.name_ar,
      description_en: data.description_en,
      description_fr: data.description_fr,
      description_ar: data.description_ar,
      category_id: Number(data.category_id) || null,
      subcategory_id: Number(data.subcategory_id) || null,
      type_id: Number(data.type_id) || null,
      discount: Number(data.discount) || 0,
      available: data.available,
      featured: data.featured,
      images,
      variants,
      specs,
      features,
    };

    if (isEditSession) {
      editProduct(
        { newProduct: payload, id: editId },
        {
          onSuccess: () => {
            reset();
            if (onCloseModal) onCloseModal();
            else navigate("/products");
          },
        },
      );
    } else {
      createProduct(payload, {
        onSuccess: () => {
          reset();
          if (onCloseModal) onCloseModal();
          else navigate("/products");
        },
      });
    }
  }

  function onError(errors) {
    console.error("Form errors:", errors);
    if (errors.name_en || errors.category_id) scrollToSection("basic");
  }

  /* ── Loading ── */
  if (isLoadingCategories || isLoadingDimensions || isLoadingThicknesses) {
    return (
      <SkeletonWrapper>
        <SkeletonBlock $height="6rem" />
        <SkeletonBlock $height="36rem" />
        <SkeletonBlock $height="16rem" />
        <SkeletonBlock $height="28rem" />
      </SkeletonWrapper>
    );
  }

  /* ══════════════════════
     RENDER
  ══════════════════════ */

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* ── Header ── */}
      <FormHeader>
        <FormTitle>
          {isEditSession ? "Edit Product" : "Create New Product"}
          <FormBadge $variant={isEditSession ? "edit" : "new"}>
            {isEditSession ? (
              <>
                <FiEdit3 /> Editing
              </>
            ) : (
              <>
                <FiPlus /> New
              </>
            )}
          </FormBadge>
        </FormTitle>
      </FormHeader>

      {/* ── Steps ── */}
      <StepIndicator>
        {STEPS.map((step, i) => (
          <span key={step.id} style={{ display: "contents" }}>
            {i > 0 && <StepConnector />}
            <StepDot
              type="button"
              $active={activeStep === step.id}
              onClick={() => scrollToSection(step.id)}
            >
              <StepNumber $active={activeStep === step.id}>{i + 1}</StepNumber>
              {step.label}
            </StepDot>
          </span>
        ))}
      </StepIndicator>

      {/* ═══════════════════════════
         SECTION 1 — BASIC INFO
      ═══════════════════════════ */}
      <Section id="section-basic" $delay="0.05s">
        <SectionHeader>
          <SectionTitleGroup>
            <SectionIcon $color="blue">
              <FiFileText />
            </SectionIcon>
            <div>
              <SectionTitle>Basic Information</SectionTitle>
              <SectionSubtitle>
                Product name, description, and classification
              </SectionSubtitle>
            </div>
          </SectionTitleGroup>
        </SectionHeader>

        <FieldGrid>
          <FieldGroup>
            <Label>
              Product Name <RequiredStar>*</RequiredStar>
              <LangTag $lang="en">EN</LangTag>
            </Label>
            <Input
              placeholder="e.g. Classic Comfort Mattress"
              disabled={isWorking}
              {...register("name_en", {
                required: "English name is required",
              })}
            />
            {errors?.name_en && (
              <ErrorMessage>{errors.name_en.message}</ErrorMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label>
              Product Name <LangTag $lang="fr">FR</LangTag>
            </Label>
            <Input
              placeholder="e.g. Matelas Confort Classique"
              disabled={isWorking}
              {...register("name_fr")}
            />
          </FieldGroup>

          <FieldGroup>
            <Label>
              Product Name <LangTag $lang="ar">AR</LangTag>
            </Label>
            <Input
              dir="rtl"
              placeholder="e.g. فراش كلاسيكي مريح"
              disabled={isWorking}
              {...register("name_ar")}
            />
          </FieldGroup>
        </FieldGrid>

        <FieldGrid>
          <FieldGroup>
            <Label>
              Description <LangTag $lang="en">EN</LangTag>
            </Label>
            <Textarea
              placeholder="Product description in English..."
              disabled={isWorking}
              {...register("description_en")}
            />
          </FieldGroup>

          <FieldGroup>
            <Label>
              Description <LangTag $lang="fr">FR</LangTag>
            </Label>
            <Textarea
              placeholder="Description du produit en français..."
              disabled={isWorking}
              {...register("description_fr")}
            />
          </FieldGroup>

          <FieldGroup>
            <Label>
              Description <LangTag $lang="ar">AR</LangTag>
            </Label>
            <Textarea
              dir="rtl"
              placeholder="وصف المنتج بالعربية..."
              disabled={isWorking}
              {...register("description_ar")}
            />
          </FieldGroup>
        </FieldGrid>

        <FieldGrid>
          <FieldGroup>
            <Label>
              Category <RequiredStar>*</RequiredStar>
            </Label>
            <Select
              disabled={isWorking}
              {...register("category_id", {
                required: "Category is required",
              })}
            >
              <option value="">— Select Category —</option>
              {topCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.translations?.en || cat.value}
                </option>
              ))}
            </Select>
            {errors?.category_id && (
              <ErrorMessage>{errors.category_id.message}</ErrorMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label>Subcategory</Label>
            <Select
              disabled={isWorking || !watchCategory}
              {...register("subcategory_id")}
            >
              <option value="">
                {!watchCategory
                  ? "— Select category first —"
                  : subcategories.length === 0
                    ? "— No subcategories —"
                    : "— Select Subcategory —"}
              </option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.translations?.en || sub.value}
                </option>
              ))}
            </Select>
          </FieldGroup>

          <FieldGroup>
            <Label>Type</Label>
            <Select
              disabled={isWorking || !watchSubcategory}
              {...register("type_id")}
            >
              <option value="">
                {!watchSubcategory
                  ? "— Select subcategory first —"
                  : types.length === 0
                    ? "— No types —"
                    : "— Select Type —"}
              </option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.translations?.en || t.value}
                </option>
              ))}
            </Select>
          </FieldGroup>
        </FieldGrid>

        <FieldGrid $cols="1fr 2fr">
          <FieldGroup>
            <Label>Discount (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              placeholder="0"
              disabled={isWorking}
              {...register("discount", {
                min: { value: 0, message: "Cannot be negative" },
                max: { value: 100, message: "Cannot exceed 100" },
              })}
            />
            {errors?.discount && (
              <ErrorMessage>{errors.discount.message}</ErrorMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label>Product Options</Label>
            <ToggleRow>
              <Controller
                control={control}
                name="available"
                render={({ field }) => (
                  <ToggleField
                    label="Available for sale"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isWorking}
                  />
                )}
              />
              <Controller
                control={control}
                name="featured"
                render={({ field }) => (
                  <ToggleField
                    label="Featured product"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isWorking}
                  />
                )}
              />
            </ToggleRow>
          </FieldGroup>
        </FieldGrid>
      </Section>

      {/* ═══════════════════════════
         SECTION 2 — IMAGES
      ═══════════════════════════ */}
      <Section id="section-images" $delay="0.1s">
        <SectionHeader>
          <SectionTitleGroup>
            <SectionIcon $color="green">
              <FiImage />
            </SectionIcon>
            <div>
              <SectionTitle>Product Images</SectionTitle>
              <SectionSubtitle>
                Upload product photos — first image is the main thumbnail
              </SectionSubtitle>
            </div>
          </SectionTitleGroup>
          <Controller
            control={control}
            name="_imageFiles"
            defaultValue={[]}
            render={({ field: { value } }) =>
              value?.length > 0 ? (
                <SectionCount>{value.length}</SectionCount>
              ) : null
            }
          />
        </SectionHeader>

        <ImageUploadArea>
          <DropZone
            htmlFor="product-images-upload"
            $dragActive={dragActive}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <DropZoneIcon>
              <FiUploadCloud />
            </DropZoneIcon>
            <DropZoneText>
              Drag & drop images here or <span>browse files</span>
            </DropZoneText>
            <DropZoneHint>PNG, JPG, WebP up to 5MB each</DropZoneHint>
            <HiddenFileInput
              id="product-images-upload"
              type="file"
              accept="image/*"
              multiple
              disabled={isWorking}
              onChange={handleImageChange}
            />
          </DropZone>

          <Controller
            control={control}
            name="_imageFiles"
            defaultValue={[]}
            render={({ field: { value } }) =>
              value?.length > 0 ? (
                <ImagePreviewGrid>
                  {value.map((file, idx) => {
                    // Handle both URL strings (existing) and File objects (new)
                    const src =
                      typeof file === "string"
                        ? file
                        : file instanceof File
                          ? URL.createObjectURL(file)
                          : null;

                    if (!src) return null;

                    return (
                      <ImagePreview key={idx} $isMain={idx === 0}>
                        <img src={src} alt={`Preview ${idx + 1}`} />
                        <ImageOverlay />
                        {idx === 0 && <ImageBadge>Main</ImageBadge>}
                        <RemoveImageBtn
                          type="button"
                          onClick={() => removeImage(idx)}
                        >
                          ×
                        </RemoveImageBtn>
                        <ImageFileName>
                          {typeof file === "string"
                            ? "Existing image"
                            : file.name}
                        </ImageFileName>
                      </ImagePreview>
                    );
                  })}
                </ImagePreviewGrid>
              ) : (
                <EmptyState>
                  <EmptyIcon>
                    <FiCamera />
                  </EmptyIcon>
                  <EmptyText>No images uploaded yet</EmptyText>
                </EmptyState>
              )
            }
          />
        </ImageUploadArea>
      </Section>

      {/* ═══════════════════════════
         SECTION 3 — PRICE MATRIX
      ═══════════════════════════ */}
      <Section id="section-pricing" $delay="0.15s">
        <SectionHeader>
          <SectionTitleGroup>
            <SectionIcon $color="yellow">
              <FiDollarSign />
            </SectionIcon>
            <div>
              <SectionTitle>Price Matrix</SectionTitle>
              <SectionSubtitle>
                Set prices for each dimension × thickness combination
              </SectionSubtitle>
            </div>
          </SectionTitleGroup>
          {filledVariantCount > 0 && (
            <SectionCount>{filledVariantCount}</SectionCount>
          )}
        </SectionHeader>

        <MatrixContainer>
          <MatrixToolbar>
            <MatrixStats>
              <MatrixStat>
                Variants filled:{" "}
                <MatrixStatValue>{filledVariantCount}</MatrixStatValue>
              </MatrixStat>
              <MatrixStat>
                Total possible:{" "}
                <MatrixStatValue>
                  {dimensions.length * thicknesses.length}
                </MatrixStatValue>
              </MatrixStat>
            </MatrixStats>
            <MatrixActionBtn type="button" onClick={clearAllPrices}>
              Clear All
            </MatrixActionBtn>
          </MatrixToolbar>

          <MatrixWrapper>
            <MatrixTable>
              <thead>
                <tr>
                  <th>Dimension</th>
                  {thicknesses.map((thick) => (
                    <th key={thick.id}>{thick.value} cm</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dimensions.map((dim) => (
                  <tr key={dim.id}>
                    <td>{dim.label}</td>
                    {thicknesses.map((thick) => {
                      const fieldName = `price_${dim.id}_${thick.id}`;
                      const currentValue = watch(fieldName);
                      return (
                        <td key={thick.id}>
                          <PriceInput
                            type="number"
                            min="0"
                            step="100"
                            placeholder="—"
                            disabled={isWorking}
                            $hasValue={currentValue && Number(currentValue) > 0}
                            {...register(fieldName)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </MatrixTable>
          </MatrixWrapper>

          <MatrixHint>
            <FiInfo />
            Leave cells empty for unavailable combinations. At least one price
            is required.
          </MatrixHint>
        </MatrixContainer>
      </Section>

      {/* ═══════════════════════════
         SECTION 4 — SPECS
      ═══════════════════════════ */}
      <Section id="section-specs" $delay="0.2s">
        <SectionHeader>
          <SectionTitleGroup>
            <SectionIcon $color="indigo">
              <FiSettings />
            </SectionIcon>
            <div>
              <SectionTitle>Technical Specifications</SectionTitle>
              <SectionSubtitle>
                Add key-value pairs like density, warranty, etc.
              </SectionSubtitle>
            </div>
          </SectionTitleGroup>
          {specFields.length > 0 && (
            <SectionCount>{specFields.length}</SectionCount>
          )}
        </SectionHeader>

        <DynamicRowList>
          {specFields.map((field, index) => (
            <DynamicRow key={field.id}>
              <DynamicRowNumber>{index + 1}</DynamicRowNumber>
              <DynamicRowFields>
                <DynamicRowInput
                  placeholder="Label (e.g. Density)"
                  disabled={isWorking}
                  {...register(`specs.${index}.label`)}
                />
                <DynamicRowInput
                  placeholder="Value (e.g. 35kg/m³)"
                  disabled={isWorking}
                  {...register(`specs.${index}.value`)}
                />
              </DynamicRowFields>
              {specFields.length > 1 && (
                <RemoveRowButton
                  type="button"
                  onClick={() => removeSpec(index)}
                  disabled={isWorking}
                >
                  ×
                </RemoveRowButton>
              )}
            </DynamicRow>
          ))}
        </DynamicRowList>

        <AddRowButton
          type="button"
          onClick={() => appendSpec({ label: "", value: "" })}
          disabled={isWorking}
        >
          + Add Specification
        </AddRowButton>
      </Section>

      {/* ═══════════════════════════
         SECTION 5 — FEATURES
      ═══════════════════════════ */}
      <Section id="section-features" $delay="0.25s">
        <SectionHeader>
          <SectionTitleGroup>
            <SectionIcon $color="green">
              <FiStar />
            </SectionIcon>
            <div>
              <SectionTitle>Product Features</SectionTitle>
              <SectionSubtitle>
                Multilingual feature bullet points
              </SectionSubtitle>
            </div>
          </SectionTitleGroup>
          {featureFields.length > 0 && (
            <SectionCount>{featureFields.length}</SectionCount>
          )}
        </SectionHeader>

        <DynamicRowList>
          {featureFields.map((field, index) => (
            <DynamicRow key={field.id}>
              <DynamicRowNumber>{index + 1}</DynamicRowNumber>
              <DynamicRowFields>
                <DynamicRowInput
                  placeholder="Feature (English)"
                  disabled={isWorking}
                  {...register(`features.${index}.en`)}
                />
                <DynamicRowInput
                  placeholder="Feature (French)"
                  disabled={isWorking}
                  {...register(`features.${index}.fr`)}
                />
                <DynamicRowInput
                  placeholder="Feature (Arabic)"
                  dir="rtl"
                  disabled={isWorking}
                  {...register(`features.${index}.ar`)}
                />
              </DynamicRowFields>
              {featureFields.length > 1 && (
                <RemoveRowButton
                  type="button"
                  onClick={() => removeFeature(index)}
                  disabled={isWorking}
                >
                  ×
                </RemoveRowButton>
              )}
            </DynamicRow>
          ))}
        </DynamicRowList>

        <AddRowButton
          type="button"
          onClick={() => appendFeature({ en: "", fr: "", ar: "" })}
          disabled={isWorking}
        >
          + Add Feature
        </AddRowButton>
      </Section>

      {/* ═══════════════════════════
         FOOTER
      ═══════════════════════════ */}
      <FormFooter>
        <FooterLeft>
          All fields marked with <RequiredStar>*</RequiredStar> are required
        </FooterLeft>

        <FooterActions>
          <CancelButton
            type="button"
            disabled={isWorking}
            onClick={() => {
              reset();
              if (onCloseModal) onCloseModal();
              else navigate("/products");
            }}
          >
            Cancel
          </CancelButton>

          <SubmitButton type="submit" disabled={isWorking}>
            {isWorking && <SpinnerIcon />}
            {isWorking
              ? "Saving…"
              : isEditSession
                ? "Update Product"
                : "Create Product"}
          </SubmitButton>
        </FooterActions>
      </FormFooter>
    </Form>
  );
}

export default CreateProductForm;
