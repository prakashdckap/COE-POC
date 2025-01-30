import PropTypes from "prop-types";
import axios from "axios";
import constants from "../constant";

export default function UseReviewFilter() {
  const FilterReviews = ({ star, page, sort, direction }) => {
    const filters = `${page ? `?page=${page}` : ""}${star ? `&&star=${star}` : ""}${
      sort ? `&&sort=${sort}` : ""
    }${direction ? `&&direction=${direction}` : ""}&&per_page=10`;
    console.log({ filters });
    return axios
      .get(
        `https://api-cdn.yotpo.com/v1/widget/${constants.YOTPO_REVIEWS_KEY}/products/yotpo_site_reviews/reviews.json${filters}`
      )
      .then((res) => {
        return res.data;
      });
  };

  return { FilterReviews };
}

UseReviewFilter.defaultProps = {
  countryId: "",
};

UseReviewFilter.propTypes = {
  countryId: PropTypes.string,
};
