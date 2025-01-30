import React, { Fragment, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function PaginationTwo({
  totalCount,
  currentPage,
  setcurrentPage,
  contentLimit,
  setcontentLimit,
  pageCount,
  contentLimitArr,
  productCount,
  orders,
}) {
  const router = useRouter();

  const [paginationArray, setPaginationArray] = useState([]);

  const generatePaginationArray = () => {
    if (pageCount > 7) {
      if (currentPage < 5) {
        return [1, 2, 3, 4, 5, "...", pageCount];
        // eslint-disable-next-line no-else-return
      } else if (currentPage > pageCount - 2) {
        return [1, "...", pageCount - 2, pageCount - 1, pageCount];
      } else {
        if (currentPage === pageCount - 3) {
          return [
            1,
            "...",
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,

            pageCount,
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
          pageCount,
        ];
      }
    }
    const arr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < pageCount; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  // Change Next Page
  const handleNextClick = () => {
    if (currentPage < pageCount) {
      if (router?.pathname === "/account/my-wishlist") {
        let nextPage = currentPage + 1;

        pushPageQueryParam(nextPage);
      } else {
        setcurrentPage(currentPage + 1);
      }
      //live
      // setcurrentPage(currentPage + 1);
    }
  };

  // Change Previous Page
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      if (router?.pathname === "/account/my-wishlist") {
        let previousPage = currentPage - 1;
        let newUrl;

        if (previousPage == 1) {
          if (router?.query?.limit) {
            newUrl = `/account/my-wishlist/?limit=${router?.query?.limit}`;
          } else {
            newUrl = `/account/my-wishlist/`;
          }

          // Navigate to the new URL
          router.push(newUrl);
        } else {
          pushPageQueryParam(previousPage);
        }
      } else {
        setcurrentPage(currentPage - 1);
      }
      //live
      // setcurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setPaginationArray(generatePaginationArray());
  }, [pageCount, currentPage]);

  // To set query params for pagination
  const handleNextPage = (page) => {
    // Get the current query object
    let newUrl;

    if (page == 1) {
      if (router?.query?.limit) {
        newUrl = `/account/my-wishlist/?limit=${router?.query?.limit}`;
      } else {
        newUrl = `/account/my-wishlist/`;
      }

      // Navigate to the new URL
      router.push(newUrl);
    } else {
      pushPageQueryParam(page);
    }
  };

  useEffect(() => {
    const { p } = router.query;
    const { limit } = router.query;
    if (router?.pathname === "/account/my-wishlist") {
      if (p) {
        setcurrentPage(Number(p));
      } else {
        setcurrentPage(1);
      }

      if (limit) {
        setcontentLimit(Number(limit));
      } else {
        setcontentLimit(10);
      }
    }
  }, [router.query]);

  const pushPageQueryParam = (page) => {
    const currentQuery = { ...router.query };

    currentQuery.p = page;

    // Construct the new URL with the updated query parameters
    const queryString = new URLSearchParams(currentQuery).toString();
    const newUrl = `/account/my-wishlist/?${queryString}`;

    // Navigate to the new URL
    router.push(newUrl);
  };

  const setCurrentContentLimit = (value) => {
    const { p } = router.query;
    let newUrl;

    if (p) {
      // newUrl = `/account/my-wishlist/?limit=${value}&p=${p}`;
      newUrl = `/account/my-wishlist/?limit=${value}`;
    } else {
      newUrl = `/account/my-wishlist/?limit=${value}`;
    }

    // Navigate to the new URL
    router.push(newUrl);
  };

  // const pagesArr = [];

  // for (let i = 1; i <= Math.ceil(totalCount / contentLimit); i += 1) {
  //   pagesArr.push(i);
  // }

  // // Change Next Page
  // const handleNextClick = () => {
  //   if (currentPage < pageCount) {
  //     setcurrentPage(currentPage + 1);
  //   }
  // };

  // // Change Previous Page
  // const handlePreviousClick = () => {
  //   if (currentPage > 1) {
  //     setcurrentPage(currentPage - 1);
  //   }
  // };

  // const handlePageChange = (pageNumber) => {
  //   setcurrentPage(pageNumber);
  // };

  return (
    <div className="bg-white py-4 md:py-0 flex justify-center items-center md:justify-between border-gray-200 ">
      <div className="sm:flex-1 sm:flex  sm:justify-between text-center md:text-left mt-4">
        <div>
          {pageCount > 1 ? (
            <p className="text-sm text-gray-700 pt-[7px]">
              <span className="font-medium">
                {" "}
                {currentPage > 1 ? (currentPage - 1) * contentLimit + 1 : currentPage}{" "}
              </span>
              to
              <span className="font-medium">
                {" "}
                {(currentPage - 1) * contentLimit + contentLimit < totalCount
                  ? (currentPage - 1) * contentLimit + contentLimit
                  : totalCount}{" "}
              </span>
              of
              <span className="font-medium"> {totalCount} </span>
              total
            </p>
          ) : (
            <p className="text-sm text-gray-700 pt-[7px]">
              {/* {router?.pathname === "/account/address-book"
                ? filteredAddressList?.length
                : router?.pathname === "/account/store-credit-and-refunds"
                ? storeCreditTotal
                : router?.pathname === "/account/rewards/my-referrals"
                ? totalCount
                : router?.pathname === "/account/my-orders"
                ? orders?.length
                : productCount
                ? productCount
                : 0} */}
              {totalCount || 0} Item(s)
            </p>
          )}
        </div>
        {pageCount > 1 ? (
          <div className="ml-0 mt-[25px] mb-[23px] md:mb-0 md:ml-5 md:mt-3">
            <nav className="relative z-0 inline-flex" aria-label="Two">
              <button
                type="button"
                disabled={currentPage === 1}
                className="relative inline-flex items-center justify-center w-[34px] p-1 mr-3 border border-gray-300 bg-white text-sm font-medium text-gray-500 disabled:hidden"
                onClick={() => handlePreviousClick()}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="w-[21px]" />
              </button>

              {paginationArray?.map((page) => (
                <a
                  key={page}
                  // href="#"
                  aria-current="page"
                  className={`${
                    currentPage === page
                      ? "text-[#333] font-bold z-10 cursor-text"
                      : "text-[#1979c3] font-medium active:text-[#ff4081] active:underline"
                  }   relative inline-flex items-center p-1.5 text-sm md:text-[17px] cursor-pointer`}
                  // onClick={() => page !== "..." && setcurrentPage(page)}

                  onClick={() =>
                    page !== "..."
                      ? router.pathname === "/account/my-wishlist"
                        ? handleNextPage(page)
                        : setcurrentPage(page)
                      : null
                  }
                  // onClick={() => {
                  //   setcurrentPage(page);
                  //   handlePageChange(page);
                  // }}
                >
                  {page}
                </a>
              ))}

              <button
                type="button"
                disabled={currentPage === paginationArray?.length}
                className="relative inline-flex items-center justify-center w-[34px] p-1 ml-3 border border-[#d1d1d1] bg-white text-sm text-[#7d7d7d] disabled:hidden"
                onClick={() => handleNextClick()}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="w-[21px]" />
              </button>
            </nav>
          </div>
        ) : null}

        <div className="flex items-center text-[13px] text-[#282828]">
          <span className="mr-2">Show</span>{" "}
          <div className="w-14">
            <div className="w-full">
              <select
                value={contentLimit}
                onChange={(e) => {
                  router.pathname === "/account/my-wishlist"
                    ? setCurrentContentLimit(parseInt(e.target.value, 10))
                    : setcontentLimit(parseInt(e.target.value, 10));
                  // setcontentLimit(parseInt(e.target.value, 10));
                }}
                className="px-[10px] py-[5px] border border-[#d1d1d1]  focus:ring-[#d1d1d1]  focus:outline-none"
              >
                {contentLimitArr?.map((obj) => {
                  return (
                    <option value={obj} key={obj} className="cursor-pointer ml-2">
                      {obj}
                    </option>
                  );
                })}
              </select>

              {/* <Listbox
                value={contentLimit}
                onChange={(e) => {
                  setcontentLimit(e);
                }}
              >
                <div className="relative">
                  <Listbox.Button className="mt-1 w-full border border-gray-300 shadow-sm py-2 px-2 focus:outline-none focus:ring-[#A80F16] focus:border-[#A80F16] text-sm placeholder:text-skin-base flex items-center justify-between text-black bg-white">
                    <span className="float-left block truncate">{contentLimit}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000"
                      className="h-3 w-3"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 shadow-lg w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                      {contentLimitArr?.map((option) => (
                        <Listbox.Option
                          key={option}
                          className={({ active }) =>
                            `relative cursor-default select-none hover:bg-skin-primary hover:text-skin-inverted py-[2px] px-4 ${
                              active ? "text-gray-900" : "text-gray-900"
                            }`
                          }
                          value={option}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate text-sm ${
                                  selected ? "font-semibold" : "font-normal"
                                }`}
                              >
                                {option}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox> */}
            </div>
          </div>
          <span className="ml-2">per page</span>
        </div>
      </div>
    </div>
  );
}

PaginationTwo.defaultProps = {
  totalCount: 0,
  currentPage: 0,
  contentLimit: 0,
  pageCount: 0,
  contentLimitArr: [],
};

PaginationTwo.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  setcurrentPage: PropTypes.func.isRequired,
  contentLimit: PropTypes.number,
  setcontentLimit: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
  contentLimitArr: PropTypes.arrayOf(),
};
