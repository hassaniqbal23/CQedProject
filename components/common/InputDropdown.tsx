import { FC } from 'react';

interface Idropdown {
  onClick?: () => void;
  firstContent?: string;
  className?: string;
  secondContent?: string;
  onclose?: () => void;
  onclickmodel?: () => void;
}
export const InputDropdown: FC<Idropdown> = ({
  onClick,
  firstContent,
  className,
  secondContent,
  onclose,
  onclickmodel,
}) => {
  return (
    <div onClick={onClick} className={`${className}`}>
      <div className=" border-2 rounded-md border-[#F2F4F7] bg-white dark:bg-slate-900 dark:border-slate-800 z-50">
        <div
          className=" pt-4 px-4 cursor-pointer text-base leading-6 font-normal pb-3.5 border-b border-[#F2F4F7]"
          onClick={onclose}
        >
          {firstContent}
        </div>
        <div
          className="w-44 pt-3.5 px-4 text-base font-medium cursor-pointer leading-6 pb-4 text-[#E01E5A]"
          onClick={onclickmodel}
        >
          {secondContent}
        </div>
      </div>
    </div>
  );
};

export default InputDropdown;
