import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import ProductFilter from "../product-filter";
import SelectedFilters from "../selectedFilters";
import LoadingSpinner from "../../../helper/loading-spinner";

export default function DesktopFilters({
  setfilters,
  filters,
  categoryId = "",
  setclient,
  setcurrentPage,
  priceObj,
  setpriceObj,
  setmaxValue,
  maxValue,
  sortedProductsLoading,
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
    <div className="md:w-[22%] md:h-[100%] md:mt-[15px] md:sticky md:-webkit-sticky md:top-40">
      <div className="hidden md:block">
        <SelectedFilters
          setfilters={setfilters}
          filters={filters}
          categoryId={categoryId ? parseInt(categoryId, 10) : ""}
          setclient={setclient}
          setcurrentPage={setcurrentPage}
          priceObj={priceObj}
          setpriceObj={setpriceObj}
          queryFilter={queryFilter}
        />
      </div>

      {/* Filters */}
      <div className="hidden md:block">
        <ProductFilter
          categoryId={categoryId ? parseInt(categoryId, 10) : ""}
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
        />
      </div>
    </div>
  );
}

export function ProductEmpty({ priceObj, maxValue, loading }) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center px-[10px] py-[50px] leading-[1.2em] text-sm w-full max-h-10">
        <LoadingSpinner message="loading" />
      </div>
    );
  }
  return (
    <div className="flex items-center px-[10px] py-[10px] bg-[#fdf0d5] text-[#6f4400] text-[13px] w-full sm:max-h-10 max-h-16">
      <ExclamationIcon className="text-[#c07600] sm:w-5 sm:h-5 w-7 h-7" />
      <span className="pl-[10px]">
        We can't find products matching the selection.
        {queryFilter?.map((filt, index) => (
          <>
            <span className="px-[2px]">
              {filt?.name} :{" "}
              {filt?.options.map((option) => (
                <span key={option?.value} className="pr-[5px]">
                  {option?.label},
                </span>
              ))}
            </span>
          </>
        ))}
        <span>
          {priceObj?.min || maxValue !== priceObj?.max ? (
            <span className="">
              Price: {priceObj?.min} - {priceObj?.max}
            </span>
          ) : (
            <></>
          )}
        </span>
      </span>{" "}
    </div>
  );
}
