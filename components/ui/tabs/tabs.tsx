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
			'inline-flex items-start rounded-md bg-muted  text-muted-foreground',
			className
		)}
		{...props}
	/>
));
TabsList.displayName = 'TabsList';

const TabsTrigger = forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
		enableBottomBorder?: boolean;
	}
>(({className, enableBottomBorder, ...props}, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			`inline-flex items-center justify-center whitespace-nowrap rounded-md py-2.5 px-7 text-base font-medium hover:ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
			enableBottomBorder
				? 'data-[state=active]:border-b border-primary'
				: 'data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:shadow',
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
	enableBottomBorder?: boolean;
	onValueChange: (value: string) => void;
}

const TabsComponent = ({
	tabs,
	tabContent,
	defaultValue,
	enableBottomBorder,
	onValueChange
}: TabsComponentProps) => {
	return (
		<Tabs
			defaultValue={defaultValue}
			className="w-full"
			onValueChange={onValueChange}
		>
			<TabsList className="flex w-full gap-1 items-start p-2">
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
