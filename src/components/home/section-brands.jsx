import { useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation, Mousewheel, Keyboard } from "swiper";
import Heading from "../../theme-files/heading";
import ImageTag from "../../theme-files/image";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/grid";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation";
import {
  ProductNext,
  ProductPreview,
} from "../../theme-files/carousel-section/Assets/carouselAsset";

function SectionBrands({ featureBrands }) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  const spaceBetween = 20;

  const grid = {
    rows: 2,
    fill: "row",
  };

  const slideNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  const slidePrev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  return (
    <div className="container mx-auto feature-brands carousel-btn">
      <div className="py-14 md:pb-0  md:mt-10 relative carousel">
        <Heading className="text-[18px] md:text-[24px] font-semibold text-skin-base text-center mb-[35px]">
          FEATURED BRANDS
        </Heading>

        <div className="my-10" style={{ userSelect: "none" }}>
          <div className="relative">
            <button
              type="button"
              className="prev-arrow"
              ref={navigationPrevRef}
              aria-label="Previous"
              onClick={slidePrev}
              tabIndex={-1}
            >
              <ProductPreview />
            </button>
            <Swiper
              slidesPerView={6}
              spaceBetween={spaceBetween}
              grid={grid}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: spaceBetween,
                  grid: grid,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: spaceBetween,
                  grid: grid,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: spaceBetween,
                  grid: grid,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: spaceBetween,
                  grid: grid,
                },
              }}
              modules={[Grid, Pagination, Navigation, Mousewheel, Keyboard]}
              navigation={{
                // Both prevEl & nextEl are null at render so this does not work
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              ref={swiperRef}
            >
              {featureBrands?.urls?.length ? (
                <div>
                  {featureBrands?.urls?.map((url) => {
                    return (
                      <SwiperSlide key={url}>
                        <div
                          key={url?.url}
                          className="carousel-item brand-carousel-item text-center snap-start relative"
                        >
                          <Link href={`${url?.redirectUrl}`}>
                            <a className="relative flex items-center justify-center p-[20px] hover:scale-110 duration-500">
                              <ImageTag
                                className="object-contain"
                                src={url?.url || ""}
                                width={213}
                                height={213}
                                alt={url.redirectUrl?.replaceAll("_", " ")}
                              />
                            </a>
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
              ) : null}
            </Swiper>
            <button
              type="button"
              className="next-arrow"
              onClick={slideNext}
              ref={navigationNextRef}
              aria-label="Next"
              tabIndex={-1}
            >
              <ProductNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

SectionBrands.defaultProps = {
  featureBrands: {},
};

SectionBrands.propTypes = {
  featureBrands: PropTypes.shape(),
};

export default SectionBrands;
