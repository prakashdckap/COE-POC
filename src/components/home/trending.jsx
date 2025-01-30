import PropTypes from "prop-types";
import CarouselList from "../../theme-files/carousel-section/library";

export default function Trending({ trending }) {
  const productIds = trending?.selected_products?.map((item) => item?.id && parseInt(item?.id, 10));

  return <CarouselList productIds={productIds} title="Trending" trending />;
}

Trending.defaultProps = {
  trending: {},
};

Trending.propTypes = {
  trending: PropTypes.shape(),
};
