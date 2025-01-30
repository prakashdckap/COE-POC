import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../../theme-files/text-input";
import useAddCoupon from "../../../../helper/hooks/cart/use-add-coupon";
import useRemoveCoupon from "../../../../helper/hooks/cart/use-remove-coupon";
import LoadingSpinner from "../../../../helper/loading-spinner";
import { SET_ERROR } from "../../../../redux/actions";
import { useRouter } from "next/router";

function CouponCode({ handleAddCoupon, applyCouponLoading, handleRemoveCoupon, removeCouponLoading }) {
  const [values, setvalues] = useState({});
  const { cartDetails, setError } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useRouter();

  // Apply and Remove coupon button handler
  const handleCoupon = (e) => {
    e.preventDefault();
    if (!cartDetails?.coupon?.code) {
      handleAddCoupon(values?.coupon, false);
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
      dispatch(SET_ERROR([]));
    }
  }, [cartDetails]);

  useEffect(() => {
    dispatch(SET_ERROR([]));
  }, [history?.asPath]);

  // Changing the text of the button based on the availability of the coupon code
  let buttonText;
  if (cartDetails?.coupon?.code) {
    buttonText = "Remove";
  } else {
    buttonText = "Apply";
  }

  return (
    <>
      <form className="w-full flex justify-between items-center pt-[10px] pb-[10px] checkout-coupon-code">
        <div className="w-[70%] h-[44px]">
          <TextInput
            type="text"
            className=""
            placeholder={`${cartDetails?.coupon?.code ? cartDetails?.coupon?.code : "Coupon Code"}`}
            name="coupon"
            values={values}
            setvalues={setvalues}
            isDisabled={!!cartDetails?.coupon?.code}
          />
        </div>
        <button
          type="submit"
          disabled={!values?.coupon && !cartDetails?.coupon?.code}
          onClick={(e) => handleCoupon(e)}
          className="pointer text-[#fff] bg-[#a80f16] uppercase  h-[40px] border-[1px] border-[#a80f16] w-[80px] text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {applyCouponLoading || removeCouponLoading ? <LoadingSpinner /> : buttonText}
        </button>
      </form>
      {setError?.length ? (
        <div className="w-[70%] h-[54px]">
          {" "}
          {setError?.map(({ message }) => {
            return <p className="text-[#a5595d] text-[9px] leading-3">{message}</p>;
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CouponCode;
