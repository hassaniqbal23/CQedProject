import type {Meta, StoryObj} from "@storybook/react";

import {DropdownMenuDemo} from "@/components/common/LanguageDropdown/LanguageDropdown";

const meta: Meta<typeof DropdownMenuDemo> = {
    title: "Forms/Dropdown",
    component: DropdownMenuDemo,
};

export default meta;
type Story = StoryObj<typeof DropdownMenuDemo>;

export const Default: Story = {
    args: {
        options: [
            {
                label: "English",
                value: "en",
            },
            {
                label: "French",
                value: "fr",
            },
            {
                label: "Spanish",
                value: "es",
            },
        ]
    },
};
