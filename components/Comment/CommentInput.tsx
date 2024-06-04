'use client';
import { AutosizeTextarea } from '@/components/common/AutosizeTextarea';
import {
  Avatar,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components/ui';
import React, { useState, useEffect, useRef, FC } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { AvatarImage } from '@radix-ui/react-avatar';

interface IProps {
  onValueChange?: (value: string) => void;
  loading?: boolean;
}

const CommentInput: FC<IProps> = ({ onValueChange, loading }) => {
  const { userInformation } = useGlobalState();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const form = useForm<any>({
    defaultValues: {
      content: '',
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
    onValueChange && onValueChange(value.content);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full gap-1"
      >
        <Avatar className="w-9 h-9 md:w-54 md:h-54 rounded-full bg-lightgray ">
          <AvatarImage
            className="m-0 w-full"
            src={
              userInformation?.attachment.file_path ||
              '/assets/profile/profile.svg'
            }
            alt="Profile Picture"
          />
        </Avatar>
        <FormField
          name="content"
          render={({ field }) => {
            return (
              <FormItem className="w-full mx-2">
                <FormControl className="">
                  <div className="relative">
                    <Input
                      placeholder="Enter your comment"
                      {...field}
                      className={`pb-auto h-19 rounded-full resize-none bg-[#F3F3F3] border-none outline-none ring-0`}
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
