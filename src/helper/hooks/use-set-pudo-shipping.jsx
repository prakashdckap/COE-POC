import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import PICK_UP_LOCALLY from "../../components/checkout/graphql/mutation/pick-up-locally";
import useCustomerCart from "./customer/use-customer-cart";
import { SET_AVAILABLE_SHIPPING_METHODS, SHOW_CART } from "../../redux/actions";

// import useEstimateShipping from "./cart/use-estimate-shipping";

export default function useSetPudoShipping() {
  const [setPickupLocally, { loading: PickupLocallyLoading }] = useMutation(PICK_UP_LOCALLY);
  const [shippingMethodResponse, setshippingMethodResponse] = useState({});
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const { cartDetailsRefetch } = useCustomerCart();
  const history = useRouter();
  const dispatch = useDispatch();
  // const { handleEstimateShipping } = useEstimateShipping();

  const handlePickupLocally = (data, setPudoLoading, handleEstimateShipping, requestObject) => {
    setPudoLoading && setPudoLoading(true);
    setPickupLocally({
      skip: !data,
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
        isPudo: data,
      },
    })
      .then((res) => {
        if (res.data && !res.errors) {
          if (requestObject) {
            if (!checkoutShippingAddress?.firstName) handleEstimateShipping(requestObject);
          }
          dispatch(SET_AVAILABLE_SHIPPING_METHODS([]));
          setshippingMethodResponse(res);
          cartDetailsRefetch();
          dispatch(SHOW_CART(false));
          if (history?.pathname !== "/checkout") history.push("/checkout");
        }
        setPudoLoading && setPudoLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPudoLoading && setPudoLoading(false);
      });
  };

  return { handlePickupLocally, shippingMethodResponse, PickupLocallyLoading };
}
