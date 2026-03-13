import styled, { css } from "styled-components";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineFolder,
  HiOutlineFolderOpen,
  HiOutlineTag,
} from "react-icons/hi2";

import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCategoryForm from "./CreateCategoryForm";
import { useDeleteCategory } from "./useDeleteCategory";
import {
  getCategoryDisplayName,
  findCategoryById,
} from "./categoryTreeHelpers";
import { device } from "../../styles/breakpoints";

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 0.6fr;
  align-items: center;
  padding: 1.2rem 2.4rem;
  gap: 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }

  @media ${device.mobile} {
    padding: 1.2rem 1.6rem;
  }
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;
  color: var(--color-grey-700);
  font-size: 1.4rem;
`;

const TreeIndent = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
`;

const IndentBlock = styled.span`
  display: inline-flex;
  width: 2.4rem;
  height: 3.2rem;
  position: relative;
  flex-shrink: 0;

  /* Vertical line through the block */
  ${(props) =>
    props.$hasLine &&
    css`
      &::before {
        content: "";
        position: absolute;
        left: 1rem;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: var(--color-grey-300);
      }
    `}
`;

const TreeBranch = styled.span`
  display: inline-flex;
  width: 2.4rem;
  height: 3.2rem;
  position: relative;
  flex-shrink: 0;

  /* Vertical line from top */
  &::before {
    content: "";
    position: absolute;
    left: 1rem;
    top: 0;
    height: ${(props) => (props.$isLast ? "50%" : "100%")};
    width: 1px;
    background-color: var(--color-grey-300);
  }

  /* Horizontal branch line */
  &::after {
    content: "";
    position: absolute;
    left: 1rem;
    top: 50%;
    width: 1.2rem;
    height: 1px;
    background-color: var(--color-grey-300);
  }
`;

const CategoryIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  ${(props) =>
    props.$type === "main" &&
    css`
      color: var(--color-brand-600);
    `}

  ${(props) =>
    props.$type === "subcategory" &&
    css`
      color: var(--color-blue-700, #1d4ed8);
    `}

  ${(props) =>
    props.$type === "type" &&
    css`
      color: var(--color-green-700, #15803d);
    `}
`;

const CategoryName = styled.span`
  font-weight: ${(props) => (props.$isMain ? 600 : 500)};
  font-size: ${(props) => (props.$isMain ? "1.5rem" : "1.4rem")};
  color: var(--color-grey-700);
`;

const typeStyles = {
  main: css`
    background-color: var(--color-brand-100, #e0e7ff);
    color: var(--color-brand-700, #4338ca);
  `,
  subcategory: css`
    background-color: var(--color-blue-100, #dbeafe);
    color: var(--color-blue-700, #1d4ed8);
  `,
  type: css`
    background-color: var(--color-green-100, #dcfce7);
    color: var(--color-green-700, #15803d);
  `,
};

const TypeBadge = styled.span`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.04em;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  white-space: nowrap;

  ${(props) => typeStyles[props.$type]}
`;

const typeLabels = {
  main: "Main",
  subcategory: "Subcategory",
  type: "Type",
};

const ParentCell = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  font-weight: 500;
`;

function CategoryRow({ category, allCategories }) {
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const { id, depth, isLast, parentTrail, type, parent_id } = category;

  const displayName = getCategoryDisplayName(category);
  const parent = findCategoryById(allCategories, parent_id);
  const parentName = parent ? getCategoryDisplayName(parent) : "—";

  // Build the indent + tree lines
  function renderIndent() {
    if (depth === 0) return null;

    const blocks = [];

    // Render continuation lines for each ancestor level
    for (let i = 0; i < depth - 1; i++) {
      const ancestorIsLast = parentTrail[i + 1];
      blocks.push(
        <IndentBlock key={`indent-${i}`} $hasLine={!ancestorIsLast} />,
      );
    }

    // Render the branch connector for current level
    blocks.push(<TreeBranch key="branch" $isLast={isLast} />);

    return blocks;
  }

  function getIcon() {
    if (type === "main")
      return category.children?.length > 0 ? (
        <HiOutlineFolderOpen />
      ) : (
        <HiOutlineFolder />
      );
    if (type === "subcategory") return <HiOutlineFolder />;
    return <HiOutlineTag />;
  }

  return (
    <Modal>
      <StyledRow>
        {/* Name with tree indent */}
        <NameCell>
          <TreeIndent>{renderIndent()}</TreeIndent>
          <CategoryIcon $type={type}>{getIcon()}</CategoryIcon>
          <CategoryName $isMain={type === "main"}>{displayName}</CategoryName>
        </NameCell>

        {/* Type Badge */}
        <div>
          <TypeBadge $type={type}>{typeLabels[type] || type}</TypeBadge>
        </div>

        {/* Parent */}
        <ParentCell>{parentName}</ParentCell>

        {/* Actions */}
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          {/* Edit Modal */}
          <Modal.Window name="edit">
            <CreateCategoryForm categoryToEdit={category} />
          </Modal.Window>

          {/* Delete Confirmation */}
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`category "${displayName}"`}
              disabled={isDeleting}
              onConfirm={() => deleteCategory(id)}
            />
          </Modal.Window>
        </Menus.Menu>
      </StyledRow>
    </Modal>
  );
}

export default CategoryRow;
