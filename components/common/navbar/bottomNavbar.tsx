import { Button, ButtonProps } from '@/components/ui';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface BottomNavbarProps {
  onBackButton?: () => void;
  onContinue?: () => void;
  isBackButton?: boolean;
  buttonType?: ButtonProps['type'];
  buttonLoading?: boolean;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  onBackButton,
  onContinue,
  isBackButton,
  buttonType,
  buttonLoading,
}) => {
  return (
    <div
      className={`bg-primary-500 shadow-top md:shadow-none shadow-opacity-10 px-10 flex z-40 ${isBackButton ? ' justify-between ' : 'justify-end'} items-center h-20`}
    >
      {isBackButton && (
        <Button
          onClick={onBackButton}
          iconPosition="left"
          icon={<ChevronLeft className="w-6 h-9 text-white cursor-pointer" />}
        >
          Back
        </Button>
      )}
      <Button
        type={buttonType}
        onClick={onContinue}
        loading={buttonLoading}
        className="rounded-2xl bg-secondary-500 shadow-inner border border-secondary-500  flex justify-center items-center py-3 px-7 gap-7 text-blue-600 font-montserrat font-bold text-lg uppercase hover:bg-secondary-900  hover:text-white cursor-pointer mr-6 w-auto"
      >
        Continue
      </Button>
    </div>
  );
};

export default BottomNavbar;
