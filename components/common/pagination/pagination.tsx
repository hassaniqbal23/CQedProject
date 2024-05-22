import PropTypes from 'prop-types';
import { Button } from '@/components/ui';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
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
  setPageSize: (pageNumber: number) => void;
  onPageChange: (pageNumber: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  setPageSize,
  onPageChange,
  showSelectPage,
}: PaginationProps) {
  const getPageButtons = () => {
    const buttons = [];
    const maxPagesToShow = 3;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          type="button"
          disabled={i === currentPage}
          className={`mx-1 ${
            currentPage === i
              ? 'bg-[#F0F3F5] hover:bg-[#F0F3F5] rounded-xl text-[#3C3C3C] px-6 py-1'
              : 'text-base text-[#3C3C3C] bg-white rounded-xl'
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return totalPages > 0 ? (
    <>
      {showSelectPage && (
        <Select
          defaultValue={String(pageSize)}
          onValueChange={(value) => setPageSize(Number(value))}
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

      <Button
        type="button"
        className="mr-1 bg-white text-[#3C3C3C]"
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
    </>
  ) : null;
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  showSelectPage: PropTypes.bool,
};

export default Pagination;
