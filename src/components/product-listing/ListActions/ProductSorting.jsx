import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductSorting({ handleSort, sortBy, sortOptions, setMobileFiltersOpen }) {
  return (
    <div className="flex items-center justify-between flex-row-reverse  w-full md:w-auto z-[11]">
      <Menu as="div" className="relative inline-block text-left min-w-[53%] md:w-auto z-[11]">
        <div className="flex z-50">
          <Menu.Button className="group mr-1 inline-flex items-center text-[13px] font-normal text-skin-base text-left w-full md:w-auto">
            <span className="hidden md:block whitespace-pre">Sort By</span>
            <div className="border border-[#ccc] md:border-[#e1e1e1] ml-3 p-[8px] md:p-[5px]  w-full md:w-auto flex items-center justify-center min-w-[130px]">
              <span className="block font-medium md:font-normal text-sm text-[#282828] md:text-[12px] text-skin-base ml-1 uppercase md:capitalize whitespace-nowrap">
                {sortBy?.name?.replace("_", " ")}
              </span>
              <ChevronDownIcon
                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 max-w-[137px] rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={classNames(
                        option.value === sortBy?.value && option?.name === sortBy?.name
                          ? "font-semibold text-gray-900"
                          : "text-gray-500",
                        active ? "bg-gray-100" : "",
                        "block px-3 py-2 text-xs w-full text-left"
                      )}
                      onClick={() => handleSort(option)}
                      onKeyDown={() => handleSort(option)}
                    >
                      {option.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <button
        type="button"
        className="px-[30px] py-[10px] w-[49%] text-sm font-medium border border-[#ccc] text-[#000] md:text-skin-base md:hidden uppercase"
        onClick={() => setMobileFiltersOpen(true)}
      >
        Filter
      </button>
    </div>
  );
}
