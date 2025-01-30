import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Heading from "../../../../theme-files/heading";
import PageLink from "../../../../theme-files/link";
import Paragraph from "../../../../theme-files/paragraph";
import CartItem from "../../../cart/cart-item";
import useCustomerCart from "../../../../helper/hooks/customer/use-customer-cart";
import SummaryContainer from "./summary-container";

function OrderSummary({ ZipMerchantFee, ZipPayemntMethodLoading, estimateShippingLoading }) {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [open, setopen] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const guestCartId = useSelector((state) => state.guestCartId);
  const cartDetails = useSelector((state) => state.cartDetails);
  const customerCartId = useSelector((state) => state.customerCartId);
  const checkoutBillingAddress = useSelector((state) => state.checkoutBillingAddress);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const checkoutShippingMethod = useSelector((state) => state.checkoutShippingMethod);
  const { cartDetailsRefetch } = useCustomerCart();

  useEffect(() => {
    // Calculating the total quantity
    setTotalQuantity(
      cartItems?.length ? cartItems?.reduce((total, item) => total + item.quantity, 0) : 0
    );
  }, [cartItems]);

  useEffect(() => {
    if (!cartItems?.length) {
      if (guestCartId || customerCartId) cartDetailsRefetch();
    }
  }, []);

  return (
    <div className="checkout-summary">
      <div
        className={`bg-[#fff] p-[20px] border border-[#e6e6e6] ${
          ZipPayemntMethodLoading || estimateShippingLoading ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <Heading className="uppercase font-semibold text-[18px] ">Order Summary</Heading>
        <Paragraph className="text-xs text-skin-base pb-[10px] border-b-[1px] border-[#d9d9d9]">
          Please review your items before placing your order
        </Paragraph>
        <div className="flex items-center mt-[10px] mb-[10px] md:mb-0">
          <span className="text-sm font-bold mr-1">{totalQuantity} </span>
          <span className="font-bold text-[13px] text-skin-base">
            {totalQuantity > 1 ? "Items" : "Item"}
          </span>
          <PageLink
            href="/shoppingcart"
            className="pointer text-sm underline text-skin-primary underline-offset-1 ml-5"
          >
            Edit Cart
          </PageLink>
          {!open ? (
            <button type="button" onClick={() => setopen(true)} className="ml-auto">
              <svg
                className="h-5 w-5 ml-[50px] border border-[#000] rounded-full"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={() => setopen(false)} className="ml-auto">
              <svg
                className="h-5 w-5 ml-[50px] border border-[#000] rounded-full"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z" />
              </svg>
            </button>
          )}
        </div>

        <div className="w-full">
          {cartItems?.length && open
            ? cartItems?.map((item) => (
                <CartItem
                  key={item?.product?.id}
                  image={item?.product?.image?.url}
                  url={item?.product?.customUrl}
                  quantity={item?.quantity}
                  price={item?.product?.priceRange?.minPrice?.finalPrice?.value}
                  name={item?.product?.name}
                  rowTotal={item?.rowTotal}
                  isCheckout
                  customOptions={item?.customOptions}
                  product={item?.product}
                  productId={item?.productId}
                />
              ))
            : null}
        </div>

        <div className="w-full mt-3 py-[20px] space-y-[15px] lg:hidden">
          <hr />
          <div className="flex justify-between">
            <span className="text-[14px] font-medium">Cart Subtotal</span>
            <span className="text-[14px] font-bold">
              &#x24;{cartDetails?.subtotal ? cartDetails?.subtotal?.toFixed(2) : "0.00"}
            </span>
          </div>
        </div>

        <div className="hidden lg:block">
          <SummaryContainer ZipMerchantFee={ZipMerchantFee} />
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
