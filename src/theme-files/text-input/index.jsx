/* eslint-disable react/void-dom-elements-no-children */
import React, { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Label from "../label";

export default function TextInput({
  type,
  label,
  placeholder,
  name,
  values,
  setvalues,
  toolTip,
  isRequired,
  isClicked,
  blurFunction,
  isDisabled,
  formatNumber,
  formatCreditNumber,
  placeholderColor,
  errors,
  setValidCvvError,
  validCvvError,
}) {
  const history = useRouter();
  const { pathname } = history;
  const [showTooltip, setshowTooltip] = useState(false);

  const removeFormatedNumber = (str) => {
    const arr = str.split("");
    const retArr = arr?.filter((item) => item?.replace(/^[a-zA-Z]+$/, ""));
    return retArr
      .join()
      ?.replaceAll(",", "")
      .replaceAll(`(`, "")
      .replaceAll(`)`, "")
      .replaceAll(`-`, "")
      .replaceAll(` `, "")
      .slice(0, 10);
  };

  const formatPhoneNumber = (str) => {
    const cleaned = `${str}`.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return str;
  };

  const ShowCreditCardNumber = (number) => {
    let split = number
      ?.replaceAll(/[^0-9]/g, "")
      ?.match(/.{1,4}/g)
      ?.join(" ");
    split = split?.slice(0, 23);
    return split || "";
  };

  const StoreCreditCardNumber = (number) => number.replaceAll(" ", "").slice(0, 19);

  const handleInputChange = (event) => {
    let { value } = event.target || values[name];
    if (label === "CVV") {
      value = value.slice(0, 4);
      if (setValidCvvError && value) {
        setValidCvvError(value.length === 3 || value.length === 4 ? "" : "error");
      }
    } else if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z ]/g, "");
    }
    setvalues({
      ...values,
      // eslint-disable-next-line no-nested-ternary
      [event.target.name]: formatNumber
        ? removeFormatedNumber(value)
        : formatCreditNumber
        ? StoreCreditCardNumber(value)
        : value,
    });
  };

  const handleTooltip = () => {
    setshowTooltip(!showTooltip);
  };

  return (
    <div className={`relative ${label === "CVV" ? "" : "mt-1"}`}>
      <Label
        htmlFor={label ? label : "mobile"}
        className="block text-[13px] font-semibold text-[#282828] capitalize"
      >
        {label} {isRequired && label && <span className="text-red-500">*</span>}{" "}
        {toolTip ? (
          <span>
            <div
              onFocus={handleTooltip}
              onKeyUp={handleTooltip}
              role="link"
              tabIndex="0"
              aria-label={label ? label : "mobile"}
              className="relative inline-block items-center group cursor-pointer ml-[1.5px]"
            >
              <span className="text-[11px] font-semibold border-[1px] border-[#bbb] group-hover:border-gray-900 group-focus:border-gray-900 rounded-full flex items-center justify-center h-[14px] w-[14px] text-[#bbb] group-hover:text-gray-900 group-focus:text-gray-900">
                ?
              </span>
              <div className="absolute hidden group-focus:flex group-hover:flex z-20 right-0 md:-right-5 -top-1.5 md:-top-6 before:content-[''] before:absolute before:top-8 before:right-[98%] before:-translate-y-1/2 before:w-3.5 before:h-3.5 before:bg-skin-inverted before:border-[#bbb] before:border-r-0 before:border-b-0 before:border-t-[1px] before:border-l-[1px] md:before:border-b-[1px] md:before:border-t-0  before:rotate-45">
                {" "}
              </div>
              <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] font-medium border-[#bbb] border-solid text-xs w-[270px] shadow-lg rounded-[1px] p-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted hidden h-auto group-hover:justify-center group-hover:items-center group-hover:flex group-focus:flex translate-y-[33%] md:-translate-y-[14%] -top-2 -left-2 -translate-x-[45%] md:translate-x-[13%]">
                <span className="normal-case font-sans">
                  Please make sure to provide your accurate phone number as the shipping carrier may
                  need to notify you of updates.
                </span>
              </div>
            </div>
          </span>
        ) : (
          ""
        )}
      </Label>

      <input
        // maxLength={type === "password" && 16}
        disabled={isDisabled}
        type={type}
        name={name}
        placeholder={placeholder || null}
        aria-label={label ? label : "mobile"}
        value={
          // eslint-disable-next-line no-nested-ternary
          formatNumber
            ? formatPhoneNumber(values[name])
            : formatCreditNumber
            ? ShowCreditCardNumber(values[name])
            : values[name]
        }
        onChange={(e) => handleInputChange(e)}
        onWheel={() => document.activeElement.blur()}
        onBlur={blurFunction ? () => blurFunction() : null}
        className={`${
          pathname === "/account/add-address" || pathname === "/account/edit-address"
            ? "theme-1 mt-2 mb-2 block w-full border-b border-[#e1e1e1] py-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            : "mt-1 block w-full border border-[#979797] shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A80F16] focus:border-[#A80F16] text-sm"
        } ${placeholderColor ? "placeholder:text-[#e1e1e1]" : "placeholder:text-skin-base"} ${
          errors ? "error-field" : ""
        } ${
          pathname === "/shippingtracking"
            ? "font-sans !text-xs text-[#282828] border-[1px] focus:outline-0 focus:border-[#eee] !border-[#eee] bg-[#fff] h-[40px] "
            : ""
        } font-open-sans text-[14px]`}
      />
      {isRequired && !values[name] && isClicked ? (
        <p className="text-red-500 error-msg text-[12px] font-normal capitalize mt-2">
          required field
        </p>
      ) : null}

      {validCvvError && (
        <p className="text-red-500 error-msg text-[13px] w-[207px] font-normal leading-[1.35] capitalize mt-2">
          Please enter a valid credit card verification number.
        </p>
      )}
    </div>
  );
}

TextInput.defaultProps = {
  type: "",
  label: "",
  name: "",
  placeholder: "",
  placeholderColor: "",
  values: {},
  isRequired: false,
  toolTip: false,
  isClicked: false,
  isDisabled: false,
  formatNumber: false,
  formatCreditNumber: false,
  errors: false,
};

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  values: PropTypes.shape({ data: PropTypes.string }),
  setvalues: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  toolTip: PropTypes.bool,
  isClicked: PropTypes.bool,
  blurFunction: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  formatNumber: PropTypes.bool,
  formatCreditNumber: PropTypes.bool,
  errors: PropTypes.bool,
};
