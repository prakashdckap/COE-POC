import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EstimationCost({
  ZipPayemntMethodLoading,
  estimateShippingLoading,
  ZipMerchantFee,
}) {
  // this component is only for mobile

  const { cartDetails, cartItems } = useSelector((state) => state);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Calculating the total quantity
    setTotalQuantity(
      cartItems?.length ? cartItems?.reduce((total, item) => total + item.quantity, 0) : 0
    );
  }, [cartItems]);

  return (
    <div
      className={`py-[35px] px-[20px] border border-[#e6e6e6] opc-estimated-wrapper lg:hidden ${
        ZipPayemntMethodLoading || estimateShippingLoading ? "opacity-40 cursor-not-allowed" : ""
      }`}
    >
      <div className="estimated-block">
        <span className="color-[#282828] text-lg font-bold pr-[5px] h-6">Estimated Total </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 mx-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        <span className="minicart-wrapper">
          <button
            type="button"
            className="action showcart"
            data-bind="click: showSidebar"
            data-toggle="opc-summary"
          >
            <span className="counter qty">
              <span className="counter-number text-xs text-[#fff] p-[3px] w-[5px]">
                {totalQuantity}
              </span>
            </span>
          </button>
        </span>
      </div>
      <div className="estimated-price text-lg font-bold">
        &#x24;
        {ZipMerchantFee?.data?.setPaymentMethod?.mfpp
          ? (ZipMerchantFee?.data?.setPaymentMethod?.mfpp + cartDetails?.grandTotal).toFixed(2)
          : cartDetails?.grandTotal
          ? cartDetails?.grandTotal?.toFixed(2)
          : "0.00"}
      </div>
    </div>
  );
}
