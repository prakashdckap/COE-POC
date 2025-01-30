import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UseRegionList from "../../../../helper/hooks/use-region-list";

function OrderDetails({
  ZipMerchantFee,
  addCouponCartDetailsLoading,
  removeCouponCartDetailsLoading,
  cartRewardPointsLoading,
  applyRewardPointsLoading,
  applyCouponLoading,
  removeCouponLoading,
}) {
  const cartDetails = useSelector((state) => state.cartDetails);
  const { checkoutShippingMethod, customerToken, checkoutShippingAddress } = useSelector(
    (state) => state
  );
  const [adultFee, setAdultFee] = useState(false);
  const [exciseTaxTooltip, setExciseTaxTooltip] = useState(false);
  const [deliveryTooltip, setDeliveryTooltip] = useState(false);
  const [region, setRegion] = useState({});

  const {
    subtotal,
    grandTotal,
    discountAmount,
    discounts,
    adultSignatureFee,
    coupon,
    routeShippingProtection,
    exciseTax,
    taxAmount,
    deliveryFee,
    appliedRewardPoints,
    shippingMethod,
  } = cartDetails;

  const { regions } = UseRegionList(checkoutShippingAddress?.country);

  useEffect(() => {
    const res = regions?.find((reg) => reg?.code === checkoutShippingAddress?.region);
    setRegion(res);
  }, [regions, checkoutShippingAddress]);

  return (
    <div
      className={`w-full bg-[#F6F6F6] mt-3 px-[15px] py-[20px] space-y-[15px] relative ${
        addCouponCartDetailsLoading ||
        removeCouponCartDetailsLoading ||
        cartRewardPointsLoading ||
        applyRewardPointsLoading ||
        applyCouponLoading ||
        removeCouponLoading
          ? "opacity-50"
          : ""
      }`}
    >
      {addCouponCartDetailsLoading ||
      applyCouponLoading ||
      removeCouponCartDetailsLoading ||
      cartRewardPointsLoading ||
      removeCouponLoading ? (
        <div className="absolute top-[32%] right-[50%]">
          <i className="fa fa-spinner animate-spin text-[30px]" aria-hidden="true" />
        </div>
      ) : null}
      <div className="flex justify-between">
        <span className="text-[14px] font-medium">Cart Subtotal</span>
        <span className="text-[13px] font-bold">
          &#x24;{subtotal ? subtotal?.toFixed(2) : "0.00"}
        </span>
      </div>
      {customerToken ? (
        <div className="flex justify-between">
          <span className="text-[14px] font-medium">You Earn</span>
          <span className="text-[13px] font-bold text-[#4B810E] text-right">
            {appliedRewardPoints?.earnPoints || 0} Reward <br /> Points
          </span>
        </div>
      ) : (
        ""
      )}
      {appliedRewardPoints?.spentPoints ? (
        <div className="flex justify-between">
          <span className="text-[14px] font-medium">You Spend</span>
          <span className="text-[13px] font-bold text-right">
            {appliedRewardPoints?.spentPoints || 0} Reward <br /> Points
          </span>
        </div>
      ) : null}

      {adultSignatureFee ? (
        <div className="flex justify-between">
          <span className="text-[14px] font-medium">
            Adult Signature Fee{" "}
            <div
              role="link"
              tabIndex="0"
              onClick={() => setAdultFee(!adultFee)}
              onKeyDown={() => setAdultFee(!adultFee)}
              onBlur={() => setAdultFee(false)}
              className="relative  whitespace-pre inline-block items-center group font-semibold text-[#a8a8a8] text-xs ml-2.5 focus:text-[#a80f16] cursor-pointer"
            >
              <span
                className={` ${
                  adultFee ? "border-[#333] text-[#333]" : "border-[#8a8c8e] text-[#8a8c8e]"
                } border  hover:border-[#333] hover:text-[#333] flex items-center justify-center h-[15px] w-[15px] rounded-full`}
              >
                ?
              </span>
              {adultFee ? (
                <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] border-[#bbb] border-solid text-xs font-medium w-[140px] md:w-[210px] py-[12px] px-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted h-auto  top-6 -right-8 before:content-[''] before:absolute before:top-0 before:right-[35px] before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-b-0 before:border-t before:border-r-0 before:rotate-45">
                  <span>
                    All orders will require Adult Signature Service. See Help Center for more
                    details
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* <div
              onFocus={() => setAdultFee(!adultFee)}
              onKeyUp={() => setAdultFee(!adultFee)}
              role="link"
              tabIndex="0"
              className="relative inline-block items-center group cursor-pointer  ml-2"
            >
              <span
                className={` ${
                  adultFee ? "border-[#333] text-[#333]" : "border-[#8a8c8e] text-[#8a8c8e]"
                } border  hover:border-[#333] hover:text-[#333] flex items-center justify-center h-[15px] w-[15px] rounded-full`}
              >
                {" "}
                ?
              </span>
              <div className="absolute hidden group-focus:flex group-hover:flex z-20 left-4 top-0 before:content-[''] before:absolute before:top-8 before:right-[98%] before:-translate-y-1/2 before:w-3.5 before:h-3.5 before:bg-skin-inverted before:border-[#bbb] before:border-[1px] before:border-b-0 before:border-r-0 before:rotate-45">
                {" "}
              </div>
              <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] font-medium border-[#bbb] border-solid text-xs w-[270px] shadow-lg rounded-[1px] p-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted hidden h-auto group-hover:justify-center group-hover:items-center group-hover:flex group-focus:flex translate-y-[47%] -top-2 -left-2 -translate-x-[70%] ">
                <span>
                  All orders will require Adult Signature Service. See Help Center for more details
                </span>
              </div>
            </div> */}
          </span>
          <span className="text-[13px] font-bold">
            &#x24;{adultSignatureFee ? adultSignatureFee?.toFixed(2) : "0.00"}
          </span>
        </div>
      ) : (
        ""
      )}

      {deliveryFee ? (
        <div className="flex justify-between">
          <span className="text-[14px] font-medium">
            Delivery Fee{" "}
            <div
              role="link"
              tabIndex="0"
              onClick={() => setDeliveryTooltip(!deliveryTooltip)}
              onKeyDown={() => setDeliveryTooltip(!deliveryTooltip)}
              onBlur={() => setDeliveryTooltip(false)}
              className="relative  whitespace-pre inline-block items-center group font-semibold text-[#a8a8a8] text-xs ml-2.5 focus:text-[#a80f16] cursor-pointer"
            >
              <span
                className={` ${
                  deliveryTooltip ? "border-[#333] text-[#333]" : "border-[#8a8c8e] text-[#8a8c8e]"
                } border  hover:border-[#333] hover:text-[#333] flex items-center justify-center h-[15px] w-[15px] rounded-full`}
              >
                ?
              </span>
              {deliveryTooltip ? (
                <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] border-[#bbb] border-solid text-xs font-medium w-[140px] md:w-[210px] py-[12px] px-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted h-auto  top-6 -right-8 before:content-[''] before:absolute before:top-0 before:right-[35px] before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-b-0 before:border-t before:border-r-0 before:rotate-45">
                  <span>
                    {region?.name} imposes a retail delivery fee on all e-commerce deliveries.
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </span>
          <span className="text-[13px] font-bold">
            &#x24;{deliveryFee ? deliveryFee?.toFixed(2) : "0.00"}
          </span>
        </div>
      ) : (
        ""
      )}

      {routeShippingProtection ? (
        <div className="flex justify-between">
          <span className="text-[14px] font-medium">Route Shipping Protection</span>
          <span className="text-[13px] font-bold">
            &#x24;{routeShippingProtection ? routeShippingProtection?.toFixed(2) : "0.00"}
          </span>
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-between">
        <span className="text-[14px] flex flex-col font-medium">
          <span>Shipping</span>

          {shippingMethod?.methodName ? (
            <span className="text-[#979797] text-xs font-normal">
              ({shippingMethod?.description} - {shippingMethod?.methodName})
            </span>
          ) : (
            ""
          )}
        </span>
        <span className="text-[13px] font-bold">
          {shippingMethod?.methodCode
            ? `$${shippingMethod?.amount?.toFixed(2)}`
            : "Not yet calculated"}
        </span>
      </div>

      {ZipMerchantFee?.data?.setPaymentMethod?.mfpp ? (
        <div className="flex justify-between w-full">
          <span className="text-[14px] font-medium w-[50%]">Merchant Fee for Payment Plan</span>
          <span className="text-[13px] font-bold">
            &#x24;
            {ZipMerchantFee?.data?.setPaymentMethod?.mfpp
              ? ZipMerchantFee?.data?.setPaymentMethod?.mfpp?.toFixed(2)
              : "0.00"}
          </span>
        </div>
      ) : (
        ""
      )}

      {exciseTax ? (
        <div className="flex justify-between">
          <span className="text-sm flex font-medium">
            Excise Tax ({region?.name} Vapour Tax )
            <div
              role="link"
              tabIndex="0"
              onClick={() => setExciseTaxTooltip(!exciseTaxTooltip)}
              onKeyDown={() => setExciseTaxTooltip(!exciseTaxTooltip)}
              onBlur={() => setExciseTaxTooltip(false)}
              className="relative  whitespace-pre inline-block items-center group font-semibold text-[#a8a8a8] text-xs ml-2 mr-[70px] mt-1 focus:text-[#a80f16] cursor-pointer"
            >
              <span
                className={` ${
                  exciseTaxTooltip ? "border-[#333] text-[#333]" : "border-[#8a8c8e] text-[#8a8c8e]"
                } border  hover:border-[#333] hover:text-[#333] flex items-center justify-center h-[15px] w-[15px] rounded-full`}
              >
                ?
              </span>
              {exciseTaxTooltip ? (
                <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] border-[#bbb] border-solid text-xs font-medium w-[140px] md:w-[210px] py-[12px] px-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted h-auto  top-6 -right-8 before:content-[''] before:absolute before:top-0 before:right-[35px] before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-b-0 before:border-t before:border-r-0 before:rotate-45">
                  <span>Vape products are subject to Excise Tax in your State</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </span>
          <span className="text-[13px] font-bold">
            &#x24;{exciseTax ? exciseTax?.toFixed(2) : "0.00"}
          </span>
        </div>
      ) : (
        ""
      )}

      {taxAmount ? (
        <div className="flex justify-between">
          <span className="text-sm font-medium">Sales Tax </span>
          <span className="text-[13px] font-bold">
            &#x24;{taxAmount ? taxAmount?.toFixed(2) : "0.00"}
          </span>
        </div>
      ) : (
        ""
      )}

      {cartDetails?.discounts?.length
        ? cartDetails?.discounts?.map((discount) => (
            <div key={discount?.code} className="flex justify-between">
              <span className="text-[14px] font-medium">{discount?.code}</span>
              <span className="text-[13px] font-bold text-[#bd1121]">
                -&#x24;
                {discount?.discountedAmount
                  ? `${Number(discount?.discountedAmount).toFixed(2)}`
                  : "0.00"}
              </span>
            </div>
          ))
        : null}
      <hr />
      <div className="flex justify-between">
        <span className="text-[21px] font-bold">Order Total</span>
        <span className="text-[21px] font-bold" tabIndex={"0"}>
          {" "}
          &#x24;
          {ZipMerchantFee?.data?.setPaymentMethod?.mfpp
            ? (ZipMerchantFee?.data?.setPaymentMethod?.mfpp + grandTotal).toFixed(2)
            : grandTotal
            ? grandTotal?.toFixed(2)
            : "0.00"}
        </span>
      </div>
    </div>
  );
}

export default OrderDetails;
