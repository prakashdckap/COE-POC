import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import constants from "../../helper/constant";
import PRODUCT_LIST from "./graphql/query/product-list";
import PRODUCT_SEARCH from "./graphql/query/product-search";
import useCategoryFilters from "../../helper/hooks/use-category-filter";
import { SET_LAST_SELECTED_FILTER } from "../../redux/actions";
import MobileFilter from "./ListActions/MobileFilter";
import BreadCrumbsPlp, { PlpHeaderNotification } from "./ListActions/BreadCrumbsPlp";
import CategoryDetails from "./ListActions/CategoryDetails";
import DesktopFilters, { ProductEmpty } from "./ListActions/DesktopFilters";
import ProductList from "./ListActions/ProductList";
import { ProductListSckeloton } from "./product-list-sckeloton";

export default function ProductListing({
  products,
  totalCount,
  categoryId,
  searchResult,
  category,
}) {
  const layout = constants.themeObj[constants.selectedTheme].listingPage;

  const dispatch = useDispatch();
  const history = useRouter();
  const { asPath } = history;

  let conditionalSort = {};
  if (!searchResult) {
    conditionalSort = { name: "Featured", current: true, value: "featured" };
  } else {
    conditionalSort = { name: "Relevance", current: false, value: "relevance" };
  }

  const sortOptions = [
    conditionalSort,
    { name: "Most Reviewed", current: false, value: "most_reviewed" },
    { name: "New Arrivals", current: false, value: "new_arrivals" },
    { name: "Price High - Low", current: false, value: "price" },
    { name: "Price Low - High", current: false, value: "price" },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productView, setproductView] = useState("");
  const [sortBy, setsortBy] = useState(
    searchResult
      ? { name: "Relevance", value: "relevance" }
      : { name: "Featured", value: "featured" }
  );
  const [orderBy, setorderBy] = useState("");
  const [totalProductCount, settotalProductCount] = useState(0);
  const [listingProducts, setlistingProducts] = useState([]);
  const [filters, setfilters] = useState([]);
  const [maxValue, setmaxValue] = useState(0);
  const [priceObj, setpriceObj] = useState({ min: 0, max: 100 });
  const [client, setclient] = useState(false);
  const [loadFromUrl, setLoadFromUrl] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage] = useState(60);
  const [categoryUrl, setCategoryUrl] = useState("");
  const [loadingCheck, setLoadingCheck] = useState(false);

  // custom filter hooks
  const { cleanFilters } = useCategoryFilters(categoryId, history?.query?.q);

  // setting orderby based on sort by
  useEffect(() => {
    if (sortBy?.name === "Price High - Low") {
      setorderBy("DESC");
    } else if (sortBy?.name === "Most Reviewed") {
      setorderBy("DESC");
    } else {
      setorderBy("ASC");
    }
  }, [sortBy]);

  // Setting up client to false once price obj value changes
  useEffect(() => {
    setclient(false);
  }, [priceObj]);

  // Initially setting current page to 1 based on the change in category id
  useEffect(() => {
    setcurrentPage(1);
    setclient(false);
  }, [categoryId]);

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

  let queryType = "";
  let variables = {};

  if (searchResult) {
    queryType = PRODUCT_SEARCH;
    variables = {
      text: history.query.q,
      pageSize: perPage,
      currentPage,
      sort: {
        sortBy: sortBy?.value,
        sortOrder: orderBy || "ASC",
      },
      filters: cleanFilters(filters) || [],
      priceFilter: { min: priceObj?.min, max: priceObj.max },
    };
  } else {
    queryType = PRODUCT_LIST;
    variables = {
      categoryId: parseInt(categoryId, 10),
      pageSize: perPage,
      currentPage,
      sort: { sortBy: sortBy?.value, sortOrder: orderBy || "ASC" },
      filters: cleanFilters(filters) || [],
      priceFilter: { min: priceObj?.min, max: priceObj.max },
    };
  }

  const [productListQuery, { data: sortedProducts, loading: sortedProductsLoading }] =
    useLazyQuery(queryType);

  useEffect(() => {
    variables.priceFilter.min = priceObj?.min;
    variables.priceFilter.max = priceObj?.max;

    if (client) {
      productListQuery({
        variables,
      });
    }
  }, [sortBy, orderBy, currentPage, client, filters]);

  useEffect(() => {
    let urlFilter = history?.query?.filters;

    if (urlFilter !== undefined) {
      urlFilter = JSON.parse(urlFilter);
      setfilters(urlFilter);

      productListQuery({
        variables: {
          categoryId: parseInt(categoryId, 10),
          pageSize: perPage,
          currentPage,
          sort: { sortBy: sortBy?.value, sortOrder: orderBy || "ASC" },
          filters: cleanFilters(urlFilter),
          priceFilter: { min: priceObj?.min, max: priceObj?.max },
        },
      });

      setLoadFromUrl(true);
    }
  }, []);

  // conditionally setting the rendring array based on the client or sever side
  useEffect(() => {
    let response = "";
    if (!searchResult && client && !sortedProductsLoading) {
      response = sortedProducts?.products?.items;
      settotalProductCount(sortedProducts?.products?.totalCounts);
    } else if (client && searchResult && !sortedProductsLoading) {
      response = sortedProducts?.search?.items;
      settotalProductCount(sortedProducts?.search?.totalCounts);
    }

    if (!client) {
      if (products?.items?.length) {
        setlistingProducts(products?.items);
        settotalProductCount(products?.totalCounts);
      } else {
        setlistingProducts(products || []);
        settotalProductCount(totalCount);
      }
    } else if (currentPage === 1 && response) {
      setlistingProducts(response);
    } else if (currentPage !== 1 && response) {
      setlistingProducts((product) => [...product, ...response]);
    }

    if (loadFromUrl) {
      const items = sortedProducts?.products?.items;
      response = sortedProducts?.products?.items;
      settotalProductCount(sortedProducts?.products?.totalCounts);
      setlistingProducts(items);
    }
  }, [sortedProducts]);

  useEffect(() => {
    try {
      let urlPath = asPath?.split("?")[0];
      if (totalCount >= 0 && urlPath !== categoryUrl) {
        setlistingProducts(products || []);
        settotalProductCount(totalCount);
        setCategoryUrl(urlPath);
      }
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  useEffect(() => {
    dispatch(SET_LAST_SELECTED_FILTER(""));
  }, []);

  useEffect(() => {
    setLoadingCheck(true);
  }, [listingProducts]);

  // Load More Functionality
  const handleLoadMore = () => {
    if (currentPage * perPage < totalCount) {
      setcurrentPage(currentPage + 1);
      setclient(true);
    }
  };

  const handleSort = (option) => {
    if (option) {
      setclient(true);
      setsortBy({ value: option.value, name: option?.name });
      setcurrentPage(1);
    }
  };

  return (
    <div className={"bg-white plp-wrap"}>
      {/*########## Mobile filter dialog ##########*/}
      <MobileFilter
        setfilters={setfilters}
        filters={filters}
        categoryId={parseInt(categoryId, 10)}
        setclient={setclient}
        setcurrentPage={setcurrentPage}
        priceObj={priceObj}
        setpriceObj={setpriceObj}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        setmaxValue={setmaxValue}
        maxValue={maxValue}
        sortedProductsLoading={sortedProductsLoading}
      />
      {/*########## Mobile filter dialog End ##########*/}
      <main className="container mx-auto px-[10px]">
        <BreadCrumbsPlp category={category} />
        <PlpHeaderNotification />
        <CategoryDetails category={category} />

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="columns-2 flex justify-center">
            <DesktopFilters
              setfilters={setfilters}
              filters={filters}
              categoryId={parseInt(categoryId, 10)}
              setclient={setclient}
              setcurrentPage={setcurrentPage}
              priceObj={priceObj}
              setpriceObj={setpriceObj}
              setmaxValue={setmaxValue}
              maxValue={maxValue}
              sortedProductsLoading={sortedProductsLoading}
            />
            {loadingCheck ? (
              !listingProducts?.length ? (
                <ProductEmpty
                  priceObj={priceObj}
                  maxValue={maxValue}
                  loading={sortedProductsLoading}
                />
              ) : (
                <ProductList
                  sortedProductsLoading={sortedProductsLoading}
                  productView={productView}
                  listingProducts={listingProducts}
                  totalProductCount={totalProductCount}
                  currentPage={currentPage}
                  perPage={perPage}
                  handleLoadMore={handleLoadMore}
                  categoryId={categoryId}
                  handleSort={handleSort}
                  sortBy={sortBy}
                  sortOptions={sortOptions}
                  setMobileFiltersOpen={setMobileFiltersOpen}
                />
              )
            ) : (
              <>
                <ProductListSckeloton />
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

ProductListing.defaultProps = {
  products: [],
  totalCount: 0,
  categoryId: 0,
  searchResult: false,
  category: {},
};

ProductListing.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      sku: PropTypes.string,
      image: PropTypes.shape({ url: PropTypes.string }),
      priceRange: PropTypes.shape({
        minPrice: PropTypes.shape({
          finalPrice: PropTypes.shape({ value: PropTypes.number }),
        }),
      }),
      description: PropTypes.shape({ value: PropTypes.string }),
      productType: PropTypes.string,
      customUrl: PropTypes.string,
      productOptions: PropTypes.arrayOf(
        PropTypes.shape({
          attributeCode: PropTypes.string,
          attributeName: PropTypes.string,
          attributeOptions: PropTypes.arrayOf(
            PropTypes.shape({
              optionCode: PropTypes.string,
              optionImage: PropTypes.string,
              optionName: PropTypes.string,
              optionValue: PropTypes.string,
              optionPrice: PropTypes.shape({ currency: PropTypes.string, value: PropTypes.number }),
            })
          ),
        })
      ),
    })
  ),
  totalCount: PropTypes.number,
  categoryId: PropTypes.number,
  searchResult: PropTypes.bool,
  category: PropTypes.shape(),
};
