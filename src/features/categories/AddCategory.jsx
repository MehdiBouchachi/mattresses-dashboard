import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCategoryForm from "./CreateCategoryForm";

function AddCategory() {
  return (
    <Modal>
      <Modal.Open opens="category-form">
        <Button>+ Add Category</Button>
      </Modal.Open>

      <Modal.Window name="category-form">
        <CreateCategoryForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCategory;
