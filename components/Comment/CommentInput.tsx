'use client';
import { AutosizeTextarea } from '@/components/common/AutosizeTextarea';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui';
import { Smile } from 'lucide-react';
import React, { useState, useEffect, useRef, FC } from 'react';
import { useForm } from 'react-hook-form';
import EmojiPicker from 'emoji-picker-react';
import Image from 'next/image';
import { useGlobalState } from '@/app/gobalContext/globalContext';

interface IProps {
  onValueChange?: (value: string) => void;
}

const CommentInput: FC<IProps> = ({ onValueChange }) => {
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
        className="flex items-center w-full gap-2 "
      >
        <Image
          src={userInformation?.attachment.file_path || '/images/avatar.png'}
          height={32}
          width={32}
          alt="comment ist"
        />
        <FormField
          name="content"
          render={({ field }) => {
            return (
              <FormItem className="w-full mx-3">
                <FormControl className="">
                  <div className="relative">
                    <AutosizeTextarea
                      placeholder="Enter your comment"
                      {...field}
                      className={`pb-auto rounded-full'}`}
                      icon={
                        <div className="flex gap-2 " ref={emojiPickerRef}>
                          <EmojiPicker
                            onEmojiClick={(emoji) => {
                              const currentMessage =
                                form.getValues('content') || '';
                              form.setValue(
                                'content',
                                currentMessage + emoji.emoji
                              );
                            }}
                            open={showEmoji}
                          />
                          <div
                            onClick={() => setShowEmoji(!showEmoji)}
                            className="cursor-pointer"
                          >
                            <Smile width={18} height={18} color="#4E5D78" />
                          </div>
                        </div>
                      }
                    />
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <div>
          <Button
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
