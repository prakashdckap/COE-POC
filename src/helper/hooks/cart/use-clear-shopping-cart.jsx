import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import CLEAR_SHOPPING_CART from "../../../components/cart/graphql/mutation/clear-shopping-cart";
import { UPDATE_CART_DETAIL, UPDATE_CART_ITEMS, SET_NOTIFICATION } from "../../../redux/actions";
import useCustomerCart from "../customer/use-customer-cart";

export default function useClearShoppingCart() {
  const dispatch = useDispatch();
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const { cartDetailsRefetch } = useCustomerCart();

  const [clearShoppingCart, { loading: clearShoppingCartLoading }] =
    useMutation(CLEAR_SHOPPING_CART);

  const clearAllItemsFromCart = (productIdArr, setshow) => {
    clearShoppingCart({
      skip: !productIdArr.length,
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
        productUid: productIdArr,
      },
    })
      .then((res) => {
        if (res.data?.clearProductsFromCart && !res.data?.clearProductsFromCart?.length) {
          setshow(false);
          setTimeout(() => {
            cartDetailsRefetch();
          }, 2000);
          dispatch(UPDATE_CART_ITEMS([]));
          dispatch(UPDATE_CART_DETAIL({}));
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Shopping Cart Cleared Successfully",
              type: "success",
            })
          );
        } else {
          setshow(false);
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message:
                res?.errors?.length &&
                res?.errors[0]?.message &&
                typeof (res?.errors[0]?.message !== "object")
                  ? res?.errors[0]?.message
                  : "Error occured while clearing shopping cart",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setshow && setshow(false);
      });
  };

  return { clearAllItemsFromCart, clearShoppingCartLoading };
}
