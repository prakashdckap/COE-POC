import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Star, StarOutline } from "heroicons-react";
import Paragraph from "../../theme-files/paragraph";

export default function ReviewProgressBar({
  totalReviews,
  averageScore,
  starDistribution,
  filterArr,
  setfilterArr,
}) {
  const [progressPercent, setprogressPercent] = useState({});
  const [starDistributionCopy, setstartDistributionCopy] = useState({});

  // Changing filter based on the rating select
  const handleFilterChange = (star) => {
    const dupArr = [...filterArr];
    const findObj = dupArr?.find((obj) => obj.label?.toLowerCase() === "rating");
    const parentIndex = dupArr?.indexOf(findObj);
    const { listItems } = dupArr[parentIndex];
    const item = listItems?.find((list) => list.name === star.toString());
    const childIndex = findObj.listItems?.indexOf(item);

    if (item.selected) {
      dupArr[parentIndex].buttonName = "Rating";
    } else {
      dupArr[parentIndex].buttonName = item?.name;
    }

    const dupListItems = listItems?.map((listItem, i) => {
      if (i !== childIndex || item.selected) {
        return { name: listItem?.name, selected: false };
      }
      return { name: listItem?.name, selected: true };
    });

    dupArr[parentIndex].listItems = dupListItems;
    setfilterArr(dupArr);
  };

  // Percentage bar
  useEffect(() => {
    let percentageObj = {};
    if (starDistribution) {
      Object?.keys(starDistribution)?.map((item) => {
        const divideValue = starDistribution[item]
          ? (parseFloat(starDistribution[item], 10) / totalReviews) * 100
          : 0;
        percentageObj = { ...percentageObj, [item]: divideValue };
      });
      setprogressPercent(percentageObj);
      setstartDistributionCopy(starDistribution);
    }
  }, [starDistribution]);

  return (
    <div
      className={`flex ${
        averageScore > 0 ? "justify-center" : "justify-start"
      } w-11/12 md:w-8/12 lg:w-6/12 xl:w-7/12`}
    >
      <div className={`${averageScore > 0 ? "w-full mr-10" : ""} `}>
        {starDistributionCopy
          ? Object?.keys(starDistributionCopy)
              ?.reverse()
              ?.map((star) => (
                <button
                  key={star}
                  type="button"
                  className="w-full text-sm list-none flex items-center mb-1 disabled:opacity-30 hover:opacity-50"
                  disabled={!starDistribution[star]}
                  onClick={() => handleFilterChange(star)}
                  aria-label="Review Rating"
                >
                  <Paragraph className="text-right font-normal text-sm">{star}</Paragraph>
                  <div className="ml-3 w-full bg-gray-200 max-w-sm mx-auto rounded-lg overflow-hidden border border-[#f6f6f8]">
                    <div
                      className="bg-skin-button-accent-hover text-xs leading-none py-1 rounded-lg"
                      style={{ width: `${Math?.round(progressPercent[star])}%` }}
                    />
                  </div>
                </button>
              ))
          : [...Array(5).keys()].reverse().map((ele) => (
              <button
                key={ele}
                type="button"
                className="w-full text-sm list-none flex items-center mb-1 disabled:opacity-30 hover:opacity-50"
                disabled
              >
                <Paragraph className="text-right font-normal text-sm">{ele + 1}</Paragraph>
                <div className="ml-3 w-full bg-gray-200 max-w-sm mx-auto rounded-lg overflow-hidden border border-[#f6f6f8]">
                  <div className="bg-skin-button-accent-hover text-xs leading-none py-1 w-0" />
                </div>
              </button>
            ))}
      </div>
      <div className="text-center">
        <Paragraph className="text-[32px] my-[10px] md:mb-0 ratings-reviews-text mb-2">
          {averageScore ? averageScore.toFixed(1) : ""}
        </Paragraph>
        <div className={`flex-row md:flex-row flex items-center mt-2`}>
          <div className={`cursor-auto flex`} role="button" tabIndex="0">
            <div className="mr-1 flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => {
                if (Math.floor(averageScore) > rating) {
                  // Render a filled star
                  return (
                    <svg
                      key={rating}
                      className="h-[15px] w-[15px] md:h-[26px] md:w-[26px] flex-shrink-0"
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
                      className="h-[15px] w-[15px] md:h-[26px] md:w-[26px] flex-shrink-0"
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
                      <i className="fa fa-star-half-full md:text-[21px] text-[13px]"></i>
                    </Paragraph>
                  );
                } else {
                  // Render an empty star
                  return (
                    <svg
                      key={rating}
                      className="h-[15px] w-[15px] md:h-[26px] md:w-[26px] flex-shrink-0 mx-[2px]"
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
          </div>
        </div>
        <Paragraph className="text-[#000] text-[12px] font-normal text-xs mt-2">
          {totalReviews > 0 ? `${totalReviews} ` : "No "}
          Reviews
        </Paragraph>
      </div>
    </div>
  );
}

ReviewProgressBar.propTypes = {
  totalReviews: PropTypes.number.isRequired,
  averageScore: PropTypes.number.isRequired,
  starDistribution: PropTypes.shape().isRequired,
  filterArr: PropTypes.arrayOf().isRequired,
  setfilterArr: PropTypes.arrayOf().isRequired,
};
