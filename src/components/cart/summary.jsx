import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import SubHeading from "../../theme-files/sub-heading";
import Discount from "./discount";
import Reward from "./reward";
import EstimateShipping from "./estimate-shippping";
import Guest from "../guest-login-popup/guest";
import useSetPudoShipping from "../../helper/hooks/use-set-pudo-shipping";
import LoadingSpinner from "../../helper/loading-spinner";
import sezzle from "../../../public/assets/icons/sezzle_icon.svg";
import SezzlePdpModel from "../product-description/SezzlePayModel";
import useAddCoupon from "../../helper/hooks/cart/use-add-coupon";
import useRemoveCoupon from "../../helper/hooks/cart/use-remove-coupon";
import useApplyRewardPoints from "../../helper/hooks/cart/use-apply-reward-points";
import { Gtag_BeginCheckoutEvent } from "../../utils/google-tags/events";

export default function Summary({ promoBanner, cartPage }) {
  const { cartItems, cartDetails, customerToken, selectedState } = useSelector((state) => state);

  const [showguestpopup, setshowguestpopup] = useState(false);
  const [showSezzlePopUp, setShowSezzlePopUp] = useState(false);
  const [adultFee, setAdultFee] = useState(false);
  const [exciseTaxTootip, setExciseTaxTootip] = useState(false);
  const estimateShipping = useSelector((state) => state.estimateShipping);
  const [hostName, setHostName] = useState("");
  const [pudoLoading, setPudoLoading] = useState(false);
  const { handlePickupLocally } = useSetPudoShipping();
  const { handleAddCoupon, applyCouponLoading, addCouponCartDetailsLoading } = useAddCoupon();
  const { handleRemoveCoupon, removeCouponLoading, removeCouponCartDetailsLoading } =
    useRemoveCoupon();
  const { handleApplyRewardPoints, applyRewardPointsLoading, cartRewardPointsLoading } =
    useApplyRewardPoints();

  const handlecheckoutredirection = () => {
    if (customerToken && grandTotal) {
      Gtag_BeginCheckoutEvent(cartItems, grandTotal);
      handlePickupLocally(false, setPudoLoading);
    } else {
      setshowguestpopup(true);
    }
  };

  const [dropdownSelectedData, setdropdownSelectedData] = useState(selectedState);
  const [allowCheckout, setAllowCheckout] = useState(true);
  const [disableCheckout, setDisableCheckout] = useState(false);

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
    cartRules,
  } = cartDetails;

  // not display route shipping code in cart page as per new update in magento
  const displayGrandTotal = (cartPage ? grandTotal - routeShippingProtection : grandTotal).toFixed(
    2
  );

  useEffect(() => {
    // to check whete cart items not exied more than 40 qty & saleQuantity
    const allowButton = cartItems.filter((cartItem) => {
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

  // UseEffect to get the hostName
  useEffect(() => {
    setHostName(`${window.location.protocol}//${window.location.host}/`);
  }, []);

  const getUpdatedBannerLink = (bannerLink) => {
    if (!bannerLink) return "";

    const currentProtocolAndHost = hostName;
    return bannerLink
      .replace(/^https:\/\/staging\.elementvape\.com/, currentProtocolAndHost)
      .replace(/^https:\/\/www\.elementvape\.com/, currentProtocolAndHost);
  };

  return (
    <>
      {cartItems?.length ? (
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
              <Reward
                handleApplyRewardPoints={handleApplyRewardPoints}
                applyRewardPointsLoading={applyRewardPointsLoading}
              />
            </div>
          ) : (
            ""
          )}

          <EstimateShipping
            setdropdownSelectedData={setdropdownSelectedData}
            dropdownSelectedData={dropdownSelectedData}
            setDisableCheckout={setDisableCheckout}
          />
          <dl
            className={`${
              disableCheckout ||
              addCouponCartDetailsLoading ||
              applyCouponLoading ||
              removeCouponCartDetailsLoading ||
              cartRewardPointsLoading ||
              removeCouponLoading
                ? "opacity-50 relative"
                : ""
            } space-y-2 border-t border-[#ebebeb] p-[10px]`}
          >
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
            {cartRules?.length
              ? cartRules?.map((cartrule) => (
                  <div className="flex justify-between">
                    <span className="text-[13px] font-normal text-skin-base capitalize">
                      {cartrule?.ruleName}
                    </span>
                    <span className="text-[13px] font-normal text-[#bd1121]">
                      {cartrule?.ruleAmount ? cartrule?.ruleAmount : "0.00"}
                    </span>
                  </div>
                ))
              : null}
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
            {routeShippingProtection && !cartPage ? (
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

            {estimateShipping?.methodName ? (
              <div className="flex items-center justify-between w-full">
                <dt className="text-[13px] font-normal text-skin-base capitalize break-words w-[166px] ">
                  shipping &#40;{estimateShipping?.description} - ${estimateShipping?.methodName}
                  &#41;{" "}
                </dt>
                <dd className="text-[13px] font-normal text-skin-base capitalize whitespace-pre">
                  &#x24;{estimateShipping?.amount ? estimateShipping?.amount?.toFixed(2) : "0.00"}
                </dd>
              </div>
            ) : (
              ""
            )}
            {exciseTax && dropdownSelectedData?.region?.name ? (
              <div className="flex items-center justify-between">
                <dt className="flex items-center text-[13px] font-normal text-skin-base capitalize">
                  <span className="w-[60%]">
                    Excise Tax ({dropdownSelectedData?.region?.name} vapour tax)
                  </span>
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
                {displayGrandTotal}
              </dd>
            </div>

            {disableCheckout ||
            addCouponCartDetailsLoading ||
            applyCouponLoading ||
            removeCouponCartDetailsLoading ||
            cartRewardPointsLoading ||
            removeCouponLoading ? (
              <div className="absolute top-[32%] right-[50%]">
                <span className="">
                  <i className="fa fa-spinner animate-spin text-[30px]" aria-hidden="true" />
                </span>
              </div>
            ) : null}
          </dl>

          <div className="pb-2.5 border-b border-gray-300 pl-[10px]">
            <div
              className="text-[14px] flex flex-wrap items-center text-[#282828] font-sans"
              onClick={() => setShowSezzlePopUp(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
                  setShowSezzlePopUp(true);
                }
              }}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex="0"
            >
              or 4 interest-free payments of{" "}
              <span className="font-black text-[16.8px] mx-[3px]">
                ${(displayGrandTotal / 4).toFixed(2)}
              </span>{" "}
              with{" "}
              <span className="mr-[8px]">
                <Image height={18} width={72} src={sezzle} alt="Sezzle - Buy now pay later." />
              </span>
              <span onClick={() => setShowSezzlePopUp(true)}>
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
            <Discount
              handleAddCoupon={handleAddCoupon}
              applyCouponLoading={applyCouponLoading}
              handleRemoveCoupon={handleRemoveCoupon}
              removeCouponLoading={removeCouponLoading}
            />
          </div>
          {promoBanner?.length ? (
            promoBanner?.map((banner) => (
              <div className="md:mx-[20px]">
                {banner?.banner_link ? (
                  <a href={getUpdatedBannerLink(banner?.banner_link)}>
                    <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                  </a>
                ) : (
                  <>
                    <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                  </>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
          {allowCheckout && (
            <button
              disabled={!cartItems?.length || disableCheckout || !grandTotal}
              type="button"
              onClick={() => handlecheckoutredirection()}
              className={`${
                pudoLoading ? "flex justify-center" : ""
              } w-full text-skin-inverted text-[13px] leading-[1.35] mt-[20px] bg-skin-secondary hover:bg-skin-button-accent-hover hover:duration-300 py-3 px-[40px] font-medium  uppercase disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {pudoLoading ? <LoadingSpinner message="loading" /> : "Proceed to Checkout"}
            </button>
          )}
        </section>
      ) : (
        ""
      )}
      <Guest showguestpopup={showguestpopup} setshowguestpopup={setshowguestpopup} />
    </>
  );
}
