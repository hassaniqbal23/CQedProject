import type { Meta, StoryObj } from "@storybook/react";

import Delete from "./deleteAlert";
import { Button } from "@/components/ui";
import Modal from "../Modal/Modal";

const meta: Meta<typeof Delete> = {
  title: "deleteAlert",
  component: Delete,
};

export default meta;
type Story = StoryObj<typeof Delete>;

export const Default: Story = {
  render() {
    return (
      <Modal
        header={false}
        footer={false}
        openModalButton={<Button> delete</Button>}
        isVisible={true}
        onOkClick={() => {
          alert("dfd");
        }}
      >
        <Delete />
      </Modal>
    );
  },
  args: {},
};
