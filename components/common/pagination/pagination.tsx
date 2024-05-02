import PropTypes from 'prop-types';
import { Button } from '@/components/ui';
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
} from '@/components/ui/';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  showSelectPage?: boolean;

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
  showSelectPage,
}: PaginationProps) {
  const showPagesAroundCurrentPage = 1;

  const getPageButtons = () => {
    const buttons = [];
    const totalPagesToShow = 6;
    const halfPagesToShow = Math.floor(totalPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

    if (endPage - startPage < totalPagesToShow - 1) {
      startPage = Math.max(1, endPage - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === 1 || i === totalPages || i === currentPage) {
        buttons.push(
          <Button
            key={i}
            type="button"
            disabled={i === currentPage}
            className={`mx-1 ${
              currentPage === i
                ? ' bg-[#F0F3F5] hover:bg-[#F0F3F5] rounded-xl text-[#3C3C3C] px-5 py-1'
                : ' text-lg text-[#3C3C3C]  bg-[#F0F3F5] rounded-xl  '
            }
            `}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      } else if (
        i >= currentPage - showPagesAroundCurrentPage &&
        i <= currentPage + showPagesAroundCurrentPage
      ) {
        buttons.push(
          <Button
            key={i}
            type="button"
            className={`mx-1 hover.bg-[#4F46E5] text-lg bg-white text-[#3C3C3C]`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }

    return buttons;
  };

  return totalPages > 0 ? (
    <div className="mt-4 flex justify-end mb-4">
      <div className="mr-3 bg-white text-[#3C3C3C]">
        {showSelectPage && (
          <Select
            defaultValue={String(pageSize)}
            onValueChange={(value) => SetPageSize(Number(value))}
          >
            <SelectTrigger className="w-[100px] bg-white text-[#3C3C3C]">
              <SelectValue />/ page
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value={String(totalCount)}>All</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <Button
        type="button"
        className=" mr-1 bg-white text-[#3C3C3C]"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <MdKeyboardArrowLeft className="text-xl" />
      </Button>

      {getPageButtons()}

      <Button
        type="button"
        className="bg-white text-[#3C3C3C] ml-1"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <MdKeyboardArrowRight className="text-xl" />
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
