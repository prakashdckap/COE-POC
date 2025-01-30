import { useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation";
import StarRatings from "../../components/review/StarRatings";
import { NextViewArrow, PreViewArrow } from "./Assets/carouselAsset";
import CarouselCard from "./CarouselCard";

export default function ReviewCarousel({ reviews, totalReviews }) {
  const [reviewIndex, setIndex] = useState(0);
  const { asPath } = useRouter();
  const splideRef = useRef();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const initialOptions = {
    type: "loop",
    rewind: true,
    perPage: 3,
    perMove: 1,
    pagination: false,
    gap: 10,
    focus: "end",
    lazyLoad: "nearby",
    start: 0,
    arrows: false,
    interval: 2000,
    autoplay: "play",
  };

  const getClassName = () => {
    let className = "bg-skin-transparent";
    if (asPath === "/contact-us" || asPath === "/about") {
      className = "bg-[#F3F3F3]";
    }
    return className;
  };

  const slideNext = () => {
    splideRef.current?.go(reviewIndex + 1);
  };

  const slidePrev = () => {
    splideRef.current?.go(reviewIndex - 1);
  };

  return (
    <>
      <div className={`carousel-btn  ${getClassName()}`}>
        <div className="container mx-auto">
          <div className="container">
            {asPath === "/about" ? (
              <div className="text-center mb-5 pt-12 mt-12">
                <h2 className="uppercase font-bold text-xl mb-1.5 text-[#282828]">
                  CUSTOMER REVIEWS
                </h2>
                <p className="customer-para uppsercase font-medium text-lg pb-5 text-[#282828]">
                  SEE WHAT SOME OF OUR CUSTOMERS HAVE TO SAY
                </p>
                <div className="h-0.5 w-12 mx-auto bg-[#282828] text-center" />
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-wrap justify-between items-center border-b-2 border-[#e3e3e3] py-[10px]">
              <h4 className="text-[18px] text-[#4f4f4f] font-style font-bold pt-1 font-sans">
                Real Reviews From Real Customers
              </h4>
              <div className="flex justify-between items-center w-[240px] pt-1 pr-10">
                <div className="flex items-center pt-[5px] lg:pt-[5px]">
                  <StarRatings totalReviewCount star={5} />
                </div>
                <span className="text-sm text-[#6A6C77] pl-[-15px] font-style font-sans">
                  {totalReviews} Reviews
                </span>
              </div>
            </div>
          </div>

          <div className={`carousel mx-auto pt-[15px] md:pt-[15px] font-style relative`}>
            <button
              type="button"
              className="absolute top-[-38px] right-5 slide-block"
              ref={navigationPrevRef}
              onClick={slidePrev}
              tabIndex={-1}
            >
              <PreViewArrow />
            </button>
            <div className="relative">
              <div className={`carousel-review relative mb-0 md:my-2 home-swiper lg:pb-16 md:pb-8`}>
                <Splide
                  options={initialOptions}
                  aria-label="React Splide Example"
                  ref={splideRef}
                  onActive={(e, { index }) => {
                    setIndex(index);
                  }}
                  onMounted={(splide) => {
                    splide.Components.Autoplay.play();
                  }}
                >
                  <CarouselCard reviews={reviews?.filter((r) => r?.title)} />
                </Splide>
              </div>
            </div>
            <button
              type="button"
              className="absolute top-[-38px] right-0 slide-block"
              ref={navigationNextRef}
              onClick={slideNext}
              tabIndex={-1}
            >
              <NextViewArrow />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

ReviewCarousel.defaultProps = {
  title: "",
  productIds: [],
  type: "",
  reviews: [],
};

ReviewCarousel.propTypes = {
  title: PropTypes.string,
  productIds: PropTypes.arrayOf(),
  type: PropTypes.string,
  reviews: PropTypes.arrayOf(),
};
