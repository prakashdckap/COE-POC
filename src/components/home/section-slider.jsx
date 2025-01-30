/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionSlider = ({ data, homePageSliderMobile }) => {
  const [currentImage, setcurrentImage] = useState({});
  const [currentImageBackground, setcurrentImageBackground] = useState({});
  const [sliderSwiper, setSwiperRef] = useState(null);

  const slideLength = data?.urls?.length;
  const autoScroll = true;
  const intervalTime = 5000;
  const BackgroundIntervalTime = 5000;

  let slideInterval;
  let BackgroundslideInterval;

  /* ========================== Helper Functions ========================== */
  // To change the image to the next image
  const nextSlide = () =>
    data?.urls?.indexOf(currentImage) + 1 === slideLength
      ? setcurrentImage(data?.urls[0])
      : setcurrentImage(data?.urls[data?.urls.indexOf(currentImage) + 1]);

  const nextSlideBackground = () => setcurrentImageBackground(currentImage);

  // Setting an interval time to change the image automatically
  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function autoBackground() {
    BackgroundslideInterval = setInterval(nextSlideBackground, BackgroundIntervalTime);
  }

  // Setting the auto scroll
  useEffect(() => {
    if (slideLength > 1 && autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentImage, autoScroll, auto, slideInterval]);

  useEffect(() => {
    if (slideLength > 1 && autoScroll) {
      autoBackground();
    }
    return () => clearInterval(BackgroundslideInterval);
  }, [currentImageBackground, autoScroll, autoBackground, BackgroundslideInterval]);

  // Initially setting up the image when the page loads
  useEffect(() => {
    if (slideLength) {
      setcurrentImage(data?.urls[0]);
      setcurrentImageBackground(data?.urls[slideLength - 1]);
    }
  }, [data?.urls]);

  const playSlider = () => {
    sliderSwiper?.autoplay?.start();
  };

  const pauseSlider = () => {
    sliderSwiper?.autoplay?.stop();
  };

  return (
    <div className="container px-0 md:px-[10px] mx-auto -mt-[20px] select-none">
      <div className="home-main-slider hidden md:flex">
        <Swiper
          onSwiper={setSwiperRef}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            direction: "horizontal", // Slides from right to left
            reverseDirection: true, // Reverses the direction to right to left
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true, // Enables cross-fade transition
          }}
        >
          {data?.urls?.map((img, index) => (
            <SwiperSlide key={index} onFocusCapture={pauseSlider} onBlurCapture={playSlider}>
              <Link href={img?.redirectUrl}>
                <a>
                  <img src={img.url} alt={img.redirectUrl || img.name} />
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="home-main-slider flex md:hidden mobile-slider">
        <Swiper
          loop
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
          }}
          modules={[Pagination, Navigation]}
        >
          {homePageSliderMobile?.urls?.map((img) => (
            <SwiperSlide key={img.url}>
              <Link href={img?.redirectUrl} key={img?.name}>
                <a>
                  <img className="w-full" src={img.url} alt={img.name} />
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

SectionSlider.defaultProps = {
  data: [],
  homePageSliderMobile: [],
};

SectionSlider.propTypes = {
  data: PropTypes.arrayOf(),
  homePageSliderMobile: PropTypes.arrayOf(),
};

export default SectionSlider;
