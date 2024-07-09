import Modal from '@/components/common/Modal/Modal';
import { useState } from 'react';
import Image from 'next/image';

interface PreviewAttachmentModalProps {
  buttonTrigger: React.ReactNode;
  attachment: any;
}

export const PreviewAttachmentModal = ({
  buttonTrigger,
  attachment,
}: PreviewAttachmentModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div onClick={() => setIsVisible(true)}>{buttonTrigger}</div>
      <Modal
        isVisible={isVisible}
        isSeperator={false}
        onOpenChange={() => setIsVisible(!isVisible)}
        footer={false}
      >
        <div>
          {attachment && attachment.upload_type === 'image' && (
            <Image
              src={attachment.file_path}
              alt="Attachment"
              width={500}
              height={500}
            />
          )}
          {attachment && attachment.upload_type === 'video' && (
            <video controls>
              <source src={attachment.file_path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </Modal>
    </>
  );
};
