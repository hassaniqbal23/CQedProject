import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { TabsComponent as Tabs } from './tabs';

const meta = {
	title: 'Ui/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

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
		defaultValue: 'pal-comunity',
		onValueChange: (value: string) => {
			console.log(value);
		},
		tabs: [
			{
				label: 'Pal Comunity',
				value: 'pal-comunity',
			},
			{
				label: 'Auto Match',
				value: 'auto-match',
			},
			{
				label: 'pal id search',
				value: 'pal_id',
			},
		],
		tabContent: [
			{
				value: 'pal-comunity',
				content: <div>Pal comunity</div>,
			},
			{
				value: 'auto-match',
				content: <div>auto match</div>,
			},
			{
				value: 'pal_id',
				content: <div>pl id search</div>,
			},
		],
	},
};

export const Primary: Story = {
	render: (args) => {
		return (
			<div>
				<Tabs {...args} />
			</div>
		);
	},
	args: {
		variant: 'primary',
		onValueChange: (value: string) => {
			console.log(value);
		},
		defaultValue: 'pal-comunity',
		tabs: [
			{
				label: 'Pal Comunity',
				value: 'pal-comunity',
			},
			{
				label: 'Auto Match',
				value: 'auto-match',
			},
			{
				label: 'pal id search',
				value: 'pal_id',
			},
		],
		tabContent: [
			{
				value: 'pal-comunity',
				content: <div>Pal comunity</div>,
			},
			{
				value: 'auto-match',
				content: <div>auto match</div>,
			},
			{
				value: 'pal_id',
				content: <div>pl id search</div>,
			},
		],
	},
};

export const secondry: Story = {
	render: (args) => {
		return (
			<div>
				<Tabs {...args} />
			</div>
		);
	},
	args: {
		onValueChange: (value: string) => {
			console.log(value);
		},
		defaultValue: 'tab_one',
		tabs: [
			{
				label: 'Tab one',
				value: 'tab_one',
			},
			{
				label: 'Tab two',
				value: 'tab_two',
			},
			{
				label: 'Tab three',
				value: 'tab_three',
			},
		],
		variant: 'secondary',
		tabContent: [
			{
				value: 'tab_one',
				content: <div>tab one</div>,
			},
			{
				value: 'tab_two',
				content: <div>tab two</div>,
			},
			{
				value: 'tab_three',
				content: <div>tab three</div>,
			},
		],
	},
};
