import React from "react";

const CheckoutDisplayError = ({ handleClear, checkoutErrorMessage }) => {
  return (
    <div
      className="fixed h-screen top-0 left-0 w-full  z-50  bg-[rgba(51,51,51,.55)]"
      role="region"
      aria-label="Notification"
    >
      <div className="flex justify-center items-center h-[100vh]">
        <div className="bg-white checkout-error md:w-[55%] w-[80%] rounded-[2px] relative">
          <div className="md:py-[25px] md:pl-[25px] md:pr-[40px] py-[16px] pl-[16px] pr-[32px] flex items-center justify-center">
            <p
              className="text-[#a80f16] text-[14px] font-bold leading-[1.35] text-center"
              role="alert"
            >
              {checkoutErrorMessage}
            </p>
          </div>
          <span
            class="material-symbols-outlined absolute top-[15px] right-[10px] md:text-[26px] text-[24px] font-normal p-[2px] leading-[1.35]"
            onClick={handleClear}
          >
            close
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDisplayError;
