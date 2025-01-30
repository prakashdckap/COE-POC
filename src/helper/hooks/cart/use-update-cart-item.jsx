import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import UPDATE_CART_ITEM from "../../../components/cart/graphql/mutation/update-cart-item";
import { UPDATE_CART_DETAIL, UPDATE_CART_ITEMS, SET_NOTIFICATION } from "../../../redux/actions";

export default function useUpdateCartItem() {
  const dispatch = useDispatch();
  const [response, setresponse] = useState([]);
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const history = useRouter();

  const [updateProductInCart, { loading: updateProductInCartLoading }] =
    useMutation(UPDATE_CART_ITEM);

  const updateCartItem = (cartItems, name) => {
    updateProductInCart({
      fetchPolicy: "no-cache",
      skip: !cartItems,
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
        updateItems: cartItems,
      },
    })
      .then((res) => {
        setresponse(res);
        if (!res?.errors?.length) {
          const items = res.data?.updateCart?.cartItems;
          dispatch(UPDATE_CART_ITEMS(items));
          dispatch(UPDATE_CART_DETAIL(res.data?.updateCart));
          if (history?.query?.isEditCart) {
            history?.push("/shoppingcart");
          }
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: name
                ? `${name} was updated in your shopping cart`
                : "Quantity updated successfully",
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
                  ? errorMessageReplace(res?.errors[0]?.message)
                  : "Something went wrong",
              type: "warning",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorMessageReplace = (message) => {
    if (
      message.match("The requested qty is not available") ||
      message.match("The requested qty exceeds the maximum qty")
    ) {
      return "The requested qty is not available";
    }
    return message;
  };

  return { updateCartItem, updateProductInCartLoading, response };
}
