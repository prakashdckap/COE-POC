import React from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";
import style from "./style.module.scss";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function Heading({ children, type = 1, themeName, className, ...props }) {
  return (
    <h1
      {...props}
      className={`${themeName || theme[type]} ${className || ""} ${
        style.heading
      }`}
    >
      {children}
    </h1>
  );
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
};

Heading.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
};

export default Heading;
