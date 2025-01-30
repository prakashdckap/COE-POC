import React from "react";
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/react/solid";

export default function Pagination({
  perPage,
  totalCount,
  handlePageChange,
  currentPage,
  setcurrentPage,
  handleNextClick,
  handlePreviousClick,
}) {
  const pagesArr = [];

  for (let i = 1; i <= Math.ceil(totalCount / perPage); i += 1) {
    pagesArr.push(i);
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {" "}
              {currentPage > 1 ? (currentPage - 1) * perPage + 1 : currentPage}{" "}
            </span>
            to
            <span className="font-medium">
              {" "}
              {(currentPage - 1) * perPage + perPage < totalCount
                ? (currentPage - 1) * perPage + perPage
                : totalCount}{" "}
            </span>
            of
            <span className="font-medium"> {totalCount} </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              type="button"
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePreviousClick()}
            >
              <span className="sr-only">Previous</span>
              <ChevronDoubleLeftIcon className="w-4 h-4" />
            </button>

            {pagesArr?.map((page) => (
              <a
                key={page}
                href="#"
                aria-current="page"
                className={`${
                  currentPage === page
                    ? "border-indigo-500 text-indigo-600 z-10"
                    : "border-gray-300 text-gray-500"
                }  bg-indigo-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                onClick={() => {
                  setcurrentPage(page);
                  handlePageChange(page);
                }}
              >
                {page}
              </a>
            ))}

            <button
              type="button"
              disabled={currentPage === pagesArr?.length}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50  disabled:opacity-50 disabled:cursor-not-allowed "
              onClick={() => handleNextClick()}
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleRightIcon className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
