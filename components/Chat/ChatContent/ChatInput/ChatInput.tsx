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
import { useChatProvider } from '../../ChatProvider/ChatProvider';
import { useChatGuard } from '../../ChatProvider/ChatGuard';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { uploadFile } from '@/app/api/chat';
import { useMutation } from 'react-query';
import { useUploadFile } from '@/lib/hooks';
import Loading from '@/components/ui/button/loading';
import { toast as sonnerToast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (data: any) => void;
  isConversationBlocked?: boolean;
}

let TypingTimeout: any;

function ChatInput({ onSendMessage, isConversationBlocked }: ChatInputProps) {
  const { currentConversation } = useChatProvider();
  const { userInformation, usersIBlocked } = useGlobalState();
  const { userIsTyping } = useChatGuard();
  const { isConnected } = useSocket();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(54);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});
  const [fileLoading, setFileLoading] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [allFilesUploaded, setAllFilesUploaded] = useState<boolean>(true);

  const form = useForm<any>({
    defaultValues: {
      message: '',
      attachments: [],
    },
  });

  const uploadFileMutation = useUploadFile();

  const handleFileSelect = async (files: Blob[]) => {
    setAllFilesUploaded(false);
    const filePromises = Array.from(files).map(async (file: Blob) => {
      setFileLoading((prev) => ({ ...prev, [file.name]: true }));
      try {
        const result = await uploadFileMutation.mutateAsync(file);
        form.setValue('attachments', [
          ...form.getValues('attachments'),
          result,
        ]);
      } catch (error: any) {
        setFileErrors((prev) => ({ ...prev, [file.name]: error.message }));
      } finally {
        setFileLoading((prev) => ({ ...prev, [file.name]: false }));
      }
    });

    await Promise.all(filePromises);
    setFiles([]);
    setAllFilesUploaded(true);
  };

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
    const uploadedFiles = form.watch('attachments');
    if (files.length > 0 || uploadedFiles?.length > 0) {
      setHeight(150);
    } else {
      setHeight(54);
    }
  }, [form.watch('attachments'), files]);

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
      .watch('attachments')
      .filter((_: any, i: number) => i !== index);
    form.setValue('attachments', [...files]);
    setFileErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[form.watch('attachments')[index]?.name];
      return newErrors;
    });
    setFileLoading((prev) => {
      const newLoading = { ...prev };
      delete newLoading[form.watch('attachments')[index]?.name];
      return newLoading;
    });
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const hasAttachments = data.attachments && data.attachments.length > 0;
    const hasMessage = data.message && data.message.trim().length > 0;

    // Check if any file is still uploading
    const anyFileUploading = Object.values(fileLoading).some(
      (loading) => loading
    );

    if (anyFileUploading) {
      sonnerToast.info('Please wait for the file to upload', {
        position: 'bottom-left',
        closeButton: true,
      });
      return;
    }

    if (!hasAttachments && !hasMessage) return;

    onSendMessage(data);
    form.reset();
    setFileErrors({});
    setFileLoading({});
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
                        isConversationBlocked
                          ? 'You cannot send a message'
                          : 'Enter your message'
                      }
                      {...field}
                      minHeight={height}
                      disabled={!isConnected || isConversationBlocked}
                      onKeyDown={(e) => {
                        if (
                          (e.target as HTMLTextAreaElement).value.trim()
                            .length === 0
                        )
                          return;

                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                          setHeight(54);
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
                        form.watch('attachments').length > 0 ? height / 2 : 120
                      }
                      className={`${form.watch('attachments').length > 0 ? 'pb-20' : 'pb-auto'} resize-none`}
                      icon={
                        !isConversationBlocked ? (
                          <div className="flex gap-2" ref={emojiPickerRef}>
                            <ChatFileUploader
                              files={form.getValues('attachments')}
                              onFileSelect={(data) => {
                                handleFileSelect(data);
                                setFiles([
                                  ...form.watch('attachments'),
                                  ...files,
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
                    {files.length > 0 ? (
                      <div className="absolute bottom-4 left-3 grid grid-cols-5 gap-3">
                        {files.map((file: any, index: number) => (
                          <div
                            key={index}
                            aria-roledescription={`file ${index + 1} containing ${
                              file.name
                            }`}
                            className="p-0 size-20 group "
                          >
                            <AspectRatio className="size-full relative">
                              <Image
                                src={
                                  file.file_path || URL.createObjectURL(file)
                                }
                                alt={file.file_path || file.name}
                                className="object-cover rounded-md"
                                fill
                                unoptimized={true}
                              />
                              {fileLoading[file.name] && (
                                <div className=" flex absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-full h-full bg-slate-300-opacity-50 rounded items-center justify-center ">
                                  <Loading />
                                </div>
                              )}
                              {fileErrors[file.name] && (
                                <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex w-full h-full bg-red-600-opacity-70 rounded items-center justify-center text-white text-center">
                                  {fileErrors[file.name]}
                                </div>
                              )}
                            </AspectRatio>
                          </div>
                        ))}
                      </div>
                    ) : (
                      form.watch('attachments').length > 0 && (
                        <div className="absolute bottom-4 left-3 grid grid-cols-5 gap-3">
                          {form
                            .watch('attachments')
                            .map((file: any, index: number) => (
                              <div
                                key={index}
                                aria-roledescription={`file ${index + 1} containing ${
                                  file.name
                                }`}
                                className="p-0 size-20 group "
                              >
                                <AspectRatio className="size-full relative">
                                  <Image
                                    src={
                                      file.file_path ||
                                      URL.createObjectURL(file)
                                    }
                                    alt={file.file_path || file.name}
                                    className="object-cover rounded-md"
                                    fill
                                    unoptimized={true}
                                  />
                                  {!fileLoading[file.name] && (
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 group-hover:flex hidden w-full h-full bg-slate-300-opacity-50 rounded items-center justify-center ">
                                      <CircleX
                                        className="cursor-pointer"
                                        onClick={() => handleRemoveFile(index)}
                                      />
                                    </div>
                                  )}
                                  {fileErrors[file.name] && (
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex w-full h-full bg-red-600-opacity-70 rounded items-center justify-center text-white text-center">
                                      {fileErrors[file.name]}
                                    </div>
                                  )}
                                </AspectRatio>
                              </div>
                            ))}
                        </div>
                      )
                    )}
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <div>
          <Button
            className=" bg-blue-100 h-[54px] w-[54px] "
            type="submit"
            disabled={
              !isConnected || isConversationBlocked || !allFilesUploaded
            }
          >
            <SendHorizontal className="text-primary " />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { ChatInput };
