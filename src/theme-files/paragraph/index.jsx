import PropTypes from "prop-types";
import React from "react";
import constants from "../../helper/constant";
import style from "./style.module.scss";

function Paragraph({ children, type = 1, themeName, className, ...props }) {
  const { theme } = constants;
  return (
    <p {...props} className={`${themeName || theme[type]} ${className || ""} ${style.paragraph}`}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.number.isRequired,
  themeName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Paragraph;
