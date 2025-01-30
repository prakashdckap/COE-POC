import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import SET_ESTIMATE_SHIPPING_METHOD from "../../../components/cart/graphql/mutation/estimate-shipping-method";
import useCustomerCart from "../customer/use-customer-cart";

export default function useEstimateShippingMethod() {
  const [estimateShippingMethodResponse, setestimateShippingMethodResponse] = useState({});
  const { customerCartId, customerToken, guestCartId, checkoutShippingMethod } = useSelector(
    (state) => state
  );
  const { cartDetailsRefetch, cartDetailsLoading } = useCustomerCart();

  const [estimateShippingMethod, { loading: estimateShippingMethodLoading }] = useMutation(
    SET_ESTIMATE_SHIPPING_METHOD
  );

  const handleEstimateShippingMethod = (addressObj, selectedMethod) => {
    if (selectedMethod !== checkoutShippingMethod?.methodCode)
      estimateShippingMethod({
        skip:
          !addressObj?.country ||
          !addressObj.city ||
          !addressObj?.postcode ||
          addressObj?.postcode?.length < 5,
        variables: {
          cartId: customerToken ? customerCartId : guestCartId,
          address: addressObj,
          shippingMethod: selectedMethod,
        },
      })
        .then((res) => {
          if (res.data && !res.errors) {
            setestimateShippingMethodResponse(res);
            cartDetailsRefetch();
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return {
    handleEstimateShippingMethod,
    estimateShippingMethodResponse,
    estimateShippingMethodLoading: estimateShippingMethodLoading || cartDetailsLoading,
  };
}
