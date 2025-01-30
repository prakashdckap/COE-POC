import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import APPLY_COUPON from "../../../components/cart/graphql/mutation/apply-coupon";
import { SET_CART_SUCCESS, SET_COUPON, SET_ERROR, SET_NOTIFICATION } from "../../../redux/actions";
import useCustomerCart from "../customer/use-customer-cart";
import { scrolltoHash } from "../../notifications/notification";

export default function useAddCoupon() {
  const dispatch = useDispatch();
  const [addCouponResponse, setaddCouponResponse] = useState({});
  const { customerCartId, guestCartId, customerToken } = useSelector((state) => state);
  const { cartDetailsRefetch, cartDetailsLoading: addCouponCartDetailsLoading } = useCustomerCart();
  const [applyCoupon, { loading: applyCouponLoading }] = useMutation(APPLY_COUPON);

  const handleAddCoupon = (coupon, isCart = true) => {
    applyCoupon({
      skip: !coupon,
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
        code: coupon,
      },
    })
      .then((res) => {
        if (!res?.errors?.length) {
          setaddCouponResponse(res?.data?.applyCouponOnCart);
          dispatch(SET_COUPON(true));
          if (customerCartId || guestCartId) cartDetailsRefetch();
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Coupon code added successfully !",
              type: "success",
            })
          );
          dispatch(SET_ERROR([]));
          if (res?.data?.applyCouponOnCart?.coupon?.code) {
            dispatch(
              SET_CART_SUCCESS({
                message: `You used coupon code "${res?.data?.applyCouponOnCart?.coupon?.code}" `,
              })
            );
            isCart && scrolltoHash();
          }
        } else {
          if (res?.errors[0]?.message) {
            dispatch(SET_ERROR(res?.errors));
            isCart && scrolltoHash();
          } else {
            dispatch(
              SET_NOTIFICATION({
                status: true,
                message: "Error occured while removing the coupon",
                type: "error",
              })
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleAddCoupon, applyCouponLoading, addCouponResponse, addCouponCartDetailsLoading };
}
