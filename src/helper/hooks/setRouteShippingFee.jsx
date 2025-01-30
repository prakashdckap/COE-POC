import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import PICK_UP_LOCALLY from "../../components/checkout/graphql/mutation/pick-up-locally";
import useCustomerCart from "./customer/use-customer-cart";
import {
  SET_AVAILABLE_SHIPPING_METHODS,
  SET_ROUTE_SHIPPING_VALUE,
  SHOW_CART,
  UPDATE_CART_DETAIL,
  UPDATE_CART_ITEMS,
} from "../../redux/actions";
import ROUTE_SHIPPING from "../../components/checkout/graphql/mutation/route-shipping";

// import useEstimateShipping from "./cart/use-estimate-shipping";

export default function useSetRouteShiping() {
  //   const [setPickupLocally, { loading: PickupLocallyLoading }] = useMutation(PICK_UP_LOCALLY);
  const [routeShipping, { loading: routeShippingLoading }] = useMutation(ROUTE_SHIPPING);
  const [routeShippingResponse, setRouteShippingResponse] = useState({});
  const { customerToken, customerCartId, guestCartId, cartDetails } = useSelector((state) => state);
  const { cartDetailsRefetch } = useCustomerCart();
  const history = useRouter();
  const dispatch = useDispatch();

  const routeShippingFeeUpdate = (isEnabled) => {
    if (customerCartId)
      routeShipping({
        skip: !customerCartId,
        variables: {
          cartId: customerCartId,
          isEnabled: isEnabled,
        },
      })
        .then((res) => {
          if (!res?.errors?.length && res?.data?.routeShippingEnabled) {
            setRouteShippingResponse(res?.data?.routeShippingEnabled);
            // dispatch(UPDATE_CART_DETAIL(res?.data?.routeShippingEnabled));
            // dispatch(UPDATE_CART_ITEMS(res?.data?.routeShippingEnabled?.cartItems));
            cartDetailsRefetch();
            dispatch(
              SET_ROUTE_SHIPPING_VALUE(res?.data?.routeShippingEnabled?.applicableRouteShipping)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return { routeShippingFeeUpdate, routeShippingResponse, routeShippingLoading };
}
