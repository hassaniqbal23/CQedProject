import {
  FileInput,
  FileUploader,
} from '@/components/ui/FileUploader/FileUploader';
import React from 'react';
import { DropzoneOptions } from 'react-dropzone';

interface MultiFileUploaderProps {
  files: any[];
  onFileSelect: (data: any) => void;
  children?: React.ReactNode;
}

function MultiFileUploader({
  files,
  onFileSelect,
  children,
}: MultiFileUploaderProps) {
  const dropzone = {
    multiple: true,
    maxFiles: 4,
    maxSize: 50 * 1024 * 1024,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
      'video/*': ['.mp4', '.mov', '.avi', '.wmv', '.flv'],
    },
  } satisfies DropzoneOptions;

  return (
    <div>
      <FileUploader
        value={files}
        onValueChange={(data) => onFileSelect(data)}
        dropzoneOptions={dropzone}
        reSelect={true}
      >
        <FileInput>{children}</FileInput>
      </FileUploader>
    </div>
  );
}

export default MultiFileUploader;
