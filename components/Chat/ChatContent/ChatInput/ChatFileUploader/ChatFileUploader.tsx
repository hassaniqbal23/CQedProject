import React, { useState } from 'react';
import {
  FileInput,
  FileUploader,
} from '@/components/ui/FileUploader/FileUploader';
import { Paperclip } from 'lucide-react';
import { DropzoneOptions } from 'react-dropzone';

interface IChatFileUplaoderProps {
  files: any[];
  onFileSelect: (data: any) => void;
}

function ChatFileUploader({ files, onFileSelect }: IChatFileUplaoderProps) {
  const dropzone = {
    multiple: true,
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
      'video/*': ['.mp4', '.mov', '.avi', '.wmv', '.flv'],
      'audio/*': ['.mp3', '.wav', '.ogg'],
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'text/csv': ['.csv'],
      'application/*': ['.doc', '.docx', '.ppt', '.pptx', '.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
  } satisfies DropzoneOptions;

  return (
    <div>
      <FileUploader
        value={files}
        onValueChange={onFileSelect}
        dropzoneOptions={dropzone}
        reSelect={true}
      >
        <FileInput>
          <Paperclip width={18} height={18} color="#4E5D78" />
        </FileInput>
      </FileUploader>
    </div>
  );
}

export { ChatFileUploader };
