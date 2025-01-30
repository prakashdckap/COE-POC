import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReplyIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

import MyWishlistProduct from "./my-wishlist-product";
import useGetCustomerWishlist from "../../helper/hooks/customer/use-get-customer-wishlist";
import useUpdateWishlistItem from "../../helper/hooks/customer/use-update-wishlist-item";
import LoadingSpinner from "../../helper/loading-spinner";
import { SET_NOTIFICATION } from "../../redux/actions";
import useAddWishlistItemToCart from "../../helper/hooks/customer/use-add-wishlist-item-to-cart";
import useRemoveItemFromWishlist from "../../helper/hooks/customer/use-remove-item-from-wishlist";
import PaginationTwo from "../../helper/pagination-two";

export default function MyWishlist() {
  const dispatch = useDispatch();
  const history = useRouter();

  const [qtyObj, setqtyObj] = useState([]);
  const [wishlistItems, setwishlistItems] = useState([]);
  const [qtyStockError, setQtyStockError] = useState([]);
  const [currentPage, setcurrentPage] = useState(history?.query?.p ? Number(history.query.p) : 1);
  const [contentLimit, setcontentLimit] = useState(10);

  const contentLimitArr = [10, 20, 50];

  useEffect(() => {
    setcurrentPage(history?.query?.p ? Number(history.query.p) : 1);
  }, [contentLimit]);

  const totalCount = wishlistItems?.itemsCount || 0;
  const pageCount = Math.ceil(totalCount / contentLimit);

  const { customerWishlistResponse, customerWishlistRefetch, customerWishlistLoading } =
    useGetCustomerWishlist(currentPage, contentLimit);
  const { handleUpdateWishlistProduct, updateProductInWishlistLoading } = useUpdateWishlistItem();

  const { handleRemoveProductFromWishlist, removeProductFromWishlistLoading } =
    useRemoveItemFromWishlist(customerWishlistRefetch);

  const { handleAddWishlistItemToCart, addWishlistItemToCartLoading } = useAddWishlistItemToCart();

  useEffect(() => {
    !addWishlistItemToCartLoading && customerWishlistRefetch();
  }, [currentPage, contentLimit]);

  useEffect(() => {
    if (customerWishlistResponse?.id) {
      setwishlistItems(customerWishlistResponse);
      if (customerWishlistResponse?.pageInfo?.totalPages < currentPage) {
        history.push("/account/my-wishlist?p=" + customerWishlistResponse?.pageInfo?.totalPages);
        setcurrentPage(customerWishlistResponse?.pageInfo?.totalPages);
      }
    }
    setqtyObj(
      customerWishlistResponse?.products?.map((product) => ({
        productId: product?.productId,
        quantity: product?.quantity,
        comments: product?.comments,
        customOptions: product?.customOptions?.map((item) => ({
          code: item?.code,
          value: item?.value,
        })),
      }))
    );
  }, [
    customerWishlistResponse,
    addWishlistItemToCartLoading,
    removeProductFromWishlistLoading,
    updateProductInWishlistLoading,
  ]);

  const handleUpdateWishlist = () => {
    const changedArr = [];
    const isTrue = false;
    let changeItemsId = [];
    qtyObj?.map((item) => {
      customerWishlistResponse?.products?.map((product) => {
        if (product.productId === item?.productId) {
          if (product?.quantity !== item?.quantity || product?.comments !== item?.comments) {
            if (!qtyStockError?.length) {
              let changedObj = {};
              changeItemsId = [...changeItemsId, item?.productId];
              changedObj = {
                productId: item?.productId,
                comments: item?.comments || "",
                quantity: item?.quantity,
                customOptions: item?.customOptions?.map((option) => ({
                  code: option?.code,
                  value: option?.value,
                })),
              };
              changedArr.push(changedObj);
            }
          }
        }
        return null;
      });
      return null;
    });

    if (!changedArr?.length && !qtyStockError?.length) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message:
            "No changes were made for the wishlist. Make some changes to update the wishlist.",
          type: "warning",
        })
      );
    } else {
      handleUpdateWishlistProduct(changedArr, changeItemsId, customerWishlistResponse);
    }
  };

  const handleAddAllToCart = () => {
    const idArr = customerWishlistResponse?.products?.map((item) => item?.productId);
    if (idArr?.length)
      handleAddWishlistItemToCart([], customerWishlistResponse, customerWishlistRefetch);
  };

  return (
    <>
      {wishlistItems?.products?.length ? (
        <PaginationTwo
          totalCount={totalCount}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
          contentLimit={contentLimit}
          setcontentLimit={setcontentLimit}
          contentLimitArr={contentLimitArr}
          pageCount={pageCount}
          productCount={customerWishlistResponse?.itemsCount}
        />
      ) : null}

      <div className="border p-5 mt-4">
        {customerWishlistLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner /> <span className="ml-2 text-[#282828] text-sm">Loading...</span>
          </div>
        ) : (
          <div
            className={`${
              updateProductInWishlistLoading ||
              addWishlistItemToCartLoading ||
              customerWishlistLoading ||
              removeProductFromWishlistLoading
                ? "opacity-40 pointer-events-none"
                : null
            } flex flex-wrap`}
          >
            {wishlistItems?.products?.length ? (
              wishlistItems?.products?.map((product) => (
                <MyWishlistProduct
                  product={product}
                  key={product?.productId}
                  productId={product?.productId}
                  qtyObj={qtyObj}
                  setqtyObj={setqtyObj}
                  customOptions={product?.customOptions}
                  handleRemoveProductFromWishlist={handleRemoveProductFromWishlist}
                  removeProductFromWishlistLoading={removeProductFromWishlistLoading}
                  customerWishlistResponse={customerWishlistResponse}
                  handleUpdateWishlist={handleUpdateWishlist}
                  qtyStockError={qtyStockError}
                  setQtyStockError={setQtyStockError}
                  customerWishlistRefetch={customerWishlistRefetch}
                />
              ))
            ) : (
              <p className="text-center font-medium text-lg my-5 text-gray-500">No Items Found</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 md:flex md:justify-between md:items-center block ">
        <div className="flex lg:items-center flex-col md:flex-row md:inline-flex">
          <button
            disabled={!wishlistItems?.products?.length}
            onClick={() => history.push("/account/share-wishlist")}
            type="button"
            className="button wishlist-btn hover:border hover:border-[#a80f16] md:w-auto w-full border-[1px] border-black py-1.5 px-[15px] mb-3 md:mb-0  md:ml-3 bg-[#fff] text-black hover:opacity-90  text-skin-inverted uppercase hover:bg-black hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-center"
          >
            Share Wish list
          </button>

          <button
            type="button"
            onClick={() => handleAddAllToCart()}
            disabled={!wishlistItems?.products?.length}
            className={`${
              addWishlistItemToCartLoading ? "flex items-center justify-center md:block" : null
            } button wishlist-btn hover:border hover:border-[#a80f16] md:w-auto w-full border-[1px] border-black py-1.5 px-[15px] mb-3 md:mb-0  md:ml-3 bg-[#fff] text-black hover:opacity-90  text-skin-inverted uppercase hover:bg-black hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-center`}
          >
            {addWishlistItemToCartLoading ? <LoadingSpinner message="adding" /> : "Add All To Cart"}
          </button>
        </div>
        <div>
          <button
            type="button"
            className="items-center w-full md:w-[86px] px-1 py-1 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
            onClick={() => history.push("/account")}
          >
            <i className="h-5 w-4 inline-block align-middle">
              <ReplyIcon />
            </i>{" "}
            Back
          </button>
        </div>
      </div>

      {wishlistItems?.products?.length ? (
        <PaginationTwo
          totalCount={totalCount}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
          contentLimit={contentLimit}
          setcontentLimit={setcontentLimit}
          contentLimitArr={contentLimitArr}
          pageCount={pageCount}
          productCount={customerWishlistResponse?.products?.length}
        />
      ) : null}
    </>
  );
}
