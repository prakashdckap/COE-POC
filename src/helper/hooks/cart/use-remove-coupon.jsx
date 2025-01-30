import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import REMOVE_COUPON from "../../../components/cart/graphql/mutation/remove-coupon";
import { SET_NOTIFICATION, SET_COUPON } from "../../../redux/actions";
import useCustomerCart from "../customer/use-customer-cart";

export default function useRemoveCoupon() {
  const dispatch = useDispatch();
  const [removeCouponResponse, setremoveCouponResponse] = useState({});
  const { customerCartId, guestCartId, customerToken } = useSelector((state) => state);
  const { cartDetailsRefetch,cartDetailsLoading: removeCouponCartDetailsLoading } = useCustomerCart();
  const [removeCoupon, { loading: removeCouponLoading }] = useMutation(REMOVE_COUPON);

  const handleRemoveCoupon = () => {
    removeCoupon({
      skip: !customerCartId && !guestCartId,
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
      },
    })
      .then((res) => {
        if (!res?.errors?.length) {
          setremoveCouponResponse(res?.data?.removeCouponFromCart);
          if (customerCartId || guestCartId) cartDetailsRefetch();
          dispatch(SET_COUPON(false));
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Coupon code removed successfully !",
              type: "success",
            })
          );
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: res?.errors[0]?.message
                ? res?.errors[0]?.message
                : "Error occured while removing the coupon",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleRemoveCoupon, removeCouponLoading, removeCouponResponse, removeCouponCartDetailsLoading };
}
