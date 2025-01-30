import React from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function InputEmail({ children, type, themeName, className, name, onChange, ...props }) {
  return (
    <label htmlFor={name} className="block text-xs font-semibold text-skin-base">
      {children}
      <input
        {...props}
        type="email"
        className={`${themeName || theme[type]} ${className || ""}`}
        id={name}
        name={name}
        onChange={onChange}
      />
    </label>
  );
}

InputEmail.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
  name: "email",
  children: "",
};

InputEmail.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputEmail;
