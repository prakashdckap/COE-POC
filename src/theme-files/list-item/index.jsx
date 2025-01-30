import React from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";
import style from "./style.module.scss";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function ListItem({ key, children, type = 1, themeName, className, ...props }) {
  return (
    <li
      {...props}
      key={key}
      className={`${themeName || theme[type]} ${className || ""} ${style.list}`}
    >
      {children}
    </li>
  );
}

ListItem.propTypes = {
  key: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
};

ListItem.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: ""
}

export default ListItem;
