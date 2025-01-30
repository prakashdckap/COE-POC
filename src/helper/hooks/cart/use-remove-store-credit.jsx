import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { SET_NOTIFICATION, SET_STORE_CREDIT } from "../../../redux/actions";
import useCustomerCart from "../customer/use-customer-cart";
import REMOVE_STORE_CREDIT from "../../../components/cart/graphql/mutation/remove-store-credit";

export default function useRemoveStoreCredit() {
  const dispatch = useDispatch();
  const [removeStoreCreditResponse, setremoveStoreCreditResponse] = useState({});
  const customerCartId = useSelector((state) => state.customerCartId);
  const { cartDetailsRefetch } = useCustomerCart();
  const [removeStoreCredit, { loading: removeStoreCreditLoading }] =
    useMutation(REMOVE_STORE_CREDIT);

  const handleRemoveStoreCredit = () => {
    removeStoreCredit({
      skip: !customerCartId,
      variables: {
        cartId: customerCartId,
      },
    })
      .then((res) => {
        if (!res?.errors?.length) {
          setremoveStoreCreditResponse(res?.data?.removeStoreCreditFromCart);
          if (customerCartId) cartDetailsRefetch();
          dispatch(SET_STORE_CREDIT({}));
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Store credit removed successfully !",
              type: "success",
            })
          );
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: res?.errors[0]?.message
                ? res?.errors[0]?.message
                : "Error occured while removing the store credit",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleRemoveStoreCredit, removeStoreCreditLoading, removeStoreCreditResponse };
}
