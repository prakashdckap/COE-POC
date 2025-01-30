import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import CartItem from "./cart-item";
import Summary from "./summary";
import Heading from "../../theme-files/heading";
import UnorderedList from "../../theme-files/unordered-list";
import Paragraph from "../../theme-files/paragraph";
import constants from "../../helper/constant";
import useClearShoppingCart from "../../helper/hooks/cart/use-clear-shopping-cart";
import LoadingSpinner from "../../helper/loading-spinner";
import { SET_NOTIFICATION } from "../../redux/actions";
import { CheckIcon } from "@heroicons/react/solid";
import DeleteItemModal from "./delete-item-modal";

export default function Cart({ zipFailureData }) {
  const history = useRouter();
  const cartItems = useSelector((state) => state.cartItems);
  const [show, setshow] = useState(false);
  const { clearAllItemsFromCart, clearShoppingCartLoading } = useClearShoppingCart();
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cartDetails);
  const customerCartId = useSelector((state) => state.customerCartId);
  // const handleClearCart = () => {
  //   const productIdArr = cartItems?.map((item) => item?.productId);
  //   if (productIdArr?.length) clearAllItemsFromCart(productIdArr);
  // };

  const layout = constants.themeObj[constants.selectedTheme].cartPage;

  useEffect(() => {
    if (zipFailureData)
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Payment has been canceled.",
          type: "warning",
        })
      );
  }, [zipFailureData]);

  return (
    <div className="bg-white cart-page min-h-[60vh] container mx-auto">
      <div className="pt-0 pb-24 px-0">
        <Heading className="text-2xl font-normal text-skin-base text-center">Shopping Cart</Heading>
        {cartDetails?.appliedRewardPoints?.earnPoints ? (
          <div className="flex mt-8 px-[15px] py-[10 px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full">
            <CheckIcon className="w-5 h-5 mr-[10px]" />
            <span>
              Checkout now and earn{" "}
              <span className="font-bold">
                {cartDetails?.appliedRewardPoints?.earnPoints} Reward Points
              </span>{" "}
              for this order.
              {!customerCartId ? (
                <p> Applies only to registered customers, may vary when logged in.</p>
              ) : (
                ""
              )}
            </span>
          </div>
        ) : (
          ""
        )}

        {cartItems?.length ? (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16 border p-5 md:p-0">
            <section
              aria-labelledby="cart-heading"
              className={`${layout === "half" ? "lg:col-span-8 p-0 md:p-5" : "lg:col-span-12 p-5"}`}
            >
              <UnorderedList className="divide-y divide-gray-200 shopping-cart">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm text-left font-medium  px-2 pt-[20px] pb-[10px] mb-5"
                      >
                        ITEM
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-2 pt-[20px] pb-[10px] mb-5 text-center invisible md:visible"
                      >
                        PRICE
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-2 pt-[20px] pb-[10px] mb-5 text-center invisible md:visible"
                      >
                        QTY
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium px-2 md:px-0 pt-[20px] pb-[10px] mb-5 text-center invisible md:visible"
                      >
                        SUBTOTAL
                      </th>
                    </tr>
                  </thead>
                  {cartItems?.length ? (
                    cartItems?.map(
                      (item) =>
                        item?.product && (
                          <CartItem
                            key={item?.product?.id}
                            image={item?.product?.image?.url}
                            url={item?.product?.customUrl}
                            quantity={item?.quantity}
                            price={item?.product?.priceRange?.minPrice?.finalPrice?.value}
                            name={item?.product?.name}
                            productId={item?.productId}
                            customOptions={item?.customOptions}
                            sku={item?.product?.sku}
                            rowTotal={item?.rowTotal}
                            product={item?.product}
                          />
                        )
                    )
                  ) : (
                    <Paragraph className="text-center font-medium text-lg my-5 text-gray-500">
                      No Items Found
                    </Paragraph>
                  )}
                </table>
              </UnorderedList>

              {/* Buttons */}
              <div className="flex justify-between flex-wrap md:flex-nowrap mt-[20px] md:mt-0">
                <button
                  onClick={() => history.push("/")}
                  type="button"
                  disabled={!cartItems?.length}
                  className="w-full whitespace-no-wrap md:w-auto md:my-5 bg-skin-inverted border-transparent border border-gray-500 shadow-sm py-2 px-4 text-sm font-medium text-skin-base hover:text-skin-inverted hover:bg-skin-primary  disabled:cursor-not-allowed disabled:opacity-50 uppercase"
                >
                  Continue Shopping
                </button>
                <div className="w-full md:w-auto md:flex">
                  <button
                    // onClick={() => handleClearCart()}
                    onClick={() => setshow(true)}
                    type="button"
                    disabled={!cartItems?.length || clearShoppingCartLoading}
                    className="w-full whitespace-no-wrap flex md:w-auto my-5 md:mr-5 md:ml-5 bg-skin-inverted text-center justify-center border-transparent border border-gray-500 shadow-sm py-2 px-4 text-sm font-medium text-skin-base hover:text-skin-inverted hover:bg-skin-primary disabled:cursor-not-allowed disabled:opacity-50 uppercase disabled:pointer-events-none"
                  >
                    {clearShoppingCartLoading ? (
                      <LoadingSpinner message="clearing" />
                    ) : (
                      "Clear Shopping Cart"
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={!cartItems?.length}
                    className="w-full whitespace-no-wrap flex md:w-auto my-5 md:my-5 bg-skin-inverted text-center justify-center border-transparent border border-gray-500 shadow-sm py-2 px-4 text-sm font-medium text-skin-base hover:text-skin-inverted hover:bg-skin-primary disabled:cursor-not-allowed disabled:opacity-50 uppercase disabled:pointer-events-none"
                  >
                    Update Shopping Cart
                  </button>
                </div>
              </div>
            </section>
            {cartItems?.length ? (
              <section
                aria-labelledby="summary-heading"
                className={`mt-16 bg-[#f9f9f9]  p-[20px] lg:mt-0 h-full  w-[100%] ${
                  layout === "half" ? "lg:col-span-4" : "lg:col-span-12"
                }`}
              >
                <Summary />
              </section>
            ) : null}
          </div>
        ) : (
          <>
            <Paragraph className="font-medium text-[14px] my-5 text-gray-500">
              You have no items in your shopping cart.
            </Paragraph>
            <Paragraph className="text-[14px]">
              Click{" "}
              <span className="text-[#a80f16] mx-1 ">
                <Link href="/">here</Link>{" "}
              </span>
              to continue shopping.
            </Paragraph>
          </>
        )}
        <DeleteItemModal show={show} setshow={setshow} />
      </div>
    </div>
  );
}
