import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import DescriptionTabs from "../../description-tabs";
import LifeStyle from "../../lifeStyle";
import { SET_WISHLIST_WARNING } from "../../../../redux/actions";
import ProductNotification from "./ProductData/ProductNotification";
import BreadCrumbPdp from "./ProductData/BreadCrumbPdp";
import ProductData from "./ProductData/ProductData";
import useBannerUpdateLink from "../../../../helper/notifications/useBannerUpdateLink";
import useAmastyBanner from "../../../../helper/notifications/getAmastyBanner";
import ProductReviews from "../../reviews";
 
function ProductDescriptionLayoutThree({
  description,
  name,
  price,
  sku,
  id,
  productAttachment,
  product,
}) {
  const history = useRouter();
  const dispatch = useDispatch();
  const myRef = useRef();

  const { getUpdatedBannerLink } = useBannerUpdateLink();
  const { getPromoBanners, promoBanner, bottomPromoBanner } = useAmastyBanner();
  console.log("Inside Layout Options Data:", product);

  useEffect(() => {
    if (!history.query.isWishlist) {
      dispatch(SET_WISHLIST_WARNING(""));
    }
  }, [history]);

  useEffect(() => {
    getPromoBanners(sku, product?.categories);
  }, []);

  return (
    <div className="bg-white container mx-auto">
      <ProductNotification />

      <div className="pb-16 sm:pb-24">
        <BreadCrumbPdp product={product} />
        <div className="container mx-auto mt-8 px-0 md:px-0">
          {/*############## Display Product images, name, price, description, action buttons ##############*/}
          <ProductData product={product} price={price} promoBanner={promoBanner} myRef={myRef} />

          {/*############## Description Tabs ##############*/}
          <DescriptionTabs
            description={description}
            name={name}
            sku={sku}
            price={price}
            productAttachment={productAttachment}
          />

          <LifeStyle id={id} />

          {/*############## Reviews Section ##############*/}
          <ProductReviews myRef={myRef} id={id} />
        </div>
      </div>

      {/*############## Display Amasty Promo Banner ##############*/}
      {bottomPromoBanner?.length ? (
        bottomPromoBanner?.map((banner) => (
          <div className="mt-[10px]">
            {banner?.banner_link ? (
              <a href={getUpdatedBannerLink(banner?.banner_link)}>
                <img src={banner?.banner_img} className="w-[100%]" alt="image" />
              </a>
            ) : (
              <>
                <img src={banner?.banner_img} className="w-[100%]" alt="image" />
              </>
            )}
          </div>
        ))
      ) : (
        <></>
      )}
      {/*############## Display Amasty Promo Banner -- End ##############*/}
    </div>
  );
}

export default ProductDescriptionLayoutThree;

ProductDescriptionLayoutThree.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
