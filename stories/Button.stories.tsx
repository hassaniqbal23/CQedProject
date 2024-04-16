// import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';
// import {Button} from '@/components/ui/button/button';
// import {GoArrowLeft} from 'react-icons/go';

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// const meta = {
// 	title: 'Ui/Button',
// 	component: Button,
// 	parameters: {
// 		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
// 		layout: 'centered',
// 	},
// 	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
// 	tags: ['autodocs'],
// 	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
// 	args: {onClick: fn()},
// } satisfies Meta<typeof Button>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary: Story = {
// 	render: (args) => {
// 		return (
// 			<div>
// 				<Button {...args}>Button CTA</Button>
// 				<Button {...args}>
// 					{' '}
// 					<GoArrowLeft /> Button CTA
// 				</Button>
// 			</div>
// 		);
// 	},
// 	args: {
// 		variant: 'default',
// 	},
// };

// export const Secondary: Story = {
// 	args: {
// 		variant: 'secondary',
// 		children: 'Button CTA',
// 	},
// };

// export const Large: Story = {
// 	args: {
// 		size: 'lg',
// 		children: 'Button CTA',
// 	},
// };

// // export const Small: Story = {
// // 	args: {
// // 		size: 'sm',
// // 		children: 'Button',
// // 	},
// // };

// export const Small: Story = {
// 	render: (args) => {
// 		return (
// 			<div>
// 				<Button
// 					{...args}
// 					disabled={true}
// 				>
// 					Button CTA
// 				</Button>
// 			</div>
// 		);
// 	},
// 	args: {
// 		variant: 'default',
// 	},
// };
