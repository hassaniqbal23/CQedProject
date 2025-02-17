import React, { FC, useState, useRef, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Badge, Input, ScrollArea } from '@/components/ui';

type IProps = {
  Label?: React.ReactNode;
  initialTags?: string[];
  onTagsChange: (tags: string[]) => void;
  BadgeVariant?: 'default' | 'destructive' | 'outline' | 'secondary';
  className?: string;
};

const SkillsInput: FC<IProps> = ({
  Label,
  initialTags = [],
  onTagsChange,
  BadgeVariant = 'destructive',
  className,
}) => {
  const initialTagsRef = useRef(initialTags);
  const [tags, setTags] = useState<string[]>(initialTagsRef.current);

  useEffect(() => {
    if (
      JSON.stringify(initialTags) !== JSON.stringify(initialTagsRef.current)
    ) {
      initialTagsRef.current = initialTags;
      setTags(initialTags);
    }
  }, [initialTags]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [tags]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        onTagsChange(updatedTags);
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <div>
      {Label && <label className="block">{Label}</label>}
      <div>
        <Input
          type="text"
          onKeyDown={handleInputKeyDown}
          className="grow px-3 py-6 rounded-md focus:outline-none focus:border-transparent mt-2"
          placeholder="Enter your skills"
          ref={inputRef}
        />
        {tags.length > 0 && (
          <ScrollArea className="flex justify-start items-center gap-2 flex-wrap mt-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant={BadgeVariant}
                onClick={() => removeTag(tag)}
                className={cn(
                  className,
                  'bg-white border border-[#D1D5DB] px-4 py-2 text-sm text-[#5D5E68] dark:text-white/70 mr-2'
                )}
              >
                <span className="mr-1 inline">{tag}</span>
                <Cross1Icon className="h-4 w-4 inline cursor-pointer" />
              </Badge>
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default SkillsInput;
