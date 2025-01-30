import CartModules from "../src/components/cartmodules";
import constants from "../src/helper/constant";
import SEOHead from "../src/helper/SEOHeader";

export default function cartmodule() {
  return (
    <>
      <SEOHead
        title="Shopping Cart"
        description="Shopping Cart"
        canonicalUrl={`${constants.replaceUrl}/shoppingcart`}
      />
      <CartModules />
    </>
  );
}
