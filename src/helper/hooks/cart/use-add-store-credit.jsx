import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { SET_STORE_CREDIT, SET_NOTIFICATION } from "../../../redux/actions";
import useCustomerCart from "../customer/use-customer-cart";
import APPLY_STORE_CREDIT from "../../../components/cart/graphql/mutation/apply-store-credit";

export default function useAddStoreCredit() {
  const dispatch = useDispatch();
  const [storeCreditResponse, setstoreCreditResponse] = useState({});
  const customerCartId = useSelector((state) => state.customerCartId);
  const { cartDetailsRefetch } = useCustomerCart();
  const [applyStoreCredit, { loading: applyStoreCreditLoading }] = useMutation(APPLY_STORE_CREDIT);

  const handleApplyStoreCredit = (amount) => {
    applyStoreCredit({
      skip: !amount,
      variables: {
        cartId: customerCartId,
        amount: parseFloat(amount),
      },
    })
      .then((res) => {
        if (!res?.errors?.length) {
          setstoreCreditResponse(res?.data?.applyStoreCreditOnCart);
          dispatch(SET_STORE_CREDIT(res?.data?.applyStoreCreditOnCart));
          if (customerCartId) cartDetailsRefetch();
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Store Credit Applied Successfully!",
              type: "success",
            })
          );
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: res?.errors[0]?.message
                ? res?.errors[0]?.message
                : "Error occured while applying the store credit",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleApplyStoreCredit, applyStoreCreditLoading, storeCreditResponse };
}
