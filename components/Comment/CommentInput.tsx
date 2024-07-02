'use client';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components/ui';
import React, { useState, useEffect, useRef, FC } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '@/app/globalContext/globalContext';
import Image from 'next/image';
import { MentionInput } from '../common/MentionInput/MentionInput';

interface IProps {
  onValueChange?: (value: string, ids?: number[]) => void;
  loading?: boolean;
  users?: { id: string | number; display: string; image?: string | null }[];
}

const CommentInput: FC<IProps> = ({ onValueChange, loading, users }) => {
  const { userInformation } = useGlobalState();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const form = useForm<any>({
    defaultValues: {
      content: '',
      mentionIds: [],
    },
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      event.target instanceof Node &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoji]);

  const { handleSubmit } = form;

  const onSubmit = (value: any) => {
    onValueChange && onValueChange(value.content, value.mentionIds);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full gap-1"
      >
        <Image
          src={
            userInformation?.attachment?.file_path ||
            '/assets/profile/profile.svg'
          }
          alt="Profile Picture"
          className="w-9 h-9 md:w-54 md:h-54 rounded-full bg-lightgray"
          height={54}
          width={54}
          unoptimized={true}
        />
        <FormField
          name="content"
          render={({ field }) => {
            return (
              <FormItem className="w-full mx-2">
                <FormControl className="">
                  <div className="relative">
                    <MentionInput
                      onChange={(
                        e: any,
                        newValue: string,
                        newPlainTextValue: string,
                        mentions: any[]
                      ) => {
                        field.onChange(newValue);
                        form.setValue(
                          'mentionIds',
                          mentions.map((m) => +m.id)
                        );
                      }}
                      value={field.value}
                      placeholder="Enter your comment"
                      mentionSuggestions={users || []}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(onSubmit)();
                        }
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <div>
          <Button
            loading={loading}
            className="w-full bg-primary-500 rounded-3xl h-[44px]"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { CommentInput };
