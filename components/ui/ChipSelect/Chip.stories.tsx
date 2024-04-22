// Import statements...

import type {Meta, StoryObj} from '@storybook/react';
import {TabsComponent as Tabs} from '@/components/ui/ChipSelect/Chip';

const meta = {
	title: 'Ui/Chip Selector',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		return (
			<div>
				<Tabs {...args} />
			</div>
		);
	},
	args: {
		defaultValue: 'Male',
		tabs: [
			{
				label: 'Male',
				value: 'Male',
			},
			{
				label: 'Female',
				value: 'Female',
			},
			{
				label: 'Non-binary',
				value: 'Non-binary',
			},
		],
	},
};
