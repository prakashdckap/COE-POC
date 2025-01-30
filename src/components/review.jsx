import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Paragraph from "../theme-files/paragraph";
import Constant from "../helper/constant";

export default function Review({ productId, pdp, myRef, quickView }) {
  const [totalReviews, setTotalReviews] = useState(null);
  const [averageScore, setAverageScore] = useState();

  const executeScroll = () => {
    myRef?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.yotpo.com/v1/widget/${Constant.YOTPO_REVIEWS_KEY}/products/${productId}/reviews.json`
      )
      .then((res) => {
        setTotalReviews(res?.data?.response?.bottomline?.total_review);
        setAverageScore(res?.data?.response?.bottomline?.average_score);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  return (
    <div>
      {totalReviews || totalReviews === 0 ? (
        totalReviews > 0 ? (
          <div
            className={`${pdp ? "justify-center md:justify-start py-2" : ""} ${
              quickView ? "pt-[15px] pb-[20px] border-b border-[#979797] justify-start" : "justify-center"
            } flex-row md:flex-row flex items-center`}
          >
            <div
              className={`${pdp ? "cursor-pointer" : "cursor-auto"} flex`}
              onClick={() => executeScroll()}
              role="button"
              onKeyDown={() => executeScroll()}
              tabIndex="0"
            >
              <div className="mr-1 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => {
                  if (Math.floor(averageScore) > rating) {
                    // Render a filled star
                    return (
                      <svg
                        key={rating}
                        className="h-[15px] w-[15px] md:h-[17.5px] md:w-[17.5px] flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    );
                  } else if (
                    Math.floor(averageScore) === rating &&
                    averageScore % 1 > 0 &&
                    averageScore % 1 >= 0.75
                  ) {
                    return (
                      <svg
                        key={rating}
                        className="h-[15px] w-[15px] md:h-[17.5px] md:w-[17.5px] flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    );
                  } else if (
                    Math.floor(averageScore) === rating &&
                    averageScore % 1 > 0 &&
                    averageScore % 1 >= 0.3 &&
                    averageScore % 1 < 0.75
                  ) {
                    // Render a half star
                    return (
                      <Paragraph className="text-sm font-bold text-skin-base">
                        <i className="fa fa-star-half-full text-[16px]"></i>
                      </Paragraph>
                    );
                  } else {
                    // Render an empty star
                    return (
                      <svg
                        key={rating}
                        className="h-[15px] w-[15px] md:h-[17.5px] md:w-[17.5px] flex-shrink-0 mx-[2px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                      >
                        <path
                          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                          fill="none"
                          stroke="#000"
                          strokeWidth="1.5"
                        />
                      </svg>
                    );
                  }
                })}
              </div>
              <Paragraph className="text-[#000] font-normal text-[13px] ml-2">
                {totalReviews > 0 ? `${totalReviews} Reviews` : ""}
              </Paragraph>
            </div>
          </div>
        ) : (
          <>
            {pdp ? (
              <div
                className={`${pdp ? "cursor-pointer" : "cursor-auto"} flex`}
                onClick={() => executeScroll()}
                role="button"
                onKeyUp={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    executeScroll();
                  }
                }}
                tabIndex="0"
              >
                <div className="mr-1 flex items-center ">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <>
                      <svg
                        key={rating}
                        className="h-[15px] w-[15px] md:h-[17.5px] md:w-[17.5px] flex-shrink-0 mx-[2px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                      >
                        <path
                          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                          fill="none"
                          stroke="#000"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </>
                  ))}
                </div>
                <Paragraph className="text-[#000] font-normal text-[13px] ">
                  Write a review
                </Paragraph>
              </div>
            ) : null}
          </>
        )
      ) : null}
    </div>
  );
}

Review.propTypes = {
  productId: PropTypes.number.isRequired,
  pdp: PropTypes.bool.isRequired,
  myRef: PropTypes.shape().isRequired,
};