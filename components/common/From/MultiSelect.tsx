import * as React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/';
import { Command, CommandGroup, CommandItem } from '@/components/ui';
import { Command as CommandPrimitive } from 'cmdk';

type SelectItem = Record<'value' | 'label', string>;

interface MultiSelectProps<T extends SelectItem> {
  options: T[];
  value: T[];
  onChange: (value: T[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect<T extends SelectItem>({
  options,
  value,
  onChange,
  placeholder = 'Select items...',
  className = '',
}: MultiSelectProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = (item: T) => {
    onChange(value.filter((s) => s.value !== item.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (
      input &&
      (e.key === 'Delete' || e.key === 'Backspace') &&
      input.value === ''
    ) {
      onChange(value.slice(0, -1));
    }
    if (e.key === 'Escape') {
      input?.blur();
    }
  };

  const selectables = options
    ? options.filter(
        (option) => !(value || []).some((v) => v.value === option.value)
      )
    : [];

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className}`}
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-primary">
        <div className="flex gap-1 flex-wrap">
          {value.map((item) => (
            <Badge key={item.value} variant="secondary">
              {item.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-primary"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      {open && selectables.length > 0 && (
        <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md">
          <CommandGroup>
            {selectables.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  setInputValue('');
                  onChange([...value, item]);
                }}
                className="cursor-pointer"
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </div>
      )}
    </Command>
  );
}
