import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

import useCategoryFilters from "../../../../helper/hooks/use-category-filter";
import PriceSlider from "../../price-slider";
import { SET_LAST_SELECTED_FILTER } from "../../../../redux/actions";
import { getSortedFilters, getPriceList, getDefaultExpand } from "./filterHelper";
import { sortedArrayOptions } from "../../helper";

export default function MagentoProductFilter({
  filters,
  setfilters,
  setclient,
  setcurrentPage,
  maxValue,
  setmaxValue,
  priceObj,
  setpriceObj,
  sortedProductsLoading,
  filterAggregations,
  listingProducts,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const lastSelectedFilter = useSelector((state) => state.lastSelectedFilter);

  const [filter, setfilter] = useState([]);

  const { updateMagentoFilter } = useCategoryFilters();

  const filterData = filterAggregations;

  useEffect(() => {
    if (filterData?.length) {
      filterData?.map((item) => ({ ...item, open: false }));

      const priceArr = getPriceList(filterData);
      const minPrice = priceArr?.sort((a, b) => a - b)[priceArr.length - 1];
      setmaxValue(maxValue > minPrice ? maxValue : minPrice);

      let newFilters = getSortedFilters(filterData);

      if (newFilters?.length) {
        const res = getDefaultExpand(newFilters, lastSelectedFilter, filter);
        setfilters(res);
      }
    }
  }, [filterData, setfilters, filter, filterAggregations]);

  useEffect(() => {
    if (router?.query?.filters) {
      const urlFilter = JSON.parse(router?.query?.filters);
      setfilter(urlFilter);
    } else {
      setfilter([]);
    }
  }, [router]);

  const handleOpenSection = (section) => {
    dispatch(SET_LAST_SELECTED_FILTER(section?.attribute_code));
    setfilters((prev) =>
      prev?.map((sec) => {
        if (sec?.attribute_code === section?.attribute_code) {
          return {
            ...sec,
            open: !sec?.open,
          };
        }
        return sec;
      })
    );
  };

  return (
    <div className="px-[10px] md:px-0 pr-[14px]">
      {filters
        ?.sort((a, b) => {
          if (a.attribute_code === "brands") return -1; // Brands first
          if (a.attribute_code === "price") return 1; // Price second
          return 0; // Maintain the rest order
        })
        ?.map((section) => {
          let options = [...section?.options];
          if (section.attribute_code === "brands") {
            options = sortedArrayOptions(section?.options);
          }
          if (section?.label?.toLowerCase() === "price" && listingProducts?.length <= 1) {
            return null;
          }
          return (
            <Disclosure
              as="div"
              key={section.attribute_code}
              className="mb-[27px]"
              open={section?.open}
              defaultOpen={section?.open}
            >
              <>
                <h3 className="flow-root">
                  <Disclosure.Button
                    aria-expanded={section?.open || false}
                    onClick={() => handleOpenSection(section)}
                    className={`${
                      section?.open ? "pb-[15px] border-b border-[#979797]" : ""
                    } bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500`}
                    onKeyUp={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        handleOpenSection(section);
                      }
                    }}
                  >
                    <span className="font-semibold uppercase text-skin-base text-left">
                      {section.label}
                    </span>
                    <span className="ml-6 flex items-center">
                      {section?.open ? (
                        <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Transition
                  show={section?.open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  {section?.open &&
                    (section?.label?.toLowerCase() === "price" ? (
                      <Disclosure.Panel className="pt-[15px]">
                        <div className="space-y-[15px] relative">
                          <PriceSlider
                            maxValue={maxValue}
                            priceObj={priceObj}
                            setpriceObj={setpriceObj}
                            setclient={setclient}
                            sortedProductsLoading={sortedProductsLoading}
                          />
                        </div>
                      </Disclosure.Panel>
                    ) : (
                      <Disclosure.Panel className="pt-[15px]">
                        <div className="mb-[30px] max-h-[245px] overflow-y-auto filter-custom-scroll">
                          {options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center mb-[15px]">
                              <input
                                // id={`filter-${section.id}-${optionIdx}`}
                                id={option.label}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                onChange={(e) => {
                                  updateMagentoFilter(
                                    e.target.checked,
                                    filters,
                                    setfilters,
                                    section.attribute_code,
                                    option.value,
                                    setclient,
                                    setcurrentPage
                                  );
                                }}
                                checked={option?.checked ? true : false}
                                className="h-[13px] w-[13px] border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={option.label}
                                className="ml-[5px] text-[13px] text-skin-base font-light"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    ))}
                </Transition>
              </>
            </Disclosure>
          );
        })}
    </div>
  );
}

MagentoProductFilter.defaultProps = {
  filters: [],
  searchText: "",
  maxValue: 0,
  priceObj: {},
  sortedProductsLoading: false,
};

MagentoProductFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      attribute_code: PropTypes.string,
      label: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          checked: PropTypes.bool,
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  setfilters: PropTypes.func.isRequired,
  setclient: PropTypes.func.isRequired,
  setcurrentPage: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  maxValue: PropTypes.number,
  priceObj: PropTypes.number,
  setmaxValue: PropTypes.func.isRequired,
  setpriceObj: PropTypes.func.isRequired,
  sortedProductsLoading: PropTypes.bool,
};
