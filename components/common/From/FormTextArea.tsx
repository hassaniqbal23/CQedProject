import React, { FC, InputHTMLAttributes, ReactNode } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '../../ui';

interface TextAreaProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  form: UseFormReturn<any | undefined>;
  name: string;
  label?: ReactNode;
  placeholder?: string;
}

export const FormTextArea: FC<TextAreaProps> = ({
  form,
  label,
  placeholder,
  name,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
