import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import UPDATE_PRODUCT_IN_WISHLIST from "../../../components/account/graphql/mutation/update-product-in-wishlist";
import useGetCustomerWishlist from "./use-get-customer-wishlist";
import { SET_NOTIFICATION, SET_WISHLIST_SUCCESS } from "../../../redux/actions";

export default function useUpdateWishlistItem() {
  const dispatch = useDispatch();
  const history = useRouter();

  const customerDetails = useSelector((state) => state.customerDetails);
  const { customerWishlistRefetch } = useGetCustomerWishlist();

  const [updateProductInWishlist, { loading: updateProductInWishlistLoading }] = useMutation(
    UPDATE_PRODUCT_IN_WISHLIST
  );

  const handleUpdateWishlistProduct = (items, changeItemsId, customerWishlistResponse) => {
    console.log("🚀 ~ handleUpdateWishlistProduct ~ changeItemsId:", changeItemsId);
    updateProductInWishlist({
      variables: {
        wishlistId: customerDetails?.wishlistId,
        updateItems: items,
      },
    })
      .then((res) => {
        if (!res?.errors?.length) {
          if (!res?.data?.updateItemsInWishlist?.errors?.length) {
            customerWishlistRefetch();
            const updatedProductIds = new Set(changeItemsId || []);
            let updatedProductNames = [];

            if (customerWishlistResponse) {
              customerWishlistResponse?.products.forEach((product) => {
                if (updatedProductIds.has(product.productId)) {
                  updatedProductNames.push(product.product?.name);
                }
              });
            } else {
              res.data.updateItemsInWishlist.wishlist.products.forEach((product) => {
                if (updatedProductIds.has(product.productId)) {
                  updatedProductNames.push(product.product?.name);
                }
              });
            }

            if (updatedProductNames.length > 0) {
              const productNameList = updatedProductNames.join(", ");

              // dispatch(
              //   SET_NOTIFICATION({
              //     status: true,
              //     message: `${productNameList} ${
              //       updatedProductNames.length > 1 ? "have" : "has"
              //     } been updated in your Wish List.`,
              //     type: "success",
              //   })
              // );
              dispatch(
                SET_NOTIFICATION({
                  status: true,
                  message: `Wishlist Has Been Updated Successfully`,
                  type: "success",
                })
              );

              dispatch(
                SET_WISHLIST_SUCCESS({ products: updatedProductNames, option: "updateCart" })
              );
            } else {
              dispatch(
                SET_NOTIFICATION({
                  status: true,
                  message: `Wishlist Has Been Updated Successfully`,
                  type: "success",
                })
              );
            }
            if (history?.pathname !== "/account/my-wishlist") history.push("/account/my-wishlist");
          } else {
            dispatch(
              SET_NOTIFICATION({
                status: true,
                message: res?.data?.updateItemsInWishlist?.errors?.length
                  ? res?.data?.updateItemsInWishlist?.errors[0]?.message
                  : "Error occured while updating product in wishlist",
                type: "warning",
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
    handleUpdateWishlistProduct,
    updateProductInWishlistLoading,
  };
}
