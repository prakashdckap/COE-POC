import { useState } from "react";
import { useSelector } from "react-redux";
import ModalContent from "../model";

function TermsConditionsValidation({ toggleTermsCheck, termsCheck, loading }) {
  const orderDetail = useSelector((state) => state.orderDetail);

  const [modelContent, setModelContent] = useState({ open: false, content: "" });

  const openModel = (content) => {
    setModelContent({ content, open: true });
  };

  if (orderDetail?.orderId || orderDetail?.length) {
    return "";
  }

  return (
    <div className="col-span-6 mb-[10px]">
      <label htmlFor="terms-and-conditions-checkbox" className="containercheckbox">
        <input
          type="checkbox"
          id="terms-and-conditions-checkbox"
          className="mr-2 h-[13px] w-[13px]"
          onClick={toggleTermsCheck}
          disabled={loading}
          checked={termsCheck}
          tabIndex="-1"
          role="checkbox"
          aria-label="I have read and agree to Terms and Conditions & Privacy Policy"
        />
        <span
          className="checkbox-checkmark rounded-sm"
          tabIndex="0"
          role="checkbox"
          aria-checked={termsCheck}
          aria-label="I have read and agree to Terms and Conditions & Privacy Policy"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleTermsCheck();
              e.preventDefault(); // Prevents scrolling on Space
            }
          }}
        />
      </label>
      <span className="text-skin-base text-[13px]">
        I have read and agree to
        <span
          className="text-skin-secondary font-medium focus:font-normal focus:underline"
          onClick={() => openModel("terms")}
        >
          {" "}
          Terms and Conditions{" "}
        </span>
        &
        <span
          className="text-skin-secondary font-medium focus:font-normal focus:underline"
          onClick={() => openModel("policies")}
        >
          {" "}
          Privacy Policy
        </span>
      </span>

      <ModalContent
        isOpen={modelContent?.open}
        onClose={() => setModelContent({ open: false, content: "" })}
        content={modelContent?.content}
      />
    </div>
  );
}

export default TermsConditionsValidation;
