import {ReactElement, forwardRef} from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
	{
		variants: {
			variant: {
				default: 'bg-primary text-white hover:bg-primary/90',
				infoOutline:
					'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
			},
			size: {
				default: 'py-[14px] px-[10px] font-[600] text-[16px] rounded-[4px]',
				sm: 'p-[10px] rounded-[4px]  font-[500]',
				lg: 'rounded-md py-[14px] px-[10px] font-[600] text-[20px]',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	icon?: ReactElement;
	iconPosition?: 'left' | 'right';
	loadingIcon?: ReactElement; // Update to accept ReactElement for loadingIcon
	loading?: boolean;
}

// Define Button component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			icon,
			iconPosition,
			// Default loadingIcon is the provided SVG icon
			loadingIcon = (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="animate-spin lucide lucide-loader-circle"
				>
					<path d="M21 12a9 9 0 1 1-6.219-8.56" />
				</svg>
			),
			loading = false,
			children,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				className={cn(buttonVariants({variant, size, className}))}
				ref={ref}
				{...props}
			>
				{loading && <span>{loadingIcon}</span>}{' '}
				{iconPosition === 'left' && icon}
				{children}
				{/* Render loadingIcon with margin if loading is true */}
				{iconPosition === 'right' && icon}
			</Comp>
		);
	}
);

Button.displayName = 'Button';

export {Button, buttonVariants};
