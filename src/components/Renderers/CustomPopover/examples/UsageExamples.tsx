import { useState } from "react";

import { Button, Input, Space } from "antd";

import CustomPopover from "../CustomPopover";

// =============================================================================
// Example 1: Basic Usage (Hover)
// =============================================================================
export const BasicTooltipPopover = () => {
  return (
    <CustomPopover content="This is additional information" trigger="hover">
      <Button>Hover me</Button>
    </CustomPopover>
  );
};

// =============================================================================
// Example 2: With Title and Close Button
// =============================================================================
export const WithTitleAndClose = () => {
  return (
    <CustomPopover
      title="Notification Actions"
      showCloseIcon
      content={<div style={{ width: 200 }}>You have 3 unread messages.</div>}
    >
      <Button>Click me</Button>
    </CustomPopover>
  );
};

// =============================================================================
// Example 3: Simple Content with Close (No Title)
// =============================================================================
export const CloseNoTitle = () => {
  return (
    <CustomPopover
      showCloseIcon
      placement="rightTop"
      content={
        <div>
          <p>This is a quick tip!</p>
          <a href="#">Learn more</a>
        </div>
      }
    >
      <Button>Quick Tip</Button>
    </CustomPopover>
  );
};

// =============================================================================
// Example 4: Complex Interactive Content with Footer
// =============================================================================
export const InteractiveForm = () => {
  const [value, setValue] = useState("");

  return (
    <CustomPopover
      title="Change Name"
      trigger="click"
      showCloseIcon
      content={
        <div style={{ width: 250 }}>
          <p style={{ marginBottom: 8 }}>Please enter your new name:</p>
          <Input
            placeholder="New Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      }
      // Footer receives a 'close' function automatically
      footer={({ close }) => (
        <>
          <Button size="small" onClick={close}>
            Cancel
          </Button>
          <Button
            size="small"
            type="primary"
            disabled={!value}
            onClick={() => {
              alert(`Saved: ${value}`);
              close();
            }}
          >
            Save
          </Button>
        </>
      )}
    >
      <Button type="primary">Edit Name</Button>
    </CustomPopover>
  );
};

// =============================================================================
// Example 5: Controlled Mode
// =============================================================================
export const ControlledExample = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Space>
      <Button onClick={() => setOpen(!open)}>Toggle via External Button</Button>

      <CustomPopover
        open={open}
        onOpenChange={handleOpenChange}
        title="Controlled Popover"
        content="I am controlled by React state!"
      >
        <div
          style={{
            border: "1px dashed #ccc",
            padding: 10,
            display: "inline-block",
          }}
        >
          Anchor Target
        </div>
      </CustomPopover>
    </Space>
  );
};
