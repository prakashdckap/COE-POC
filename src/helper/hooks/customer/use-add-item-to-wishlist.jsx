import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ADD_PRODUCT_TO_WISHLIST from "../../../components/account/graphql/mutation/add-product-to-wishlist";
// import useGetCustomerWishlist from "./use-get-customer-wishlist";
import { SET_NOTIFICATION, UPDATE_CUSTOMER_DETAILS } from "../../../redux/actions";
import useCustomerCart from "./use-customer-cart";

export default function useAddItemToWishlist() {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);
  //   const { customerWishlistRefetch } = useGetCustomerWishlist();
  const { cartDetailsRefetch } = useCustomerCart();

  const [addProductToWishlist, { loading: addProductToWishlistLoading }] =
    useMutation(ADD_PRODUCT_TO_WISHLIST);

  const handleAddProductToWishlist = (items, productName) => {
    addProductToWishlist({
      variables: {
        wishlistId: customerDetails?.wishlistId,
        items,
      },
    })
      .then((res) => {
        if (!res?.data?.addItemsToWishlist?.errors?.length && !res?.errors?.length) {
          if (!customerDetails?.wishlistId) {
            dispatch(
              UPDATE_CUSTOMER_DETAILS({
                ...customerDetails,
                wishlistId: res?.data?.addItemsToWishlist?.wishlist?.id,
              })
            );
          }
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: productName
                ? `${productName} has been added to your Wish List`
                : "Wishlist Has Been Updated Successfully",
              type: "success",
            })
          );
        } else {
          cartDetailsRefetch();
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: res?.data?.addItemsToWishlist?.errors?.length
                ? res?.data?.addItemsToWishlist?.errors[0]?.message
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
    handleAddProductToWishlist,
    addProductToWishlistLoading,
  };
}
