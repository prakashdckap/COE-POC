import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import constants from "../../helper/constant";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function PageLink({ children, type, themeName, className, href, ...props }) {
  return (
    <div>
      <Link {...props} href={href || "/"}>
        <a className={`${themeName || theme[type]} ${className || ""}`}>{children}</a>
      </Link>
    </div>
  );
}

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
};

PageLink.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
};

export default PageLink;
