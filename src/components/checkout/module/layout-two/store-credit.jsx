import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextInput from "../../../../theme-files/text-input";
import useAddStoreCredit from "../../../../helper/hooks/cart/use-add-store-credit";
import useRemoveStoreCredit from "../../../../helper/hooks/cart/use-remove-store-credit";
import LoadingSpinner from "../../../../helper/loading-spinner";
import Paragraph from "../../../../theme-files/paragraph";

function StoreCredit() {
  const [values, setvalues] = useState({});
  const customerDetails = useSelector((state) => state.customerDetails);
  const { handleApplyStoreCredit, applyStoreCreditLoading } = useAddStoreCredit();
  const { handleRemoveStoreCredit, removeStoreCreditLoading } = useRemoveStoreCredit();
  const cartDetails = useSelector((state) => state.cartDetails);
  const storeCredit = useSelector((state) => state.storeCredit);

  // Apply and Remove coupon button handler
  const handleStoreCredit = (e) => {
    e.preventDefault();
    if (!cartDetails?.appliedStoreCredit?.creditUsed) {
      handleApplyStoreCredit(values?.storeCredit);
    } else {
      handleRemoveStoreCredit();
    }
  };

  // To clear input and set default value in input field
  useEffect(() => {
    if (cartDetails?.appliedStoreCredit?.creditUsed) {
      setvalues({ storeCredit: cartDetails?.appliedStoreCredit?.creditAmount });
    } else {
      setvalues({ storeCredit: "" });
    }
  }, [cartDetails]);

  // Changing the text of the button based on the availability of the coupon code
  let buttonText;
  if (cartDetails?.appliedStoreCredit?.creditUsed) {
    buttonText = "Remove";
  } else {
    buttonText = "Apply";
  }

  return (
    <div
      className={` ${
        applyStoreCreditLoading || removeStoreCreditLoading ? "opacity-40" : ""
      } flex flex-col border-[1px] border-[#dcdcdc] p-[15px]`}
    >
      <div className="text-sm text-[#292c2d] font-normal mb-[10px] ">
        You have{" "}
        <span className="text-sm font-semibold">
          {cartDetails?.appliedStoreCredit?.creditUsed
            ? `$${(storeCredit?.creditAmountAvailable - storeCredit?.creditAmount || 0).toFixed(2)}`
            : `$${Number(customerDetails?.customerStoreCredit).toFixed(2)}`}
        </span>{" "}
        on your Store Credit account
      </div>

      <form className="flex justify-between items-center">
        <div className="w-[75%]">
          {cartDetails?.appliedStoreCredit?.creditUsed ? (
            <Paragraph>
              Applied store credit amount is{" "}
              <span className="text-sm font-semibold">
                ${Number(cartDetails?.appliedStoreCredit?.creditAmount).toFixed(2)}
              </span>
            </Paragraph>
          ) : (
            <TextInput
              type="number"
              placeholder="0"
              name="storeCredit"
              values={values}
              setvalues={setvalues}
            />
          )}
        </div>
        <button
          type="submit"
          className="lg:mt-[2px] md:mt-[2px] xl:mt-[2px] 2xl:mt-[2px] mt-[4px] ml-[4px] pointer text-[#fff] bg-[#a80f16] h-[40px] border-[1px] border-[#a80f16] w-[100px] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={(e) => handleStoreCredit(e)}
          disabled={
            applyStoreCreditLoading ||
            removeStoreCreditLoading ||
            (!values?.storeCredit && !cartDetails?.appliedStoreCredit?.creditUsed)
          }
        >
          {applyStoreCreditLoading || removeStoreCreditLoading ? <LoadingSpinner /> : buttonText}
        </button>
      </form>
    </div>
  );
}

export default StoreCredit;
