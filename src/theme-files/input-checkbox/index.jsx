import React from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function InputText({
  type,
  themeName,
  className,
  name,
  ...props
}) {
  
  return (
    <input
        type="checkbox"
        className={`${themeName || theme[type]} ${className || ""}`}
        id={ name }
        name={ name }
        {...props}
    />
  );
}

InputText.propTypes = {
  name: PropTypes.string,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string
};

InputText.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
  name: "",
};

export default InputText;