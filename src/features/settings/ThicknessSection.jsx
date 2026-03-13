import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import {
  Card,
  CardHeader,
  Table,
  Th,
  Td,
  Tr,
  AddRow,
  EmptyMessage,
  DeleteButton,
} from "./SettingsCard";

import { useThicknesses } from "./useThicknesses";
import { useCreateThickness } from "./useCreateThickness";
import { useDeleteThickness } from "./useDeleteThickness";

function ThicknessSection() {
  const [newValue, setNewValue] = useState("");
  const { isLoading, thicknesses } = useThicknesses();
  const { createThickness, isCreating } = useCreateThickness();
  const { deleteThickness, isDeleting } = useDeleteThickness();

  function handleAdd(e) {
    e.preventDefault();
    const parsed = parseInt(newValue, 10);
    if (isNaN(parsed) || parsed <= 0) return;

    createThickness(parsed, {
      onSuccess: () => setNewValue(""),
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Card>
      <CardHeader>
        <Heading as="h2">Thicknesses</Heading>
      </CardHeader>

      {thicknesses?.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Thickness (cm)</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {thicknesses.map((t) => (
              <Tr key={t.id}>
                <Td>{t.value} cm</Td>
                <Td>
                  <DeleteButton
                    onClick={() => deleteThickness(t.id)}
                    disabled={isDeleting}
                    title="Delete thickness"
                  >
                    <HiOutlineTrash />
                  </DeleteButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyMessage>No thicknesses configured yet.</EmptyMessage>
      )}

      <AddRow as="form" onSubmit={handleAdd}>
        <Input
          type="number"
          placeholder="e.g. 25"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          disabled={isCreating}
          min="1"
          style={{ flex: 1 }}
        />
        <Button
          type="submit"
          size="medium"
          variation="primary"
          disabled={isCreating || !newValue}
        >
          {isCreating ? "Adding..." : "Add Thickness"}
        </Button>
      </AddRow>
    </Card>
  );
}

export default ThicknessSection;
