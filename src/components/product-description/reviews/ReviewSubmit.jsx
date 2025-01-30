import { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { errorText } from "./helper";

export default function ReviewSubmit({
  responseMessage,
  setResponseMessage,
  reviewFormErrors,
  submitReview,
  createReviewLoading,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (createReviewLoading) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 5 ? prev + 1 : 0));
      }, 150);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [createReviewLoading]);

  return (
    <>
      {responseMessage === "duplicate_review" ? (
        <div className="relative w-full block min-h-[25px] h-auto bg-[#f04860] text-left mt-[15px] font-open-sans antialiased">
          <div className="pl-[5px] mr-25px]">
            <span className="inline-block text-xs text-[#fff] leading-[25px]">
              Your review has already been submitted.
            </span>
          </div>
          <div
            className="absolute top-[5px] right-[5px]"
            onClick={() => setResponseMessage("")}
            onKeyUp={() => setResponseMessage("")}
            role="button"
            tabIndex={0}
          >
            <XIcon className="w-4 h-4 text-[#fff]" />
          </div>
        </div>
      ) : null}

      <div className="w-full text-right flex items-center justify-end">
        {Object.values(reviewFormErrors)?.includes(true) ? (
          <span className="text-[#ea1332] font-semibold text-sm mr-2 mt-5">
            One or more of your answers does not meet the required criteria
          </span>
        ) : null}

        {createReviewLoading ? (
          <div className="flex mt-5 mr-2">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${progress >= star ? "fill-[#e7721b]" : "fill-[#e9ebec]"}`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.75l-6.172 3.245 1.179-6.878-5-4.873 6.9-1 3.093-6.267 3.093 6.267 6.9 1-5 4.873 1.179 6.878z" />
              </svg>
            ))}
          </div>
        ) : null}
        <button
          onClick={submitReview}
          disabled={responseMessage === "duplicate_review"}
          type="button"
          className={`text-xs font-open-sans text-skin-inverted bg-[#2f84ed] hover:bg-[#26649f] w-36 py-2.5 mt-5 disabled:pointer-events-none disabled:opacity-40 ${
            createReviewLoading ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          POST
        </button>
      </div>
    </>
  );
}

export function ReviewUserInfo({ values, reviewFormErrors, handleInputChange }) {
  return (
    <>
      <div className="w-full md:w-4/12">
        <label htmlFor="" className="text-sm text-[#6A6C77] pb-[15px]">
          <span className="text-[#f00] text-md mr-[2px] inline-block mb-3">*</span>Use your name:{" "}
          {!values?.name && reviewFormErrors?.name ? (
            <span className="text-[#ea1332] font-semibold text-sm">{errorText.name}</span>
          ) : null}
          <input
            type="text"
            className={`${
              !values?.name && reviewFormErrors?.name ? "border-[#ea1332]" : "border-black"
            } h-8 w-[100%] focus:outline-none border pl-2`}
            onChange={(e) => handleInputChange(e)}
            name="name"
            value={values?.name || ""}
          />
        </label>
      </div>
      <div className="w-full md:w-4/12 mt-4 sm:mt-0 ml-0 md:ml-4">
        <label htmlFor="" className="text-sm text-[#6A6C77] pb-[15px] ">
          <span className="text-[#f00] text-md mr-[2px] inline-block mb-3">*</span>Email:{" "}
          {reviewFormErrors?.email ? (
            <span className="text-[#ea1332] font-semibold text-sm">{errorText.email}</span>
          ) : null}
          <input
            type="text"
            className={`${
              reviewFormErrors?.email ? "border-[#ea1332]" : "border-black"
            } h-8 w-[100%] focus:outline-none border pl-2`}
            onChange={(e) => handleInputChange(e)}
            name="email"
            value={values?.email || ""}
          />
        </label>
      </div>
    </>
  );
}
