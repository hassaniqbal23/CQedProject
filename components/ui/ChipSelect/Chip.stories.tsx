import React from 'react';
import {Meta} from '@storybook/react';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import maleIcon from 'public/assets/chipsicon/male.svg';

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
	options: [
		{
			label: 'Male',
			value: 'Male',
			render: (data: any) => (
				<div>
					<img
						src={maleIcon}
						alt=""
					/>
					{data.label}
				</div>
			),
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
	rounded: true,
	options: [
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
	args: {
		variant: 'primary',
	},
};
