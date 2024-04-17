'use client';
import { useState, FC } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui';
import Asterisk from './Asterisk';
import countries from '@/components/countries.json';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from '@/components/ui';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { ScrollArea } from '../ui';

type CounrtyProps = {
  name: string;
};

const CountryInput: FC<CounrtyProps> = ({ name }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [searchedCountry, setSearchedCountry] = useState<string | null>(null);

  const { control } = useFormContext();

  const allCountries =
    countries &&
    countries?.map((country: { name: string }, index: number) => {
      return {
        key: String(index),
        value: String(country.name),
        label: String(country.name),
      };
    });

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="block">
              Country <Asterisk />
            </FormLabel>
            <FormControl placeholder="" {...field}>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between  ${
                      field.value ? '' : 'text-muted-foreground'
                    }`}
                  >
                    {field.value || 'Select country...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search country..."
                      onChange={(e: any) => setSearchedCountry(e.target.value)}
                    />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <ScrollArea
                      className={cn(
                        allCountries?.length > 5 ? 'h-40' : 'h-min',
                      )}
                    >
                      {allCountries?.map(
                        (
                          Country: { value: string; label: string },
                          index: number,
                        ) => {
                          const lowerCaseLabel = Country?.label?.toLowerCase();
                          const searchTerm =
                            String(searchedCountry)?.toLowerCase();

                          if (
                            !searchedCountry ||
                            lowerCaseLabel?.includes(searchTerm)
                          ) {
                            return (
                              <CommandItem
                                key={index}
                                value={Country?.value}
                                onSelect={() => {
                                  setValue(Country?.value);
                                  field.onChange(Country?.value);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    value === Country?.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {Country?.label}
                              </CommandItem>
                            );
                          } else {
                            return null;
                          }
                        },
                      )}
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CountryInput;
