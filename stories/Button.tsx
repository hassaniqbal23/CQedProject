import React from 'react';

interface ButtonProps {
	primary?: boolean;
	backgroundColor?: string;
	size?: 'small' | 'medium' | 'large';
	label: string;
	onClick?: () => void;
}
export const Button = ({
	primary = false,
	size = 'medium',
	backgroundColor,
	label,
	...props
}: ButtonProps) => {
	const mode = primary
		? 'storybook-button--primary'
		: 'storybook-button--secondary';
	return (
		<button
			type="button"
			className={'p-3 bg-primary rounded-full text-white'}
			{...props}
		>
			{label}
			<style jsx>{`
				button {
					background-color: ${backgroundColor};
				}
			`}</style>
		</button>
	);
};
