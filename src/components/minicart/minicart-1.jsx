import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import MinicartItems1 from "./minicart-items-1";
import Paragraph from "../../theme-files/paragraph";
import Heading from "../../theme-files/heading";
import UnorderedList from "../../theme-files/unordered-list";
import SubHeading from "../../theme-files/sub-heading";
import Guest from "../guest-login-popup/guest";
import useSetPudoShipping from "../../helper/hooks/use-set-pudo-shipping";
import LoadingSpinner from "../../helper/loading-spinner";
import useSetRouteShiping from "../../helper/hooks/setRouteShippingFee";
import { Gtag_BeginCheckoutEvent } from "../../utils/google-tags/events";

export default function Minicart1({ toggleCart, totalQuantity }) {
  const history = useRouter();
  const { cartItems, cartDetails, displayCart, customerToken } = useSelector((state) => state);

  const [showguestpopup, setshowguestpopup] = useState(false);
  const [pudoLoading, setPudoLoading] = useState(false);
  const { handlePickupLocally } = useSetPudoShipping();
  const { routeShippingFeeUpdate } = useSetRouteShiping();

  const [allowCheckout, setAllowCheckout] = useState(true);

  useEffect(() => {
    // to check whete cart items not exied more than 40 qty & saleQuantity
    const allowButton = cartItems?.filter((cartItem) => {
      if (cartItem?.quantity <= 40) {
        if (Array.isArray(cartItem?.customOptions) && cartItem?.customOptions?.length) {
          if (cartItem?.product?.productType === "bundle") {
            /** to get slectedOption from customOptions for @bundle products */
            if (Array.isArray(cartItem?.product?.bundleProductOptions?.bundleItems?.[0]?.options)) {
              // spread array to get all slected options
              const qtyArray = [];
              cartItem?.product?.bundleProductOptions?.bundleItems?.[0]?.options?.map((item) => {
                // to get selected option from customSelected
                let customSelected = {};
                cartItem?.customOptions?.find((option) => {
                  if (option?.value === item?.uid) customSelected = item;
                  else return null;
                });
                // to get slectedOption from customSelected
                if (customSelected?.uid) {
                  qtyArray.push({
                    ...customSelected,
                    saleQty: customSelected?.product?.sale_qty / customSelected?.quantity,
                  });
                }
              });
              const maxSaleQty = Math.max(...qtyArray.map((opt) => opt.saleQty));
              const minSaleQty = Math.min(...qtyArray.map((opt) => opt.saleQty));
              if (cartItem?.quantity <= minSaleQty) return true;
            }
          } else if (Array.isArray(cartItem?.product?.options)) {
            // spread array to get all slected options
            const qtyArray = [];
            cartItem?.product?.options?.map((item) => {
              // to get selected parent option
              const customOptions = cartItem?.customOptions?.find(
                (option) => option?.code === item?.attributeCode
              );

              // to get slectedOption from customOptions
              const selectedOption =
                customOptions &&
                item?.attributeOptions?.find(
                  (optionSelected) => optionSelected?.optionCode === customOptions?.value
                );
              if (customOptions && selectedOption) {
                qtyArray.push(selectedOption);
              }
            });
            const maxSaleQty = Math.max(...qtyArray.map((opt) => opt.saleQty));
            const minSaleQty = Math.min(...qtyArray.map((opt) => opt.saleQty));
            if (cartItem?.quantity <= minSaleQty) return true;
          }
        } else if (cartItem?.quantity <= cartItem?.product?.saleQty) {
          return true;
        }
      }
    });
    const showButton = allowButton?.length === cartItems?.length;
    setAllowCheckout(showButton);
  }, [cartItems]);

  const handlecheckoutredirection = () => {
    if (customerToken && allowCheckout && cartDetails?.subtotal) {
      Gtag_BeginCheckoutEvent(cartItems, cartDetails?.subtotal);
      handlePickupLocally(false, setPudoLoading);
    } else {
      setshowguestpopup(true);
    }
  };

  const cartProducts = cartItems?.map(
    (item) =>
      item?.product && (
        <MinicartItems1
          key={item?.product?.id}
          image={item?.product?.image?.url}
          url={item?.product?.customUrl}
          quantity={item?.quantity}
          price={item?.product?.priceRange?.minPrice?.finalPrice?.value}
          name={item?.product?.name}
          productId={item?.productId}
          cartItem={item}
          customOptions={item?.customOptions}
          rowTotal={item?.rowTotal}
          toggleCart={toggleCart}
          allowCheckout={allowCheckout}
        />
      )
  );

  const handleUrlClick = (event) => {
    if (event.ctrlKey || event.metaKey) {
      window.open("/shoppingcart", "_blank");
    } else {
      toggleCart();
      history?.push("/shoppingcart");
    }
  };

  return (
    <div className="flow-root text-sm lg:relative z-[99999]">
      {displayCart && (
        <div className="absolute w-[320px] top-[55px] lg:inset-x-0 right-0 md bg-white lg:top-2  lg:right-0 lg:mt-3 lg:-mr-1.5 lg:ring-1 lg:ring-black lg:ring-opacity-5 z-50 mini-cart md:w-[400px] lg:w-[400px] flow-root-minicart">
          <Heading className="pl-4 py-3 border-b text-sm font-bold uppercase">
            <p className="text-skin-secondary">
              your cart <span className="ml-2 mr-1 text-skin-base">{totalQuantity || null}</span>
              {cartItems?.length ? (
                <span className="font-normal text-skin-base">
                  {totalQuantity > 1 ? "items" : "item"}
                </span>
              ) : (
                ""
              )}
            </p>
          </Heading>
          <UnorderedList className="pb-6 px-4 sm:px-4 lg:px-4 max-h-72 overflow-y-scroll no-scrollbar h-auto">
            {cartItems?.length ? (
              cartProducts?.reverse()
            ) : (
              <Paragraph className="text-center text-sm font-medium my-5 text-[#737373]">
                You have no items in your shopping cart.
              </Paragraph>
            )}
          </UnorderedList>
          {totalQuantity > 0 ? (
            <div className="bg-[#f5f5f5] pb-6 px-4 sm:px-4 lg:px-5">
              <div className="max-w-2xl mx-auto flex justify-between content-center py-3">
                <SubHeading className="text-sm text-[#686770] uppercase font-semibold text-center">
                  Cart SubTotal :
                </SubHeading>
                <SubHeading
                  className="font-bold text-center text-skin-secondary text-[18px] md:text-lg"
                  role="link"
                  tabIndex="0"
                >
                  &#x24;{cartDetails?.subtotal ? cartDetails?.subtotal?.toFixed(2) : "0.00"}
                </SubHeading>
              </div>

              <div className="max-w-2xl flex content-center mx-auto ">
                <button
                  disabled={!cartItems?.length}
                  type="button"
                  className="w-[50%] mr-2 font-semibold text-xs text-center uppercase border border-[#979797] hover:border-skin-secondary px-2 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleUrlClick}
                >
                  View Cart
                </button>
                {allowCheckout ? (
                  <button
                    onClick={() => {
                      handlecheckoutredirection();
                    }}
                    type="button"
                    disabled={!cartItems?.length || !allowCheckout || !cartDetails?.subtotal}
                    className={`${
                      pudoLoading ? "pl-[35px]" : ""
                    } w-[50%] border border-transparent shadow-sm text-xs font-normal text-white px-2 py-2 hover:bg-white hover:border-black hover:text-skin-base disabled:cursor-not-allowed disabled:opacity-50 uppercase bg-skin-secondary`}
                  >
                    {pudoLoading ? <LoadingSpinner message="loading" /> : "Checkout"}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      <Guest showguestpopup={showguestpopup} setshowguestpopup={setshowguestpopup} />
    </div>
  );
}

Minicart1.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  totalQuantity: PropTypes.number.isRequired,
};
