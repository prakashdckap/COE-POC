import { useEffect } from "react";
import LoadingSpinner from "../../../helper/loading-spinner";
import useAmastyBanner from "../../../helper/notifications/getAmastyBanner";
import ProductCard from "../product-card";
import { BottomPlpInfo, DisplayBanner, TopPlpInfo } from "./DisplayInfo";
import ProductSorting from "./ProductSorting";
import MagentoProductCard from "./Magento/MagentoProductCard";

export default function ProductList({
  sortedProductsLoading,
  productView,
  listingProducts,
  currentPage,
  perPage,
  totalProductCount,
  handleLoadMore,
  categoryId = "",
  handleSort,
  sortBy,
  sortOptions,
  setMobileFiltersOpen,
  isSearch = false,
}) {
  const { getPromoBanners, categoryTopPromoBanner, categoryBottomPromoBanner } = useAmastyBanner();

  useEffect(() => {
    getPromoBanners(null, categoryId);
  }, []);

  return (
    <>
      <div className="md:w-[78%] md:pl-[2%]">
        <DisplayBanner promoBanner={categoryTopPromoBanner} topBanner />

        {/*########## PLP Top Details ##########*/}
        <div className="flex justify-between items-center mb-[20px] p-[10px]">
          <TopPlpInfo
            totalProductCount={totalProductCount}
            currentPage={currentPage}
            perPage={perPage}
            listingProducts={listingProducts}
          />
          <ProductSorting
            handleSort={handleSort}
            sortBy={sortBy}
            sortOptions={sortOptions}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
        </div>

        {/*########## Product grid ##########*/}
        <div
          className={`${
            sortedProductsLoading ? "opacity-40" : null
          } grid grid-cols-2 gap-y-[10px] md:gap-y-[40px] gap-x-[10px] md:gap-x-[15px] pt-5 md:pt-0 ${
            productView === "list"
              ? "sm:grid-cols-1 lg:grid-cols-1"
              : `sm:grid-cols-2 ${
                  productView === "grid-3"
                    ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "lg:grid-cols-2 md:grid-cols-3"
                }`
          } `}
        >
          {listingProducts?.length
            ? listingProducts?.map((product) => {
                if (isSearch) {
                  return (
                    <MagentoProductCard
                      key={product?.id}
                      productView={productView}
                      imgUrl={product?.image?.url}
                      product={product}
                      isSearch={isSearch}
                    />
                  );
                } else {
                  return (
                    <ProductCard
                      key={product?.id}
                      productView={productView}
                      imgUrl={product?.image?.url}
                      product={product}
                      isSearch={isSearch}
                    />
                  );
                }
              })
            : ""}
        </div>
        {/*########## Product grid End ##########*/}

        {/*########## Load More Button ##########*/}
        {currentPage * perPage >= totalProductCount ? (
          ""
        ) : (
          <button
            type="button"
            className="mt-10 mx-auto bg-skin-secondary uppercase border border-transparent  py-[10px] px-[80px] flex items-center justify-center text-[13px] font-bold text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted disabled:opacity-50 disabled:cursor-not-allowed rounded-[2px]"
            onClick={() => handleLoadMore()}
            disabled={currentPage * perPage >= totalProductCount}
          >
            {sortedProductsLoading ? <LoadingSpinner message="loading" /> : "Load More"}
          </button>
        )}

        {/*########## PLP Bottom Details ##########*/}
        <BottomPlpInfo
          totalProductCount={totalProductCount}
          currentPage={currentPage}
          perPage={perPage}
          listingProducts={listingProducts}
        />
        <DisplayBanner promoBanner={categoryBottomPromoBanner} />
      </div>
    </>
  );
}
