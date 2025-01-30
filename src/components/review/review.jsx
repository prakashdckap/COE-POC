import React, { useEffect, useState } from "react";
import {
  AdjustmentsOutline,
  CheckCircle,
  Star,
  StarOutline,
  ThumbDown,
  ThumbUp,
  X,
} from "heroicons-react";
import { useQuery } from "@apollo/client";
import { XCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import StarRatings from "./StarRatings";
import Pagination from "./pagination";
import YOTPO_REVIEWS from "./graphql/query/yotpo-reviews";
import SEOHead from "../../helper/SEOHeader";
import constants from "../../helper/constant";
import { calculatePercentage } from "./reviewhelper/review-helper";

const HelperFunc = (reviewsData) => {
  let totalScore = 0;
  reviewsData?.yotpoReviews &&
    Object.values(reviewsData?.yotpoReviews?.bottomline?.starDistribution).forEach((value) => {
      if (!isNaN(value)) {
        totalScore += parseInt(value);
      }
    });
  const StartOne = (
    (reviewsData?.yotpoReviews.bottomline.starDistribution["oneStar"] / totalScore) *
    100
  ).toFixed();

  const StartTwo = (
    (reviewsData?.yotpoReviews.bottomline.starDistribution["twoStar"] / totalScore) *
    100
  ).toFixed();

  const StartThree = (
    (reviewsData?.yotpoReviews.bottomline.starDistribution["threeStar"] / totalScore) *
    100
  ).toFixed();

  const StartFour = (
    (reviewsData?.yotpoReviews.bottomline.starDistribution["fourStar"] / totalScore) *
    100
  ).toFixed();

  const StartFive = (
    (reviewsData?.yotpoReviews.bottomline.starDistribution["fiveStar"] / totalScore) *
    100
  ).toFixed();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return { months, StartOne, StartTwo, StartThree, StartFive, StartFour };
};

export default function Review() {
  const history = useRouter();
  const [starFilter, setStarFilter] = useState(
    history?.query?.filter_score ? Number(history?.query?.filter_score) : 0
  );
  const [sortType, setSortType] = useState("created_at");
  const [pageIndex, setPageIndex] = useState(1);
  const [showreviewpopup, setreviewpopup] = useState(false);
  const [filterValue, setFilterValue] = useState(
    history?.query?.filter_score ? Number(history?.query?.filter_score) : starFilter
  );
  const [hostName, setHostName] = useState("");

  const updateStartFilter = (e) => {
    setFilterValue(Number(e.target.value));
  };

  const {
    loading,
    data: reviewsData,
    refetch,
  } = useQuery(YOTPO_REVIEWS, {
    variables: {
      pageSize: 10,
      currentPage: pageIndex || 1,
      filter: {
        sort: sortType,
        score: starFilter,
      },
    },
  });

  const handleCloseFilter = () => {
    setStarFilter(0);
    setFilterValue(0);
    history?.push("/reviews");
  };

  useEffect(() => {
    if (history?.query?.filter_score) {
      setFilterValue(Number(history?.query?.filter_score));
      setStarFilter(Number(history?.query?.filter_score));
    } else {
      setFilterValue(0);
      setStarFilter(0);
    }
  }, [history]);

  useEffect(() => {
    if (pageIndex !== undefined && pageIndex !== 1) {
      refetch({
        variables: {
          pageSize: 10,
          currentPage: pageIndex || 1,
          filter: {
            sort: sortType,
            score: starFilter,
          },
        },
      });
    }
  }, [pageIndex, sortType, starFilter, refetch]);

  const { months, StartOne, StartTwo, StartThree, StartFive, StartFour } = HelperFunc(reviewsData);

  useEffect(() => {
    setHostName(`${window.location.protocol}//${window.location.host}/`);
  }, []);

  return (
    <>
      <SEOHead
        title="Review - Element Vape"
        description="Review - Element Vape"
        canonicalUrl={`${constants.replaceUrl}/${history?.query?.slug?.[0]}`}
      />
      <div
        className={`container mx-auto font-sans  ${
          loading ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-wrap pb-6 xl:p-10 ">
          <div className="w-full md:w-6/12 py-10 px-6 md:py-[70px] md:px-[50px] font-sans bg-[#f1f5f8]">
            <span className="uppercase text-sm font-semibold pl-[2px] text-[#222e46]">
              CUSTOMER REVIEWS
            </span>
            <h2 className="text-base text-[#222e46] text-[21px] md:text-[34px] font-bold w-full lg:w-11/12 leading-snug">
              Hear what customers are saying about our service and products!
            </h2>
            <div className="relative h-[1.5rem] w-[120px] mb-2 overflow-hidden block">
              <div className="flex absolute text-[#222e46] top-0 left-0 w-[100%]">
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
              </div>
              <div className="flex absolute text-[#222e46] top-0 left-0 w-[100%] overflow-hidden">
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
              </div>
            </div>
            <span className="text-xs font-medium font-sans mt-4 inline-block tracking-wider text-[#6a6c77]">
              {reviewsData?.yotpoReviews?.bottomline?.starDistribution?.fiveStar}+ Five-Star Reviews
            </span>
          </div>
          <div className="w-full md:w-6/12 mt-6 md:mt-0">
            <h2 className="text-center font-bold text-xl text-[#222e46] md:text-[34px] leading-[30px] mb-1">
              {reviewsData?.yotpoReviews?.bottomline?.totalReview} Reviews
            </h2>
            <div className="relative h-[1.5rem] w-[120px] overflow-hidden block mx-auto">
              <div className="flex absolute top-0 left-0 w-[100%] text-[#d6921f]">
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
                <i className="inline">
                  <StarOutline />
                </i>
              </div>
              <div
                className={`flex absolute top-0 left-0  overflow-hidden text-[#d6921f]`}
                style={{
                  width: `${calculatePercentage(
                    reviewsData?.yotpoReviews.bottomline.averageScore?.toFixed(2)
                  )}%`,
                }} // Set the width dynamically
              >
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
                <i className="inline">
                  <Star />
                </i>
              </div>
            </div>
            <h4 className="text-center font-bold text-[13px] mt-3 text-[#222e46]">
              {reviewsData?.yotpoReviews.bottomline.averageScore?.toFixed(2)} of 5 stars
            </h4>
            <div className="pl-4 lg:pl-10 xl:pl-16">
              <div className="flex justify-between mt-3">
                <span className="inline-block whitespace-nowrap sm:w-[10%] text-[13px]">
                  5 Star
                </span>
                <span className="bg-neutral-100 h-6 w-[70%] sm:w-[80%] md:w-[70%] inline-block overflow-hidden">
                  <span
                    className="bg-[#212f46] h-6  inline-block"
                    style={{ width: `${StartFive}%` }}
                  >
                    .
                  </span>
                </span>
                <span className="inline-block sm:w-[7.5%] text-left sm:pl-1.5 text-[13px]">
                  {parseInt(StartFive, 10) || "<1"}%
                </span>
              </div>
              <div className="flex flex-wrap justify-between mt-3">
                <span className="inline-block whitespace-nowrap sm:w-[10%] text-[13px]">
                  4 Star
                </span>
                <span className="bg-neutral-100 h-6 w-[70%] sm:w-[80%] md:w-[70%] inline-block overflow-hidden">
                  <span
                    className="bg-[#212f46] h-6 inline-block"
                    style={{ width: `${StartFour}%` }}
                  >
                    .
                  </span>
                </span>
                <span className="inline-block sm:w-[7.5%] text-left sm:pl-1.5 text-[13px]">
                  {parseInt(StartFour, 10) || "<1"}%
                </span>
              </div>
              <div className="flex flex-wrap justify-between mt-3">
                <span className="inline-block whitespace-nowrap sm:w-[10%] text-[13px]">
                  3 Star
                </span>
                <span className="bg-neutral-100 h-6 w-[70%] sm:w-[80%] md:w-[70%] inline-block overflow-hidden">
                  <span
                    className="bg-[#212f46] h-6 inline-block"
                    style={{ width: `${StartThree}%` }}
                  >
                    .
                  </span>
                </span>
                <span className="inline-block sm:w-[7.5%] text-left sm:pl-1.5 text-[13px]">
                  {parseInt(StartThree, 10) || "<1"}%
                </span>
              </div>
              <div className="flex flex-wrap justify-between mt-3">
                <span className="inline-block whitespace-nowrap sm:w-[10%] text-[13px]">
                  2 Star
                </span>
                <span className="bg-neutral-100 h-6 w-[70%] sm:w-[80%] md:w-[70%] inline-block overflow-hidden">
                  <span className="bg-[#212f46] h-6 inline-block" style={{ width: `${StartTwo}%` }}>
                    .
                  </span>
                </span>
                <span className="inline-block sm:w-[7.5%] text-left sm:pl-1.5 text-[13px]">
                  {parseInt(StartTwo, 10) || "<1"}%
                </span>
              </div>
              <div className="flex flex-wrap justify-between mt-3">
                <span className="inline-block whitespace-nowrap sm:w-[10%] text-[13px]">
                  1 Star
                </span>
                <span className="bg-neutral-100 h-6 w-[70%] sm:w-[80%] md:w-[70%] inline-block overflow-hidden">
                  <span className="bg-[#212f46] h-6 inline-block" style={{ width: `${StartOne}%` }}>
                    .
                  </span>
                </span>
                <span className="inline-block sm:w-[7.5%] text-left sm:pl-1.5 text-[13px]">
                  {parseInt(StartOne, 10) || "<1"}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <span
                role="button"
                tabIndex={0}
                // onKeyDown={(event) => (event.key === 13 ? setreviewpopup(!showreviewpopup) : null)}
                className="w-6/12 text-left text-[#282828]"
                onClick={() => {
                  setreviewpopup(!showreviewpopup);
                }}
                onKeyDown={() => {
                  setreviewpopup(!showreviewpopup);
                }}
              >
                <i className="cursor-pointer rotate-90 inline-block align-middle">
                  <AdjustmentsOutline />
                </i>
                <span className="inline-block align-middle ml-1 text-[15px] font-semibold cursor-pointer">
                  filter
                </span>
              </span>

              {starFilter > 0 ? (
                <span>
                  <span className="inline-block align-middle mt-0.5 ml-5 font-medium text-[13px] text-skin-base font-sans">
                    Rating:
                  </span>
                  <span className="inline-block align-middle mt-1 ml-1 font-medium text-[13px] text-skin-base font-sans">
                    {starFilter > 0 ? starFilter : ""}
                  </span>
                  <span
                    onClick={() => handleCloseFilter()}
                    onKeyUp={() => handleCloseFilter()}
                    role="button"
                    tabIndex="0"
                    className="inline-block text-[#840205] align-middle mt-1 ml-1 font-medium text-[13px] text-skin-base font-sans"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>
            {showreviewpopup ? (
              <div className="fixed top-0 left-0 w-full h-[100%] z-50 bg-gray-700/50 flex justify-center">
                <div className="w-[19rem] h-[21rem] bg-white mt-7">
                  <div className="float-right">
                    <button
                      type="button"
                      className="bg-skin-primary text-skin-inverted p-2"
                      onClick={() => {
                        setreviewpopup(!showreviewpopup);
                      }}
                    >
                      <X />
                    </button>
                  </div>
                  <div className="p-10 w-[230px] mx-auto">
                    <div className="mb-3.5">
                      <input
                        id="allreview"
                        name="review"
                        type="radio"
                        checked={filterValue === 0}
                        value={0}
                        onChange={(e) => updateStartFilter(e)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 align-middle"
                      />
                      <label htmlFor="allreview" className="ml-3 text-sm font-medium text-gray-700">
                        All reviews
                      </label>
                    </div>
                    <div className="flex flex-wrap items-center mb-3.5">
                      <input
                        id="fivestar"
                        name="review"
                        checked={filterValue === 5}
                        onChange={(e) => updateStartFilter(e)}
                        type="radio"
                        value={5}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 align-middle"
                      />
                      <label htmlFor="fivestar" className="ml-3 text-sm font-medium text-gray-700">
                        <StarRatings star={5} />
                      </label>
                    </div>
                    <div className="flex flex-wrap items-center mb-3.5">
                      <input
                        id="fourstar"
                        name="review"
                        checked={filterValue === 4}
                        onChange={(e) => updateStartFilter(e)}
                        type="radio"
                        value={4}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 align-middle"
                      />
                      <label htmlFor="fourstar" className="ml-3 text-sm font-medium text-gray-700">
                        <StarRatings star={4} />
                      </label>
                    </div>
                    <div className="flex flex-wrap items-center mb-3.5">
                      <input
                        id="threestar"
                        name="review"
                        checked={filterValue === 3}
                        onChange={(e) => updateStartFilter(e)}
                        type="radio"
                        value={3}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 align-middle"
                      />
                      <label htmlFor="threestar" className="ml-3 text-sm font-medium text-gray-700">
                        <StarRatings star={3} />
                      </label>
                    </div>
                    <div className="flex flex-wrap items-center mb-3.5">
                      <input
                        id="twostar"
                        name="review"
                        checked={filterValue === 2}
                        onChange={(e) => updateStartFilter(e)}
                        type="radio"
                        value={2}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 align-middle"
                      />
                      <label htmlFor="twostar" className="ml-3 text-sm font-medium text-gray-700">
                        <StarRatings star={2} />
                      </label>
                    </div>
                    <div className="flex flex-wrap items-center">
                      <input
                        id="onestar"
                        name="review"
                        checked={filterValue === 1}
                        onChange={(e) => updateStartFilter(e)}
                        type="radio"
                        value={1}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 align-middle"
                      />
                      <label htmlFor="onestar" className="ml-3 text-sm font-medium text-gray-700">
                        <StarRatings star={1} />
                      </label>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="w-[75px] text-center text-[13px] bg-skin-primary text-skin-inverted py-1 mt-4"
                        onClick={() => {
                          setStarFilter(filterValue);
                          setreviewpopup(!showreviewpopup);
                          if (filterValue) {
                            history?.push(`?filter_score=${Number(filterValue)}`);
                          }
                        }}
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="w-3/12 md:w-6/12 mt-1 md:mt-0">
              <select
                id="country"
                name="country"
                autoComplete="country"
                onChange={({ target: { value } }) => setSortType(value)}
                className="block sm:w-3/12 md:w-4/12 lg:w-3/12 xl:w-3/12 2xl:w-2/12 border-b border-[#282828] float-right cursor-pointer text-xs"
              >
                <option value="created_at">Most Recent</option>
                <option value="votes_up">Most Votes</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-between mb-6">
            {reviewsData?.yotpoReviews?.items.map((review, i) => {
              return (
                <div key={i} className="w-full md:w-[49%] mt-2 mb-[20px] p-6 bg-[#fff9f1]">
                  <div className="flex flex-wrap justify-between">
                    <div className="flex">
                      <StarRatings star={review?.score} />
                    </div>
                    <span className="text-right font-normal text-[13px]">
                      {`${months[new Date(review?.createdAt).getMonth()]} ${new Date(
                        review?.createdAt
                      ).getDate()} ${new Date(review?.createdAt).getFullYear()}`}
                    </span>
                  </div>
                  <h3
                    className="font-bold text-sm mb-3 mt-3 text-slate-700"
                    dangerouslySetInnerHTML={{ __html: review?.title }}
                  />
                  <p
                    className="font-normal text-sm text-slate-700"
                    dangerouslySetInnerHTML={{ __html: review?.content }}
                  />
                  <div className="flex flex-wrap justify-between border-b pt-2 pb-2">
                    <span className="block font-bold text-sm text-slate-700">
                      {review?.name}
                      {review?.reviewerType === "verified_buyer" ? (
                        <i className="inline-block align-middle h-4 w-4">
                          <CheckCircle className="h-[100%] w-[100%] text-green-500" />
                        </i>
                      ) : (
                        ""
                      )}
                    </span>
                    <div className="flex flex-wrap items-center text-[#333]">
                      <div className="flex flex-wrap items-center">
                        <i className="inline-block align-middle h-4 w-4 mr-1">
                          <ThumbUp className="h-[100%] w-[100%]" />
                        </i>
                        <span className="text-xs inline-block align-middle">{review?.votesUp}</span>
                      </div>
                      <div className="flex flex-wrap items-center ml-2">
                        <i className="inline-block align-middle h-4 w-4 mr-1">
                          <ThumbDown className="h-[100%] w-[100%]" />
                        </i>
                        <span className="text-xs inline-block align-middle">
                          {review?.votesDown}
                        </span>
                      </div>
                    </div>
                  </div>

                  {review?.product?.imageUrl ? (
                    <div>
                      {" "}
                      <h5 className="text-sm text-[#333] font-medium mt-3">Product Review:</h5>
                      <a
                        href={review?.product?.url?.replaceAll(
                          constants.magentoBaseUrl,
                          `${hostName}`
                        )}
                        target="blank"
                        className="text-[15px] font-semibold leading-[25px] mb-[20px] mt-[7px] pl-[85px] relative h-[75px] flex items-center"
                      >
                        <img
                          src={review?.product?.imageUrl}
                          alt={review?.product?.name}
                          className="mr-0 absolute left-0 w-[75px] h-[75px] align-middle"
                        />
                        {review?.product?.name}
                      </a>{" "}
                    </div>
                  ) : (
                    <div className="mt-3">
                      {" "}
                      <span className="font-medium text-sm text-[#333] font-sans">
                        Site Review:
                        <img
                          src="https://www.elementvape.com/media/wysiwyg/evp-logo.png"
                          alt="Element Vape"
                          className="max-h-[50px] mt-[15px] p-0 block align-middle"
                        />
                      </span>{" "}
                    </div>
                  )}
                </div>
              );
            })}
            {/* <div className="w-full md:w-[49%] mt-2 p-6 bg-orange-50">
            <div className="flex flex-wrap justify-between">
              <div>cadsc</div>
              <span className="text-right font-normal text-[13px]">Nov 20 2021</span>
            </div>
            <h3 className="font-bold text-sm mb-3 mt-3 text-slate-700">Flavorless Tornado</h3>
            <p className="font-normal text-sm text-slate-700">
              To me one of the worst tank, very little flavor and so much airflow like you&apos;re
              sucking air through a smoothie straw. Maybe the tank is okay but the coils are sucks.
              That&apos;s why 2 stars for just the tank itself.
            </p>
            <div className="flex flex-wrap justify-between border-b pt-2 pb-2">
              <span className="block font-bold text-sm text-slate-700">
                Magdalena S.
                <i className="inline-block align-middle h-4 w-4">
                  <CheckCircle className="h-[100%] w-[100%] text-green-500" />
                </i>
              </span>
              <div className="flex flex-wrap items-center">
                <div className="flex flex-wrap items-center">
                  <i className="inline-block align-middle h-4 w-4 mr-1">
                    <ThumbUp className="h-[100%] w-[100%]" />
                  </i>
                  <span className="text-xs inline-block align-middle">0</span>
                </div>
                <div className="flex flex-wrap items-center ml-2">
                  <i className="inline-block align-middle h-4 w-4 mr-1">
                    <ThumbDown className="h-[100%] w-[100%]" />
                  </i>
                  <span className="text-xs inline-block align-middle">0</span>
                </div>
              </div>
            </div>
            <h5 className="text-sm mt-3">Product Review:</h5>
            <div className="mt-2">
              <div className="h-20 w-20 bg-slate-100 inline-block align-middle" />
              <span className="text-base font-semibold ml-2">
                SMOK TFV16 LITE Sub-Ohm TankSMOK TFV16 LITE Sub-Ohm Tank
              </span>
            </div>
          </div>

          <div className="w-full md:w-[49%] mt-4 p-6 bg-orange-50">
            <div className="flex flex-wrap justify-between">
              <div>cadsc</div>
              <span className="text-right font-normal text-[13px]">Nov 20 2021</span>
            </div>
            <h3 className="text-sm font-bold mb-3 mt-3 text-slate-700">Flavorless Tornado</h3>
            <p className="font-normal text-sm text-slate-700">
              To me one of the worst tank, very little flavor and so much airflow like you&apos;re
              sucking air through a smoothie straw. Maybe the tank is okay but the coils are sucks.
              That&apos;s why 2 stars for just the tank itself.
            </p>
            <div className="flex flex-wrap justify-between border-b pt-2 pb-2">
              <span className="block font-bold text-sm text-slate-700">
                Magdalena S.
                <i className="inline-block align-middle h-4 w-4">
                  <CheckCircle className="h-[100%] w-[100%] text-green-500" />
                </i>
              </span>
              <div className="flex flex-wrap items-center">
                <div className="flex flex-wrap items-center">
                  <i className="inline-block align-middle h-4 w-4 mr-1">
                    <ThumbUp className="h-[100%] w-[100%]" />
                  </i>
                  <span className="text-xs inline-block align-middle">0</span>
                </div>
                <div className="flex flex-wrap items-center ml-2">
                  <i className="inline-block align-middle h-4 w-4 mr-1">
                    <ThumbDown className="h-[100%] w-[100%]" />
                  </i>
                  <span className="text-xs inline-block align-middle">0</span>
                </div>
              </div>
            </div>
            <h5 className="text-sm mt-3">Product Review:</h5>
            <div className="mt-2">
              <div className="h-20 w-20 bg-slate-100 inline-block align-middle">.</div>
              <span className=" font-semibold ml-2 text-[15px]">
                SMOK TFV16 LITE Sub-Ohm TankSMOK TFV16 LITE Sub-Ohm Tank
              </span>
            </div>
          </div> */}

            <Pagination
              pageSize={Math.ceil(reviewsData?.yotpoReviews?.totalCount / 10)}
              currentPage={pageIndex}
              setPageIndex={setPageIndex}
              viewLoading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
