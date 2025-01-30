import React from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function Form({
  children,
  type,
  themeName,
  className,
  ...props
}) {
  
  return (
    <form
        {...props}
        className={`${themeName || theme[type]} ${className || ""}`}
    >
        { children }
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
};

Form.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
};

export default Form;
