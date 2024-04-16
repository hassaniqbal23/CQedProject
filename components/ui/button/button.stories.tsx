import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {Button} from './button';
import {ArrowLeft, ArrowRight} from 'lucide-react';
// import {arrowLeft} from './img/Icons.png';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Ui/Button',
	component: Button,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {onClick: fn()},
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	render: (args) => {
		return (
			<div className="flex flex-col gap-2">
				<Button
					{...args}
					size={'sm'}
				>
					Button CTA
				</Button>
				<Button {...args}> Button CTA</Button>
				<Button
					{...args}
					size={'lg'}
					className="flex text-center gap-[10px]"
				>
					{' '}
					<ArrowLeft size={20} /> Button CTA
				</Button>
				<Button
					{...args}
					className="flex gap-[10px]"
				>
					{' '}
					Button CTA
					<ArrowRight size={20} />
				</Button>
			</div>
		);
	},
	args: {
		variant: 'default',
	},
};

export const primaryOutline: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'primaryOutline',
	},
};

export const primary_400: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'primary400',
	},
};

export const primaryOutline400: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'primaryOutline-400',
	},
};
export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Button CTA',
	},
};

export const OutlineSecondary: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'secondary-outline',
	},
};

// export const Large: Story = {
// 	args: {
// 		size: 'lg',
// 		children: 'Button CTA',
// 	},
// };

export const Disabled: Story = {
	args: {
		variant: 'default',
		disabled: true,
		children: 'Button',
	},
};

export const DisabledOutline: Story = {
	args: {
		variant: 'default',
		disabled: true,
		children: 'Button',
	},
};

export const Outline: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'outline',
	},
};

export const error: Story = {
	render: (args) => {
		return (
			<div className="flex flex-col gap-[20px]">
				<Button {...args}>Button CTA</Button>
				<Button
					{...args}
					size={'lg'}
				>
					Button CTA
				</Button>
				<Button
					{...args}
					size={'sm'}
				>
					Button CTA
				</Button>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'error',
	},
};

export const errorOutline: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'error-outline',
	},
};

export const sucess: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'sucess',
	},
};

export const sucessOutline: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'sucess-outline',
	},
};

// export const warning: Story = {
// 	render: (args) => {
// 		return (
// 			<div>
// 				<Button {...args}>Button CTA</Button>
// 			</div>
// 		);
// 	},
// 	args: {
// 		variant: 'warning',
// 	},
// };

export const info: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'info',
	},
};

export const infoOutline: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'infoOutline',
	},
};

export const warning: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'warning',
	},
};

export const warningOutline: Story = {
	render: (args) => {
		return (
			<div>
				<Button {...args}>Button CTA</Button>
			</div>
		);
	},
	args: {
		variant: 'warningOutline',
	},
};
