import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

import { HiPencil, HiTrash } from "react-icons/hi2";

const Img = styled.img`
  width: 64px;
  height: 40px;
  object-fit: cover;
`;

function ProductRow({ product }) {
  const { id, name, category, discount, images, details } = product;

  const basePrice = details.dimensions?.[0]?.options?.[0]?.price || 0;

  return (
    <Table.Row>
      <Img src={images[0]} />

      <div>{name.en}</div>

      <div>{category}</div>

      <div>{basePrice} DA</div>

      <div>{discount ? `${discount} DA` : "—"}</div>

      <div>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={id} />

              <Menus.List id={id}>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>

                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ProductRow;
