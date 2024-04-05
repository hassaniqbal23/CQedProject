// Heading.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from '../Heading';

describe('Heading component', () => {
  it('renders the text correctly', () => {
    render(<Heading text="Sample Heading" />);
    expect(screen.getByText('Sample Heading')).toBeInTheDocument();
  });

  it('applies the custom font size when provided', () => {
    render(<Heading text="Sample Heading" fontSize="text-4xl" />);
    const heading = screen.getByText('Sample Heading');
    expect(heading).toHaveClass('text-4xl');
  });

  it('applies the custom font weight when provided', () => {
    render(<Heading text="Sample Heading" fontWeight="font-semibold" />);
    const heading = screen.getByText('Sample Heading');
    expect(heading).toHaveClass('font-semibold');
  });

  it('applies the default font size and font weight when not provided', () => {
    render(<Heading text="Sample Heading" />);
    const heading = screen.getByText('Sample Heading');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-3xl');
  });
});
