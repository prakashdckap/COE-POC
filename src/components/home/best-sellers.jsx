import PropTypes from "prop-types";
import CarouselList from "../../theme-files/carousel-section/library";

export default function BestSellers({ bestSellers }) {
  const productIds = bestSellers?.selected_products?.map(
    (item) => item?.id && parseInt(item?.id, 10)
  );

  return <CarouselList productIds={productIds} title="BestSellers" bestSellers />;
}

BestSellers.defaultProps = {
  bestSellers: {},
};

BestSellers.propTypes = {
  bestSellers: PropTypes.shape(),
};
