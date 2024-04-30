import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const meta = {
  title: 'Ui/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// PRIMARY BUTTONS

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="flex gap-2">
        {/* Default BUTTONS PRIMARY  */}

        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>

        {/* _____________________________________________ */}

        {/* SMALL BUTTONS PRIMARY  */}

        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>

        {/* _____________________________________________ */}

        {/* Large BUTTONS PRIMARY  */}

        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* LOADING BUTTON  */}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'default',
  },
};
// _____________________________________________________________

// PRIMARYOUTLINE BUTTONS

export const outlined: Story = {
  render: (args) => {
    return (
      <div className="flex  gap-[10px]">
        {/* Default BUTTONS PRIMARYOUTLINE  */}

        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>

        {/* _____________________________________________ */}

        {/* SMALL BUTTONS PRIMARYOUTLINE  */}

        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>

        {/* _____________________________________________ */}

        {/* Large BUTTONS PRIMARYOUTLINE  */}

        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>

        {/* _____________________________________________ */}
      </div>
    );
  },
  args: {
    variant: 'outline',
  },
};
// __________________________________________________________

// PRIMARY_400 BUTTONS

export const primary_400: Story = {
  render: (args) => {
    return (
      <div className="flex  gap-[10px]">
        {/* Default BUTTONS  primary_400 */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS primary_400  */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS primary_400  */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
            disabled={true}
          >
            Disabled Loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'primary400',
  },
};

// PRIMARYOUTLINE_400

export const primaryOutline400: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS PRIMARYOUTLINE  */}

        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>

        {/* _____________________________________________ */}

        {/* SMALL BUTTONS PRIMARYOUTLINE  */}

        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>

        {/* _____________________________________________ */}

        {/* Large BUTTONS PRIMARYOUTLINE  */}

        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>

        {/* _____________________________________________ */}
      </div>
    );
  },
  args: {
    variant: 'primaryOutline-400',
  },
};
// SECONDARY BUTTONS

export const Secondary: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS SECONDARY  */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS SECONDARY  */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS SECONDARY  */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'secondary',
  },
};

// OUTLINESECONDARY

export const OutlineSecondary: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS OUTLINESECONDARY  */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS OUTLINESECONDARY  */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS OUTLINESECONDARY  */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'secondary-outline',
  },
};

// ERROR BUTTONS

export const error: Story = {
  render: (args) => {
    return (
      <div className="flex  gap-[10px]">
        {/* Default BUTTONS ERROR   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS ERROR   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS ERROR   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'error',
  },
};

// ERROROUTLINE BUTTONS

export const errorOutline: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS ERROROUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS ERROROUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS ERROROUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'error-outline',
  },
};

// SUCESS BUTTONS
export const sucess: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS SUCESS   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'} loading={true}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS SUCESS   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS SUCESS   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'sucess',
  },
};

// SUCESSOUTLINE BUTTONS

export const sucessOutline: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS SUCESSOUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS SUCESSOUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS SUCESSOUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'sucess-outline',
  },
};

// INFO BUTTONS

export const info: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS INFO   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS INFO   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS INFO   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'info',
  },
};

// INFO_OUtLINE BUTTONS
export const infoOutline: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS INFO_OUtLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS INFO_OUtLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS INFO_OUtLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'infoOutline',
  },
};

// WARNING BUTTONS

export const warning: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS WARNING   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS WARNING   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS WARNING   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'warning',
  },
};

// WARNING_OUTLINE BUTTONS

export const warningOutline: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS WARNING_OUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS WARNING_OUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS WARNING_OUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            disabled={true}
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'warningOutline',
  },
};

// DISABLE BUTTONS

// export const Disabled: Story = {
// 	args: {
// 		variant: 'disable',
// 		disabled: true,
// 		children: 'Button',
// 	},
// };

// export const DisabledOutline: Story = {
// 	args: {
// 		variant: '',
// 		disabled: true,
// 		children: 'Button',
// 	},
// };

export const Disable: Story = {
  render: (args) => {
    return (
      <div className="flex gap-[10px]">
        {/* Default BUTTONS WARNING_OUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Default buttons </h2>
          <Button {...args} size={'default'} disabled={true}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            disabled={true}
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'default'}
            className="flex gap-[10px]"
            disabled={true}
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* SMALL BUTTONS WARNING_OUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>small buttons </h2>
          <Button {...args} size={'sm'} disabled={true}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            disabled={true}
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'sm'}
            className="flex gap-[10px]"
            disabled={true}
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>
        {/* _____________________________________________ */}
        {/* Large BUTTONS WARNING_OUTLINE   */}
        <div className="flex flex-col gap-[10px]">
          <h2>Large buttons</h2>
          <Button {...args} size={'lg'} disabled={true}>
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            disabled={true}
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Button CTA
          </Button>

          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            disabled={true}
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Button CTA
          </Button>
        </div>{' '}
        <div className="flex flex-col gap-[10px] ">
          <h2>loading button</h2>
          <Button
            {...args}
            size={'lg'}
            className="flex gap-[10px]"
            loading={true}
            disabled={true}
          >
            loading
          </Button>
        </div>
      </div>
    );
  },
  args: {
    variant: 'warning',
  },
};

export const LoadingButton: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-[10px]">
        <h2>Loading button</h2>
        <Button {...args} loading={true} size={'lg'}>
          {/* <LoadingOutlined /> */}
          Loading...
        </Button>
      </div>
    );
  },
  args: {
    variant: 'infoOutline',
  },
};
