import React, { useEffect, useState } from "react";
import { ArrowNarrowLeft, ArrowNarrowRight } from "heroicons-react";

function removeDuplicates(arr) {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}

export default function Pagination({ pageSize, currentPage, setPageIndex, viewLoading }) {
  const [paginationArray, setPaginationArray] = useState([]);
  const generatePaginationArray = () => {
    if (pageSize > 7) {
      if (currentPage < 5) {
        return [1, 2, 3, 4, 5, "...", pageSize];
        // eslint-disable-next-line no-else-return
      } else if (currentPage > pageSize - 2) {
        return [1, "...", pageSize - 2, pageSize - 1, pageSize];
      } else {
        let arr = [
          1,
          "...",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          pageSize,
        ];
        if (currentPage === pageSize - 3) {
          arr = removeDuplicates(arr);
          return arr;
        }
        arr.splice(6, 0, "...");
        return arr;
      }
    }
    const arr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < pageSize; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  useEffect(() => {
    if (!viewLoading) setPaginationArray(generatePaginationArray());
  }, [pageSize, currentPage]);

  const changePage = (index) => {
    if (!viewLoading && index !== "...") {
      setPageIndex(index);
    }
  };

  return (
    <div className="pagination mx-auto pt-8">
      <div className="bg-white p-4 rounded-xl cursor-pointer">
        <ul className="flex items-center -mx-[6px]">
          {currentPage !== 1 && (
            <li className="">
              <a className="px-1 flex items-center justify-center rounded-md text-[#7d7d7d] font-medium text-sm">
                <span className="h-4 w-4">
                  <ArrowNarrowLeft className="h-[100%] w-[100%]" onClick={()=>changePage(currentPage-1)} />
                </span>
              </a>
            </li>
          )}
          {paginationArray.map((arr, i) => {
            return (
              <li
                aria-hidden="true"
                onClick={() => changePage(arr)}
                onDoubleClick={() => {}}
                key={arr !== "..." ? arr : arr + i}
                className=""
              >
                <a
                  className={`px-1 flex items-center justify-center rounded-md font-medium text-sm ${
                    currentPage === arr ? "font-extrabold text-[#000000]" : "text-[#838995]"
                  }`}
                >
                  {arr}
                </a>
              </li>
            );
          })}
          {pageSize !== currentPage && (
            <li className="">
              <a className="px-1 flex items-center justify-center font-medium text-sm">
                <span className="h-4 w-4 text-[#7d7d7d]">
                  <ArrowNarrowRight className="h-[100%] w-[100%]" onClick={()=>changePage(currentPage+1)} />
                </span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
