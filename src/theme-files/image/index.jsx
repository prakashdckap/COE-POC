import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import constants from "../../helper/constant";
import style from "./style.module.scss";

function ImageTag({ type = 1, themeName, className, src, alt, width, height, layout, ...props }) {
  const { theme } = constants;
  let imageTag = "";
  if (width !== undefined && height !== undefined) {
    imageTag = (
      <Image
        {...props}
        alt={alt}
        src={src}
        className={`${themeName || theme[type]} ${className || ""} ${style.img}`}
        width={width}
        height={height}
      />
    );
  } else {
    imageTag = (
      <Image
        {...props}
        alt={alt}
        src={src}
        className={`${themeName || theme[type]} ${className || ""} ${style.img}`}
        layout="fill"
      />
    );
  }

  return imageTag;
}

ImageTag.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  layout: PropTypes.string,
};

export default ImageTag;
