import React from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function Label({
  children,
  type,
  themeName,
  className,
  ...props
}) {
  
  return (
    <label
        {...props}
        className={`${themeName || theme[type]} ${className || ""}`}
    >
        { children }
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
};

Label.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
};

export default Label;
