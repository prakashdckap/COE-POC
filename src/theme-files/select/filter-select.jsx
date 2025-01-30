/* eslint-disable react/void-dom-elements-no-children */
import React from "react";
import PropTypes from "prop-types";
import Label from "../label";
// import constants from "../../helper/constant";

// const { theme, HEADLESS_SOLUTION_THEME } = constants;

export default function FilterSelect({
  type,
  label,
  placeholder,
  name,
  values,
  setvalues,
  isRequired,
  isClicked,
  data,
  defaultTitle,
  isDisabled,
  className,
}) {

  const handleInputChange = (event) => {
   
    if (event.target.name)
      setvalues({
        ...values,
        [event.target.name]: event.target.value,
      });
  };

  return (
    <div className="relative mt-2">
      <Label htmlFor="mobile" className="block text-[13px] font-semibold text-[#282828] capitalize">
        {label} {isRequired && <span className="text-red-500">*</span>}{" "}
      </Label>

      <select
        disabled={isDisabled}
        type={type}
        name={name}
        placeholder={placeholder || null}
        value={values[name]}
        onChange={(e) => handleInputChange(e)}
        className={`select-search block w-full border border-[#979797] focus:outline-none text-sm ${className}`}
      >
        <option value="">{defaultTitle}</option>
        {data.map((val) => {
          return (
            <option value={val.value} key={val.displayName}>
              {val.displayName}
            </option>
          );
        })}
      </select>
      {isRequired && !values[name] && isClicked ? (
        <p className="text-red-500 error-msg text-[12px] font-medium capitalize mt-1">
          required field
        </p>
      ) : null}
    </div>
  );
}

FilterSelect.defaultProps = {
  type: "",
  label: "",
  name: "",
  placeholder: "",
  values: {},
  isRequired: false,
  isClicked: false,
  isDisabled: false,
  //   type: HEADLESS_SOLUTION_THEME,
  //   themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
  //   name: "",
  //   children: "",
  //   defaultValue: "",
  data: [],
  defaultTitle: "",
};

FilterSelect.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.shape({ data: PropTypes.string }),
  setvalues: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  isClicked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  //   children: PropTypes.string,
  //   name: PropTypes.string,
  //   type: PropTypes.number,
  //   themeName: PropTypes.string,
  className: PropTypes.string,
  //   onChange: PropTypes.func.isRequired,
  //   defaultValue: PropTypes.string,
  data: PropTypes.string,
  defaultTitle: PropTypes.string,
};
