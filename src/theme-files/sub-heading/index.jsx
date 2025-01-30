import React from "react";
import constants from "../../helper/constant";
import style from "./style.module.scss";
import PropTypes from "prop-types";

function SubHeading({ children, type = 1, themeName, className, ...props }) {
  const { theme } = constants;
  return (
    <h2 {...props} className={`${themeName || theme[type]} ${className || ""} ${style.heading}`}>
      {children}
    </h2>
  );
}

SubHeading.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
};

export default SubHeading;
