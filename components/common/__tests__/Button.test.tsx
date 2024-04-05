// Button.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button component', () => {
  it('renders the button with the provided title', () => {
    render(<Button title="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button title="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays the provided icon', () => {
    const icon = <i data-testid="icon">Icon</i>;
    render(<Button title="Click me" icon={icon} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies the custom width when provided', () => {
    render(<Button title="Click me" width="w-1/2" />);

    const button = screen.getByText('Click me');
    expect(button).toHaveClass('w-1/2');
  });

  it('applies the custom color when provided', () => {
    render(<Button title="Click me" color="text-red-600 bg-red-500" />);

    const button = screen.getByText('Click me');
    expect(button).toHaveClass('text-red-600 bg-red-500');
  });

  it('disables the button when the disabled prop is set', () => {
    render(<Button title="Click me" disabled />);

    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });

  it('sets the button type attribute', () => {
    render(<Button title="Click me" type="submit" />);

    const button = screen.getByText('Click me');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
