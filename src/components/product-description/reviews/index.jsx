import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Constant from "../../../../pages/api/helper/constant";
import { reviewArray } from "./helper";
import DisplayProductReview from "./DisplayProductReview";
import { ReviewFirstUser, ReviewSuccess } from "./DisplayInformation";
import { UserFeedBack } from "./UserFeedback";
import useReviewFilterParams from "./useReviewFilterParams";
import CreateNewReview from "./CreateReview";

function ProductReviews({ myRef, id }) {
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [starDistribution, setStartDistribution] = useState({});
  const [reviewsData, setReviewsData] = useState([]);
  const [createReviewOpen, setCreateReviewOpen] = useState(false);
  const [values, setvalues] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [clearAll, setClearAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredReviews, setFilteredReviews] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [filterArr, setfilterArr] = useState(reviewArray);

  const { handleGetBodyParams } = useReviewFilterParams(id, filterArr, setClearAll);

  // To Post Review with filters
  const handleFilters = () => {
    setLoading(true);
    axios
      .post(
        `https://api-cdn.yotpo.com/v1/reviews/${Constant.YotpoSecretKey}/filter.json `,
        handleGetBodyParams()
      )
      .then((res) => {
        if (res.data.status.code === 200) {
          setReviewsData(res.data.response.reviews);
          setPagination(res?.data?.response?.pagination);
          setFilteredReviews(res?.data?.response?.found_filtered_reviews);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    axios
      .post(
        `https://api-cdn.yotpo.com/v1/reviews/${Constant.YotpoSecretKey}/filter.json?page=${currentPage} `,
        {
          domain_key: id,
          free_text_search: searchText,
          per_page: 8,
        }
      )
      .then((res) => {
        if (res.data.status.code === 200) {
          setReviewsData(res.data.response.reviews);
          setPagination(res?.data?.response?.pagination);
          setClearAll(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // To Get All Reviews
  useEffect(() => {
    if (!searchText && !clearAll) {
      setLoading(true);
      axios
        .get(
          `https://api-cdn.yotpo.com/v1/widget/${Constant.YotpoSecretKey}/products/${id}/reviews.json?page=${currentPage}`
        )
        .then((res) => {
          if (res.data.status.code === 200) {
            setReviewsData(res.data.response.reviews);
            setTotalReviews(res.data.response.bottomline.total_review);
            setAverageScore(res.data.response.bottomline.average_score);
            setStartDistribution(res.data.response.bottomline.star_distribution);
            setPagination(res.data.response?.pagination);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else if (searchText?.length) {
      handleSearch();
    }
  }, [id, currentPage, clearAll]);

  useEffect(() => {
    handleFilters();
  }, [filterArr]);

  const handleCloseSuccessMessage = () => setResponseMessage("");

  const toggleReview = () => setCreateReviewOpen(!createReviewOpen);

  const openWriteReview = () => {
    setCreateReviewOpen(!createReviewOpen);
    handleCloseSuccessMessage();
  };

  return (
    <div className="mt-5">
      <div ref={myRef} className="flex items-center flex-col border-t  border-[#e3e3e3] relative">
        <DisplayProductReview
          openWriteReview={openWriteReview}
          reviewsData={reviewsData}
          totalReviews={totalReviews}
          averageScore={averageScore}
          starDistribution={starDistribution}
          filterArr={filterArr}
          setfilterArr={setfilterArr}
        />
      </div>

      {createReviewOpen ? (
        <CreateNewReview
          id={id}
          values={values}
          setvalues={setvalues}
          responseMessage={responseMessage}
          setResponseMessage={setResponseMessage}
          toggleReview={toggleReview}
          setReviewsData={setReviewsData}
          reviewsData={reviewsData}
        />
      ) : null}

      {responseMessage === "ok" && (
        <ReviewSuccess handleCloseSuccessMessage={handleCloseSuccessMessage} />
      )}

      {totalReviews ? (
        <UserFeedBack
          loading={loading}
          handleSearch={handleSearch}
          setSearchText={setSearchText}
          filterArr={filterArr}
          setfilterArr={setfilterArr}
          clearAll={clearAll}
          filteredReviews={filteredReviews}
          setClearAll={setClearAll}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          reviewsData={reviewsData}
          pagination={pagination}
          searchText={searchText}
        />
      ) : (
        <ReviewFirstUser openReview={toggleReview} />
      )}
    </div>
  );
}

export default ProductReviews;

ProductReviews.propTypes = {
  id: PropTypes.number.isRequired,
};
