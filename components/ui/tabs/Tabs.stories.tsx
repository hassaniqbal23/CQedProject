import type {Meta, StoryObj} from '@storybook/react';
import {TabsComponent as Tabs} from '@/components/ui/tabs/tabs';

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

export const Primary: Story = {
	render: (args) => {
		return (
			<div>
				<Tabs {...args} />
			</div>
		);
	},
	args: {
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
		defaultValue: 'tab one',
		tabs: [
			{
				label: 'tab one',
				value: 'tab_one',
			},
			{
				label: 'tab two',
				value: 'tab_two',
			},
			{
				label: 'tab three',
				value: 'tab_three',
			},
		],
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
