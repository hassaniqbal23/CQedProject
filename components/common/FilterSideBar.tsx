import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '../ui/separator';
import { BsFunnel } from 'react-icons/bs';
interface IProps {
  children: React.ReactNode;
}

const FilterSideBar = ({ children }: IProps) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="p-0 m-0 my-4 md:my-0">
          <Button
            variant={'outline'}
            className="inline-flex items-center hover:bg-primary hover:text-white py-[11px] px-[19px] bg-muted text-base text-foreground rounded-[6px] font-medium"
          >
            <BsFunnel className="mr-2 text-base" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0">
          <SheetHeader>
            <SheetTitle className="px-[21px] py-[24px] text-xl font-medium">
              Filters Apply
            </SheetTitle>
            <Separator className="bg-foreground/[0.1] h-[1px]" />
          </SheetHeader>
          <SheetDescription className="pl-[21px] pr-[24px] pt-[24px]">
            {children}
          </SheetDescription>
          <SheetFooter className="flex sm:justify-between items-center pl-[21px] pr-[24px] pt-[24px] mt-8">
            <SheetClose asChild>
              <Button
                variant={'outline'}
                className="py-[10px] px-[35px] text-sm font-normal text-foreground rounded-[6px]"
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              variant={'default'}
              className="py-[10px] px-[20px] text-sm font-normal text-white rounded-[6px]"
            >
              Apply Filter
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterSideBar;
