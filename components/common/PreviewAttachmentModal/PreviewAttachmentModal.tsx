import Modal from '@/components/common/Modal/Modal';
import { useState } from 'react';
import Image from 'next/image';

interface Attachment {
  id: number;
  file_path: string;
  upload_type: 'JPEG' | 'MP4';
}

interface PreviewAttachmentModalProps {
  buttonTrigger: React.ReactNode;
  attachment: string;
}

export const PreviewAttachmentModal = ({
  buttonTrigger,
  attachment,
}: PreviewAttachmentModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleCloseModal = () => setIsVisible(false);

  return (
    <>
      <div onClick={() => setIsVisible(true)}>{buttonTrigger}</div>
      <Modal
        isVisible={isVisible}
        isSeperator={false}
        onOpenChange={handleCloseModal}
        footer={false}
      >
        <div className="mt-1">
          <Image
            src={attachment || ''}
            height={200}
            width={200}
            alt="user attachment"
            unoptimized={true}
            className="w-full rounded-md "
          />
        </div>
      </Modal>
    </>
  );
};
