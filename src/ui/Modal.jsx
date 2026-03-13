import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutSideClick from "../hooks/useOutSideClick";
import { device } from "../styles/breakpoints";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  padding: 3.2rem 4rem;

  max-width: 60rem;
  width: 90%;

  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;

  transition: all 0.3s;

  @media ${device.mobile} {
    width: 95%;
    padding: 2.4rem 2rem;
    max-width: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);

  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: none;
  border: none;

  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const ModalContaxt = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContaxt.Provider value={{ open, close, openName }}>
      {children}
    </ModalContaxt.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContaxt);
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContaxt);

  const ref = useOutSideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
