import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CustomVideo from "./customGalary/customVideo";

import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import GalleryPopup from "./customGalary/gallery-pop-up";
import { removeCache } from "../../../../../helper/removeCache";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

export default function ImageGalary({ images, imageRef, imgUrl, selectedOptionImage, swipersRef }) {
  const [image, setImage] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const splideRef = useRef();

  const initialOptions = {
    type: "slide",
    rewind: false,
    perPage: 5,
    perMove: 3,
    pagination: false,
    gap: 10,
    focus: "end",
    lazyLoad: "nearby",
    start: 0,
  };

  const getVideoPlayerURL = (videoContent) => {
    let playerURL = "";
    if (videoContent?.videoUrl) {
      const videoSrc = videoContent?.videoUrl?.split("/")[2];
      const videoID = videoContent?.videoUrl?.split("/").pop().split("?")[0];
      if (videoSrc === "vimeo.com") playerURL = `https://player.vimeo.com/video/${videoID}`;
      else if (videoSrc === "youtu.be") playerURL = `https://www.youtube.com/embed/${videoID}`;
      else playerURL = videoContent?.videoUrl;
      return playerURL;
    }
    return playerURL;
  };

  const imageUrl = removeCache(imgUrl);

  useEffect(() => {
    const filteredImages = images.filter(({ url }) => url !== null);
    // Sort products array by the 'position' property
    filteredImages.sort((a, b) => a.position - b.position);

    const mappedImages = filteredImages.map(({ url, videoContent }, index) => ({
      original: removeCache(url),
      thumbnail: removeCache(url),
      videoUrl: videoContent?.videoUrl,
      renderItem: () => (
        <CustomVideo
          videoUrl={getVideoPlayerURL(videoContent)}
          coverImage={removeCache(url)}
          imageRef={imageRef}
          swipersRef={swipersRef}
          index={index}
          setFullScreen={setFullScreen}
          fullScreen={fullScreen}
        />
      ),
    }));

    if (!selectedOptionImage) {
      setImage(mappedImages);
    }

    return () => {
      setImage([]);
    };
  }, [images, imageUrl]);

  useEffect(() => {
    if (selectedOptionImage) {
      let key = Object.keys(selectedOptionImage);
      let urlImage = removeCache(selectedOptionImage[key[0]].optionImage);

      if (image.length > 0 && image[0]?.thumbnail === imageUrl?.replace(/"/g, "")) {
        let select = {
          original: urlImage,
          thumbnail: selectedOptionImage[key[0]].optionImage,
          renderItem: () => (
            <CustomVideo
              videoUrl={getVideoPlayerURL(null)}
              coverImage={removeCache(urlImage)}
              imageRef={imageRef}
              swipersRef={swipersRef}
              index={0}
              setFullScreen={setFullScreen}
              fullScreen={fullScreen}
            />
          ),
        };
        if (
          select?.thumbnail ==
            "https://www.elementvape.com/media/catalog/product/placeholder/default/Placeholder.png" ||
          select?.thumbnail ==
            "https://staging.elementvape.com/media/catalog/product/placeholder/default/Placeholder.png" ||
          select?.thumbnail ==
            "https://admin.elementvape.com/media/catalog/product/placeholder/default/Placeholder.png"
        ) {
          setImage(image);
        } else {
          setImage([select, ...image]);
        }
        if (swipersRef?.current) {
          swipersRef?.current?.swiper?.slideTo(0);
        }
      } else {
        const newFilterArray = image.slice(1); // Remove the first element
        let select = {
          original: urlImage,
          thumbnail: selectedOptionImage[key[0]].optionImage,
          renderItem: () => (
            <CustomVideo
              videoUrl={getVideoPlayerURL(null)}
              coverImage={removeCache(urlImage)}
              imageRef={imageRef}
              swipersRef={swipersRef}
              index={0}
              setFullScreen={setFullScreen}
              fullScreen={fullScreen}
            />
          ),
        };
        if (
          select?.thumbnail ==
            "https://www.elementvape.com/media/catalog/product/placeholder/default/Placeholder.png" ||
          select?.thumbnail ==
            "https://staging.elementvape.com/media/catalog/product/placeholder/default/Placeholder.png" ||
          select?.thumbnail ==
            "https://admin.elementvape.com/media/catalog/product/placeholder/default/Placeholder.png"
        ) {
          if (image[0]?.thumbnail !== imageUrl?.replace(/"/g, "")) {
            const newFilterArray = image?.length == 1 ? image : image.slice(1); // Remove the first element
            setImage(newFilterArray);
            if (swipersRef?.current) {
              swipersRef?.current?.swiper?.slideTo(0);
            }
          }
        } else {
          setImage([select, ...newFilterArray]);
        }
      }
    } else {
      if (image?.length) {
        if (image[0]?.thumbnail !== imageUrl?.replace(/"/g, "")) {
          const newFilterArray = image?.length == 1 ? image : image.slice(1); // Remove the first element
          setImage(newFilterArray);
          if (swipersRef?.current) {
            swipersRef?.current?.swiper?.slideTo(0);
          }
        } else {
          setImage(image);
        }
      }
    }
  }, [selectedOptionImage]);

  useEffect(() => {
    if (image?.length) {
      const allLiElements = splideRef.current?.splide?.root.querySelectorAll("li");
      allLiElements?.forEach((li) => li.classList.remove("active"));
      allLiElements?.forEach((li) => li.setAttribute("id", "active-none"));
      allLiElements?.[0]?.setAttribute("id", "active-slide");
      allLiElements?.[0]?.classList.add("active");

      splideRef?.current?.go(0);
      setImageIndex(0);
    }
  }, [image]);

  const closeVideoPlyer = (event) => {
    if (typeof event === "boolean") {
      setFullScreen(event);
    } else if (typeof event === "number") {
      splideRef?.current?.go(event);
      setImageIndex(event);
      const allLiElements = splideRef.current?.splide?.root.querySelectorAll("li");
      allLiElements?.forEach((li) => li.classList.remove("active"));
      allLiElements?.forEach((li) => li.setAttribute("id", "active-none"));
      allLiElements?.[event]?.classList.add("active");
      allLiElements?.[event]?.setAttribute("id", "active-slide");
    }
  };

  const activateSlide = (e, index) => {
    if (splideRef.current) {
      splideRef.current?.go(index.index);
      if (swipersRef?.current) {
        swipersRef?.current?.swiper?.slideTo(index.index);
      }
      setImageIndex(index?.index);
    }
    // Remove the custom class from all slides.
    e.Components.Elements.slides.forEach((slide) => {
      slide?.classList.remove("active");
    });
    e.Components.Elements.slides.forEach((slide) => {
      slide?.setAttribute("id", "active-none");
    });
    // Add the custom class to the target slide.
    e.Components.Elements.slides[index.index].classList.add("active");
    e.Components.Elements.slides[index.index].setAttribute("id", "active-slide");
  };

  const closeFullScreenImage = () => {
    setFullScreen(false);
  };

  const handleSlideChange = (index) => {
    if (splideRef?.current) {
      splideRef?.current?.go(index);
      // // Remove the custom class from all slides.
      splideRef?.current?.slides?.forEach((slide) => {
        slide?.setAttribute("id", "active-none");
      });

      splideRef?.current?.slides[index]?.setAttribute("id", "active-slide");
    }
  };

  const toggleFullscreen = () => {
    setFullScreen(true);
  };

  useEffect(() => {
    if (swipersRef?.current) {
      swipersRef?.current?.swiper?.slideTo(0);
    }
  }, [image]);

  useEffect(() => {
    if (swipersRef?.current) {
      swipersRef?.current?.swiper?.slideTo(imageIndex);
    }
  }, [fullScreen]);

  return (
    <GalleryPopup
      isOpen={fullScreen}
      onClose={closeFullScreenImage}
      closeFullScreenImage={closeFullScreenImage}
      imageIndex={imageIndex}
      swipersRef={swipersRef}
    >
      <div className="image-swiper-slide">
        <Swiper
          ref={swipersRef}
          slidesPerView={1}
          startIndex={imageIndex}
          modules={[Navigation]}
          onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
          className={`object-contain pt-10`}
          navigation={image?.length > 0 ? true : false} // Show arrows on mouse over or not
        >
          {image?.length > 0 ? (
            image.map((image, index) => (
              <SwiperSlide key={index}>
                {image?.videoUrl ? (
                  <CustomVideo
                    videoUrl={getVideoPlayerURL(image)}
                    coverImage={image?.original}
                    imageRef={imageRef}
                    swipersRef={swipersRef}
                    index={index}
                    setFullScreen={setFullScreen}
                    fullScreen={fullScreen}
                  />
                ) : (
                  <img
                    src={image?.original}
                    alt={image.label || "image"}
                    className="object-contain w-[100%] swiper-image-gallery"
                    onClick={toggleFullscreen}
                  />
                )}
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src="/assets/placeholder.png" />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      <div
        className={fullScreen ? "md:slider-fullscreen md:mb-0 md:absolute md:bottom-[-4px]" : ""}
      >
        <Splide
          options={fullScreen ? { ...initialOptions, perPage: 10, perMove: 5 } : initialOptions}
          aria-label="React Splide Example"
          onClick={activateSlide}
          ref={splideRef}
          onMounted={() => setTimeout(() => closeVideoPlyer(imageIndex), 500)}
        >
          {image?.length > 1 &&
            image?.map((ele) => {
              return (
                <SplideSlide key={ele?.thumbnail}>
                  <img
                    src={removeCache(ele?.thumbnail)}
                    alt={image.label || "image"}
                    className="image-gallery-thumbnail-image video-thumb-icon"
                  />
                  {ele?.videoUrl && (
                    <img
                      src="/assets/icons/camera_icon.png"
                      alt={image.label || "image"}
                      className="absolute p-1 md:p-3 lg:p-6"
                    />
                  )}
                </SplideSlide>
              );
            })}
        </Splide>
      </div>
    </GalleryPopup>
  );
}

ImageGalary.defaultProps = {
  images: [],
  imageRef: {},
};

ImageGalary.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  imageRef: PropTypes.shape(),
};
