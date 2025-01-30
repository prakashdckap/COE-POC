import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import ReviewForm from "./ReviewForm";
import { SocialIcons } from "./ReviewForm";
import ReviewSubmit, { ReviewUserInfo } from "./ReviewSubmit";
import ReviewOptions from "./ReviewOptions";
import useCreateReview from "./useCreateReview";

export default function CreateNewReview({
  id,
  values,
  setvalues,
  responseMessage,
  setResponseMessage,
  toggleReview,
  setReviewsData,
  reviewsData,
}) {
  const [hasInput, setHasInput] = useState(false);
  const [recommendReview, setRecommendReview] = useState("");
  const [easyReview, setEasyReview] = useState("");

  const { createNewReview, createReviewLoading, reviewFormErrors } = useCreateReview(id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
    if (value) {
      setHasInput(true);
    }
    // Clear responseMessage if email field is changed
    if (name === "email" && responseMessage === "duplicate_review") {
      setResponseMessage("");
    }
  };

  const handleSeclectChange = useCallback((group, name) => {
    if (group === "recommendReview") {
      setRecommendReview(name);
    } else if (group === "easyReview") {
      setEasyReview(name);
    }
  }, []);

  const handleResponce = (msg) => {
    let staticReview = {
      id: 12378,
      title: values?.title,
      score: values?.score,
      user: {
        display_name: values?.name,
        is_social_connected: 0,
        social_image: null,
        user_id: 74423862,
        user_type: "User",
      },
      content: values?.review,
      email: values?.email,
      votes_down: 0,
      votes_up: 0,
      created_at: new Date(),
      custom_fields: {
        "--106825": {
          field_type: "SingleChoice",
          form_id: 7896,
          title: "Recommendation Status",
          value: recommendReview,
        },
        "--106826": {
          field_type: "Size",
          form_id: 7596,
          title: "Ease of Use",
          value: easyReview,
        },
      },
    };
    setReviewsData([staticReview, ...reviewsData]);

    setResponseMessage(msg);
    if (msg === "ok") {
      setvalues({});
      setRecommendReview("");
      setEasyReview("");
      toggleReview();
    }
  };

  // Create Review Function
  const handleCreateReview = (data) => {
    createNewReview(data, handleResponce);
  };

  const submitReview = useCallback(() => {
    handleCreateReview({
      ...values,
      recommendReview,
      easyReview,
    });
  }, [handleCreateReview, values, recommendReview, easyReview]);

  return (
    <div
      className={`${
        createReviewLoading ? "opacity-40 pointer-events-none" : null
      } pt-[47px] font-open-sans`}
    >
      <ReviewForm
        values={values}
        setvalues={setvalues}
        reviewFormErrors={reviewFormErrors}
        handleInputChange={handleInputChange}
      />
      <ReviewOptions
        handleSeclectChange={handleSeclectChange}
        recommendReview={recommendReview}
        easyReview={easyReview}
      />
      <div className="flex justify-start md:justify-end flex-wrap">
        {hasInput && <SocialIcons />}

        <ReviewUserInfo
          values={values}
          setvalues={setvalues}
          reviewFormErrors={reviewFormErrors}
          handleInputChange={handleInputChange}
        />

        <ReviewSubmit
          reviewFormErrors={reviewFormErrors}
          responseMessage={responseMessage}
          setResponseMessage={setResponseMessage}
          submitReview={submitReview}
          createReviewLoading={createReviewLoading}
        />
      </div>
    </div>
  );
}

CreateNewReview.propTypes = {
  values: PropTypes.shape().isRequired,
  setvalues: PropTypes.func.isRequired,
};
