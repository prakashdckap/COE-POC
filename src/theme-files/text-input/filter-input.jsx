/* eslint-disable react/void-dom-elements-no-children */
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Label from "../label";

export default function FilterTextInput({
  type,
  label,
  placeholder,
  name,
  values,
  setvalues,
  isRequired,
  isClicked,
  blurFunction,
  isDisabled,
  search,
  formatNumber,
  filter,
}) {
  const removeFormatedNumber = (str) => {
    return str?.replace(/[^0-9]/g, "");
  };

  const handleInputChange = (event) => {
    if (event.target.name)
      setvalues({
        ...values,
        [event.target.name]: formatNumber
          ? removeFormatedNumber(event.target.value)
          : event.target.value,
      });
  };

  return (
    <div className={`relative mt-2 ${search ? "pb-5" : ""}`}>
      <Label htmlFor="mobile" className="block text-[13px] font-semibold text-[#282828] capitalize">
        {label} {isRequired && <span className="text-red-500">*</span>}{" "}
      </Label>
      <input
        disabled={isDisabled}
        type={type}
        name={name}
        placeholder={placeholder || null}
        value={values[name] || ""}
        onChange={(e) => handleInputChange(e)}
        onWheel={() => document.activeElement.blur()}
        onBlur={blurFunction ? () => blurFunction() : null}
        className="sku-search block w-full border border-[#979797] focus:outline-none focus:ring-[#A80F16] focus:border-[#A80F16] text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter" && typeof filter === "function") {
            filter();
          }
        }}
      />
      {search && (
        <span className="flex search-image-icon opacity-50 cursor-pointer" onClick={filter}>
          {/* change url of image for search */}
          <Image src="/icons/search.svg" alt="search" width={10} height={10} />
        </span>
      )}
      {isRequired && !values[name] && isClicked ? (
        <p className="text-red-500 error-msg text-[12px] font-medium capitalize mt-1">
          required field
        </p>
      ) : null}
    </div>
  );
}

FilterTextInput.defaultProps = {
  type: "",
  label: "",
  name: "",
  placeholder: "",
  values: {},
  isRequired: false,
  isClicked: false,
  isDisabled: false,
  search: false,
  formatNumber: false,
};

FilterTextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.shape({ data: PropTypes.string }),
  setvalues: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  isClicked: PropTypes.bool,
  blurFunction: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  search: PropTypes.bool,
  formatNumber: PropTypes.bool,
  filter: PropTypes.func.isRequired,
};
