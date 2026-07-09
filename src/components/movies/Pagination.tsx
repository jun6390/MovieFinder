import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMovieStore } from "../../store/movieStore";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
  const currentPage = useMovieStore((state) => state.currentPage);
  const setCurrentPages = useMovieStore((state) => state.setCurrentPages);
  const prevPageRef = useRef(currentPage);
  const hasPages = totalPages > 0;
  const lastPage = Math.max(1, totalPages);

  useEffect(() => {
    if (prevPageRef.current === currentPage) return;

    prevPageRef.current = currentPage;

    document
      .getElementById("movie-list-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagestoShow = 5;

    if (totalPages <= maxPagestoShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagestoShow / 2));
      let endPage = startPage + maxPagestoShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagestoShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center bg-black px-4 py-3 sm:px-6 shadow-sm text-white pb-12">
      {/* 모바일 */}
      <div className="flex flex-1 justify-center gap-3 sm:hidden">
        <button
          className={twMerge(
            `relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white border border-white/30`,
            !hasPages || currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-800",
          )}
          disabled={!hasPages || currentPage === 1}
          onClick={() => setCurrentPages(Math.max(1, currentPage - 1))}
        >
          Previous
        </button>

        <button
          className={twMerge(
            `relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white border border-white/30`,
            !hasPages || currentPage === lastPage
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-800",
          )}
          disabled={!hasPages || currentPage === lastPage}
          onClick={() => setCurrentPages(Math.min(currentPage + 1, lastPage))}
        >
          Next
        </button>
      </div>

      {/* 데스크탑 */}
      <div className="hidden sm:flex sm:flex-1 sm:flex-col sm:items-center sm:justify-center gap-3 text-center">
        <p className="text-sm text-white">
          Showing page{" "}
          <span className="font-medium">{hasPages ? currentPage : 0}</span> of{" "}
          <span className="font-medium">{totalPages}</span> pages
        </p>

        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            className={twMerge(
              `relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`,
              !hasPages || currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-800",
            )}
            disabled={!hasPages || currentPage === 1}
            onClick={() => setCurrentPages(1)}
          >
            <span className="sr-only">First page</span>
            <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            className={twMerge(
              `relative inline-flex items-center px-2 py-2 text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`,
              !hasPages || currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-800",
            )}
            disabled={!hasPages || currentPage === 1}
            onClick={() => setCurrentPages(Math.max(1, currentPage - 1))}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={twMerge(
                `relative inline-flex items-center px-4 py-2 text-sm font-semibold `,
                currentPage === page
                  ? "z-10 bg-white text-black"
                  : "text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-800 focus:z-20 focus:outline-offset-0",
              )}
              onClick={() => setCurrentPages(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={twMerge(
              `relative inline-flex items-center px-2 py-2 text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`,
              !hasPages || currentPage === lastPage
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-800",
            )}
            disabled={!hasPages || currentPage === lastPage}
            onClick={() =>
              setCurrentPages(Math.min(currentPage + 1, lastPage))
            }
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            className={twMerge(
              `relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`,
              !hasPages || currentPage === lastPage
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-800",
            )}
            disabled={!hasPages || currentPage === lastPage}
            onClick={() => setCurrentPages(lastPage)}
          >
            <span className="sr-only">Last page</span>
            <ChevronsRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
