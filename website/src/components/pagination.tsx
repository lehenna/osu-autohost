import { PaginationButton } from "./pagination-button";
import { DoubleArrowLeftIcon } from "@/components/ui/double-left-arrow";
import { DoubleArrowRightIcon } from "@/components/ui/double-right-arrow";
import { LeftArrowIcon } from "@/components/ui/left-arrow";
import { RightArrowIcon } from "@/components/ui/right-arrow";

export function Pagination({
  size,
  setPage,
  page,
}: {
  size: number;
  setPage: (value: number) => void;
  page: number;
}) {
  const totalPages = Math.ceil(size / 10);
  const startPage = Math.max(1, page - 3);
  const endPage = Math.min(totalPages, page + 3);

  const handleFirstPage = () => setPage(1);
  const handlePreviousPage = () => setPage(Math.max(1, page - 1));
  const handleNextPage = () => setPage(Math.min(totalPages, page + 1));
  const handleLastPage = () => setPage(totalPages);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          data-actived={i === page}
          onClick={() => setPage(i)}
          className={i === page ? "active" : ""}
        >
          {i}
        </PaginationButton>
      );
    }
    return pages;
  };

  return (
    <div className="relative flex items-center gap-2.5">
      <PaginationButton onClick={handleFirstPage}>
        <DoubleArrowLeftIcon />
      </PaginationButton>
      <PaginationButton onClick={handlePreviousPage}>
        <LeftArrowIcon />
      </PaginationButton>
      {renderPageNumbers()}
      <PaginationButton onClick={handleNextPage}>
        <RightArrowIcon />
      </PaginationButton>
      <PaginationButton onClick={handleLastPage}>
        <DoubleArrowRightIcon />
      </PaginationButton>
    </div>
  );
}

export default Pagination;
