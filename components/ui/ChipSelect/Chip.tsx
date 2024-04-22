import React, {forwardRef, useState} from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import {cn} from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(className)}
		{...props}
	/>
));
TabsList.displayName = 'TabsList';

const TabsTrigger = forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
		onClick?: () => void;
	}
>(({className, onClick, ...props}, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'flex items-center justify-center gap-2 w-45 h-12 font-medium text-lg text-center  data-[state=active]:text-primary data-[state=active]:border border-solid border-primary  data-[state=active]:font-medium px-8 py-2  ',
			className
		)}
		onClick={onClick}
		{...props}
	/>
));
TabsTrigger.displayName = 'TabsTrigger';

interface TabsProps {
	label: string;
	value: string;
}

interface TabsComponentProps {
	tabs: TabsProps[];
	defaultValue?: string;
}

const TabsComponent = ({tabs, defaultValue}: TabsComponentProps) => {
	const [selectedValue, setSelectedValue] = useState(
		defaultValue || tabs[0]?.value
	);

	const handleTabClick = (val) => {
		setSelectedValue(val);
		console.log(val, 'tabtriggers'); // Logging the clicked value
	};

	return (
		<Tabs
			defaultValue={defaultValue}
			className="w-full"
		>
			<TabsList className="flex w-23 gap-4 items-start">
				{tabs.map((item: TabsProps, index) => (
					<TabsTrigger
						onClick={() => handleTabClick(item.value)}
						value={item.value}
						key={index}
						className="border border-solid border-gray-300 "
					>
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export {TabsComponent, Tabs, TabsList, TabsTrigger};
