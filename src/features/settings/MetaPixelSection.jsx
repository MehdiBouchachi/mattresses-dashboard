import { useState, useEffect } from "react";

import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";

import { Card, CardHeader } from "./SettingsCard";

import { useSetting } from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";

function MetaPixelSection() {
  const { isLoading, setting } = useSetting("meta_pixel_id");
  const { updateSetting, isUpdating } = useUpdateSetting();
  const [pixelId, setPixelId] = useState("");

  // Sync fetched value into local state
  useEffect(() => {
    if (setting?.value) {
      setPixelId(setting.value);
    }
  }, [setting]);

  function handleSave(e) {
    e.preventDefault();
    if (!pixelId.trim()) return;

    updateSetting({
      key: "meta_pixel_id",
      value: pixelId.trim(),
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Card>
      <CardHeader>
        <Heading as="h2">Meta Pixel Integration</Heading>
      </CardHeader>

      <form onSubmit={handleSave}>
        <FormRow label="Meta Pixel ID">
          <Input
            type="text"
            id="meta_pixel_id"
            placeholder="e.g. 123456789012345"
            value={pixelId}
            onChange={(e) => setPixelId(e.target.value)}
            disabled={isUpdating}
          />
        </FormRow>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <Button
            type="submit"
            size="medium"
            variation="primary"
            disabled={isUpdating || !pixelId.trim()}
          >
            {isUpdating ? "Saving..." : "Save Integration"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default MetaPixelSection;
