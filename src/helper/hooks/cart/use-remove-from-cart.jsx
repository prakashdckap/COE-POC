import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import REMOVE_FROM_CART from "../../../components/cart/graphql/mutation/remove-from-cart";
import { UPDATE_CART_DETAIL, UPDATE_CART_ITEMS, SET_NOTIFICATION } from "../../../redux/actions";
import useCustomerCart from "../customer/use-customer-cart";

export default function useRemoveFromCart() {
  const dispatch = useDispatch();
  const [response, setresponse] = useState([]);
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const { cartDetailsRefetch } = useCustomerCart();

  const [removeProductFromCart, { loading: removeProductFromCartLoading }] =
    useMutation(REMOVE_FROM_CART);

  const removeFromCart = (productUid, setshow) => {
    removeProductFromCart({
      skip: !productUid,
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
        productUid,
      },
    })
      .then((res) => {
        setresponse(res);
        if (!res?.errors?.length) {
          cartDetailsRefetch();
          const items = res.data?.removeFromCart?.cartItems;
          dispatch(UPDATE_CART_ITEMS(items));
          dispatch(UPDATE_CART_DETAIL(res.data?.removeFromCart));
          setshow(false);
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Item Removed Successfully",
              type: "success",
            })
          );
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message:
                res?.errors?.length &&
                res?.errors[0]?.message &&
                typeof (res?.errors[0]?.message !== "object")
                  ? res?.errors[0]?.message
                  : "Something went wrong",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { removeFromCart, removeProductFromCartLoading, response };
}
