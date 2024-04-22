// tabs.tsx

import React, { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
		variant?: "primary" | 'secondary'
	}
>(({ className, variant, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'inline-flex items-start text-muted-foreground',
			variant === 'secondary' ? 'bg-white border-b-2 ' : 'bg-muted rounded-md ',
			className
		)}
		{...props}
	/>
));
TabsList.displayName = 'TabsList';

const TabsTrigger = forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
		variant?: "primary" | 'secondary'
	}
>(({ className, variant, ...props }, ref) => {
	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				`inline-flex items-center justify-center whitespace-nowrap py-2.5 px-7 text-base font-medium hover:ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary data-[state=active]:font-semibold `,
				variant === 'secondary'
					? 'data-[state=active]:border-b-2 data-[state=active]:border-primary'
					: 'rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:shadow',
				className
			)}
			{...props}
		/>
	)
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
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
	variant?: 'primary' | "secondary";
	onValueChange: (value: string) => void;
}

const TabsComponent = ({
	tabs,
	tabContent,
	defaultValue,
	variant = 'primary',
	onValueChange
}: TabsComponentProps) => {
	console.log(variant)
	return (
		<Tabs
			defaultValue={defaultValue}
			className="w-full"
			onValueChange={onValueChange}
		>
			<TabsList variant={variant}  className={`flex w-full gap-1 items-start ${variant !== 'secondary'  ? 'p-2' : ''}`}>
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
				>
					{item.content}
				</TabsContent>
			))}
		</Tabs>
	);
};

export { TabsComponent, Tabs, TabsList, TabsTrigger, TabsContent };
