// tabs.tsx

import React, { forwardRef } from 'react';
import * as RadixUITabs from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = RadixUITabs.Root;

const TabsList = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof RadixUITabs.List> & {
		variant?: "primary" | 'secondary' | 'linked'
	}
>(({ className, variant, ...props }, ref) => (
	<RadixUITabs.List
		ref={ref}
		className={cn(
			'inline-flex items-start text-muted-foreground bg-white',
			variant === 'secondary' ? 'bg-muted rounded-md' : '',
			variant === 'linked' ? " border-b-2 " : "",
			className
		)}
		{...props}
	/>
));
TabsList.displayName = 'TabsList';

const TabsTrigger = forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<typeof RadixUITabs.Trigger> & {
		variant?: "primary" | 'secondary' | 'linked'
	}
>(({ className, variant, ...props }, ref) => {
	return (
		<RadixUITabs.Trigger
			ref={ref}
			className={cn(
				`border-b-2 border-transparent inline-flex items-center justify-center whitespace-nowrap py-2.5 px-7 text-base font-medium hover:ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:bg-primary data-[state=active]:shadow  `,
				variant === 'linked'
					? 'data-[state=active]:border-primary'
					: '',
				variant === 'secondary' ? "rounded-md data-[state=active]:bg-background data-[state=active]:shadow" : '',
				className
			)}
			{...props}
		/>
	)
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof RadixUITabs.Content>
>(({ className, ...props }, ref) => (
	<RadixUITabs.Content
		ref={ref}
		className={cn('inline-flex items-center justify-center', className)}
		{...props}
	/>
));
TabsContent.displayName = 'TabsContent';

interface TabsProps {
	label: string;
	value: string;
}

interface TabContent {
	value: string;
	content: React.ReactNode;
}

interface TabsComponentProps {
	tabs: TabsProps[];
	tabContent: TabContent[];
	defaultValue?: string;
	variant?: 'primary' | "secondary" | 'linked';
	onValueChange?: (value: string) => void;
}

const TabsComponent = ({
	tabs,
	tabContent,
	defaultValue,
	variant = 'primary',
	onValueChange
}: TabsComponentProps) => {
	return (
		<Tabs
			defaultValue={defaultValue}
			className="w-full"
			onValueChange={onValueChange}
		>
			<TabsList variant={variant} className={`flex w-full gap-1 items-start ${variant !== 'secondary' ? 'p-2' : ''}`}>
				{tabs.map((item: TabsProps, index) => (
					<TabsTrigger
						value={item.value}
						key={index}
						variant={variant}
					>
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{tabContent.map((item: TabContent, index) => (
				<TabsContent
					value={item.value}
					key={index}
					className='w-full'
				>
					{item.content}
				</TabsContent>
			))}
		</Tabs>
	);
};

export { TabsComponent, Tabs, TabsList, TabsTrigger, TabsContent };
