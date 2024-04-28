import React from 'react';
import { Meta } from '@storybook/react';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import Image from 'next/image';

const meta: Meta = {
	title: 'UI/Chip Selector',
	component: ChipSelector,
	parameters: {
		layout: 'centered',
	},
	// tags: ['autodocs'],
};

export default meta;

export const Default = (args: any) => (
	<div>
		<ChipSelector {...args} />
	</div>
);

Default.args = {
	defaultValue: 'Male',
	options: [
		{
			label: 'Male',
			value: 'Male',
			render: (data: any) => <div>{data.label}</div>,
		},
		{
			label: 'Female',
			value: 'Female',
			render: (data: any) => <div>{data.label}</div>,
		},
		{
			label: 'Non-binary',
			value: 'Non-binary',
			render: (data: any) => <div>{data.label}</div>,
		},
	],
};

export const Secondary = (args: any) => (
	<div>
		<ChipSelector {...args} />
	</div>
);

Secondary.args = {
	defaultValue: 'Female',
	variant: 'secondary',
	options: [
		{
			label: 'Male',
			value: 'Male',
			render: (data: any) => <div>{data.label}</div>,
		},
		{
			label: 'Female',
			value: 'Female',
			render: (data: any) => <div>{data.label}</div>,
		},
		{
			label: 'Non-binary',
			value: 'Non-binary',
			render: (data: any) => <div>{data.label}</div>,
		},
	],
	args: {
		variant: 'secondary',
	},
};

export const primary = (args: any) => (
	<div>
		<ChipSelector {...args} />
	</div>
);

primary.args = {
	defaultValue: 'Non-binary',
	rounded: true,
	options: [
		{
			label: 'Male',
			value: 'Male',

			render: (data: any) => {
				return <div>{data.label}</div>;
			},
		},
		{
			label: 'Female',
			value: 'Female',
			render: (data: any) => <div>{data.label}</div>,
		},
		{
			label: 'Non-binary',
			value: 'Non-binary',
			render: (data: any) => <div>{data.label}</div>,
		},
	],
};
