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

import { useDimensions } from "./useDimensions";
import { useCreateDimension } from "./useCreateDimension";
import { useDeleteDimension } from "./useDeleteDimension";

function DimensionsSection() {
  const [newLabel, setNewLabel] = useState("");
  const { isLoading, dimensions } = useDimensions();
  const { createDimension, isCreating } = useCreateDimension();
  const { deleteDimension, isDeleting } = useDeleteDimension();

  function handleAdd(e) {
    e.preventDefault();
    if (!newLabel.trim()) return;

    createDimension(newLabel.trim(), {
      onSuccess: () => setNewLabel(""),
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Card>
      <CardHeader>
        <Heading as="h2">Dimensions</Heading>
      </CardHeader>

      {dimensions?.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Dimension</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dim) => (
              <Tr key={dim.id}>
                <Td>{dim.label}</Td>
                <Td>
                  <DeleteButton
                    onClick={() => deleteDimension(dim.id)}
                    disabled={isDeleting}
                    title="Delete dimension"
                  >
                    <HiOutlineTrash />
                  </DeleteButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyMessage>No dimensions configured yet.</EmptyMessage>
      )}

      <AddRow as="form" onSubmit={handleAdd}>
        <Input
          type="text"
          placeholder="e.g. 180x200"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          disabled={isCreating}
          style={{ flex: 1 }}
        />
        <Button
          type="submit"
          size="medium"
          variation="primary"
          disabled={isCreating || !newLabel.trim()}
        >
          {isCreating ? "Adding..." : "Add Dimension"}
        </Button>
      </AddRow>
    </Card>
  );
}

export default DimensionsSection;
