import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import SET_SHIPPING_METHOD from "../../components/checkout/graphql/mutation/shipping-method";
import {
  SET_CHECKOUT_SHIPPING_METHOD,
  UPDATE_CART_DETAIL,
  // SET_NOTIFICATION
} from "../../redux/actions";

export default function useSetShippingMethod() {
  const dispatch = useDispatch();
  const [setShippingMethod, { loading: shippingMethodLoading }] = useMutation(SET_SHIPPING_METHOD);
  const [shippingMethodResponse, setshippingMethodResponse] = useState({});
  const { customerToken, customerCartId, guestCartId, checkoutShippingMethod } = useSelector(
    (state) => state
  );
  const { checkoutShippingAddress, cartDetails } = useSelector((state) => state);

  // need to verify is selected_shipping_method is required error
  const handleShippingMethod = (data, forceCall = false) => {
    /** to avoid duplicate API call which causing @Internal @Server @Error compare methodCode in below @sameCode */
    const sameCode = checkoutShippingMethod?.methodCode === data?.methodCode;
    if (checkoutShippingAddress?.firstName && (!sameCode || forceCall)) {
      setShippingMethod({
        skip: !data?.methodCode,
        variables: {
          cartId: customerToken ? customerCartId : guestCartId,
          shippingMethod: data?.methodCode,
        },
      })
        .then((res) => {
          if (res.data && !res.errors) {
            setshippingMethodResponse(res);
            dispatch(SET_CHECKOUT_SHIPPING_METHOD(res?.data?.setShippingMethod?.shippingMethod));
            dispatch(UPDATE_CART_DETAIL({ ...cartDetails, ...res?.data?.setShippingMethod }));
          } else if (res.errors.length) {
            //** error needs to be fixed */
            console.log({ shippingMethodError: res.errors });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return { handleShippingMethod, shippingMethodResponse, shippingMethodLoading };
}
