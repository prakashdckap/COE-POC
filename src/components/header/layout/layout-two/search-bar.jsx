import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import _debounce from "lodash/debounce";

import useClickOutside from "../../../../helper/hooks/use-click-outside";
import getProductsList from "../../../../helper/hooks/getProductsList";
import getCategorySearchList from "../../../../helper/hooks/getCategorySearch";
import getPopularSearchList from "../../../../helper/hooks/getPopularSearch";
import { removeCache } from "../../../../helper/removeCache";
import { escapeRegExp } from "./serachhelper";

export default function SearchBar({ setIsOpen, setshowSearch, token }) {
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
      // setsearchTerm("");
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
        } hidden relative md:mr-[10px]  xl:mr-[-10px] w-[100%] md:flex md:justify-between md:items-center md:absolute md:right-[21%] lg:right-[16%] md:top-[10px] lg:w-[21%] md:w-[30%] mobile-search-category`}
      >
        <div className="md:w-full md:mr-2">
          <input
            className="theme-1 w-[100%] placeholder:lg:italic lg:text-sm placeholder:text-[#222e46] placeholder:text-xs mt-2 category-input mb-2 block sm:w-full md:w-full lg:w-full border border-gray-400 shadow-sm py-2.5 px-3 focus:outline-none sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            type="text"
            onChange={handleChange}
            value={searchValue}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Search entire store here..."
            autoFocus
          />
        </div>
        <button
          className="absolute flex items-center bg-white category-btn justify-center w-7 h-[70px] md:h-[38.67px] right-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not"
          type="button"
          onClick={() => handleSubmit()}
          disabled={searchTerm?.length < 3}
          aria-label="Search"
        >
          <SearchIcon className="w-5 h-5 search-icon text-center" />
        </button>
      </div>
      {searchTerm?.length > 2 ? (
        products?.items?.length ? (
          <div className="flex justify-between w-[700px] top-[70px] z-[99999] h-[396px] category-product-list border border-[#c2c2c2] absolute bg-white mobile-search-category lg:right-[16%] md:right-[5%]">
            <div>
              <div className="bg-[#efefef] w-[420px] inline-flex py-1 items-center text-base text-[#999] uppercase font-bold">
                <span className="ml-3">Products</span>
              </div>

              <div className="h-[320px] w-[418px]  overflow-y-auto">
                {products?.items?.slice(0, 20)?.map((product) => {
                  return (
                    <Link href={`/${product?.url_key}`} key={product?.id}>
                      <a
                        href={`/${product?.url_key}`}
                        onClick={() => {
                          setsearchTerm("");
                          if (setIsOpen) setIsOpen(false);
                        }}
                        onKeyUp={() => {
                          setsearchTerm("");
                          if (setIsOpen) setIsOpen(false);
                        }}
                        key={product?.id}
                      >
                        <div
                          key={product?.id}
                          className=" relative flex justify-between items-center py-[10px] pl-[10px] pr-[50px] cursor-pointer hover:bg-[#f4f4fa]"
                        >
                          <div className="relative overflow-hidden flex justify-center items-center p-[25px] my-[5px] ml-[10px] mr-0">
                            <Image
                              layout="fill"
                              objectFit="contain"
                              src={product?.image?.url && removeCache(product?.image?.url)}
                              alt={product?.image?.label}
                              className="w-20"
                            />
                          </div>
                          {/* <Link href={`/${product?.url_key}`}> */}
                          <a
                            href={`/${product?.url_key}`}
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
                            title={`${product?.name}`}
                            className="text-[13px] break-keep text-[#333] font-medium ml-5 mr-7  search-dropdown w-[100%]"
                          >
                            {productTitleHightlight(product)}
                          </a>
                          {/* </Link> */}

                          <div className="w-[25px] absolute right-[15px]">
                            {/* <i class="fa-sharp fa-solid fa-arrow-left rotate-[45deg] text-[30px] font-extrabold text-[#acabab]"></i> */}
                            <img src="/search-arrow.png" alt="search" className="w-[100%]" />
                          </div>
                        </div>
                        <div className="mx-[20px]">
                          <hr className="border-[#C2C2C2]" />
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
              <div
                onClick={() => handleSubmit()}
                onKeyPress={() => handleSubmit()}
                role="link"
                tabIndex="0"
                className="bg-[#efefef] w-[420px]  underline-offset-4 hover:text-[#a80f16] cursor-pointer inline-flex items-center justify-center text-[15px] font-medium capitalize h-[0px] py-[20.5px] text-[#222E46]"
                title={`View All With ${products?.total_count} results`}
              >
                View All ({products?.total_count})
              </div>
            </div>
            <div className="h-[396px] w-[280px] overflow-y-auto category-search-list">
              {categories?.items?.length ? (
                <section className="amsearch-item-container amsearch-collapsible-section -category category">
                  <p className="search-block-header amsearch-collapsible-title py-4 px-4">
                    Categories
                  </p>

                  <ul className="amsearch-tab-items amsearch-collapsible-content">
                    {categories?.items?.map((category) => {
                      return (
                        <li
                          className="search-item px-4 py-1.5 hover:bg-[#f4f5fa] search-dropdown"
                          title={category?.name?.replaceAll(/<[^>]*>/g, "")}
                          onClick={() => {
                            history.push("/" + category?.url || "");
                            setsearchTerm("");
                            if (setIsOpen) setIsOpen(false);
                          }}
                        >
                          {ReactHtmlParser(category?.name)}
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
                  <p className="search-block-header amsearch-collapsible-title py-4 px-4">
                    Popular Searches
                  </p>

                  <ul
                    className="amsearch-tab-items amsearch-collapsible-content"
                    data-role="content"
                  >
                    {popularSearch?.items?.map((popular) => {
                      return (
                        <li
                          className="search-item px-4 py-1.5 hover:bg-[#f4f5fa]"
                          onClick={() => {
                            history.push("/productSearch?q=" + popular?.name);
                            setsearchTerm("");
                            if (setIsOpen) setIsOpen(false);
                          }}
                          title={popular?.name?.replaceAll(/<[^>]*>/g, "")}
                        >
                          {/* {ReactHtmlParser(popular?.name)} */}

                          {ReactHtmlParser(
                            popular?.name.replace(
                              new RegExp(searchTerm, "ig"),
                              `<b> ${searchTerm} </b>`
                            )
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          !loading && (
            <div className="flex justify-between w-[700px] top-[70px] z-[99999]  category-product-list border border-gray-400 absolute bg-white mobile-search-category lg:right-[16%] md:right-[5%]">
              <div className="border-r-[1px] border-[#c2c2c2] w-[60%] py-[10px] text-center text-[16px] text-[#222e46]">
                <span>Your search returned no products.</span>
              </div>
              <div className="h-[195px] w-[280px] overflow-y-auto category-search-list">
                {popularSearch?.items?.length ? (
                  <section className="amsearch-item-container amsearch-collapsible-section -popular_searches popular_searches">
                    <p className="search-block-header amsearch-collapsible-title py-4 px-4">
                      Popular Searches
                    </p>

                    <ul
                      className="amsearch-tab-items amsearch-collapsible-content"
                      data-role="content"
                    >
                      {popularSearch?.items?.map((popular) => {
                        return (
                          <li
                            className="search-item px-4 py-1.5 hover:bg-[#f4f5fa]"
                            onClick={() => {
                              history.push("/productSearch?q=" + popular?.name);
                              setsearchTerm("");
                              if (setIsOpen) setIsOpen(false);
                            }}
                            title={popular?.name}
                          >
                            {popular?.name}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ) : (
                  ""
                )}
              </div>
            </div>
          )
        )
      ) : null}
    </div>
  );
}

// klevu search
// import React, { useEffect, useRef, useState } from "react";
// import Script from "next/script";
// import { klevuSearchApi } from "./klevuService";
// import { useRouter } from "next/router";
// import { SearchIcon } from "@heroicons/react/outline";

// function Searchbar() {
//   const [inputLength, setInputLength] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const intervalIdRef = useRef(null);

//   const handleShow = () => {
//     klevuSearchApi(setIsLoading);
//   };

//   const loadScript = (src, id, onLoad) => {
//     if (!document.getElementById(id)) {
//       const script = document.createElement('script');
//       script.src = src;
//       script.id = id;
//       script.type = 'text/javascript';
//       script.onload = onLoad;
//       document.body.appendChild(script);
//     }
//   };

//   useEffect(() => {
//     const checkAndLoadScripts = () => {
//       const jsExists = document.getElementById('loadJs');
//       const templateExists = document.getElementById('quick-search-script');
//       const inputField = document.getElementById('mobile-search');
//       const isAutocompleteOff = inputField?.getAttribute('autocomplete') === 'off';
//       if (!isAutocompleteOff || !jsExists || !templateExists) {
//         loadScript('https://js.klevu.com/core/v2/klevu.js', 'loadJs', () => {
//           loadScript('https://js.klevu.com/theme/default/v2/quick-search.js', 'quick-search-script', handleShow);
//         });
//       } else {
//         setIsLoading(false);
//         if (intervalIdRef.current) {
//           clearInterval(intervalIdRef.current);
//         }
//       }
//     };

//     checkAndLoadScripts();
//     intervalIdRef.current = setInterval(checkAndLoadScripts, 500);

//     return () => {
//       if (intervalIdRef.current) {
//         clearInterval(intervalIdRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const { q } = router.query;
//     if (q && router.pathname !== "/productSearch") {
//       router.push(`/productSearch?q=${q}`);
//     }
//   }, [router]);

//   return (
//     <form autoComplete="off">
//       {/* <head> <base href="/" /> </head> */}
//       <Script
//         src="https://js.klevu.com/core/v2/klevu.js"
//         id="loadJs"
//         onLoad={handleShow}
//         strategy="afterInteractive"
//       />
//       <Script
//         src="https://js.klevu.com/theme/default/v2/quick-search.js"
//         id="quick-search-script"
//         strategy="lazyOnload"
//         type="text/javascript"
//       />
//       {/* <Script
//         src="https://js.klevu.com/theme/default/v2/search-results-page.js"
//         id="quick-search-script"
//         strategy="lazyOnload"
//         type="text/javascript"
//       /> */}
//       <div
//         className={`relative md:mr-[10px] xl:mr-[-10px] w-[100%] md:flex md:justify-between md:items-center md:absolute md:right-[21%] lg:right-[16%] md:top-[10px] lg:w-[21%] md:w-[30%] mobile-search-category`}
//       >
//         <div className="md:w-full md:mr-2 input-group search-bar" aria-hidden="true">
//           <input
//             className="theme-1 form-control search-bar__input main-search klevu-search w-[100%] placeholder:lg:italic lg:text-sm placeholder:text-[#222e46] placeholder:text-xs mt-2 category-input mb-2 block sm:w-full md:w-full lg:w-full border border-gray-400 shadow-sm py-2.5 px-3 focus:outline-none sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//             type="search"
//             id="mobile-search"
//             name="q"
//             style={
//               isLoading
//                 ? { cursor: "wait", fontSize: "13px", color: "#414141" }
//                 : { fontSize: "13px", color: "#414141" }
//             }
//             onFocus={() => {
//               setIsLoading(false);
//             }}
//             placeholder=" Search entire store here..."
//             onChange={(e) => setInputLength(e.target.value.length > 0)}
//             disabled={isLoading}
//           />
//         </div>
//         <button
//           className="absolute flex items-center bg-white category-btn justify-center w-7 h-[70px] md:h-[38.67px] right-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//           type="submit"
//           disabled={!inputLength}
//         >
//           <SearchIcon className="w-5 h-5 search-icon text-center" />
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Searchbar;
