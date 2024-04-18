// tabs.tsx

import React, {forwardRef} from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import {cn} from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'inline-flex w-[500px] items-start rounded-md bg-muted p-1 text-muted-foreground',
			className
		)}
		{...props}
	/>
));
TabsList.displayName = 'TabsList';

const TabsTrigger = forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...props}, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...props}
	/>
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			'mt-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
			className
		)}
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
}

const TabsComponent = ({
	tabs,
	tabContent,
	defaultValue,
}: TabsComponentProps) => {
	return (
		<Tabs
			defaultValue={defaultValue}
			className="w-full"
		>
			<TabsList className="flex w-[1220px] gap-1 items-start p-[10px]">
				{tabs.map((item: TabsProps, index) => (
					<TabsTrigger
						value={item.value}
						key={index}
					>
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{tabContent.map((item: TabContent, index) => (
				<TabsContent
					value={item.value}
					key={index}
				>
					{item.content}
				</TabsContent>
			))}
		</Tabs>
	);
};

export {TabsComponent, Tabs, TabsList, TabsTrigger, TabsContent};
