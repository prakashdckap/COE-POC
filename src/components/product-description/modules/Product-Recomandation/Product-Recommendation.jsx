import { memo, useEffect } from "react";
import getProductsList from "../../../../helper/hooks/getProductsList";
import ProductSuggesion from "../../../../theme-files/carousel-section/product-suggestion";

export default function PorductRecommend({ recommend = {}, productsList = [] }) {
  const { storefrontLabel, productsView } = recommend;
  const { onProductSearch, loading, products } = getProductsList();

  useEffect(() => {
    const productSkus = productsView?.map((item) => item?.sku) || [];
    // conditions to avoid duplicate API call
    if (productSkus?.length && !loading && !products?.items?.length) {
      onProductSearch({ filter: { sku: { in: productSkus } } });
    }
  }, [productsView]);

  if (products?.items?.length || productsList?.length) {
    return (
      <section className="home">
        <ProductSuggesion
          productsList={products?.items || productsList}
          title={storefrontLabel}
          hideMobileBtn={!!products?.items?.length}
        />
      </section>
    );
  }
}

export const PorductRecommendation = memo(PorductRecommend);

export const pageType = {
  cms: "CMS",
  cart: "Cart",
  category: "Category",
  checkout: "Checkout",
  pageBuilder: "PageBuilder",
  product: "Product",
};
