import React, { useEffect, useState, forwardRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as RadixUITabs from '@radix-ui/react-tabs';
import { Separator } from '@/components/ui';

import { cn } from '@/lib/utils';

const Tabs = RadixUITabs.Root;

const TabsList = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixUITabs.List> & {
    variant?: 'primary' | 'secondary' | 'linked';
  }
>(({ className, variant, ...props }, ref) => (
  <RadixUITabs.List
    ref={ref}
    className={cn(
      'inline-flex items-start text-muted-foreground bg-white',
      variant === 'secondary' ? 'bg-muted rounded-md' : '',
      variant === 'linked' ? ' border-b-2 ' : '',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadixUITabs.Trigger> & {
    variant?: 'primary' | 'secondary' | 'linked';
  }
>(({ className, variant, ...props }, ref) => (
  <RadixUITabs.Trigger
    ref={ref}
    className={cn(
      `border-b-2 border-transparent inline-flex items-center justify-center whitespace-nowrap py-2.5 px-7 text-base font-medium hover:ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded data-[state=active]:text-white data-[state=active]:font-medium data-[state=active]:bg-primary data-[state=active]:shadow`,
      variant === 'linked' ? 'data-[state=active]:border-primary' : '',
      variant === 'secondary'
        ? 'rounded-md data-[state=active]:bg-background data-[state=active]:shadow data-[state=active]:text-primary'
        : '',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixUITabs.Content>
>(({ className, ...props }, ref) => (
  <RadixUITabs.Content ref={ref} className={cn('', className)} {...props} />
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
  isSeparator?: boolean;
  variant?: 'primary' | 'secondary' | 'linked';
  onValueChange?: (value: string) => void;
  className?: string;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  tabContent,
  defaultValue,
  variant = 'primary',
  onValueChange,
  isSeparator,
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(
    searchParams?.get('tab') || defaultValue || ''
  );

  useEffect(() => {
    const currentTab = searchParams?.get('tab');
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newParams = searchParams && new URLSearchParams(searchParams);
    newParams?.set('tab', value);
    router.push(`?${newParams?.toString()}`);
    if (onValueChange) onValueChange(value);
  };

  const isSecondary = variant === 'secondary';
  const secondaryClass = isSecondary ? 'px-4 py-2' : '';

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList
        variant={variant}
        className={cn(
          `flex w-full gap-2 overflow-x-auto whitespace-nowrap ${secondaryClass} items-start ${variant !== 'secondary' ? 'p-2' : ''}`,
          className
        )}
      >
        {tabs.map((item, index) => (
          <TabsTrigger value={item.value} key={index} variant={variant}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {isSeparator && <Separator />}
      {tabContent.map((item, index) => (
        <TabsContent value={item.value} key={index} className="w-full">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export { TabsComponent, Tabs, TabsList, TabsTrigger, TabsContent };
