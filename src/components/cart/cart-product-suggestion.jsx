import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import useProductRecommendations from "../../helper/hooks/useProductRecommendations";
import { Gtag_ViewCartEvent } from "../../utils/google-tags/events";
import {
  pageType,
  PorductRecommendation,
} from "../product-description/modules/Product-Recomandation/Product-Recommendation";

export default function CartProductSuggestion({}) {
  const cartItems = useSelector((state) => state.cartItems);
  const cartProductSku = useMemo(() => {
    return (
      cartItems
        ?.map((cartItem) => cartItem?.product || [])
        ?.flat()
        ?.map((product) => product.sku)
        .filter((sku) => sku) || []
    );
  });

  const { productsRecommendation, loading, getProductRecommendations } = useProductRecommendations({
    cartSkus: cartProductSku,
    pageType: pageType.cart,
  });

  useEffect(() => {
    if (cartProductSku.length) getProductRecommendations(cartProductSku);
    Gtag_ViewCartEvent(cartItems);
  }, [cartItems]);

  return (
    <>
      {productsRecommendation?.map((recommend) => {
        return <PorductRecommendation loading={loading} recommend={recommend} />;
      })}
    </>
  );
}
