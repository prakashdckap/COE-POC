import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "../../../src/components/cart";
import ZIP_CANCEL from "../../../src/components/checkout/graphql/query/zip-cancel";
import constants from "../../../src/helper/constant";
import SEOHead from "../../../src/helper/SEOHeader";

const ZipDynamicSlug = () => {
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const history = useRouter();
  const cartId = customerToken ? customerCartId : guestCartId;
  const orderStatus = history.query.OrderStatus;
  const zipToken = history.query.token;

  const [zipData, { data: zipFailureData, loading: zipFailureLoading }] = useLazyQuery(ZIP_CANCEL, {
    variables: {
      cartId,
      orderStatus,
      zipToken,
    },
  });

  useEffect(() => {
    if (zipToken && orderStatus && cartId) {
      zipData({
        variables: {
          cartId,
          orderStatus,
          zipToken,
        },
      })
        .then((res) => console.log("res", res))
        .catch((error) => console.log("error", error));
    }
  }, [history]);

  return (
    <>
      <SEOHead
        title="Shopping Cart"
        description="Shopping Cart"
        canonicalUrl={`${constants.replaceUrl}/shoppingcart`}
      />
      <Cart zipFailureData={zipFailureData?.setZipCancel} />
    </>
  );
};

export default ZipDynamicSlug;
