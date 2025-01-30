import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import PropTypes from "prop-types";

import QuickView from "../../components/product-description/quick-view";
import Heading from "../heading";
import { breakpoints, ProductNext, ProductPreview } from "./Assets/carouselAsset";
import ProductCard from "../../components/product-listing/ListActions/Magento/MagentoProductCard";
import constants from "../../helper/constant";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ProductSuggesion({ productsList = [], title, hideMobileBtn = false }) {
  const [show, setShow] = useState(false);
  const [quickView, setQuickView] = useState("");

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  SwiperCore.use([Autoplay]);

  const getImageUrl = (product) => {
    if (product) {
      if (product?.image?.url) return product?.image?.url;
      else if (product?.image_url) return constants.magentoBaseUrl + product?.image_url;
      return "";
    }
  };

  const pricePath = (price) => {
    let priceNumber = Number(price?.replace("$", ""));
    return { price_range: { minimum_price: { final_price: { value: priceNumber } } } };
  };

  const getProductsDetails = (product) => {
    if (product) {
      if (product?.price_range?.minimum_price?.final_price?.value) return product;
      else if (!product?.price_range?.minimum_price?.final_price?.value) {
        return {
          ...product,
          ...pricePath(product.price),
        };
      }
      return product;
    }
    return {};
  };

  const slideNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const slidePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <>
      <div className={`carousel-btn bg-[#f0f0f0]}`}>
        <div className="container mx-auto">
          <div className={`carousel mx-auto pt-[15px] md:pt-[15px] font-Montserrat relative`}>
            {title ? (
              <Heading
                className={`text-[18px] md:text-[24px] uppercase ${
                  title === "Trending" ? "font-bold" : "font-semibold"
                } text-skin-base text-center mb-[35px]`}
              >
                {title}
              </Heading>
            ) : null}
            <div className="relative">
              <button
                type="button"
                className={`prev-arrow ${hideMobileBtn && "hide-mobile-btn"}`}
                ref={navigationPrevRef}
                onClick={slidePrev}
                aria-label="Previous"
                tabIndex={-1}
              >
                <ProductPreview />
              </button>
              <div className={`relative mb-0 md:my-2 home-swiper lg:pb-16 md:pb-8`}>
                <Swiper
                  spaceBetween={50}
                  loop={false}
                  autoplay={false}
                  speed={500}
                  slidesPerView={6}
                  slidesPerGroup={1}
                  modules={[Autoplay, Navigation, Pagination]}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={{
                    // Both prevEl & nextEl are null at render so this does not work
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  breakpoints={breakpoints}
                  ref={swiperRef}
                >
                  {productsList?.map((product) => {
                    return (
                      <SwiperSlide key={product.sku}>
                        <ProductCard
                          key={product?.id}
                          productView={false}
                          imgUrl={getImageUrl(product)}
                          product={getProductsDetails(product)}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <button
                type="button"
                className={`next-arrow ${hideMobileBtn && "hide-mobile-btn"}`}
                ref={navigationNextRef}
                onClick={slideNext}
                aria-label="Next"
                tabIndex={-1}
              >
                <ProductNext />
              </button>
            </div>
          </div>
        </div>
      </div>

      {quickView ? (
        <QuickView show={show} setShow={setShow} url={quickView} setQuickView={setQuickView} />
      ) : null}
    </>
  );
}

ProductSuggesion.defaultProps = {
  title: "",
  productSkus: [],
};

ProductSuggesion.propTypes = {
  title: PropTypes.string,
  productSkus: PropTypes.arrayOf(),
};
