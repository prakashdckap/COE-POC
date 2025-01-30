import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function ReviewPagination({ pageSize, currentPage, setPageIndex }) {
  const [paginationArray, setPaginationArray] = useState([]);
  const generatePaginationArray = () => {
    if (pageSize > 7) {
      if (currentPage < 5) {
        return [1, 2, 3, 4, 5, "...", pageSize];
        // eslint-disable-next-line no-else-return
      } else if (currentPage > pageSize - 2) {
        return [1, "...", pageSize - 2, pageSize - 1, pageSize];
      } else {
        if (currentPage === pageSize - 3) {
          return [
            1,
            "...",
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,

            pageSize,
          ];
        }
        return [
          1,
          "...",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "...",
          pageSize,
        ];
      }
    }
    const arr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < pageSize; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  // Change Next Page
  const handleNextClick = () => {
    if (currentPage < pageSize) {
      setPageIndex(currentPage + 1);
    }
  };

  // Change Previous Page
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setPageIndex(currentPage - 1);
    }
  };

  useEffect(() => {
    setPaginationArray(generatePaginationArray());
  }, [pageSize, currentPage]);

  return (
    <div className="mx-auto">
      <div className="bg-white p-4 rounded-xl cursor-pointer">
        <ul className="flex items-center -mx-[6px]">
          <li className="">
            <button
              type="button"
              disabled={currentPage === 1}
              className="relative inline-flex items-center justify-center w-[34px] p-1 mr-2.5 bg-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => handlePreviousClick()}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-[23px] text-[#000000]" />
            </button>
          </li>
          {paginationArray.map((arr) => (
            <li
              aria-hidden="true"
              onClick={() => arr !== "..." && setPageIndex(arr)}
              key={arr}
              className=""
            >
              <div
                className={` h-7 w-7 ${
                  currentPage === arr ? "bg-[#000000] text-white " : "text-[#000000]"
                } flex items-center justify-center rounded-md text-[13px] font-semibold`}
              >
                <span className=""> {arr} </span>
              </div>
            </li>
          ))}
          <li className="">
            <button
              type="button"
              disabled={currentPage === pageSize}
              className="relative inline-flex items-center justify-center w-[34px] p-1 ml-2.5 bg-white text-sm text-[#7d7d7d] disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => handleNextClick()}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-[23px] text-[#000000]" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
