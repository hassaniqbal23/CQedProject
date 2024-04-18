import { FC } from 'react';
import { Heading } from '../common/Heading';
import { Span } from '../common/Span';
import { RxCross2 } from 'react-icons/rx';
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
interface ModelProps {
  children?: React.ReactNode;
  show?: boolean;
  onclose?: () => void;
  onClick?: () => void;
  dismiss?: () => void;
  modalHeader?: string;
  dismissClassName?: string;
  modalTitle?: string;
  btnWrapper?: string;
  btnCancelClassName?: string;
  btnCancel?: string;
  btnSaveClassName?: string;
  btnSave?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClickcancel?: () => void;
  color?: string;
  loader?: boolean;
  width?: string;
  imgParent?: string
  height?:string;
  img?: React.ReactNode;
  MainHeadingClass?:string;
  crossIcon?:string;
}
export const Model: FC<ModelProps> = ({
  show,
  onclose,
  onClick,
  dismiss,
  modalHeader,
  dismissClassName,
  children,
  modalTitle,
  btnWrapper,
  btnCancelClassName,
  btnCancel,
  btnSaveClassName,
  btnSave,
  type,
  color,
  img,
  imgParent,
  onClickcancel,
  loader,
  width,
  height,
  MainHeadingClass,
  crossIcon,
}) => {
  if (show == false) {
    return null;
  }

  return (
    <div>
      <div
        className="fixed top-0 bottom-0 right-0 left-0 bg-[#344054]/[0.7] dark:bg-black/[0.2] bg-opacity z-10"
        onClick={onclose}
      ></div>
      <div
        className={`${width} ${height} fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 rounded-2xl z-10`}
      >
        <div className="bg-[#FFFFFF] dark:bg-slate-800 rounded-2xl p-6  md:p-6 z-100">
     
          <div
            className={`${
              modalHeader ? modalHeader : 'flex justify-between items-center'
            } `}
          >
            {img && <div className={`${imgParent}`}>{img}
            </div>}

            <Heading
              text={modalTitle}
              fontSize="text-3xl "
              fontWeight="font-normal"
              className={` ${MainHeadingClass} my-0 mr-5 sm:mr-36`}
            />
            <div>
              <Span
                onClick={dismiss}
                className={`${dismissClassName} text-lg font-semibold text-[#AFB5B8] cursor-pointer`}
                contant={<RxCross2 className={`${crossIcon} text-[#AFB5B8]`} />}
              />
            </div>
          </div>
          <div className="">{children}</div>
          <div className={`${btnWrapper} flex`}>
            <Button
              onClick={onClickcancel}
              className={`${btnCancelClassName} w-full border mr-2`}
            >
              {btnCancel}
            </Button>
            <Button
              type={type}
              onClick={onClick}
              color={color}
              className={`${btnSaveClassName} ml-2 w-full`}
            >
              {loader ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </span>
              ) : (
                `${btnSave}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
