import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import REMOVE_PRODUCT_FROM_WISHLIST from "../../../components/account/graphql/mutation/remove-product-from-wishlist";
import useGetCustomerWishlist from "./use-get-customer-wishlist";
import { SET_NOTIFICATION } from "../../../redux/actions";

export default function useRemoveItemFromWishlist(customerWishlistRefetch) {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);

  const [removeProductFromWishlist, { loading: removeProductFromWishlistLoading }] = useMutation(
    REMOVE_PRODUCT_FROM_WISHLIST
  );

  const handleRemoveProductFromWishlist = (itemIds) => {
    removeProductFromWishlist({
      variables: {
        wishlistId: customerDetails?.wishlistId,
        itemIds,
      },
    })
      .then((res) => {
        if (!res?.errors?.length) {
          if (!res?.data?.removeItemsFromWishlist?.errors?.length) {
            customerWishlistRefetch();
            dispatch(
              SET_NOTIFICATION({
                status: true,
                message: "Product Removed From Wishlist Successfully",
                type: "success",
              })
            );
          } else {
            dispatch(
              SET_NOTIFICATION({
                status: true,
                message: res?.data?.removeItemsFromWishlist?.errors?.length
                  ? res?.data?.removeItemsFromWishlist?.errors[0]?.message
                  : "Error occured while removing product from wishlist",
                type: "error",
              })
            );
          }
        }
      })
      .catch((err) => {
        console.log(err?.errors);
      });
  };

  return {
    handleRemoveProductFromWishlist,
    removeProductFromWishlistLoading,
  };
}
