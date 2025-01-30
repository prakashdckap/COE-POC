import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import LoadingSpinner from "../../../helper/loading-spinner";
import SezzlePdpModel from "../../product-description/SezzlePayModel";
import SubHeading from "../../../theme-files/sub-heading";
import Reward from "../../cart/reward";
import EstimateShipping from "../../cart/estimate-shippping";
import sezzle from "../../../../public/assets/icons/sezzle_icon.svg";
import Discount from "../../cart/discount";
import useSetPudoShipping from "../../../helper/hooks/use-set-pudo-shipping";
import useSetRouteShiping from "../../../helper/hooks/setRouteShippingFee";
import { Gtag_BeginCheckoutEvent } from "../../../utils/google-tags/events";

export const CartSummary = () => {
  const {
    cartDetails,
    customerToken,
    selectedState,
    routeShippingValue,
    guestCartId,
    customerCartId,
  } = useSelector((state) => state);

  const [showSezzlePopUp, setShowSezzlePopUp] = useState(false);
  const [adultFee, setAdultFee] = useState(false);
  const [exciseTaxTootip, setExciseTaxTootip] = useState(false);
  const estimateShipping = useSelector((state) => state.estimateShipping);
  const [pudoLoading, setPudoLoading] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const [dropdownSelectedData, setdropdownSelectedData] = useState(selectedState);
  const [allowCheckout, setAllowCheckout] = useState(true);
  const [disableCheckout, setDisableCheckout] = useState(false);
  const { handlePickupLocally } = useSetPudoShipping();
  const { routeShippingFeeUpdate } = useSetRouteShiping();

  const {
    subtotal,
    grandTotal,
    coupon,
    discountAmount,
    taxAmount,
    exciseTax,
    adultSignatureFee,
    routeShippingProtection,
    shippingMethod,
    appliedRewardPoints,
  } = cartDetails;

  useEffect(() => {
    // to check whete cart items not exied more than 40 qty
    const allowButton = !cartItems?.some((product) => product?.quantity > 40);
    setAllowCheckout(allowButton);
  }, [cartItems]);

  const handlecheckoutredirection = () => {
    if (customerToken && grandTotal) {
      Gtag_BeginCheckoutEvent(cartItems, grandTotal);
      handlePickupLocally(false, setPudoLoading);
    }
  };

  return (
    <section aria-labelledby="summary-heading" className="lg:col-span-5">
      <SezzlePdpModel isOpen={showSezzlePopUp} onClose={() => setShowSezzlePopUp(false)} />
      <SubHeading
        id="summary-heading"
        className="text-[14px] font-medium text-[#282828] uppercase mt-[21px] mb-[14px] leading-[1.35]"
      >
        Summary
      </SubHeading>
      {customerToken ? (
        <div className="">
          <Reward />
        </div>
      ) : (
        ""
      )}

      <EstimateShipping
        setdropdownSelectedData={setdropdownSelectedData}
        dropdownSelectedData={dropdownSelectedData}
        setDisableCheckout={setDisableCheckout}
      />

      <dl className="space-y-2 border-t border-[#ebebeb] p-[10px]">
        <div className="flex items-center justify-between">
          <dt className="text-[13px] font-normal text-skin-base capitalize">Subtotal</dt>
          <dd className="text-[13px] font-normal text-skin-base capitalize">
            &#x24;{subtotal?.toFixed(2)}
          </dd>
        </div>
        {customerToken ? (
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-normal text-skin-base capitalize">You Earn</dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize">
              {appliedRewardPoints?.earnPoints || 0} Reward Points
            </dd>
          </div>
        ) : (
          ""
        )}

        {appliedRewardPoints?.spentPoints ? (
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-normal text-skin-base capitalize">You Spend</dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize">
              {appliedRewardPoints?.spentPoints || 0} Reward Points
            </dd>
          </div>
        ) : null}

        {adultSignatureFee ? (
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-normal text-skin-base capitalize">
              Adult Signature Service
              <div
                role="link"
                tabIndex="0"
                onClick={() => {
                  setAdultFee(!adultFee);
                }}
                onKeyDown={() => {
                  setAdultFee(!adultFee);
                }}
                onBlur={() => {
                  setAdultFee(false);
                }}
                style={{ padding: "3px 8px" }}
                className={`relative border border-[#bbb] hover:border-[#333] rounded-full whitespace-pre inline-block items-center group font-semibold text-[#a8a8a8] hover:text-[#333] text-xs ml-2.5 cursor-pointer ${
                  adultFee ? "focus:text-[#333] focus:border-[#333]" : ""
                }`}
              >
                ?
                {adultFee ? (
                  <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] border-[#bbb] border-solid text-xs w-[210px] py-[12px] px-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted h-auto flex font-medium  top-8 -right-5  before:content-[''] before:absolute before:top-[-1px] before:right-6 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-b-0 before:border-t before:border-r-0 before:rotate-45">
                    <span>
                      All orders will require Adult Signature Service. See Help Center for more
                      details
                    </span>
                  </div>
                ) : null}
              </div>
            </dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize">
              &#x24;{adultSignatureFee?.toFixed(2)}
            </dd>
          </div>
        ) : (
          ""
        )}
        {routeShippingProtection ? (
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-normal text-skin-base capitalize">
              Route Shipping Protection
            </dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize">
              &#x24;{routeShippingProtection?.toFixed(2)}
            </dd>
          </div>
        ) : (
          ""
        )}
        {/** @only display for guest users*/}
        {routeShippingValue && !customerToken && !customerCartId && guestCartId ? (
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-normal text-skin-base capitalize">
              Route Shipping Protection
            </dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize">
              &#x24;{routeShippingValue?.toFixed(2)}
            </dd>
          </div>
        ) : (
          ""
        )}
        {estimateShipping?.amount ? (
          <div className="flex items-center justify-between w-full">
            <dt className="text-[13px] font-normal text-skin-base capitalize break-words w-[70%] ">
              shipping{" "}
              {estimateShipping?.amount
                ? `(${estimateShipping?.description} -  ${estimateShipping?.methodName})`
                : null}
            </dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize whitespace-pre">
              &#x24;{estimateShipping?.amount ? estimateShipping?.amount?.toFixed(2) : "0.00"}
            </dd>
          </div>
        ) : (
          ""
        )}

        {taxAmount ? (
          <div className="flex items-center justify-between">
            <dt className="flex text-[13px] font-normal text-skin-base capitalize">
              <span>Sales Tax</span>
              <button
                type="button"
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Learn more about how tax is calculated</span>
              </button>
            </dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize">
              &#x24;{taxAmount ? taxAmount?.toFixed(2) : "0.00"}
            </dd>
          </div>
        ) : (
          ""
        )}

        {exciseTax && selectedState?.region?.name ? (
          <div className="flex items-center justify-between">
            <dt className="flex items-center text-[13px] font-normal text-skin-base capitalize">
              <span className="w-[60%]">Excise Tax ({selectedState?.region?.name} vapour tax)</span>
              <div
                role="link"
                tabIndex="0"
                onClick={() => {
                  setExciseTaxTootip(!exciseTaxTootip);
                }}
                onKeyDown={() => {
                  setExciseTaxTootip(!exciseTaxTootip);
                }}
                onBlur={() => {
                  setExciseTaxTootip(false);
                }}
                style={{ padding: "3px 8px" }}
                className={`relative border border-[#bbb] hover:border-[#333] rounded-full whitespace-pre inline-block items-center group font-semibold text-[#a8a8a8] hover:text-[#333] text-xs ml-2.5 cursor-pointer ${
                  exciseTaxTootip ? "focus:text-[#333] focus:border-[#333]" : ""
                }`}
              >
                ?
                {exciseTaxTootip ? (
                  <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] border-[#bbb] border-solid text-xs w-[210px] py-[12px] px-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted h-auto flex font-medium  top-8 -right-5  before:content-[''] before:absolute before:top-[-1px] before:right-6 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-b-0 before:border-t before:border-r-0 before:rotate-45">
                    <span>Vape products are subject to Excise Tax in your State</span>
                  </div>
                ) : null}
              </div>
            </dt>
            <dd className="text-[13px] font-normal text-skin-base capitalize">
              &#x24;{exciseTax ? exciseTax?.toFixed(2) : "0.00"}
            </dd>
          </div>
        ) : (
          ""
        )}

        {cartDetails?.appliedStoreCredit?.creditUsed ? (
          <div className="flex justify-between mt-3">
            <span className="text-[13px] font-normal text-skin-base capitalize">Store Credit</span>
            <span className="text-[13px] font-normal text-[#bd1121]">
              -&#x24;
              {cartDetails?.appliedStoreCredit?.creditAmount
                ? `${Number(cartDetails?.appliedStoreCredit?.creditAmount).toFixed(2)}`
                : "0.00"}
            </span>
          </div>
        ) : null}

        {cartDetails?.discounts?.length
          ? cartDetails?.discounts?.map((discount) => (
              <div key={discount?.code} className="flex justify-between mt-3">
                <span className="text-[13px] font-normal text-skin-base capitalize">
                  {discount?.code}
                </span>
                <span className="text-[13px] font-normal text-[#bd1121]">
                  -&#x24;
                  {discount?.discountedAmount
                    ? `${Number(discount?.discountedAmount).toFixed(2)}`
                    : "0.00"}
                </span>
              </div>
            ))
          : null}

        <div className="flex items-center justify-between pt-5">
          <dt className="text-[13px] font-normal text-skin-base capitalize">Order total</dt>
          <dd className="text-[13px] font-bold text-skin-base capitalize">
            &#x24;
            {(
              grandTotal +
              (estimateShipping?.amount ? estimateShipping?.amount : 0) -
              shippingMethod?.amount
            ).toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="pb-2.5 border-b border-gray-300 pl-[10px]">
        <div
          className="text-[14px] flex flex-wrap items-center text-[#282828] font-sans"
          onClick={() => setShowSezzlePopUp(true)}
          onKeyUp={() => setShowSezzlePopUp(true)}
          style={{ cursor: "pointer" }}
        >
          or 4 interest-free payments of{" "}
          <span className="font-black text-[16.8px] mx-[3px]">
            $
            {(
              (grandTotal +
                (estimateShipping?.amount ? estimateShipping?.amount : 0) -
                shippingMethod?.amount) /
              4
            ).toFixed(2)}
          </span>{" "}
          with{" "}
          <span className="mr-[8px]">
            <Image height={18} width={72} src={sezzle} alt="Sezzle - Buy now pay later." />
          </span>
          <span
            role="button"
            onClick={() => setShowSezzlePopUp(true)}
            onKeyUp={() => setShowSezzlePopUp(true)}
            tabIndex="0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="19"
              viewBox="0 0 24 24"
              fill="#282828"
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Apply Discount Component */}
      <div className="">
        <Discount />
      </div>
      {allowCheckout && (
        <button
          disabled={!cartItems?.length || disableCheckout}
          type="button"
          onClick={() => handlecheckoutredirection()}
          className={`${
            pudoLoading ? "pl-[75px]" : ""
          } w-full text-skin-inverted text-[13px] leading-[1.35] mt-[20px] bg-skin-secondary hover:bg-skin-button-accent-hover hover:duration-300 py-3 px-[40px] font-medium  uppercase disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {pudoLoading ? <LoadingSpinner message="loading" /> : "Proceed to Checkout"}
        </button>
      )}
    </section>
  );
};
