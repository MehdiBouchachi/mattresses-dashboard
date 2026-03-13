// features/products/ProductRow.jsx

import styled, { css } from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./useDeleteProduct";

const Img = styled.img`
  width: 6.4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 0.6rem;
  border: 1px solid var(--color-grey-200);
  transition: transform 0.2s;
`;

const ProductName = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Category = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
  color: var(--color-green-700);
`;

const Discount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.8rem;
  border-radius: 10rem;
  font-size: 1.2rem;
  font-weight: 600;

  ${(props) =>
    props.$hasDiscount
      ? css`
          background-color: var(--color-red-100);
          color: var(--color-red-700);
        `
      : css`
          color: var(--color-grey-400);
        `}
`;

function ProductRow({ product }) {
  const navigate = useNavigate();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const { id, name, category, subcategory, discount, image, priceRange } =
    product;

  return (
    <Table.Row>
      <Img src={image || "/images/placeholder.png"} alt={name} />

      <ProductName>{name}</ProductName>

      <Category>
        {category}
        {subcategory && ` / ${subcategory}`}
      </Category>

      <Price>{priceRange} DA</Price>

      <Discount $hasDiscount={discount > 0}>
        {discount ? `${discount}%` : "—"}
      </Discount>

      <div>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={id} />

              <Menus.List id={id}>
                {/* ── View Details ── */}
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/products/${id}`)}
                >
                  See details
                </Menus.Button>

                {/* ── Edit → Navigate to page ── */}
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => navigate(`/products/${id}/edit`)}
                >
                  Edit
                </Menus.Button>

                {/* ── Delete → Modal confirmation ── */}
                <Modal.Open opens="delete-product">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Menus>

          <Modal.Window name="delete-product">
            <ConfirmDelete
              resourceName={`product "${name}"`}
              disabled={isDeleting}
              onConfirm={() => deleteProduct(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ProductRow;
