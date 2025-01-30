import PropTypes from "prop-types";
import CarouselList from "../../theme-files/carousel-section/library";

export default function NewArrivals({ newArrivals }) {
  const productIds = newArrivals?.selected_products?.map(
    (item) => item?.id && parseInt(item?.id, 10)
  );

  return <CarouselList productIds={productIds} title="New Arrivals" newArrivals />;
}

NewArrivals.defaultProps = {
  newArrivals: {},
};

NewArrivals.propTypes = {
  newArrivals: PropTypes.shape(),
};
