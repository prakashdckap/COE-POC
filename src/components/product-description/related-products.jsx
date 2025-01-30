import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import RELATED_PRODUCTS from "./graphql/query/related-products";
import SubHeading from "../../theme-files/sub-heading";
import ProductCard from "../product-listing/product-card";

function RelatedProducts({ relatedProducts }) {
  const { data: RelatedProductslist } = useQuery(RELATED_PRODUCTS, {
    variables: {
      productIds: relatedProducts,
      pageSize: 10,
      currentPage: 1,
      sort: { sortBy: "name", sortOrder: "DESC" },
    },
  });

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

  return (
    <div className="carousel container h-1/2 mx-auto">
      <section
        aria-labelledby="related-heading"
        className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
      >
        <div className="flex items-center place-content-between">
          <SubHeading
            id="related-heading"
            className="text-xl font-bold text-skin-base uppercase text-center w-full"
          >
            Related Products
          </SubHeading>
          <div className="flex">
            <button
              type="button"
              onClick={movePrev}
              className=" opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled("prev")}
            >
              <ChevronLeftIcon
                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-900 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={moveNext}
              className=" opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled("next")}
            >
              <ChevronRightIcon
                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-900 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div
          ref={carousel}
          className="carousel-container relative items-center mt-8 flex space-x-8 md:space-x-8 lg:space-x-5 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {RelatedProductslist?.products?.items?.map((product) => (
            <div key={product.id} className="carousel-item relative snap-start">
              <div className="relative w-72 cursor-pointer">
                <ProductCard
                  key={product?.id}
                  imgUrl={product?.image?.url}
                  relatedProducts
                  product={product}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RelatedProducts;

RelatedProducts.defaultProps = {
  relatedProducts: [],
};

RelatedProducts.propTypes = {
  relatedProducts: PropTypes.arrayOf(PropTypes.number),
};
