import {ReactElement, forwardRef} from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-white hover:bg-primary/90',
				outline:
					'border border-primary text-primary bg-background hover:bg-primary hover:text-white',
				primary400: 'bg-primary-400 text-white hover:bg-primary/90',
				'primaryOutline-400':
					'border border-primary-400 text-primary-400  hover:bg-primary-400 hover:text-white',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				'secondary-outline':
					'border border-secondary text-secondary bg-background hover:bg-secondary hover:text-white',
				error: 'bg-error text-white hover:bg-primary/90',
				'error-outline':
					'border border-error text-error  hover:bg-error hover:text-white',
				sucess: 'bg-sucess text-white hover:bg-primary/90',
				'sucess-outline':
					'border border-sucess text-sucess bg-background hover:bg-sucess hover:text-white',
				info: 'bg-info text-white hover:bg-primary/90',
				infoOutline:
					'border border-info text-info  hover:bg-info hover:text-white',
				warning: 'bg-warning text-white hover:bg-primary/90',
				warningOutline:
					'border border-warning text-warning  hover:bg-warning hover:text-white',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
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
				{iconPosition === 'left' && icon}
				{children}
				{loading && <div style={{marginLeft: '5px'}}>{loadingIcon}</div>}{' '}
				{/* Render loadingIcon with margin if loading is true */}
				{iconPosition === 'right' && icon}
			</Comp>
		);
	}
);

Button.displayName = 'Button';

export {Button, buttonVariants};
