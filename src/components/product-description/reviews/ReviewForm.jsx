import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { errorText } from "./helper";

export default function ReviewForm({ values, setvalues, reviewFormErrors, handleInputChange }) {
  const [starHoverValue, setStarHoverValue] = useState(0);

  const handleInputUpdate = (e) => handleInputChange(e, starHoverValue);

  return (
    <>
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
                  onMouseEnter={() => setStarHoverValue(rating)}
                  onMouseLeave={() => setStarHoverValue(values?.score)}
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
                  onMouseEnter={() => setStarHoverValue(rating)}
                  onMouseLeave={() => setStarHoverValue(values?.score)}
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
          onChange={handleInputUpdate}
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
          onChange={handleInputUpdate}
          name="review"
          value={values?.review || ""}
        />
      </div>
    </>
  );
}

export function SocialIcons({}) {
  const [hostName, setHostName] = useState("");
  const [oauthToken, setOauthToken] = useState("");

  const CLIENT_ID = "YOUR_CLIENT_ID"; // Replace with your Yotpo client ID
  const CLIENT_SECRET = "YOUR_CLIENT_SECRET"; // Replace with your Yotpo client secret

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

  useEffect(() => {
    getOauthToken();
  }, []);

  useEffect(() => {
    setHostName(window.location.host);
  }, []);

  return (
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
  );
}
