import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "heroicons-react";
import TextInput from "../../theme-files/text-input";
import useAddCoupon from "../../helper/hooks/cart/use-add-coupon";
import useRemoveCoupon from "../../helper/hooks/cart/use-remove-coupon";
import LoadingSpinner from "../../helper/loading-spinner";
import Paragraph from "../../theme-files/paragraph";

function Discount({ handleAddCoupon, applyCouponLoading, handleRemoveCoupon, removeCouponLoading }) {
  const [open, setOpen] = useState(false);

  const [values, setvalues] = useState({});
  const cartDetails = useSelector((state) => state.cartDetails);

  // Apply and Remove coupon button handler
  const handleCoupon = () => {
    if (!cartDetails?.coupon?.code) {
      handleAddCoupon(values?.coupon);
    } else {
      handleRemoveCoupon();
    }
  };

  // To clear input and set default value in input field
  useEffect(() => {
    if (cartDetails?.coupon?.code) {
      setvalues({ coupon: cartDetails?.coupon?.code });
    } else {
      setvalues({ coupon: "" });
    }
  }, [cartDetails]);

  // Changing the text of the button based on the availability of the coupon code
  let buttonText;
  if (cartDetails?.coupon?.code) {
    buttonText = "Cancel Discount";
  } else {
    buttonText = "Apply Discount";
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full relative flex items-center justify-between border-[#ebebeb] py-[7px] pr-[30px] pl-[5px]"
      >
        <Paragraph className="text-[14px] leading-[1.35] font-medium uppercase text-[#282828]  whitespace-nowrap">
          apply discount code
        </Paragraph>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 absolute right-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 absolute right-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </button>
      {open && (
        <div className="mt-[15px] ml-[5px]  apply-discount">
          <div className="mb-[10px]">
            <span className="text-[13px] leading-[1.35] text-[#282828] font-semibold">
              Enter discount code
            </span>
            <TextInput
              type="text"
              placeholder={`${
                cartDetails?.coupon?.code ? cartDetails?.coupon?.code : "Enter discount Code"
              }`}
              name="coupon"
              values={values}
              setvalues={setvalues}
              isDisabled={!!cartDetails?.coupon?.code}
            />
          </div>

          <button
            type="button"
            onClick={() => handleCoupon()}
            disabled={!values?.coupon && !cartDetails?.coupon?.code}
            className=" bg-skin-button-accent-hover hover:bg-[#a80f16] hover:duration-300 leading-[1.35] text-[13px] py-3 px-[40px]  font-medium text-white  uppercase disabled:cursor-not-allowed disabled:opacity-50"
          >
            {applyCouponLoading || removeCouponLoading ? <LoadingSpinner /> : buttonText}
          </button>
        </div>
      )}
    </>
  );
}

export default Discount;
