import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";

import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";

export default function CustomFullScreenButton({ isFullscreen, imageRef, image, activateSlide }) {
  const [displayZoom, setDisplayZoom] = useState(true);
  const splideRef = useRef();

  const initialOptions = {
    type: "slide",
    rewind: false,
    perPage: 15,
    perMove: 5,
    pagination: false,
    gap: 10,
    focus: "end",
    lazyLoad: "nearby",
    start: 0,
  };

  const removeAllClass = (element) => {
    if (element) {
      // Loop through all classes and remove class for zoom
      while (element.classList.length > 0) {
        element.classList.remove(element.classList.item(0));
      }
      element.classList.add("image-gallery-slides");
    }
  };

  const getZoomValue = () => {
    // const index = imageRef?.current?.state?.currentIndex || "0";
    // const zoomEle = document.getElementById("zoomItem" + index);
    const zoomEle = document.getElementsByClassName("image-gallery-slides")[0];
    try {
      if (zoomEle.classList[1]) {
        const classValue = parseInt(zoomEle.classList[1].replace("zoom-", ""));
        removeAllClass(zoomEle);
        return { zoomEle, classValue };
      }
    } catch (error) {
      return { zoomEle };
    }
    return { zoomEle };
  };

  const zoomOut = () => {
    const { zoomEle, classValue } = getZoomValue();
    if (classValue > 1) {
      const zoomValue = `zoom-${classValue - 1}`;
      zoomEle.classList.add(zoomValue);
    }
  };

  const zoomIn = () => {
    const { zoomEle, classValue } = getZoomValue();
    if (classValue < 19) {
      const zoomValue = `zoom-${classValue + 1}`;
      zoomEle.classList.add(zoomValue);
    } else if (!classValue) {
      zoomEle.classList.add("zoom-1");
    } else {
      zoomEle.classList.add("zoom-19");
    }
  };

  const exitFullScreen = () => {
    if (imageRef.current?.state?.isFullscreen) {
      imageRef.current?.toggleFullScreen();
    }
  };

  const disableZoom = () => {
    // to disable zoom buttons if there is a video
    setTimeout(() => {
      const hasVideoWrapperClass = document.querySelector(".video-wrapper") !== null;
      if (imageRef?.current?.state?.currentIndex >= 0 && hasVideoWrapperClass) {
        setDisplayZoom(false);
        return;
      }
      setDisplayZoom(true);
    }, 2000);
    setDisplayZoom(true);
  };

  useEffect(() => {
    if (isFullscreen) {
      const index = imageRef?.current?.state?.currentIndex;
      splideRef.current.go(index);
      const allLiElements = splideRef.current.splide?.root.querySelectorAll("li");
      allLiElements.forEach((li) => li.classList.remove("active"));
      allLiElements[index]?.classList.add("active");
      disableZoom();
    }
    const zoomEle = document.getElementsByClassName("image-gallery-slides")[0];
    removeAllClass(zoomEle);
  }, [isFullscreen, imageRef?.current?.state?.currentIndex]);

  if (isFullscreen)
    return (
      <div className="custom-fullscreen">
        <div className="custom-fullscreen-buttons">
          {displayZoom && (
            <div className="zoomButtons">
              <button onClick={zoomIn} type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#80838f"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-12 h-12 text-[#80838f]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <button onClick={zoomOut} type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#80838f"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-12 h-12 text-[#80838f]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
            </div>
          )}
          <button type="button" className="exit-fullscreeen" onClick={exitFullScreen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 h-12 text-[#80838f]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="slider-fullscreen">
          <Splide
            options={{ ...initialOptions }}
            aria-label="React Splide Example"
            onClick={activateSlide}
            ref={splideRef}
          >
            {image?.map((ele) => {
              return (
                <SplideSlide key={ele?.thumbnail}>
                  <img src={ele?.thumbnail} alt="image" className="image-gallery-thumbnail-image" />
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      </div>
    );
}

export function CustomThumbInner({ item }) {
  return (
    <div className="custom-thumbnail-inner">
      <img src={item?.thumbnail} alt={item?.description || ""} />
    </div>
  );
}

CustomFullScreenButton.defaultProps = {
  isFullscreen: false,
  imageRef: {},
  image: [],
  activateSlide: () => {},
};

CustomFullScreenButton.propTypes = {
  isFullscreen: PropTypes.checkPropTypes(),
  imageRef: PropTypes.shape(),
  image: PropTypes.arrayOf(),
  activateSlide: PropTypes.func,
};

CustomThumbInner.defaultProps = {
  item: {},
};

CustomThumbInner.propTypes = {
  item: PropTypes.shape(),
};
