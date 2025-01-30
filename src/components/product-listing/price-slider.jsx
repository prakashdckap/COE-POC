import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nearestNumber } from "./helper";

export default function PriceSlider({
  maxValue,
  priceObj,
  setpriceObj,
  setclient,
  sortedProductsLoading,
}) {
  const [priceEntryType, setpriceEntryType] = useState("");

  const higherSliderControl = (e, type) => {
    let value = parseFloat(e.target?.value, 10);
    let price = { ...priceObj, max: value, request: true };
    if (nearestNumber(priceObj?.min, priceObj?.max, value) === "lower" && type === "slide") {
      // to select min slider is on click event selected minimum value
      lowerSliderControl(e, "slide");
    } else if (priceObj?.min <= value && type === "slide") {
      setpriceEntryType("slide");
      setpriceObj(price);
    } else if (type === "type") {
      setpriceEntryType("type");
      setpriceObj({ ...price, max: e.target.value ? value : null });
    }
  };

  const lowerSliderControl = (e, type) => {
    let value = parseFloat(e.target.value, 10);

    if (isNaN(value)) {
      value = null; // If value is not a number, set to null
    } else if (value < 0) {
      value = 0; // Prevent negative values
    }
    let price = { ...priceObj, min: value, request: true };

    if (type === "slide" && priceObj.max >= value) {
      setpriceEntryType("slide");
      setpriceObj(price);
    } else if (type === "type") {
      setpriceEntryType("type");
      setpriceObj(price);
    }
  };

  useEffect(() => {
    if (priceEntryType === "slide") {
      setTimeout(() => {
        setclient(true);
      }, 1500);
    }
  }, [priceObj]);

  const handlePrice = () => {
    setclient(true);
  };

  return (
    <div className={`${sortedProductsLoading ? "opacity-40" : null}`}>
      <div className="multi-range">
        <input
          className="w-full cursor-pointer "
          type="range"
          min="0"
          max={maxValue}
          step="0.1"
          onChange={(e) => {
            lowerSliderControl(e, "slide");
          }}
          value={priceObj?.min}
          tabIndex="-1"
        />
        <input
          className="w-full cursor-pointer"
          type="range"
          min="0"
          max={maxValue}
          step="0.1"
          value={priceObj?.max}
          onChange={(e) => {
            higherSliderControl(e, "slide");
          }}
          tabIndex="-1"
        />
      </div>
      <div className="flex items-end flex-wrap justify-between w-full">
        <span className="text-[12px] text-center flex items-center  h-[40px]">$</span>
        <input
          value={priceObj?.min}
          className="border-b-2 w-[40px] text-[12px] h-[40px] border-0 text-center"
          type="number"
          placeholder="From"
          onWheel={() => document.activeElement.blur()}
          onChange={(e) => {
            lowerSliderControl(e, "type");
          }}
        />
        <span className="text-gray-400 h-[30px]">-</span>
        <input
          value={priceObj?.max}
          className="border-b-2 w-[40px] text-[12px] h-[40px] border-0 text-center"
          type="number"
          placeholder="To"
          onWheel={() => document.activeElement.blur()}
          onChange={(e) => {
            higherSliderControl(e, "type");
          }}
        />
        <button
          onClick={() => handlePrice()}
          type="button"
          disabled={!!(typeof priceObj?.min !== "number" || typeof priceObj?.max !== "number")}
          className="bg-skin-inverted text-skin-base uppercase border border-[#000]  py-[12px] px-[40px] flex items-center justify-center text-xs font-medium  hover:text-skin-inverted hover:border-skin-secondary hover:bg-[#000] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Go
        </button>
      </div>
    </div>
  );
}

PriceSlider.defaultProps = {
  maxValue: 0,
  priceObj: {},
  sortedProductsLoading: false,
};

PriceSlider.propTypes = {
  maxValue: PropTypes.number,
  priceObj: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
  setpriceObj: PropTypes.func.isRequired,
  setclient: PropTypes.func.isRequired,
  sortedProductsLoading: PropTypes.bool,
};
