import { memo, useEffect, useMemo, useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Star, StarOutline } from "heroicons-react";

import { getSocialIcons } from "./helper";

function DisplaySuccess({ handleCloseSuccessMessage = () => {} }) {
  const [hostName, setHostName] = useState("");

  const socialIcon = useMemo(() => getSocialIcons(hostName), [hostName]);

  useEffect(() => {
    setHostName(window.location.host);
  }, []);

  return (
    <div className="relative bg-[#fff] text-center p-[40px] border border-solid border-[#e3e3e3] font-open-sans mt-5">
      <div
        className="inline-block py-[6px] px-[11px] absolute right-1 top-3"
        onClick={handleCloseSuccessMessage}
        onKeyUp={handleCloseSuccessMessage}
        role="button"
        tabIndex={0}
      >
        <span>
          <XIcon className="h-6 w-6 text-[#6A6C77]" />
        </span>
      </div>
      <div className="mb-5 text-[21px] leading-[18px]">
        <span className="mb-5 text-[26px] flex justify-center items-center text-[#2f84ed] antialiased">
          <HeartIcon className="h-8 w-8" />
        </span>
        <span className="uppercase text-[#2f84ed] font-bold antialiased">
          Thank you for posting a review!
        </span>
      </div>
      <div className="mb-5 text-[#737373]">
        <span className="text-[#6A6C77] text-sm leading-[17px] antialiased">
          We value your input. Share your review so everyone else can enjoy it too.
        </span>
      </div>
      <div className="flex flex-wrap justify-center space-x-1 items-center font-open-sans antialiased">
        {socialIcon?.map((item) => (
          <div key={item.name} title={item.title} className="py-[6px] mb-1 px-[11px] bg-[#6A6C77]">
            <Link href={item.href} passHref>
              <a target="_blank" rel="noopener noreferrer" className="text-gray-600">
                <span className="flex justify-center items-center">
                  <item.icon className="h-[19px] w-[19px] text-[#fff]" aria-hidden="true" />{" "}
                  <span className="ml-1 uppercase text-sm text-[#fff]">Share</span>
                </span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function FirstReview({ openReview = () => {} }) {
  return (
    <div className="mt-10">
      <div className="relative h-[1.5rem] mb-5 w-[120px] overflow-hidden block mx-auto">
        <div className="flex absolute top-0 left-0 w-[100%] text-[#599dd2]">
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
        <div className="flex absolute top-0 left-0 overflow-hidden text-[#599dd2] w-[100%]">
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

      <div className="font-sans flex items-center justify-center">
        <button
          type="button"
          onClick={openReview}
          className="py-[10px] px-[15px] uppercase text-center text-[12px] bg-[#6A6C77] text-[#fff] mb-[10px]"
        >
          Be the first to write a review
        </button>
      </div>
    </div>
  );
}

export const ReviewSuccess = memo(DisplaySuccess);
export const ReviewFirstUser = memo(FirstReview);
