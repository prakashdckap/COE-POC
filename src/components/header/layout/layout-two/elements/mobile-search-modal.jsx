
import { Dialog, Transition } from "@headlessui/react";
import { gql, useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import MobileSearchBar from "./mobile-search-bar";

export default function MyModal({ isOpen, setIsOpen, setshowSearch }) {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedDDValue, setSelectedDDValue] = useState("");
  const CATEGORY_SEARCH = gql`
    query CategorySearch {
      categoryForSearch {
        name
        parentId
        platformCategoryId
        children {
          name
          parentId
          platformCategoryId
        }
      }
    }
  `;
  const { data } = useQuery(CATEGORY_SEARCH);
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    setSelectedDDValue("allCategories");
  }, [data]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full h-screen items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full h-full px-[20px] transform overflow-hidden  bg-white p-2 text-left align-middle shadow-xl transition-all">
                  {/* Modal Close Button */}
                  <div className=" flex justify-end">
                    <button
                      type="button"
                      className="absolute right-0 top-0 flex items-center justify-center h-[60px] w-[60px]"
                      onClick={closeModal}
                    >
                      <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        className="h-[35px] w-[35px]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                      </svg>
                    </button>
                  </div>

                  {/* Category Input */}
                  {/* <div className="relative">
                    <button
                      onClick={() => setIsDropdown(!isDropdown)}
                      type="button"
                      className="flex font-medium items-center justify-between w-full capitalize text-[#333] text-[18px] border border-[#333] py-[10px] px-[10px] mt-[60px] rounded-[5px]"
                    >
                      <span>
                        {selectedDDValue === "allCategories" ? "All Categories" : selectedDDValue}
                      </span>
                      <svg
                        className="h-[20px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                      </svg>
                    </button>

                    {isDropdown && (
                      <div
                        className="w-full p-[10px] max-h-[400px] overflow-y-auto bg-[#333331] mt-[1px]"
                        style={{ position: "absolute", zIndex: 2 }}
                      >
                        <ul>
                          <li className="parent mb-[10px]">
                            <a
                              aria-hidden="true"
                              onClick={() => {
                                // setIsOpen(false);
                                setIsDropdown(false);
                                setSelectedDDValue("allCategories");
                              }}
                              className="all-cat text-[13px] font-medium text-skin-inverted flex items-center"
                            >
                              <svg
                                fill="#fff"
                                className="h-[15px] w-[15px]"
                                clipRule="evenodd"
                                fillRule="evenodd"
                                strokeLinejoin="round"
                                strokeMiterlimit="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                                  fillRule="nonzero"
                                />
                              </svg>
                              <span className="pl-[5px]">All Categories</span>
                            </a>
                          </li>
                        </ul>
                        {data?.categoryForSearch?.length
                          ? data.categoryForSearch.map((d) => (
                              <>
                                {" "}
                                <ul>
                                  <li className="parent mb-[10px]">
                                    <a
                                      aria-hidden="true"
                                      onClick={() => {
                                        // setIsOpen(false);
                                        setIsDropdown(false);
                                        setSelectedDDValue(d.name);
                                      }}
                                      className="all-cat text-[13px] font-medium text-skin-inverted flex items-center"
                                    >
                                      <svg
                                        fill="#fff"
                                        className="h-[15px] w-[15px]"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                                          fillRule="nonzero"
                                        />
                                      </svg>
                                      <span className="pl-[5px]">{d.name}</span>
                                    </a>
                                  </li>

                                  {d.children.map((child) => (
                                    <li key={child.platformCategoryId} className="parent mb-[10px]">
                                      <a
                                        role="button"
                                        aria-hidden="true"
                                        onClick={() => {
                                          // setIsOpen(false);
                                          setIsDropdown(false);
                                          setSelectedDDValue(child.name);
                                        }}
                                        className="all-cat text-[13px] ml-[15px] font-medium text-skin-inverted flex items-center"
                                      >
                                        <svg
                                          className="h-[15px] w-[15px]"
                                          fill="#fff"
                                          clipRule="evenodd"
                                          fillRule="evenodd"
                                          strokeLinejoin="round"
                                          strokeMiterlimit="2"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                                            fillRule="nonzero"
                                          />
                                        </svg>
                                        <span className="ml-[5px]">{child.name}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ))
                          : ""}
                      </div>
                    )}
                  </div> */}
                  <MobileSearchBar setIsOpen={setIsOpen} setshowSearch={setshowSearch} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}



// klevu search
// import { gql, useQuery } from "@apollo/client";
// import { useState, useEffect } from "react";
// import MobileSearchBar from "./mobile-search-bar";
// import SearchBar from "../search-bar";

// export default function MyModal({ isOpen, setIsOpen, setshowSearch }) {
//   const [isDropdown, setIsDropdown] = useState(false);
//   const [selectedDDValue, setSelectedDDValue] = useState("");
//   const CATEGORY_SEARCH = gql`
//     query CategorySearch {
//       categoryForSearch {
//         name
//         parentId
//         platformCategoryId
//         children {
//           name
//           parentId
//           platformCategoryId
//         }
//       }
//     }
//   `;
//   const { data } = useQuery(CATEGORY_SEARCH);

//   useEffect(() => {
//     setSelectedDDValue("allCategories");
//   }, [data]);

//   useEffect(() => {
//     // Toggle a class on the body to change background color
//     if (isOpen) {
//       document.body.classList.add("modal-open");
//     } else {
//       document.body.classList.remove("modal-open");
//     }

//     // Cleanup the class when the component unmounts
//     return () => {
//       document.body.classList.remove("modal-open");
//     };
//   }, [isOpen]);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-25 transition-opacity ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         style={{ zIndex: 1050 }}
//       ></div>
//       <div
//         className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
//         style={{ zIndex: 1100 }}
//       >
//         <div className="flex min-h-full h-full items-center justify-center text-center">
//           <div className="relative w-full h-full transform overflow-hidden bg-white p-2 text-left align-middle shadow-xl transition-all">
//             {/* Modal Close Button */}
//             <div className=" flex justify-end mb-12">
//               <button
//                 type="button"
//                 className="absolute right-0 top-0 flex items-center justify-center h-[60px] w-[60px]"
//                 onClick={closeModal}
//               >
//                 <svg
//                   clipRule="evenodd"
//                   fillRule="evenodd"
//                   strokeLinejoin="round"
//                   strokeMiterlimit="2"
//                   viewBox="0 0 24 24"
//                   className="h-[35px] w-[35px]"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
//                 </svg>
//               </button>
//             </div>

//             {/* Search Bar */}
//             <SearchBar />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
