import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ADD_CART_ITEM_TO_WISHLIST from "../../../components/account/graphql/mutation/add-cart-item-to-wishlist";
// import useGetCustomerWishlist from "./use-get-customer-wishlist";
import {
  SET_NOTIFICATION,
  UPDATE_CART_ITEMS,
  UPDATE_CART_DETAIL,
  UPDATE_CUSTOMER_DETAILS,
  SET_SUCCESS,
} from "../../../redux/actions";
import useCustomerCart from "./use-customer-cart";

export default function useAddCartItemToWishlist() {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);
  const cartId = useSelector((state) => state.customerCartId);
  //   const { customerWishlistRefetch } = useGetCustomerWishlist();
  const { cartDetailsRefetch } = useCustomerCart();

  const [addCartItemToWishlist, { loading: addCartItemToWishlistLoading }] =
    useMutation(ADD_CART_ITEM_TO_WISHLIST);

  const handleAddCartItemToWishlist = (id) => {
    addCartItemToWishlist({
      variables: {
        wishlistId: customerDetails?.wishlistId,
        itemUid: id?.productId,
        cartId,
      },
    })
      .then((res) => {
        if (!res?.data?.addCartItemToWishlist?.errors?.length && !res?.errors?.length) {
          cartDetailsRefetch();

          dispatch(SET_SUCCESS(id?.product?.name));
          dispatch(UPDATE_CART_DETAIL(res?.data?.addCartItemToWishlist?.cart));
          dispatch(UPDATE_CART_ITEMS(res?.data?.addCartItemToWishlist?.cart?.cartItems));
          if (!customerDetails?.wishlistId) {
            dispatch(
              UPDATE_CUSTOMER_DETAILS({
                ...customerDetails,
                wishlistId: res?.data?.addCartItemToWishlist?.wishlistId,
              })
            );
          }
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Wishlist Has Been Updated Successfully",
              type: "success",
            })
          );
        
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: res?.data?.addCartItemToWishlist?.errors?.length
                ? res?.data?.addCartItemToWishlist?.errors[0]?.message
                : "Error occured while adding product to wishlist",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err?.errors);
      });
  };

  return {
    handleAddCartItemToWishlist,
    addCartItemToWishlistLoading,
  };
}
