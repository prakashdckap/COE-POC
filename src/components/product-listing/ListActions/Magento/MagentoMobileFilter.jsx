import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

import MagentoProductFilter from "./MagentoFilters";
import MagentoSelectedFilters from "./MagentoSelectedFilters";

export default function MagentoMobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  setfilters,
  filters,
  setclient,
  setcurrentPage,
  priceObj,
  setpriceObj,
  setmaxValue,
  maxValue,
  sortedProductsLoading,
  listingProducts,
}) {
  const history = useRouter();
  let urlFilter = history?.query?.filters;

  const [queryFilter, setQueryFilter] = useState([]);

  useEffect(() => {
    if (urlFilter !== undefined && typeof urlFilter === "string") {
      setQueryFilter(JSON.parse(urlFilter));
    } else if (!urlFilter) {
      setQueryFilter([]);
    }
  }, [history]);

  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex z-[999]">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="block md:hidden px-2">
                <MagentoSelectedFilters
                  setfilters={setfilters}
                  filters={filters}
                  setclient={setclient}
                  setcurrentPage={setcurrentPage}
                  priceObj={priceObj}
                  setpriceObj={setpriceObj}
                  queryFilter={queryFilter}
                  maxValue={maxValue}
                />
              </div>
              {/* Filters */}
              <MagentoProductFilter
                filters={filters}
                setfilters={setfilters}
                setclient={setclient}
                setcurrentPage={setcurrentPage}
                searchText={history?.query.q}
                setmaxValue={setmaxValue}
                maxValue={maxValue}
                priceObj={priceObj}
                setpriceObj={setpriceObj}
                sortedProductsLoading={sortedProductsLoading}
                queryFilter={queryFilter}
                listingProducts={listingProducts}
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
