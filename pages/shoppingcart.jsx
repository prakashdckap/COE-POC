import Cart from "../src/components/cart";
import SEOHead from "../src/helper/SEOHeader";
import CartModules from "../src/components/cartmodules";
import { useEffect } from "react";
import useCustomerCart from "../src/helper/hooks/customer/use-customer-cart";
import CartProductSuggestion from "../src/components/cart/cart-product-suggestion";
import constants from "../src/helper/constant";

export default function ShoppingCart() {
  const { cartDetailsRefetch } = useCustomerCart();
  useEffect(() => {
    cartDetailsRefetch();
  }, []);
  return (
    <>
      <SEOHead
        title="Shopping Cart"
        description="Shopping Cart"
        canonicalUrl={`${constants.replaceUrl}/shoppingcart`}
      />
      <CartModules />
      <CartProductSuggestion />
    </>
  );
}
