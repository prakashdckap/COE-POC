import { memo, useEffect, useMemo, useState } from "react";

import ProductReviewFilterButtons from "./ReviewFilterButtons";
import ReviewPagination from "../review-pagination";
import ReviewList from "./ProductReviewList";
import HandleReviewFilters, { ClearAllFilter, ReviewsNotFound } from "./FilterReviews";

function UserReview({
  loading,
  handleSearch,
  setSearchText,
  filterArr,
  setfilterArr,
  clearAll,
  filteredReviews,
  setClearAll,
  reviewsData,
  currentPage,
  setCurrentPage,
  pagination,
  searchText,
}) {
  const [votesArr, setVotesArr] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedDropDown, setselectedDropDown] = useState({ id: 0, status: false });

  const votes = useMemo(() => {
    return reviewsData?.map((data) => ({
      upVote: false,
      downVote: false,
      id: data?.id,
    }));
  }, [reviewsData]);

  // To initiall set the upVotes and DownVotes in a single object with id
  useEffect(() => {
    setVotesArr(votes);
  }, [votes]);

  // Clear all filters
  const clearAllFilters = () => {
    const resetArr = filterArr?.map((obj) => ({
      ...obj,
      buttonName: obj.defaultbuttonName,
      listItems: obj?.listItems?.map((item) => {
        if (obj.label === "sort" && item?.name?.toLowerCase() === "select") {
          return {
            ...item,
            selected: true,
          };
        }
        return {
          ...item,
          selected: false,
        };
      }),
    }));
    setfilterArr(resetArr);
    setClearAll(false);
    setSearchText("");
  };

  return (
    <div>
      <div
        className={`${
          loading ? "opacity-40 pointer-events-none" : null
        } flex justify-start md:justify-center items-center mt-[45px] py-4 ratings-overflow`}
      >
        <HandleReviewFilters
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          setSearchText={setSearchText}
          searchText={searchText}
          handleSearch={handleSearch}
        />

        {!searchOpen &&
          filterArr?.map((filter) => (
            <ProductReviewFilterButtons
              key={filter.id}
              buttonName={filter.buttonName}
              defaultButtonName={filter.defaultbuttonName}
              listItems={filter.listItems}
              id={filter.id}
              setselectedDropDown={setselectedDropDown}
              selectedDropDown={selectedDropDown}
              setfilterArr={setfilterArr}
              filterArr={filterArr}
              label={filter.label}
            />
          ))}
      </div>
      {clearAll && filteredReviews ? <ClearAllFilter clearAllFilters={clearAllFilters} /> : ""}

      <div className={`${loading ? "opacity-40 pointer-events-none" : null} reviews my-5`}>
        {reviewsData?.length ? (
          reviewsData.map((data) => (
            <ReviewList data={data} votesArr={votesArr} setvotesArr={setVotesArr} key={data?.id} />
          ))
        ) : (
          <ReviewsNotFound clearAllFilters={clearAllFilters} />
        )}
      </div>

      {reviewsData.length > 0 && (
        <ReviewPagination
          pageSize={Math.ceil(pagination?.total / pagination?.per_page)}
          currentPage={currentPage}
          setPageIndex={setCurrentPage}
        />
      )}
    </div>
  );
}

export const UserFeedBack = memo(UserReview);
