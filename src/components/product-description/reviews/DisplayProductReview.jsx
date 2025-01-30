import { StarOutline } from "heroicons-react";
import { PencilIcon } from "@heroicons/react/solid";

import Heading from "../../../theme-files/heading";
import Paragraph from "../../../theme-files/paragraph";
import ReviewProgressBar from "../review-progress-bar";

function DisplayProductReview({
  starDistribution,
  openWriteReview = () => {},
  reviewsData,
  totalReviews = 0,
  averageScore,
  filterArr = [],
  setfilterArr,
}) {
  return (
    <>
      <Heading className="font-bold hidden md:flex text-[20px] my-10">Ratings & Reviews</Heading>
      <div className="flex justify-between items-center md:hidden w-full">
        <Heading className="font-bold block md:hidden text-[18px] my-10">Ratings & Reviews</Heading>
        <div className="flex justify-between items-center">
          <button
            onClick={openWriteReview}
            type="button"
            className="text-[#136bea] md:border py-1.5 px-2 text-sm md:text-[#6B6D76] flex justify-self-end content-end items-end self-end place-items-end"
          >
            Write A Review
          </button>
        </div>
      </div>
      <div className={`flex w-full ${starDistribution ? "justify-end" : "justify-between"}`}>
        <div
          className={`flex ${
            averageScore > 0 ? "w-full sm:w-8/12 md:w-10/12 lg:w-8/12" : "w-[100%]"
          }  justify-center sm:justify-between items-center`}
        >
          <ReviewProgressBar
            totalReviews={totalReviews}
            averageScore={averageScore}
            starDistribution={starDistribution}
            filterArr={filterArr}
            setfilterArr={setfilterArr}
          />
          <div className="absolute top-10 right-0 md:static hidden md:flex md:items-end ">
            <button
              onClick={openWriteReview}
              type="button"
              className="text-[#136bea] flex justify-between items-center md:border py-1.5 px-2 text-sm font-medium md:text-[#6B6D76]"
            >
              <PencilIcon className="w-5 h-5 mr-2 text-[#2f84ed]" />
              Write A Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayProductReview;

function DisplayStars({ totalReviews }) {
  return (
    <div className="hidden md:block">
      <div className="relative h-[1.5rem] my-3 w-[120px] overflow-hidden block mx-auto">
        <div className="flex absolute top-0 left-0 w-[100%] text-skin-base justify-center">
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
        </div>
        <div className="flex absolute top-0 left-0 overflow-hidden text-skin-base justify-center w-[100%]">
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
          <i className="inline">
            <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </i>
        </div>
      </div>
      <Paragraph className="text-[#000] text-[12px] font-normal text-xs ml-[1.5rem] lg:ml-2">
        {totalReviews > 0 ? `${totalReviews} ` : "0 "}
        Reviews
      </Paragraph>
    </div>
  );
}