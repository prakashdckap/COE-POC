import { useMemo, memo } from "react";
import { addItemsRepeatedly } from "./helper";

function ProductSckeloton() {
  return (
    <div className="bg-white plp-wrap ">
      <div className="container mx-auto px-[10px]">
        <section className="columns-2 flex">
          <LayerNavigationSckeloton />
          <CardSckelotonList />
        </section>
      </div>
    </div>
  );
}

function CardSckelotonList() {
  const mobileLoader = useMemo(() => {
    return addItemsRepeatedly(<ProductCardSckeloton />, 4);
  }, []);

  const tabLoder = useMemo(() => {
    return addItemsRepeatedly(<ProductCardSckeloton tabLoder />, 2);
  }, []);

  const desktopLoder = useMemo(() => {
    return addItemsRepeatedly(<ProductCardSckeloton desktopLoder />, 2);
  }, []);

  return (
    <div className="w-[100%] md:w-[78%] md:pl-[2%]">
      <div className="grid grid-cols-2 gap-y-[10px] md:gap-y-[40px] gap-x-[10px] md:gap-x-[15px] pt-5 md:pt-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mobileLoader}
        {tabLoder}
        {desktopLoder}
      </div>
    </div>
  );
}

export function ProductCardSckeloton({ desktopLoder, tabLoder, carouselLoader }) {
  let extraClass = "";
  if (desktopLoder) {
    extraClass = "hidden lg:block";
  } else if (tabLoder) {
    extraClass = "hidden xl:block";
  } else if (carouselLoader) {
    extraClass = "min-w-[200px] md:mx-4";
  }

  return (
    <div
      role="status"
      className={`max-w-sm px-2 py-2 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-[#d1d5db] ${extraClass}`}
    >
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-[#d1d5db]">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="w-58 md:w-auto h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 mb-4"></div>
      <div className="w-58 md:w-auto h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

function LayerNavigationSckeloton() {
  const sckeloton = (
    <div className="flex items-center justify-between">
      <div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 w-[120px] my-2.5"></div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 w-[40px]"></div>
    </div>
  );

  const loader = useMemo(() => {
    return addItemsRepeatedly(sckeloton, 13);
  }, []);

  return (
    <div
      role="status"
      className="hidden md:block md:w-[22%] max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-200 md:p-6 dark:border-gray-200 md:sticky md:-webkit-sticky"
    >
      {loader}

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export const ProductListSckeloton = memo(ProductSckeloton);
