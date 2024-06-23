import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui';
import { Input } from '@/components/ui';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'form'> {
  form: UseFormReturn<any | undefined>;
  name: string;
  description?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
}

export const FormInput: FC<InputProps> = ({
  form,
  description,
  label,
  placeholder,
  name,
  required,
  ...inputProps
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="!text-lg">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              {...(inputProps as any)}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
