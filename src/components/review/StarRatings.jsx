import React from "react";
import { Star, StarOutline } from "heroicons-react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function StarRatings({
  star,
  color = "",
  selected,
  focus,
  totalReviewCount,
  className,
}) {
  const history = useRouter();
  const { pathname } = history;
  return (
    <div className="relative h-[1.4rem] block mx-auto">
      <div
        className={`flex ${selected ? "" : "absolute"}  top-0 left-0 w-[100%] ${
          focus ? "text-[#fff]" : ""
        } ${
          color ? "text-[#000]" : pathname === "/reviews" ? "text-[#d69121]" : "text-[#fec600]"
        } `}
      >
        <i className="inline">
          <StarOutline
            className={`${totalReviewCount ? "w-[19px] h-[19px]" : ""} ${
              pathname === "/reviews" ? "w-[17px] h-[17px]" : "w-6 h-6"
            }`}
          />
        </i>
        <i className="inline">
          <StarOutline
            className={`${totalReviewCount ? "w-[19px] h-[19px]" : ""} ${
              pathname === "/reviews" ? "w-[17px] h-[17px]" : "w-6 h-6"
            }`}
          />
        </i>
        <i className="inline">
          <StarOutline
            className={`${totalReviewCount ? "w-[19px] h-[19px]" : ""} ${
              pathname === "/reviews" ? "w-[17px] h-[17px]" : "w-6 h-6"
            }`}
          />
        </i>
        <i className="inline">
          <StarOutline
            className={`${totalReviewCount ? "w-[19px] h-[19px]" : ""} ${
              pathname === "/reviews" ? "w-[17px] h-[17px]" : "w-6 h-6"
            }`}
          />
        </i>
        <i className="inline">
          <StarOutline
            className={`${totalReviewCount ? "w-[19px] h-[19px]" : ""} ${
              pathname === "/reviews" ? "w-[17px] h-[17px]" : "w-6 h-6"
            }`}
          />
        </i>
      </div>
      <div
        className={`flex absolute top-0 left-0 w-[100%]  ${
          color ? "text-[#000]" : pathname === "/reviews" ? "text-[#d69121]" : "text-[#fec600]"
        }  ${focus ? "text-[#fff]" : ""}`}
      >
        {[...Array(star).keys()].map((ele) => (
          <i key={ele} className="inline">
            <Star
              className={`${totalReviewCount ? "w-[19px] h-[19px]" : ""} ${
                pathname === "/reviews" ? "w-[17px] h-[17px]" : "w-6 h-6"
              }`}
            />
          </i>
        ))}
      </div>
    </div>
  );
}

StarRatings.propTypes = {
  star: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
