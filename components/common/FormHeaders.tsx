import { Heading } from '@/components/common/Heading';
import { FC } from 'react';
import { Image } from '@/components/common/Image';
import { cn } from '@/lib/utils';
interface IProps {
  classNameHeading?: string;
  className?: string;
  title: string;
  paragraph: string;
  imageLink: string;
  width: number;
  height: number;
  alt?: string;
  headerClassName?: string;
  ImageClassName?: string;
  TextOuter?: string;
}

const FormHeaders: FC<IProps> = ({
  classNameHeading,
  className,
  title,
  paragraph,
  imageLink,
  width,
  height,
  alt,
  headerClassName,
  ImageClassName,
  TextOuter
}) => {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row justify-between items-center bg-[#F2F1F1] dark:bg-slate-900 dark:shadow-lg dark:shadow-slate-800 rounded-lg mb-6 ${headerClassName}`}
    >
      <div className={cn('py-[16px] sm:py-[21px] px-6', TextOuter)}>
        <Heading
          className={`${classNameHeading} text-[#0F172A] dark:text-white mb-3 w-full sm:w-9/12`}
          fontWeight="font-medium"
          fontSize="text-xl"
          text={title}
        />
        <p
          className={`${className} text-base font-normal text-[#2F3C59] dark:text-white w-full sm:w-11/12`}
        >
          {paragraph}
        </p>
      </div>
      <div className={ImageClassName}>
        <Image
          className={'sm:mr-12 mb-0 sm:m-0 py-3'}
          src={imageLink}
          width={width}
          height={height}
          alt={alt ? alt : 'gif image'}
        />
      </div>
    </div>
  );
};

export default FormHeaders;
