import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ADD_WISHLIST_ITEM_TO_CART from "../../../components/account/graphql/mutation/add-wishlist-item-to-cart";
// import useGetCustomerWishlist from "./use-get-customer-wishlist";
import {
  SET_NOTIFICATION,
  SET_WISHLIST_ERROR,
  SET_WISHLIST_SUCCESS,
  SET_WISHLIST_WARNING,
} from "../../../redux/actions";

import useGetCustomerWishlist from "./use-get-customer-wishlist";
import { useRouter } from "next/router";
import useCustomerCart from "./use-customer-cart";
import { scrolltoHash } from "../../notifications/notification";

export default function useAddWishlistItemToCart() {
  const dispatch = useDispatch();
  const history = useRouter();
  const customerDetails = useSelector((state) => state.customerDetails);
  const cartId = useSelector((state) => state.customerCartId);
  const { customerWishlistRefetch } = useGetCustomerWishlist();
  const { cartDetailsRefetch } = useCustomerCart();

  const [addWishlistItemToCart, { loading: addWishlistItemToCartLoading }] =
    useMutation(ADD_WISHLIST_ITEM_TO_CART);

  const handleAddWishlistItemToCart = (idArr, customerWishlistResponse, getCustomerWishlist) => {
    addWishlistItemToCart({
      variables: {
        wishlistId: customerDetails?.wishlistId,
        itemIds: idArr,
        cartId,
      },
    })
      .then((res) => {
        // if (!res?.data?.addWishlistItemsToCart?.errors?.length && !res?.errors?.length) {
        if (res?.data?.addWishlistItemsToCart) {
          cartDetailsRefetch();
          if (res?.data?.addWishlistItemsToCart?.errors?.length) {
            let errorProductsList = [];

            // to redirect for PDP page of very first product while adding to cart
            res?.data?.addWishlistItemsToCart?.errors.forEach((product) => {
              const wishlistError = customerWishlistResponse?.products?.find(
                (pro) => pro.productId === product?.code
              );

              if (idArr?.length === 1) {
                const query = {
                  isWishlist: true,
                  qty: wishlistError?.quantity || 1,
                  id: product?.code,
                };

                wishlistError?.customOptions?.forEach((option) => {
                  query[option.name] = option.value;
                });

                const redirectUrl = {
                  pathname: `/${wishlistError?.product?.customUrl?.split(".")[0]}`,
                  query,
                };

                dispatch(
                  SET_WISHLIST_WARNING(res?.data?.addWishlistItemsToCart?.errors[0]?.message)
                );

                history.push(redirectUrl);
              } else if (wishlistError?.product?.name) {
                errorProductsList.push({
                  productName: wishlistError?.product?.name,
                  message: product?.message?.replace(".", " for"),
                });
              }
            });

            if (errorProductsList.length > 0) {
              dispatch(SET_WISHLIST_ERROR(errorProductsList));
              scrolltoHash();
            }
          }

          if (res?.data?.addWishlistItemsToCart?.addedProductNames.length) {
            dispatch(
              SET_WISHLIST_SUCCESS({
                products: res?.data?.addWishlistItemsToCart?.addedProductNames,
                count: res?.data?.addWishlistItemsToCart?.addedProductsCount,
                option: "cart",
              })
            );
            dispatch(
              SET_NOTIFICATION({
                status: true,
                message: "Product Added To Cart Successfully",
                type: "success",
              })
            );
          }
        }
        getCustomerWishlist ? getCustomerWishlist() : customerWishlistRefetch();
      })
      .catch((err) => {
        console.log(err?.errors);
      });
  };

  return {
    handleAddWishlistItemToCart,
    addWishlistItemToCartLoading,
  };
}
