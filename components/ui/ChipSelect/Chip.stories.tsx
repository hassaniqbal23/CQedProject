import React from 'react';
import {Meta} from '@storybook/react';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';

const meta: Meta = {
	title: 'UI/Chip Selector',
	component: ChipSelector,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;

export const Default = (args: any) => (
	<div>
		<ChipSelector {...args} />
	</div>
);

Default.args = {
	defaultValue: 'Male',
	chips: [
		{
			label: 'Male',
			value: 'Male',
			gender: 'male',
		},
		{
			label: 'Female',
			value: 'Female',
			gender: 'female',
		},
		{
			label: 'Non-binary',
			value: 'Non-binary',
			gender: 'non-binary',
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
	chips: [
		{
			label: 'Male',
			value: 'Male',
			gender: 'male',
		},
		{
			label: 'Female',
			value: 'Female',
			gender: 'female',
		},
		{
			label: 'Non-binary',
			value: 'Non-binary',
			gender: 'non-binary',
		},
	],
};

export const primary = (args: any) => (
	<div>
		<ChipSelector {...args} />
	</div>
);

primary.args = {
	defaultValue: 'Non-binary',
	chips: [
		{
			label: 'Male',
			value: 'Male',
			gender: 'male',
		},
		{
			label: 'Female',
			value: 'Female',
			gender: 'female',
		},
		{
			label: 'Non-binary',
			value: 'Non-binary',
			gender: 'non-binary',
		},
	],
};
