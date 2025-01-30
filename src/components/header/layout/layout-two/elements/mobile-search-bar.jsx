import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import _debounce from "lodash/debounce";

import useClickOutside from "../../../../../helper/hooks/use-click-outside";
import getProductsList from "../../../../../helper/hooks/getProductsList";
import getCategorySearchList from "../../../../../helper/hooks/getCategorySearch";
import getPopularSearchList from "../../../../../helper/hooks/getPopularSearch";
import { removeCache } from "../../../../../helper/removeCache";
import { escapeRegExp } from "../serachhelper";

export default function MobileSearchBar({ setIsOpen, setshowSearch, token }) {
  /*= ================================= Local State ================================== */
  const [searchTerm, setsearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const history = useRouter();

  const refNode = useClickOutside(() => {
    setsearchTerm("");
    if (setshowSearch) setshowSearch(false);
  });

  const { onProductSearch, loading, products } = getProductsList();
  const { onCategorySearch, categories } = getCategorySearchList();
  const { onPopularSearch, popularSearch } = getPopularSearchList();

  /*= ================================== Helper Functions =============================== */

  // Searching the product
  const handleSubmit = () => {
    if (searchTerm?.length >= 2) {
      history?.push({
        pathname: "/productSearch",
        query: { q: searchTerm },
      });
      setIsOpen && setIsOpen(false);
    }
    setsearchTerm("");
  };

  useEffect(() => {
    setsearchTerm("");
  }, []);

  // search text highlight
  const productTitleHightlight = (product) => {
    const searchArray = searchTerm?.toLowerCase()?.split(" ");
    const titleArray = product?.name?.split(" ");
    const resultArray = titleArray.map((title) => {
      if (searchArray.includes(title?.toLowerCase())) {
        return `<b>${title}</b>`;
      } else if (searchArray.find((text) => title?.toLowerCase().match(escapeRegExp(text)))) {
        const text = searchArray.find((text) => title?.toLowerCase().match(escapeRegExp(text)));
        return title.replace(new RegExp(escapeRegExp(text), "ig"), `<b>${text}</b>`);
      } else {
        return title;
      }
    });
    const resultTitle = resultArray.toString().replaceAll(",", " ");
    return ReactHtmlParser(resultTitle);
  };

  // Define the debounced function
  const handleDebounceSearch = useCallback(
    _debounce((searchValue) => {
      if (searchValue?.length > 2) {
        const variable = { search: searchValue };
        onProductSearch(variable);
        onCategorySearch(variable);
        onPopularSearch({ variable });
      }
      setsearchTerm(searchValue);
    }, 1000),
    []
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    handleDebounceSearch(e.target.value);
  };

  /*= ========================= Return State =================================== */
  return (
    <div ref={refNode}>
      <div
        className={`${
          !token ? "lg:right-[11%] md:right-[18%] " : ""
        } relative md:mr-[10px]  xl:mr-[-10px] w-[100%] md:flex md:justify-between md:items-center md:absolute md:right-[21%] lg:right-[16%] top-[20px] md:top-[10px] lg:w-[21%] md:w-[30%] mobile-search-category`}
      >
        <div className="md:w-full md:mr-2">
          <input
            className="theme-1 w-[100%] pl-[0] placeholder:lg:italic lg:text-sm placeholder:text-[#222e46] placeholder:text-xs mt-2 category-input mb-2 block sm:w-full md:w-full lg:w-full border border-gray-400 shadow-sm py-2.5 px-3 focus:outline-[#5bbcff] focus:shadow-SearchShadow focus:border-0 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:pl-[26px]"
            type="text"
            onChange={handleChange}
            value={searchValue}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Search entire store here..."
            autoFocus
          />
        </div>
        <button
          className="absolute my-[20px] flex items-center bg-white category-btn justify-center w-7 p-[20px] h-[0px] md:h-[38.67px] right-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not mr-[5px]"
          type="button"
          onClick={() => handleSubmit()}
          disabled={searchTerm?.length < 3}
          aria-label="Search"
        >
          <SearchIcon className="w-[20px] search-icon text-center" />
        </button>
      </div>
      {searchTerm?.length > 2 ? (
        products?.items?.length ? (
          <div
            style={{ overflowY: "scroll" }}
            className="w-[90%] h-[70%] z-[99999] category-product-list border border-gray-400 absolute bg-white mobile-search-category lg:right-[16%] md:right-[5%] mt-3"
          >
            <div className="overflow-y-auto">
              <div className="bg-[#efefef] w-[100%] inline-flex py-1 items-center text-base text-[#999] uppercase font-bold">
                <span className="ml-3">Products</span>
              </div>
              <div className="h-[326px] w-[100%] overflow-y-auto">
                {products?.items?.slice(0, 20)?.map((product) => (
                  <>
                    <Link href={`/${product?.url_key}`}>
                      <a
                        onClick={() => {
                          setsearchTerm("");
                          if (setIsOpen) setIsOpen(false);
                        }}
                        onKeyUp={() => {
                          setsearchTerm("");
                          if (setIsOpen) setIsOpen(false);
                        }}
                      >
                        <div
                          key={product?.id}
                          className="flex justify-between py-[10px] pl-[10px] pr-[50px] relative items-center cursor-pointer hover:bg-[#f4f4fa]"
                        >
                          <div className="relative overflow-hidden  flex justify-center items-center p-[25px] my-[5px] ml-[10px] mr-0">
                            <Image
                              layout="fill"
                              objectFit="contain"
                              src={product?.image && removeCache(product?.image?.url)}
                              alt={product?.image?.label}
                              className="w-20"
                            />
                          </div>

                          <a
                            onClick={() => {
                              setsearchTerm("");
                              if (setIsOpen) setIsOpen(false);
                            }}
                            onKeyUp={() => {
                              setsearchTerm("");
                              if (setIsOpen) setIsOpen(false);
                            }}
                            role="link"
                            tabIndex="0"
                            className="text-[14px] break-keep text-[#333] font-semibold ml-5 mr-7  search-dropdown w-[100%]"
                          >
                            {productTitleHightlight(product)}
                          </a>

                          <div className="w-[25px] absolute right-[15px]">
                            <img src="/search-arrow.png" alt="search" className="w-[100%]" />
                          </div>
                        </div>
                        <div className="mx-[20px]">
                          <hr className="border-[#C2C2C2]" />
                        </div>
                      </a>
                    </Link>
                  </>
                ))}
              </div>
              <div className="w-[100%] pt-4 overflow-y-auto category-search-list">
                {categories?.items?.length ? (
                  <section className="amsearch-item-container amsearch-collapsible-section -category category">
                    <div className="bg-[#efefef] w-[100%] inline-flex py-1 items-center text-base text-[#999] uppercase font-bold">
                      <span className="ml-3">Categories</span>
                    </div>
                    <ul className="amsearch-tab-items amsearch-collapsible-content">
                      {categories?.items?.map((category) => {
                        return (
                          <li
                            className="flex items-center search-item px-[20px] py-[8px] hover:bg-[#f4f5fa] font-semibold"
                            title={category?.name}
                            onClick={() => {
                              history.push("/" + category?.url || "");
                              setsearchTerm("");
                              if (setIsOpen) setIsOpen(false);
                            }}
                          >
                            <img src="/search-tag.png" alt="image" className="w-[15px]" />
                            <span className="pl-2">{ReactHtmlParser(category?.name)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ) : (
                  ""
                )}
                {popularSearch?.items?.length ? (
                  <section className="amsearch-item-container amsearch-collapsible-section -popular_searches popular_searches">
                    <div className="bg-[#efefef] w-[100%] inline-flex py-1 items-center text-base text-[#999] uppercase font-bold">
                      <span className="ml-3">Popular Searches</span>
                    </div>

                    <ul
                      className="amsearch-tab-items amsearch-collapsible-content"
                      data-role="content"
                    >
                      {popularSearch?.items?.map((popular) => {
                        return (
                          <li
                            className="flex items-center search-item px-[20px] py-[8px]  hover:bg-[#f4f5fa] font-semibold"
                            onClick={() => {
                              history.push("/productSearch?q=" + popular?.name);
                              setsearchTerm("");
                              if (setIsOpen) setIsOpen(false);
                            }}
                            title={popular?.name?.replaceAll(/<[^>]*>/g, "")}
                          >
                            <i class="fa-solid fa-magnifying-glass rotate-[90deg] text-[#ABABAB] p-0"></i>
                            <span className="pl-2">{ReactHtmlParser(popular?.name)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={() => handleSubmit()}
                onKeyPress={() => handleSubmit()}
                role="link"
                tabIndex="0"
                className="bg-[#efefef] w-[100%] hover:text-[#a80f16]  cursor-pointer inline-flex items-center py-[9.5px] justify-center text-[20px]  capitalize text-[#ADADAD] font-semibold"
              >
                VIEW ALL ({products?.total_count})
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <div
              style={{ overflowY: "scroll" }}
              className="w-[92%] h-[65%] z-[99999] category-product-list border border-gray-400 absolute bg-white mobile-search-category lg:right-[16%] md:right-[5%]"
            >
              <div className="py-[10px] text-center text-[16px] text-[#222e46]">
                <span>Your search returned no products.</span>
              </div>

              <div className="w-[100%] pt-4 overflow-y-auto category-search-list">
                <section className="amsearch-item-container amsearch-collapsible-section -popular_searches popular_searches">
                  <div className="bg-[#efefef] w-[100%] inline-flex py-1 items-center text-base text-[#999] uppercase font-bold">
                    <span className="ml-3">Popular Searches</span>
                  </div>

                  <ul
                    className="amsearch-tab-items amsearch-collapsible-content"
                    data-role="content"
                  >
                    {popularSearch?.items?.map((popular) => {
                      return (
                        <li
                          className="flex items-center search-item px-[20px] py-[8px]  hover:bg-[#f4f5fa] font-semibold"
                          onClick={() => {
                            history.push("/productSearch?q=" + popular?.name);
                            setsearchTerm("");
                            if (setIsOpen) setIsOpen(false);
                          }}
                          title={popular?.name}
                        >
                          <i class="fa-solid fa-magnifying-glass rotate-[90deg] text-[#ABABAB] p-0"></i>
                          <span className="pl-2">{popular?.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </div>
            </div>
          )
        )
      ) : null}
    </div>
  );
}
