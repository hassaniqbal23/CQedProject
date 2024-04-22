import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {Button} from './button';

const meta = {
	title: 'Ui/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {onClick: fn()},
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// PRIMARY BUTTONS

export const LoadingButton: Story = {
	render: (args) => {
		return (
			<div className="flex flex-col gap-[10px]">
				<h2>Loading button</h2>
				<Button
					{...args}
					loading={true}
					size={'lg'}
				>
					{/* <LoadingOutlined /> */}
					Loading...
				</Button>
			</div>
		);
	},
	args: {
		variant: 'infoOutline',
	},
};
