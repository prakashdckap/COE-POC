import axios from "axios";
import { useState } from "react";
import { reviewErros } from "./helper";
import useReviewFilterParams from "./useReviewFilterParams";
import Constant from "../../../../pages/api/helper/constant";

export default function useCreateReview(id) {
  const [createReviewLoading, setCreateReviewLoading] = useState(false);
  const [reviewFormErrors, setReviewFormErrors] = useState(reviewErros);

  const { handleCreateReviewValidaton } = useReviewFilterParams();

  // Create Review Function
  const createNewReview = (values, handleResponce) => {
    const validated = handleCreateReviewValidaton(values);
    if (validated === true) {
      setCreateReviewLoading(true);
      const { score, title, review, email, name, recommendReview, easyReview, star } = values;
      const { host, protocol, pathname, href } = window.location;

      // below are the example for custom fields
      // custom_fields[--106825]: "Yes, would recommend"
      // custom_fields[--106826]: "1"

      // custom_fields[--106825]: "No, would not recommend"
      // custom_fields[--106826]: "3"

      const data = {
        appkey: Constant.YotpoSecretKey,
        domain: `${protocol}//${host}`,
        sku: id,
        product_title: pathname?.replace("/", ""),
        product_url: href,
        display_name: name,
        email,
        is_incentivized: true,
        review_content: review,
        review_title: title,
        review_score: score,
        custom_fields: {
          "--106825": recommendReview,
          "--106826": easyReview,
        },
      };
      axios
        .post("https://api.yotpo.com/v1/widget/reviews", data)
        .then((res) => {
          if (res.data.message === "ok") {
            handleResponce(res.data.message);
            setReviewFormErrors(reviewErros);
          } else if (res.data.message === "duplicate_review") {
            handleResponce(res.data.message);
          }
          setCreateReviewLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCreateReviewLoading(false);
        });
    } else {
      setReviewFormErrors(validated);
    }
  };

  return { createNewReview, createReviewLoading, reviewFormErrors };
}
