import axios from "axios";
import React from "react";
import Review from "../../../src/components/review/review";
import constants from "../../../src/helper/constant";

export default function Reviews(data) {
  return <Review data={data} />;
}

export async function getServerSideProps() {
  return axios
    .get(
      `https://api-cdn.yotpo.com/v1/widget/${constants.YOTPO_REVIEWS_KEY}/products/yotpo_site_reviews/reviews.json?star=5&&per_page=10`
    )
    .then((res) => {
      console.log(res.data);
      return { props: res.data };
    });
}
