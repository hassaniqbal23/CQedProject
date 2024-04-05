import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  // SetPageSize: Dispatch<SetStateAction<number>>;
  SetPageSize: (pageNumber: number) => void;
  onPageChange: (pageNumber: number) => void;
  fetchData: (pageNumber: number, pageSize: number) => Promise<any>;
}

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  SetPageSize,
  onPageChange,
  fetchData,
}: PaginationProps) {
  const showPagesAroundCurrentPage = 1;

  const getPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || i === currentPage) {
        buttons.push(
          <Button
            key={i}
            variant="outline"
            type="button"
            disabled={i === currentPage}
            className={`mx-1 ${
              currentPage === i
                ? 'bg-[#4F46E5D9] hover:bg-[#4F46E5] text-white text-lg'
                : 'hover.bg-[#4F46E5] text-lg'
            }
            `}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>,
        );
      } else if (
        i >= currentPage - showPagesAroundCurrentPage &&
        i <= currentPage + showPagesAroundCurrentPage
      ) {
        buttons.push(
          <Button
            key={i}
            variant="outline"
            type="button"
            className={`mx-1 hover.bg-[#4F46E5] text-lg`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>,
        );
      }
    }

    return buttons;
  };

  return totalPages > 0 ? (
    <div className="mt-4 flex justify-end mb-4">
      <div className="mr-3">
        <Select
          defaultValue={String(pageSize)}
          onValueChange={(value) => SetPageSize(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />/ page
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value={String(totalCount)}>All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        variant="outline"
        className="hover-bg-[#4F46E5] mr-1"
        disabled={currentPage - 10 < 1}
        onClick={() => onPageChange(Math.max(currentPage - 10, 1))}
      >
        <MdKeyboardDoubleArrowLeft className="text-2xl" />
      </Button>

      <Button
        type="button"
        variant="outline"
        className="hover-bg-[#4F46E5] mr-1"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <MdKeyboardArrowLeft className="text-2xl" />
      </Button>

      {getPageButtons()}

      <Button
        type="button"
        variant="outline"
        className="hover-bg-[#4F46E5] ml-1"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <MdKeyboardArrowRight className="text-2xl" />
      </Button>

      <Button
        type="button"
        variant="outline"
        className="hover-bg-[#4F46E5] ml-1"
        disabled={currentPage + 10 > totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 10, totalPages))}
      >
        <MdKeyboardDoubleArrowRight className="text-2xl" />
      </Button>
    </div>
  ) : null;
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
