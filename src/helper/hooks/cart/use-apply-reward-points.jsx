import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import useCustomerCart from "../customer/use-customer-cart";
import APPLY_REWARD_POINTS from "../../../components/cart/graphql/mutation/apply-reward-points";
import { SET_NOTIFICATION } from "../../../redux/actions";

export default function useApplyRewardPoints() {
  const dispatch = useDispatch();
  const [rewardPointsResponse, setrewardPointsResponse] = useState({});
  const customerCartId = useSelector((state) => state.customerCartId);
  const { cartDetailsRefetch, cartDetailsLoading: cartRewardPointsLoading } = useCustomerCart();
  const [applyRewardPoints, { loading: applyRewardPointsLoading }] =
    useMutation(APPLY_REWARD_POINTS);

  const handleApplyRewardPoints = (amount, setCancelRewards, setShow) => {
    applyRewardPoints({
      skip: !amount,
      variables: {
        cartId: customerCartId,
        amount: parseFloat(amount),
      },
    })
      .then((res) => {
        if (!res?.errors?.length) {
          setrewardPointsResponse(res?.data?.applyRewardPointsOnCart);
          if (res?.data?.applyRewardPointsOnCart?.appliedRewardPoints?.applied) {
            setCancelRewards(false);
            setShow(true);
          } else {
            setCancelRewards(true);
            setShow(true);
          }
          if (customerCartId) cartDetailsRefetch();
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: res?.errors[0]?.message
                ? res?.errors[0]?.message
                : "Error occured while applying the reward points",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    handleApplyRewardPoints,
    applyRewardPointsLoading,
    rewardPointsResponse,
    cartRewardPointsLoading,
  };
}
