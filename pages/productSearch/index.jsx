import React, { Suspense, lazy } from "react";
const ProductListing = lazy(() => import("../../src/components/product-listing/magento-plp"));

const ProductSearch = React.memo(({ search, count }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListing searchResult />
    </Suspense>
  );
});
export default ProductSearch;
