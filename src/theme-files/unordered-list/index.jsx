import React from "react";
import constants from "../../helper/constant";
import style from "./style.module.scss";
import PropTypes from "prop-types";

function UnorderedList({ children, type = 1, themeName, className, ...props }) {
  const { theme } = constants;
  return (
    <ul
      {...props}
      className={`${themeName || theme[type]} ${className || ""} ${
        style.unorderedList
      }`}
    >
      {children}
    </ul>
  );
}

UnorderedList.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
};

export default UnorderedList;
