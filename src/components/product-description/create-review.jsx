import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Link from "next/link";
import { XIcon } from "@heroicons/react/outline";
import LoadingSpinner from "../../helper/loading-spinner";

export default function CreateReview({
  reviewFormErrors,
  values,
  setvalues,
  handleCreateReview,
  createReviewLoading,
  flavorProfile,
  setFlavorProfile,
  vapeProducts,
  setVapeProducts,
  starHoverValue,
  setstarHoverValue,
  responseMessage,
  setResponseMessage,
}) {
  const [hostName, setHostName] = useState("");
  const [hasInput, setHasInput] = useState(false);
  const [progress, setProgress] = useState(0);
  const [oauthToken, setOauthToken] = useState("");
  const [errorText, setErrorText] = useState({
    score: "Please enter a star rating for this review",
    title: "Review's title & body can't be empty",
    review: "Review's title & body can't be empty",
    name: " Name field cannot be empty",
    email: " Invalid email",
    vapeProducts: "Please fill out all of the mandatory (*) fields",
  });

  const CLIENT_ID = "YOUR_CLIENT_ID"; // Replace with your Yotpo client ID
  const CLIENT_SECRET = "YOUR_CLIENT_SECRET"; // Replace with your Yotpo client secret

  useEffect(() => {
    const getOauthToken = async () => {
      try {
        const response = await axios.post("https://api.yotpo.com/oauth/token", {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        });
        setOauthToken(response.data.access_token);
      } catch (error) {
        console.error("Error fetching OAuth token:", error);
      }
    };
    getOauthToken();
  }, []);

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

  const handleCheckboxChange = useCallback((group, name) => {
    if (group === "flavorProfile") {
      setFlavorProfile((prev) => ({ ...prev, [name]: !prev[name] }));
    } else if (group === "vapeProducts") {
      setVapeProducts((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  }, []);

  const submitReview = useCallback(() => {
    handleCreateReview({
      ...values,
      flavorProfile,
      vapeProducts,
    });
    if (responseMessage === "ok") {
      handleResetValues();
      setreviewFormErrors({
        score: false,
        title: false,
        review: false,
        name: false,
        email: false,
        vapeProducts: false,
      });
    }
  }, [handleCreateReview, values, flavorProfile, vapeProducts]);

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

  useEffect(() => {
    setHostName(window.location.host);
  }, []);

  const socialIcon = [
    {
      name: "Twitter",
      href: `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      title: "Share on Twitter",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${hostName}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      title: "Share on Facebook",
    },
  ];

  return (
    <div
      className={`${
        createReviewLoading ? "opacity-40 pointer-events-none" : null
      } pt-[47px] font-open-sans`}
    >
      <h3 className="uppercase text-sm text-[#6A6C77] mb-[25px] font-sans">write a review</h3>
      <h5 className="text-sm text-[#6A6C77] font-open-sans mb-[20px]">
        <span className="text-[#f00] text-md">* </span>Indicates a required field
      </h5>
      <div className="mb-[20px]">
        <h5 className="text-sm text-[#6A6C77]">
          <span className="text-[#f00] text-md">* </span>Score:{" "}
          {!values?.score && reviewFormErrors?.score ? (
            <span className="text-[#ea1332] font-semibold text-sm">{errorText.score}</span>
          ) : null}
        </h5>
        <div
          type="button"
          className="flex items-center pt-[10px] lg:pt-[10px] pb-[2px] lg:pb-[10px]"
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              type="button"
              onClick={() => setvalues({ ...values, score: rating })}
              key={rating}
            >
              {rating > starHoverValue ? (
                <svg
                  className="h-[26px] w-[26px] flex-shrink-0 fill-[#fec600]"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => setstarHoverValue(rating)}
                  onMouseLeave={() => setstarHoverValue(values?.score)}
                >
                  <path
                    d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z"
                    fillRule="nonzero"
                  />
                </svg>
              ) : (
                <svg
                  className="h-[26px] w-[26px] flex-shrink-0 fill-[#fec600]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  onMouseEnter={() => setstarHoverValue(rating)}
                  onMouseLeave={() => setstarHoverValue(values?.score)}
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="">
        <h5 className="text-sm text-[#6A6C77]">
          <span className="text-[#f00] text-md">*</span> Title:{" "}
          {!values?.title && reviewFormErrors?.title ? (
            <span className="text-[#ea1332] font-semibold text-sm">{errorText.title}</span>
          ) : null}
        </h5>
        <input
          type="text"
          className={`${
            !values?.title && reviewFormErrors?.title ? "border-[#ea1332]" : "border-black"
          } w-full h-8 border mt-[15px] mb-[20px] focus:outline-none px-[9px] text-[#737373] text-[13px]`}
          onChange={(e) => handleInputChange(e)}
          name="title"
          value={values?.title || ""}
        />
      </div>
      <div className="">
        <h5 className="text-sm text-[#6A6C77]">
          <span className="text-[#f00] text-md">*</span> Review:{" "}
          {!values?.review && reviewFormErrors?.review ? (
            <span className="text-[#ea1332] font-semibold text-sm">{errorText.review}</span>
          ) : null}
        </h5>
        <textarea
          type="text"
          className={`${
            !values?.review && reviewFormErrors?.review ? "border-[#ea1332]" : "border-black"
          } w-full h-20 border mt-[15px] mb-[20px] focus:outline-none px-[9px] py-[12px] text-[#737373] text-[13px]`}
          onChange={(e) => handleInputChange(e)}
          name="review"
          value={values?.review || ""}
        />
      </div>
      <div>
        <p className="text-sm text-[#6B6D76] mt-[10px] mb-[25px]">
          What is your preferred flavor profile?
        </p>
        <ul className="ml-[20px]">
          {["Fruit", "Dessert", "Menthol", "Tobacco", "Other"].map((flavor) => (
            <li className="mb-[15px]" key={flavor}>
              <label className="text-sm text-[#6A6C77]">
                <input
                  type="checkbox"
                  className="mr-5"
                  checked={flavorProfile[flavor]}
                  onChange={() => handleCheckboxChange("flavorProfile", flavor)}
                />
                {flavor}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm text-[#6B6D76] mt-[10px] mb-[25px]">
          <span className="text-[#f00] text-md">*</span> What type of vape products are you
          currently using?{" "}
          {!Object.values(vapeProducts).some((value) => value) && reviewFormErrors?.vapeProducts ? (
            <span className="text-[#ea1332] font-semibold text-sm">{errorText.vapeProducts}</span>
          ) : null}
        </p>
        <ul className="ml-[20px]">
          {["BoxModKit", "PodSystems", "Disposables", "Rebuildables", "Other"].map((product) => (
            <li className="mb-[15px]" key={product}>
              <label className="text-sm text-[#6A6C77]">
                <input
                  type="checkbox"
                  className="mr-5"
                  checked={vapeProducts[product]}
                  onChange={() => handleCheckboxChange("vapeProducts", product)}
                />
                {product.replace(/([A-Z])/g, " $1").trim()}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-start md:justify-end flex-wrap">
        {hasInput ? (
          <div className="flex flex-wrap items-center">
            <div className="text-sm text-[#6A6C77] w-full md:w-auto mt-5 md:mt-0">
              Connect with:
              <div className="flex space-x-1">
                {socialIcon?.map((item) => (
                  <div
                    key={item.name}
                    title={item.title}
                    className="py-[6px] mb-1 px-[11px] bg-[#6A6C77] mt-[15px]"
                  >
                    <Link href={item.href} passHref>
                      <a target="_blank" rel="noopener noreferrer" className="text-gray-600">
                        <span className="flex justify-center items-center">
                          <item.icon className="h-[19px] w-[19px] text-[#fff]" aria-hidden="true" />{" "}
                        </span>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto text-center mt-[20px] mb-[20px] -mr-[30px] md:mr-0 md:mb-0 md:mt-[40px] px-0 md:px-[50px] lg:px-[100px] text-[#6A6C77] text-sm">
              {" "}
              -OR-{" "}
            </div>
          </div>
        ) : null}

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
      </div>
    </div>
  );
}

CreateReview.propTypes = {
  reviewFormErrors: PropTypes.shape().isRequired,
  values: PropTypes.shape().isRequired,
  setvalues: PropTypes.func.isRequired,
  handleCreateReview: PropTypes.func.isRequired,
  createReviewLoading: PropTypes.bool.isRequired,
};
