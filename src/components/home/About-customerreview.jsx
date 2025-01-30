import axios from "axios";
import { useEffect, useState } from "react";
import constants from "../../helper/constant";
import ReviewCarousel from "../../theme-files/carousel-section/reviewCarousel";

export default function Customerreview() {
  const [reviews, setReviews] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.yotpo.com/v1/widget/${constants.YOTPO_REVIEWS_KEY}/products/yotpo_site_reviews/reviews.json?per_page=6&page=1`
      )
      .then(({ data }) => {
        if (data?.response) {
          setReviews(data?.response?.reviews);
          setTotalReviews(data?.response?.pagination?.total || reviews?.length);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ReviewCarousel
        reviews={reviews}
        totalReviews={totalReviews}
        className="customerreview-section"
      />
    </>
  );
}
