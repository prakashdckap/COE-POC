import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";

import constants from "../../helper/constant";
import { SET_PLP_DATA } from "../../redux/actions";
import getProductsList from "../../helper/hooks/getProductsList";
import SEOHead from "../../helper/SEOHeader";
import MagentoDesktopFilters, { ProductEmpty } from "./ListActions/Magento/MagentoDesktopFilters";
import { magentoFeaturedSort, magentoRelevanceSort, magnetoPlpSortOptions } from "./helper";
import { priceReset } from "./helper";
import { ProductListSckeloton } from "./product-list-sckeloton";
import {
  pageType,
  PorductRecommendation,
} from "../product-description/modules/Product-Recomandation/Product-Recommendation";
import useProductRecommendations from "../../helper/hooks/useProductRecommendations";
import { Gtag_FeaturedItemsEvent } from "../../utils/google-tags/events";

const QuickView = dynamic(() => import("../product-description/quick-view"));
const MagentoMobileFilter = dynamic(() => import("./ListActions/Magento/MagentoMobileFilter"));
const BreadCrumbsPlp = dynamic(() => import("./ListActions/BreadCrumbsPlp"));
const ProductList = dynamic(() => import("./ListActions/ProductList"));
const CategoryDetails = dynamic(() => import("./ListActions/CategoryDetails"));

const PlpHeaderNotification = dynamic(() =>
  import("./ListActions/BreadCrumbsPlp").then((mod) => mod.PlpHeaderNotification)
);
const MemoizedProductList = React.memo(ProductList);
const MemoizedMagentoDesktopFilters = React.memo(MagentoDesktopFilters);

export default function ProductListing({ category, categoryId, searchResult, brandId }) {
  const layout = constants.themeObj[constants.selectedTheme].listingPage;
  const dispatch = useDispatch();
  const history = useRouter();
  const plpListing = useSelector((state) => state.plpListing);

  let conditionalSort = magentoRelevanceSort;

  if (!searchResult) {
    conditionalSort = magentoFeaturedSort;
  } else {
    conditionalSort = magentoRelevanceSort;
  }

  const categoryFilter = useMemo(
    () =>
      categoryId
        ? { category_id: { eq: `${categoryId}` } }
        : brandId
        ? { brands: { eq: brandId } }
        : {},
    [categoryId, brandId]
  );

  const sortOptions = [conditionalSort, ...magnetoPlpSortOptions];
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productView, setproductView] = useState("");
  const [sortBy, setsortBy] = useState(conditionalSort);
  const [totalProductCount, settotalProductCount] = useState(0);
  const [listingProducts, setlistingProducts] = useState([]);
  const [filters, setfilters] = useState([]);
  const [maxValue, setmaxValue] = useState(100);
  const [priceObj, setpriceObj] = useState(priceReset);
  const [client, setclient] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [plpLoading, setPlpLoading] = useState(false);
  const [perPage] = useState(60);
  const [show, setShow] = useState(false);
  const [quickView, setQuickView] = useState("");
  const [delayWarning, setDelayWarning] = useState(true);

  const {
    productsRecommendation,
    loading: suggesionLoading,
    getProductRecommendations,
  } = useProductRecommendations({
    pageType: pageType.category,
    category: history?.query?.slug?.[0] || "",
  });

  useEffect(() => {
    if (history?.query?.slug?.[0]) {
      getProductRecommendations(history.query.slug[0]);
    }
  }, [history?.query?.slug?.[0]]);

  const cleanFiltersMagnetoPlp = useCallback(
    (plpFilters) => {
      const cleanFilter = categoryId
        ? { category_id: { eq: `${categoryId}` } }
        : brandId
        ? { brands: { eq: brandId } }
        : {};
      plpFilters?.forEach((filter) => {
        const options = [];
        filter?.options?.forEach((option) => option?.checked && options?.push(option.value));
        if (options?.length) cleanFilter[filter?.attribute_code] = { in: options };
      });
      if (maxValue && priceObj.max && priceObj.request) {
        cleanFilter["price"] = { from: `${priceObj.min}`, to: `${priceObj.max}` };
      }
      return cleanFilter;
    },
    [categoryFilter, priceObj, maxValue]
  );

  // Setting maximum default value for price slider
  useEffect(() => {
    setpriceObj({ ...priceObj, max: maxValue });
  }, [maxValue]);

  // UseEffect to change page layout
  useEffect(() => {
    if (layout?.length) {
      setproductView(layout);
    } else {
      setproductView("grid-3");
    }
  }, [layout]);

  let variables = {}; // variable for products API call

  const { onProductSearch, loading, filterAggregations, getProductFiletrs, filtersLoading } =
    getProductsList(); // hook to get products

  /** sort and filter function payload @api call*/
  useEffect(() => {
    const [option, value] = sortBy?.value?.split("|");
    variables = {
      currentPage: 1,
      pageSize: perPage,
      search: history?.query?.q,
      sort: option ? { [option]: value || "ASC" } : {},
      filter: cleanFiltersMagnetoPlp(filters) || {},
    };

    /** client @condition to avoid unnecessary calls when the state update */

    if (client && !loading) {
      setDelayWarning(true);
      onProductSearch(variables)
        .then(({ items, total_count }) => {
          if (items) {
            setlistingProducts(items);
            settotalProductCount(total_count);
          }
        })
        .catch((err) => {})
        .finally(() => {
          setDelayWarning(false);
        });
      getProductFiletrs(variables);
      dispatch(SET_PLP_DATA(variables));
    }
  }, [sortBy, client, filters]);

  /** Load More Functionality @api call*/
  const handleLoadMore = async () => {
    if (currentPage * perPage < totalProductCount && !loading) {
      const nextPageList = { ...plpListing, currentPage: currentPage + 1 };
      onProductSearch(nextPageList)
        .then(({ items, total_count }) => {
          if (items) {
            let plpFullData = [...listingProducts, ...items];
            setlistingProducts(plpFullData);
            settotalProductCount(total_count);
            setcurrentPage(currentPage + 1);
          }
        })
        .catch((err) => {});
      getProductFiletrs(nextPageList);
    }
  };

  /** initial payload with cache plp payload from redux and history. @api call*/
  useEffect(() => {
    if (history?.query?.q || categoryId || brandId) {
      let urlFilter = history?.query?.filters;
      variables = {
        currentPage: 1,
        pageSize: perPage,
        search: history?.query?.q,
        filter: categoryFilter,
      };

      if (urlFilter !== undefined) {
        urlFilter = JSON.parse(urlFilter);
        setfilters(urlFilter);
        variables.filter = cleanFiltersMagnetoPlp(urlFilter) || {};
      }
      onProductSearch(variables)
        .then(({ items, total_count }) => {
          if (items) {
            setlistingProducts(items);
            settotalProductCount(total_count);
            if (!Object.entries(variables.filter)?.length && !items?.length) {
              setfilters([]);
            }
            Gtag_FeaturedItemsEvent(items, history.query.slug?.[0] || "product_list");
          }
        })
        .catch((err) => {});
      getProductFiletrs(variables);
      dispatch(SET_PLP_DATA(variables));
    }
  }, [history?.query?.q, categoryId, brandId]);

  useEffect(() => {
    setPlpLoading(loading);
    setclient(loading);
  }, [loading]);

  const handleSort = (option) => {
    if (option) {
      setclient(true);
      setsortBy({ value: option.value, name: option?.name });
      setcurrentPage(1);
    }
  };

  return (
    <div className="bg-white plp-wrap" id="main_content">
      {history?.query?.q && (
        <SEOHead
          title={`Search results for: '${history?.query?.q}'`}
          canonicalUrl={`${constants.replaceUrl}/${history?.query?.slug?.[0]}`}
        />
      )}
      {/*########## Mobile filter dialog ##########*/}
      <MagentoMobileFilter
        setfilters={setfilters}
        filters={filters}
        setclient={setclient}
        setcurrentPage={setcurrentPage}
        priceObj={priceObj}
        setpriceObj={setpriceObj}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        setmaxValue={setmaxValue}
        maxValue={maxValue}
        sortedProductsLoading={plpLoading}
        filterAggregations={filterAggregations}
        listingProducts={listingProducts}
      />
      {/*########## Mobile filter dialog End ##########*/}
      <main className="container mx-auto px-[10px]">
        <BreadCrumbsPlp category={category || {}} />
        <PlpHeaderNotification />
        <CategoryDetails category={category || {}} />

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          {(plpLoading || filtersLoading) && !listingProducts?.length && delayWarning ? (
            <>
              <ProductListSckeloton />
            </>
          ) : history?.query?.q?.length > 2 || categoryId || brandId ? (
            <div className="columns-2 flex justify-center">
              <MemoizedMagentoDesktopFilters
                setfilters={setfilters}
                filters={filters}
                setclient={setclient}
                setcurrentPage={setcurrentPage}
                priceObj={priceObj}
                setpriceObj={setpriceObj}
                setmaxValue={setmaxValue}
                maxValue={maxValue}
                sortedProductsLoading={plpLoading}
                filterAggregations={filterAggregations}
                listingProducts={listingProducts}
              />

              {/* Product grid */}
              {!listingProducts?.length && !plpLoading && !delayWarning ? (
                <ProductEmpty priceObj={priceObj} maxValue={maxValue} loading={plpLoading} />
              ) : (
                <MemoizedProductList
                  sortedProductsLoading={plpLoading}
                  productView={productView}
                  listingProducts={listingProducts}
                  totalProductCount={totalProductCount}
                  currentPage={currentPage}
                  perPage={perPage}
                  handleLoadMore={handleLoadMore}
                  handleSort={handleSort}
                  sortBy={sortBy}
                  sortOptions={sortOptions}
                  setMobileFiltersOpen={setMobileFiltersOpen}
                  isSearch
                />
              )}
            </div>
          ) : (
            <div className=" flex justify-end">
              <div className="flex items-center w-[80%] px-[10px] py-[10px] leading-[1.2em] bg-[#fdf0d5] text-[#6f4400] text-sm  max-h-10">
                <ExclamationIcon className="text-[#ffdda5] w-5 h-5" />
                <span className="pl-[10px]">We could not find anything for {history.query.q}</span>
              </div>
            </div>
          )}
        </section>
      </main>
      {quickView ? (
        <QuickView show={show} setShow={setShow} url={quickView} setQuickView={setQuickView} />
      ) : null}
      {category && (
        <>
          {productsRecommendation?.map((recommend) => {
            return <PorductRecommendation loading={suggesionLoading} recommend={recommend} />;
          })}
        </>
      )}
    </div>
  );
}

ProductListing.defaultProps = {
  searchResult: false,
};

ProductListing.propTypes = {
  searchResult: PropTypes.bool,
};
