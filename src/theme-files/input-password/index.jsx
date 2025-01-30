import React from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

export default function InputPassword({
  children,
  type,
  themeName,
  className,
  name,
  onChange,
  isRequired,
  ...props
}) {
  return (
    <label htmlFor="passwd" className="block text-xs font-semibold text-skin-base">
      {children} {isRequired && <span className="text-red-500">*</span>}
      <input
        {...props}
        type="password"
        className={`${themeName || theme[type]} ${className || ""}`}
        id={name}
        name={name}
        onChange={onChange}
      />
    </label>
  );
}

InputPassword.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
  name: "password",
  children: "",
  isRequired: false,
};

InputPassword.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  themeName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
};
