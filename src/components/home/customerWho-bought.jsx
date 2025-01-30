import PropTypes from "prop-types";
import CarouselList from "../../theme-files/carousel-section/library";

export default function CustomerWhoBought({ trending }) {

  const productIds = trending?.selected_products?.map((item) => item?.id && parseInt(item?.id, 10));

  return <CarouselList productIds={productIds} title="CUSTOMERS WHO BOUGHT THIS ITEM ALSO BOUGHT" trending />;
}

CustomerWhoBought.defaultProps = {
  trending: {},
};

CustomerWhoBought.propTypes = {
  trending: PropTypes.shape(),
};


// import React from 'react'

// const CustomerWhoBought = () => {
//   return (
//     <div>customerWhoBought</div>
//   )
// }

// export default CustomerWhoBought