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
>(({className, enableBottomBorder, ...props}, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			`{${enableBottomBorder === true ? '' : 'inline-flex items-center justify-center whitespace-nowrap rounded-md  py-2.5 px-7  text-base font-medium hover: ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold  data-[state=active]:border  data-[state=active]:shadow'}}`,
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
			'inline-flex items-center justify-center whitespace-nowrap rounded-md py-2.5 px-7 text-base font-medium hover:ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
	enableBottomBorder?: boolean;
}

const TabsComponent = ({
	tabs,
	tabContent,
	defaultValue,
	enableBottomBorder,
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
