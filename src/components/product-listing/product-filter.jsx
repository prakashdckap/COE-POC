import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import useCategoryFilters from "../../helper/hooks/use-category-filter";
import PriceSlider from "./price-slider";
import { SET_LAST_SELECTED_FILTER } from "../../redux/actions";

export default function ProductFilter({
  categoryId,
  filters,
  setfilters,
  setclient,
  setcurrentPage,
  searchText,
  maxValue,
  setmaxValue,
  priceObj,
  setpriceObj,
  sortedProductsLoading,
}) {
  const { getFilters, filterLoading, filterData, updateFilter } = useCategoryFilters(
    categoryId,
    searchText
  );
  const router = useRouter();
  const [filter, setfilter] = useState([]);
  const lastSelectedFilter = useSelector((state) => state.lastSelectedFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryId || searchText) getFilters();
  }, [categoryId, getFilters, searchText]);

  useEffect(() => {
    if (filterData) {
      filterData?.map((item) => ({ ...item, open: false }));
      const priceArr = [];
      const priceRangeFilter = filterData?.filter((item) => item?.name === "Price");

      priceRangeFilter[0]?.options?.map((option) =>
        priceArr.push(parseInt(option?.label?.replaceAll("'", "").split("-")[1], 10))
      );

      // Formatting brands and price filter in top
      const brandFilterObj = filterData?.find((data) => data?.name?.toLowerCase() === "brand");
      const priceFilterObj = filterData?.find((data) => data?.name?.toLowerCase() === "price");

      let newFilters = [];

      if (brandFilterObj?.name && priceFilterObj?.name) {
        const filteredObj = filterData?.filter(
          (data) => data?.name?.toLowerCase() !== "brand" && data?.name?.toLowerCase() !== "price"
        );
        newFilters = [brandFilterObj, priceFilterObj, ...filteredObj];
      } else if (brandFilterObj?.name && !priceFilterObj?.name) {
        const filteredObj = filterData?.filter((data) => data?.name?.toLowerCase() !== "brand");
        newFilters = [brandFilterObj, ...filteredObj];
      } else if (priceFilterObj?.name && !brandFilterObj?.name) {
        const filteredObj = filterData?.filter((data) => data?.name?.toLowerCase() !== "price");
        newFilters = [priceFilterObj, ...filteredObj];
      } else {
        newFilters = filterData;
      }

      const minPrice = priceArr?.sort((a, b) => a - b)[priceArr.length - 1];
      setmaxValue(maxValue || minPrice);

      if (newFilters?.length) {
        const res = newFilters?.map((section) => {
          if (filter?.find((sec) => sec?.code === section?.code)?.code) {
            return {
              ...section,
              open: lastSelectedFilter === section?.code,
              options: section?.options?.map((option) => {
                if (
                  option?.value ===
                  filter
                    ?.find((sec) => sec?.code === section?.code)
                    ?.options?.find((opt) => opt?.value === option?.value)?.value
                ) {
                  return {
                    ...option,
                    checked: true,
                  };
                }
                return option;
              }),
            };
          }
          return {
            ...section,
            open: lastSelectedFilter === section?.code || section?.code === "brands" || false,
          };
        });
        setfilters(res);
      }
    }
  }, [filterData, setfilters, filter]);

  useEffect(() => {
    if (router?.query?.filters) {
      const urlFilter = JSON.parse(router?.query?.filters);
      setfilter(urlFilter);
    } else {
      setfilter([]);
    }
  }, [router]);

  return (
    <div className="px-[10px] md:px-0 pr-[14px]">
      {!filterLoading && filters?.length
        ? filters.map((section) => {
            let options = [...section?.options];
            if (section.code === "brands") {
              options?.sort((a, b) => {
                let fa = a.label.toLowerCase();
                let fb = b.label.toLowerCase();
                if (fa < fb) return -1;
                if (fa > fb) return 1;
                return 0;
              });
            }
            return (
              <Disclosure
                as="div"
                key={section.code}
                className="mb-[27px]"
                open={section?.open}
                defaultOpen={section?.open}
              >
                <>
                  <h3 className="flow-root">
                    <Disclosure.Button
                      aria-expanded={section?.open || false}
                      onClick={() => {
                        dispatch(SET_LAST_SELECTED_FILTER(section?.code));
                        setfilters((prev) =>
                          prev?.map((sec) => {
                            if (sec?.code === section?.code) {
                              return {
                                ...sec,
                                open: !sec?.open,
                              };
                            }
                            return sec;
                          })
                        );
                      }}
                      className={`${
                        section?.open ? "pb-[15px] border-b border-[#979797]" : ""
                      } bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500`}
                    >
                      <span className="font-semibold uppercase text-skin-base text-left">
                        {section.name}
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
                      (section?.name?.toLowerCase() === "price" ? (
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
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={(e) => {
                                    updateFilter(
                                      e.target.checked,
                                      filters,
                                      setfilters,
                                      section.code,
                                      option.value,
                                      setclient,
                                      setcurrentPage
                                    );
                                  }}
                                  checked={option?.checked}
                                  className="h-[13px] w-[13px] border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
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
          })
        : null}
    </div>
  );
}

ProductFilter.defaultProps = {
  categoryId: 0,
  filters: [],
  searchText: "",
  maxValue: 0,
  priceObj: {},
  sortedProductsLoading: false,
};

ProductFilter.propTypes = {
  categoryId: PropTypes.number,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
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
