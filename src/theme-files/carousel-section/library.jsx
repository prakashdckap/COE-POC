import { useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import PropTypes from "prop-types";

import PRODUCT_DETAIL from "./graphql/query/single-product";
import QuickView from "../../components/product-description/quick-view";
import ProductCard from "./product-card";
import Heading from "../heading";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation";
import { breakpoints, ProductNext, ProductPreview } from "./Assets/carouselAsset";
import ProductCardSckeleton from "./Assets/ProductCardSckeleton";

export default function CarouselList({ productIds, title }) {
  const [show, setShow] = useState(false);
  const [quickView, setQuickView] = useState("");

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  SwiperCore.use([Autoplay]);

  const { data: singleProduct, loading } = useQuery(PRODUCT_DETAIL, {
    skip: !productIds?.length,
    variables: {
      productId: productIds,
    },
  });

  const slideNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  const slidePrev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  return (
    <>
      <div className={`carousel-btn bg-[#f0f0f0]}`} role="region" aria-labelledby={title}>
        <div className="container mx-auto">
          <div className={`carousel mx-auto pt-[15px] md:pt-[15px] font-Montserrat relative`}>
            {title ? (
              <Heading
                className={`text-[18px] md:text-[24px] uppercase ${
                  title === "Trending" ? "font-bold" : "font-semibold"
                } text-skin-base text-center mb-[35px]`}
                id={title}
              >
                {title}
              </Heading>
            ) : null}
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
              <div className={`relative mb-0 md:my-2 home-swiper lg:pb-16 md:pb-8`}>
                {loading ? (
                  <ProductCardSckeleton />
                ) : (
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
                    {singleProduct?.products?.items?.map((product) => (
                      <SwiperSlide key={product.sku}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <button
                type="button"
                className="next-arrow"
                ref={navigationNextRef}
                aria-label="Next"
                onClick={slideNext}
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

CarouselList.defaultProps = {
  title: "",
  productIds: [],
};

CarouselList.propTypes = {
  title: PropTypes.string,
  productIds: PropTypes.arrayOf(),
};
