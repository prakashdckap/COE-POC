import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import ImageTag from "../../../../../theme-files/image";

function Slider({ images }) {
  /* ============================ Local State ============================= */
  const [currentImage, setcurrentImage] = useState({});

  const removeCache = (img) => {
    const split = img.split("/");
    if (split[6] === "cache") split.splice(6, 2);
    return split.join("/");
  };
  useEffect(() => {
    if (images.length) setcurrentImage({ url: images[0]?.url });
  }, [images]);

  // carousel part
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);
  /* ========================= Return State ========================= */
  return images?.length ? (
    <div className="flex flex-col items-center justify-center">
      {currentImage?.url ? (
        <div>
          <ImageTag src={currentImage?.url} alt="First slide" width={500} height={600} />
        </div>
      ) : null}

      {images?.length && (
        <div className="relative flex flex-row gap-5 mt-5 w-full overflow-x-auto">
          <button
            type="button"
            onClick={movePrev}
            className="font-mediumtext-skin-base
                     w-10 h-full text-center
                     disabled:opacity-25 disabled:cursor-not-allowed
                     z-10 p-0 m-0 transition-all
                     ease-in-out duration-300
                     absolute top-0 left-0
 
                     "
            disabled={isDisabled("prev")}
          >
            <ChevronLeftIcon className="font-medium" />
            <span className="sr-only">Prev</span>
          </button>
          <div className="relative overflow-hidden my-10 items-center">
            <div
              ref={carousel}
              className="carousel-container relative overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 flex gap-0 md:gap-10"
            >
              {images?.map((imageUrl) => {
                return (
                  <div
                    className={`border-2 border-transparent flex items-center justify-center relative cursor-pointer min-w-[100px] w-[100px] h-[100px] ${
                      imageUrl?.url === currentImage.url
                        ? "opacity-100 border-[#ff5501]"
                        : "opacity-50"
                    }`}
                    key={imageUrl?.url}
                  >
                    <ImageTag
                      onClick={() => setcurrentImage({ url: imageUrl?.url })}
                      src={removeCache(imageUrl?.url)}
                      alt={imageUrl?.url}
                      className="w-[100px] h-[100px]"
                      width={100}
                      height={100}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={moveNext}
            className="text-skin-base w-10 h-full text-center
                      disabled:opacity-25 disabled:cursor-not-allowed
                      z-10 p-0 m-0 transition-all ease-in-out
                      duration-300 absolute top-0 right-0"
            disabled={isDisabled("next")}
          >
            <ChevronRightIcon />
            <span className="sr-only">Next</span>
          </button>
        </div>
      )}
    </div>
  ) : null;
}

export default Slider;

Slider.defaultProps = {
  images: [],
};

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};
