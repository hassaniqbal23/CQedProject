'use client';
import { AutosizeTextarea } from '@/components/common/AutosizeTextarea';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui';
import { CircleX, SendHorizontal, Smile } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChatEmojiPicker } from './ChatEmojiPicker/ChatEmojiPicker';
import { ChatFileUploader } from './ChatFileUploader/ChatFileUploader';
import { AspectRatio } from '@/components/ui/aspect-ratio/aspect-ratio';
import Image from 'next/image';
import { useSocket } from '../../WithSockets/WithSockets';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';
import { useChatGuard } from '../../ChatProvider/ChatGuard';
import { useGlobalState } from '@/app/gobalContext/globalContext';

let TypingTimeout: any;

function ChatInput({ onSendMessage }: any) {
  const { currentConversation } = useChatFeatures();
  const { userInformation } = useGlobalState();
  const { userIsTyping } = useChatGuard();
  const { isConnected } = useSocket();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(41);
  const form = useForm<any>({
    defaultValues: {
      message: '',
      files: [],
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

  const hasCurrentConversationUserBlockedMe = React.useMemo(() => {
    return (
      userInformation.BlockedFrom.findIndex(
        (user) => user.userId === currentConversation?.user.id
      ) > -1
    );
  }, [userInformation, currentConversation]);

  useEffect(() => {
    const files = form.watch('files');
    if (files?.length > 0) {
      setHeight(150);
    } else {
      setHeight(41);
    }
  }, [form.watch('files')]);

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

  const handleRemoveFile = (index: number) => {
    const files = form
      .watch('files')
      .filter((_: any, i: number) => i !== index);
    form.setValue('files', [...files]);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!data.message && data.files.length === 0) return;
    onSendMessage(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full items-end gap-2 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="message"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl className="">
                  <div className="relative">
                    <AutosizeTextarea
                      placeholder={
                        hasCurrentConversationUserBlockedMe
                          ? 'You cannot send a message'
                          : 'Enter your message'
                      }
                      {...field}
                      minHeight={height}
                      disabled={
                        !isConnected || hasCurrentConversationUserBlockedMe
                      }
                      onKeyDown={(e) => {
                        if (
                          (e.target as HTMLTextAreaElement).value.trim()
                            .length === 0
                        )
                          return;

                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                          setHeight(41);
                          form.setValue('message', '');
                        }

                        if (!currentConversation) return;

                        clearTimeout(TypingTimeout);
                        TypingTimeout = setTimeout(() => {
                          userIsTyping(
                            currentConversation.id,
                            currentConversation.users
                          );
                        }, 100);
                      }}
                      maxHeight={
                        form.watch('files').length > 0 ? height / 2 : 120
                      }
                      className={`${form.watch('files').length > 0 ? 'pb-20' : 'pb-auto'} resize-none`}
                      icon={
                        !hasCurrentConversationUserBlockedMe ? (
                          <div className="flex gap-2" ref={emojiPickerRef}>
                            <ChatFileUploader
                              files={form.getValues('files')}
                              onFileSelect={(data) => {
                                form.setValue('files', [
                                  ...form.getValues('files'),
                                  ...data,
                                ]);
                              }}
                            />
                            <ChatEmojiPicker
                              onPickEmoji={(emoji) => {
                                const currentMessage =
                                  form.getValues('message') || '';
                                form.setValue(
                                  'message',
                                  currentMessage + emoji.emoji
                                );
                              }}
                              open={showEmoji}
                              button={
                                <div
                                  onClick={() => setShowEmoji(!showEmoji)}
                                  className="cursor-pointer"
                                >
                                  <Smile
                                    width={18}
                                    height={18}
                                    color="#4E5D78"
                                  />
                                </div>
                              }
                            />
                          </div>
                        ) : (
                          <></>
                        )
                      }
                    />
                    {form.watch('files').length > 0 && (
                      <div className="absolute bottom-4 left-3 grid grid-cols-5 gap-3">
                        {form.watch('files').map((file: any, index: number) => (
                          <div
                            key={index}
                            aria-roledescription={`file ${index + 1} containing ${
                              file.name
                            }`}
                            className="p-0 size-20 group "
                          >
                            <AspectRatio className="size-full relative">
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover rounded-md"
                                fill
                              />
                              <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 group-hover:flex hidden w-full h-full bg-slate-300-opacity-50 rounded items-center justify-center ">
                                <CircleX
                                  className="cursor-pointer"
                                  onClick={() => handleRemoveFile(index)}
                                />
                              </div>
                            </AspectRatio>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <div>
          <Button
            className="w-full bg-blue-100 h-[54px] w-[54px]"
            type="submit"
            disabled={!isConnected || hasCurrentConversationUserBlockedMe}
          >
            <SendHorizontal className="text-primary " />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { ChatInput };
