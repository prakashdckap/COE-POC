import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function SelectOptionDefault({
  label,
  data,
  setdropdownSelectedData,
  dropdownSelectedData,
  displayKey,
  disableTriggerKey,
  name,
  placeholder,
  isRequired,
  isClicked,
  showPrice,
  AddToTotalPrice,
  price,
  productType,
  bundleProductsMinSaleQty,
  setUpdatePrice,
  calculatedPrice,
}) {
  function optionChange(e) {
    const selectedOptionName = e.target.value;

    const optionDate = data.filter(
      (f) => f.optionCode === selectedOptionName || f.id === Number(selectedOptionName)
    );

    if (e.target.value) {
      setUpdatePrice(optionDate[0]?.optionPrice?.value);
    } else {
      setUpdatePrice(calculatedPrice);
    }

    const obj = {
      ...dropdownSelectedData,
      [name]: { ...optionDate[0], skip: AddToTotalPrice },
    };
    if (optionDate.length) {
      setdropdownSelectedData(obj);
    } else {
      delete obj[name];
      setdropdownSelectedData(obj);
    }
  }

  const priceForOption = (priceObj) => {
    if (
      AddToTotalPrice &&
      showPrice &&
      priceObj?.optionPrice?.value !== price &&
      priceObj?.optionPrice?.value
    ) {
      // for add on and save price
      return priceObj?.optionPrice?.value?.toFixed(2);
    } else if (showPrice) {
      // for other options
      const finalPrice = priceObj?.optionPrice?.value?.toFixed(2) - price;
      return finalPrice.toFixed(2);
    }
  };

  // Sorting the data to move out of stock items to the end
  const sortedData = [...data].sort((a, b) => {
    const aDisableKey =
      productType === "bundle" ? a.product[disableTriggerKey] : a[disableTriggerKey];
    const bDisableKey =
      productType === "bundle" ? b.product[disableTriggerKey] : b[disableTriggerKey];
    const aIsOutOfStock = aDisableKey < 1 || aDisableKey <= bundleProductsMinSaleQty;
    const bIsOutOfStock = bDisableKey < 1 || bDisableKey <= bundleProductsMinSaleQty;
    return aIsOutOfStock - bIsOutOfStock;
  });

  // Function to check if a string is non-empty
  // const isNonEmptyString = (str) => str && str?.trim().length > 0;

  // Sorting the data to move out-of-stock items to the end if optionValue is not present
  // const sortedData = [...data].sort((a, b) => {
  //   const aDisableKey =
  //     productType === "bundle" ? a.product[disableTriggerKey] : a[disableTriggerKey];
  //   const bDisableKey =
  //     productType === "bundle" ? b.product[disableTriggerKey] : b[disableTriggerKey];

  //   const aIsOutOfStock = aDisableKey < 1 || aDisableKey <= bundleProductsMinSaleQty;
  //   const bIsOutOfStock = bDisableKey < 1 || bDisableKey <= bundleProductsMinSaleQty;

  //   const aIsNonEmpty = isNonEmptyString(a.optionValue);
  //   const bIsNonEmpty = isNonEmptyString(b.optionValue);

  //   if (!aIsNonEmpty && !bIsNonEmpty) {
  //     return aIsOutOfStock - bIsOutOfStock;
  //   } else if (!aIsNonEmpty) {
  //     return -1; // a comes first
  //   } else if (!bIsNonEmpty) {
  //     return 1; // b comes first
  //   } else {
  //     return 0; // keep original order
  //   }
  // });

  return (
    <div className="w-full flex flex-col custom-select">
      <label
        className="text-skin-base font-bold md:font-semibold text-[13px] mb-1 flex justify-center md:justify-start"
        htmlFor="#"
        for={label}
      >
        {label} {isRequired ? <span className="text-red-500">*</span> : ""}
      </label>

      <select
        onChange={(e) => optionChange(e)}
        className="!pr-[40px] focus:ring-1 focus:ring-[#bd1121] focus:outline-none"
        value={dropdownSelectedData[name]?.optionCode || dropdownSelectedData[name]?.id || ""}
        id={label}
      >
        <option value="" className="cursor-pointer">
          {placeholder}
        </option>

        {sortedData?.map((obj) => {
          const disableKey =
            productType === "bundle" ? obj.product[disableTriggerKey] : obj[disableTriggerKey];
          if (disableKey < 1 || disableKey <= bundleProductsMinSaleQty)
            return (
              <option value={obj.optionCode || obj.id} className="cursor-pointer" disabled>
                {obj[displayKey]}
                {showPrice && obj?.optionPrice?.value !== price && obj?.optionPrice?.value
                  ? `
                ${`+$${priceForOption(obj)}`} 
                `
                  : null}
                (out of stock)
              </option>
            );
          return (
            <option
              value={obj.optionCode || obj.id}
              key={obj[displayKey]}
              className="cursor-pointer ml-2"
            >
              {obj[displayKey]}{" "}
              {showPrice && obj?.optionPrice?.value !== price && obj?.optionPrice?.value
                ? `
                ${`+$${priceForOption(obj)}`} 
                `
                : null}
            </option>
          );
        })}
      </select>
      {isRequired && !dropdownSelectedData[name] && isClicked ? (
        <p className="text-[#e02b27] error-msg mt-[7px] text-[13px] font-normal font-Montserrat">
          This is a required field.
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

SelectOptionDefault.defaultProps = {
  label: "",
  data: [],
  displayKey: "",
  dropdownSelectedData: {},
  name: "",
  placeholder: "",
  isRequired: false,
  isClicked: false,
  showPrice: false,
  AddToTotalPrice: false,
  disableTriggerKey: "",
  price: 0,
};

SelectOptionDefault.propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({ data: PropTypes.string })),
  displayKey: PropTypes.string,
  setdropdownSelectedData: PropTypes.func.isRequired,
  dropdownSelectedData: PropTypes.objectOf(PropTypes.shape()),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  isClicked: PropTypes.bool,
  showPrice: PropTypes.bool,
  AddToTotalPrice: PropTypes.bool,
  disableTriggerKey: PropTypes.string,
  price: PropTypes.number,
};

export default SelectOptionDefault;
