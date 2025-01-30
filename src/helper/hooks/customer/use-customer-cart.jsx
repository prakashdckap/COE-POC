import { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_AVAILABLE_PAYMENT_METHODS,
  SET_AVAILABLE_SHIPPING_METHODS,
  SET_CHECKOUT_BILLING_ADDRESS,
  SET_CHECKOUT_SHIPPING_ADDRESS,
  SET_CHECKOUT_SHIPPING_METHOD,
  SET_ROUTE_SHIPPING_VALUE,
  UPDATE_CART_DETAIL,
  UPDATE_CART_ITEMS,
} from "../../../redux/actions";
import GET_CART_DETAILS from "../../../components/cart/graphql/query/get-cart-details";
import useSetShippingMethod from "../use-set-shipping-method";

function useCustomerCart() {
  const dispatch = useDispatch();
  const {
    customerCartId,
    guestCartId,
    customerToken,
    checkoutShippingMethod,
    availableShippingMethods,
    checkoutShippingAddress,
  } = useSelector((state) => state);

  const [getCustomerCartDetails, { data: CustomerCartDetails, loading: cartDetailsLoading }] =
    useLazyQuery(GET_CART_DETAILS, {
      skip: customerToken ? !customerCartId : !guestCartId,
      fetchPolicy: "network-only",
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
      },
    });
  const { handleShippingMethod } = useSetShippingMethod();

  const cartDetailsRefetch = () => {
    if (customerCartId || guestCartId) {
      getCustomerCartDetails({
        fetchPolicy: "no-cache",
        variables: {
          cartId: customerToken ? customerCartId : guestCartId,
        },
      })
        .then((res) => {
          if (res?.data?.cart) {
            if (res?.data?.cart) {
              dispatch(UPDATE_CART_DETAIL(res?.data?.cart));
              dispatch(UPDATE_CART_ITEMS(res?.data?.cart?.cartItems));
              if (res?.data?.cart?.applicableRouteShipping)
                dispatch(SET_ROUTE_SHIPPING_VALUE(res?.data?.cart?.applicableRouteShipping));

              dispatch(SET_AVAILABLE_SHIPPING_METHODS(res?.data?.cart?.availableShippingMethods));
              dispatch(SET_CHECKOUT_BILLING_ADDRESS(res?.data?.cart?.billingAddress));
              dispatch(SET_AVAILABLE_PAYMENT_METHODS(res?.data?.cart?.availablePaymentMethods));

              if (!checkoutShippingAddress?.firstName)
                dispatch(SET_CHECKOUT_SHIPPING_ADDRESS(res?.data?.cart?.shippingAddress || {}));

              const shippingMethods = res?.data?.cart?.availableShippingMethods;
              if (
                shippingMethods?.find(
                  (method) => method.methodCode === res?.data?.cart?.shippingMethod?.methodCode
                )?.methodCode
              ) {
                if (
                  checkoutShippingMethod?.methodCode !== res?.data?.cart?.shippingMethod?.methodCode
                )
                  dispatch(SET_CHECKOUT_SHIPPING_METHOD(res?.data?.cart?.shippingMethod));
              } else if (shippingMethods?.length && !res?.data?.cart?.shippingMethod?.methodCode) {
                dispatch(SET_CHECKOUT_SHIPPING_METHOD({}));
                if (
                  !shippingMethods?.find(
                    (method) => method.methodCode === checkoutShippingMethod?.methodCode
                  )?.methodCode &&
                  shippingMethods[0]?.methodCode
                ) {
                  handleShippingMethod(shippingMethods[0], true);
                }
              } else {
                dispatch(SET_CHECKOUT_SHIPPING_METHOD({}));
              }
            }
          }
        })
        .catch((err) => console.log("err", err));
    }
  };

  return {
    getCustomerCartDetails,
    CustomerCartDetails,
    cartDetailsRefetch,
    cartDetailsLoading,
  };
}

export default useCustomerCart;
