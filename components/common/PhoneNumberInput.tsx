'use client';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import Asterisk from './Asterisk';

type PhoneNumberInputProps = {
  label?: string;
  name: string;
  placeholder?: string;
};

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  label,
  name,
  placeholder,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            {label}
            <Asterisk />
          </FormLabel>
          <FormControl placeholder={placeholder} {...field}>
            <Input
              type="text"
              min={0}
              maxLength={11}
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneNumberInput;
