import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import ImageTag from "../../../../theme-files/image";
import QuickView from "../../../product-description/quick-view";
import Review from "../../../review";
import constants from "../../../../helper/constant";
import { removeCache } from "../../../../helper/removeCache";
import { Gtag_SelectItemEvent } from "../../../../utils/google-tags/events";

export default function ProductCard({ productView, imgUrl, product }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { id, name, url_key, categories, price_range } = product;
  const price = price_range?.minimum_price?.final_price?.value || 0;
  const regularPrice = price_range?.minimum_price?.regular_price?.value || 0;

  function stopPropagation(e) {
    e.stopPropagation();
    if (e.key == "Enter" || e.key == " ") {
      setShow(true);
      Gtag_SelectItemEvent(product, name);
    }
  }

  return (
    <div
      className={`group relative plp-product-list p-0 md:p-0 mb-[20px] md:mb-0 ${
        productView === "list" ? "sm:flex xs:block" : null
      } `}
    >
      <div className="absolute left-2 top-[-12px] z-10 cursor-default">
        {categories?.map((category) =>
          category?.id == constants.NewArrivalsId && productView ? (
            <span className="text-[#37600b] text-[12px] font-semibold uppercase">New</span>
          ) : (
            ""
          )
        )}
      </div>

      <div
        onMouseEnter={() => setOpen(!open)}
        onMouseLeave={() => setOpen(false)}
        role="link"
        tabIndex="0"
        className={`${
          productView === "list" ? "lg:w-96 md:w-full" : "w-full"
        } relative h-70  rounded-lg aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75`}
      >
        <Link
          href={`/${url_key?.replace(".html", "")}`}
          style={{ backgroundImage: `url(${removeCache(imgUrl) || ""})` }}
        >
          <ImageTag
            src={imgUrl && removeCache(imgUrl)}
            alt={`${name} Price $${price}`}
            className={`${productView === "list" ? "h-auto" : "h-full"} w-full object-contain`}
            width="300"
            height="300"
          />
        </Link>
      </div>

      <div className={`${productView === "list" ? "sm:ml-10 mt-4 sm:mt-0" : "mt-4"}`}>
        <div className="text-center leading-[16px] md:leading-[22px] mb-1">
          <Link href={`/${url_key?.replace(".html", "")}`}>
            <a className="text-skin-base hover:text-skin-primary font-medium text-[13px] leading-[1.35] md:text-[14px] cursor-pointer text-center hover:underline">
              {name}
            </a>
          </Link>
        </div>

        <p className="font-semibold text-sm text-skin-base mb-[5px] md:mb-3 text-center">
          ${price?.toFixed(2)}
          <span className="text-[#636363] pl-1">
            {regularPrice && price !== regularPrice ? (
              <span>
                {" "}
                <del>${regularPrice}</del> &nbsp;{" "}
              </span>
            ) : (
              ""
            )}
          </span>
        </p>
        <div className="text-center justify-center">
          <Review productId={id} productListingPage />
        </div>
      </div>

      <div
        className="absolute top-[50px] left-0 text-center transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100 quick-view w-full flex justify-center mt-14"
        onClick={stopPropagation}
        onKeyPress={stopPropagation}
        role="button"
        tabIndex="0"
        aria-label="Quick View Button"
      >
        <button
          type="button"
          className="text-sm md:inline-flex items-center px-[13px] py-[5px] border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-primary bg-skin-secondary hover:bg-skin-button-secondary-hover leading-[35px] hidden"
          onClick={() => {
            setShow(true);
            Gtag_SelectItemEvent(product, name);
          }}
          tabIndex="-1"
        >
          Quick View
        </button>
      </div>
      {show ? <QuickView show={show} setShow={setShow} id={id} url={url_key} /> : null}
    </div>
  );
}

ProductCard.defaultProps = {
  productView: "",
  imgUrl: "",
  product: {},
};

ProductCard.propTypes = {
  productView: PropTypes.string,
  imgUrl: PropTypes.string,
  product: PropTypes.shape(),
};
