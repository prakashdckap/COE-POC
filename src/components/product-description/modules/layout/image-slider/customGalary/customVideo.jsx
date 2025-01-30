import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function CustomVideo({
  videoUrl,
  coverImage,
  imageRef,
  index,
  setFullScreen,
  swipersRef,
  fullScreen,
}) {
  const [showVideo, setShowVideo] = useState(false);
  const iframeRef = useRef(null);
  const [startX, setStartX] = useState(null);

  const toggleShowVideo = () => {
    if (videoUrl) {
      setShowVideo(!showVideo);
    } else {
      setFullScreen(true);
    }
  };

  useEffect(() => {
    if (swipersRef?.current && swipersRef?.current.swiper) {
      const currentIndex = swipersRef?.current.swiper.activeIndex;
      if (currentIndex >= 0) {
        stopVideo();
        autoplay();
      }
    }
  }, [swipersRef?.current.swiper.activeIndex]);

  const autoplay = () => {
    if (index == swipersRef?.current.swiper.activeIndex && videoUrl) {
      setTimeout(() => {
        setShowVideo(true);
      }, 3000);
    }
  };

  const stopVideo = () => {
    if (videoUrl) setShowVideo(false);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (startX !== null) {
      const deltaX = e.clientX - startX;
    }
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

  const handleMobileZoom = (e) => {
    if (window.innerWidth <= 768 && fullScreen) {
      if (e.deltaY < 0) {
        console.log("scrolling up");
        zoomIn();
      } else if (e.deltaY > 0) {
        console.log("scrolling down");
        zoomOut();
      }
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
  };

  return (
    <div
      id={"zoomItem" + index}
      onDragEnd={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleMobileZoom}
      className="relative"
    >
      {showVideo && videoUrl ? (
        <div className="video-container">
          <button
            className={`flex pl-[90%] close-video ${fullScreen ? "absolute top-0" : ""} `}
            onClick={toggleShowVideo}
            type="button"
          >
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
          <div className={`video-wrapper ${showVideo && videoUrl ? "video-active" : ""}`}>
            <iframe
              ref={iframeRef}
              title="Element Vape"
              width="560"
              height="315"
              src={videoUrl + "?autoplay=1"}
              style={{ border: "none" }}
              allowFullScreen
              autoplay
              className="image-gallery-image "
            />
          </div>
        </div>
      ) : videoUrl ? (
        <span className="customVideoPlay hover:opacity-50">
          <img
            alt="custom video cover"
            src={coverImage}
            onClick={toggleShowVideo}
            className="image-gallery-image"
          />
          <img
            alt="play button image"
            src="/assets/icons/play.png"
            onClick={toggleShowVideo}
            className="overlay-image"
          />
        </span>
      ) : (
        <img
          alt="image"
          src={coverImage}
          onClick={toggleShowVideo}
          className="image-gallery-image"
          onError={(e) => {
            e.target.src = coverImage || "";
          }}
        />
      )}
    </div>
  );
}
