import PropTypes from "prop-types";
import { useState } from "react";
import QuickView from "../../components/product-description/quick-view";
import SubHeading from "../sub-heading";
import Link from "../link";
import constants from "../../helper/constant";
import Review from "../../components/review";
import { removeCache } from "../../helper/removeCache";

function ProductCard({ product }) {
  const [show, setShow] = useState(false);
  const { name, image, customUrl, id, sku, categories, priceRange } = product;
  const price = priceRange?.minPrice?.finalPrice?.value || 0;

  function stopPropagation(e) {
    e.stopPropagation();
    if (e.key == "Enter" || e.key == " ") {
      setShow(true);
    }
  }

  return (
    <>
      <div key={sku} className="carousel-item text-center snap-start relative">
        <div className="absolute left-4 top-2.5 cursor-default">
          {categories?.includes(constants?.NewArrivalsId) ? (
            <span className="text-[#37600b] text-[12px] font-semibold uppercase ">New</span>
          ) : null}
        </div>
        <div>
          <div className="flex justify-center">
            <Link
              href={`/${customUrl?.replace(".html", "")}`}
              style={{
                backgroundImage: `url(${removeCache(JSON?.parse(image?.url || "")) || ""})`,
              }}
            >
              <img
                src={removeCache(JSON?.parse(image?.url || "")) || ""}
                alt={`${name} Price $${price}`}
                className="h-full w-full aspect-square block bg-contain home-carousel"
              />
            </Link>
          </div>

          <div className="mt-[15px] text-center">
            <Link
              href={`/${customUrl?.replace(".html", "")}`}
              className="text-skin-base text-[14px] leading-[1.35] font-medium my-[5px] hover:text-skin-primary hover:underline break-words"
            >
              {name}
            </Link>

            <SubHeading className="text-skin-base text-[14px] font-semibold">${price}</SubHeading>
            <div className="text-center justify-center mt-2.5">
              <Review productId={id} />
            </div>
          </div>
        </div>

        <div
          className="absolute top-[50px] text-center transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100 quick-view w-full flex justify-center mt-14 lg:mt-14"
          onKeyPress={stopPropagation}
          role="button"
          tabIndex="0"
          aria-label="Quick View Button"
        >
          <button
            type="button"
            className="text-sm hidden md:inline-flex items-center px-5 py-2 border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-primary bg-skin-secondary hover:bg-skin-button-secondary-hover"
            onClick={() => {
              setShow(true);
            }}
            tabIndex={-1}
          >
            Quick View
          </button>
        </div>
      </div>
      {show ? <QuickView show={show} setShow={setShow} id={id} url={customUrl} /> : null}
    </>
  );
}

export default ProductCard;

ProductCard.defaultProps = {
  price: 0,
};

ProductCard.propTypes = {
  price: PropTypes.number,
};
