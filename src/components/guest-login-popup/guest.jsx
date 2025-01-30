import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { XOutline } from "heroicons-react";
import Login from "../login/form/login-form";

export default function Guest({ showguestpopup, setshowguestpopup }) {
  const history = useRouter();
  return (
    <>
      {showguestpopup ? (
        <div className="fixed top-0 left-0 bottom-0 w-full z-50 bg-[rgba(51,51,51,.55)] flex justify-center items-start">
          <div
            className="w-[768px] justify-between bg-[#f4f4f4] md:bg-white mt-7 px-[42px] py-[28px] relative md:h-auto h-[100vh] overflow-auto"
            tabIndex={"0"}
          >
            <div className="w-full text-right">
              <XOutline
                className="text-[#282828] cursor-pointer text-right absolute right-2 top-2"
                onClick={() => {
                  setshowguestpopup(!showguestpopup);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
                    setshowguestpopup(!showguestpopup);
                  }
                }}
                tabIndex={"0"}
                aria-label="close"
              />
            </div>
            <div className="flex flex-wrap flex-col md:flex-row w-full">
              <div className="w-full md:w-[48%] pr-[30px]">
                <Login popup setshowguestpopup={setshowguestpopup} />
              </div>
              <div className="md:w-[48%] w-full pl-0 md:pl-[40px] relative after:p-[8px] mt-[40px] md:mt-0 after:content-['OR'] after:absolute after:left-[50%] md:after:left-[-19px] after:top-[-19px] md:after:top-[50%] after:text-[#c1c1c1] after:border after:bg-[#fff] after:rounded-full after:text-[13px] border-t after:border-[#c1c1c1] border-[#c1c1c1] md:border-l md:border-t-0">
                <h2 className="text-[#282828] text-[16px] font-bold uppercase mb-[18px] pt-[50px] md:pt-[20px]">
                  CHECKOUT AS A NEW CUSTOMER
                </h2>
                <p className="text-[#282828] text-[13px] mb-3.5">
                  Creating an account has many benefits:
                </p>
                <ul className="list-disc marker:text-[18px] pl-[25px]">
                  <li className="text-[#282828] text-[13px] mb-3.5">
                    See order and shipping status
                  </li>
                  <li className="text-[#282828] text-[13px] mb-3.5">Track order history</li>
                  <li className="text-[#282828] text-[13px] mb-3.5">Check out faster</li>
                  <li className="text-[#282828] text-[13px] mb-3.5">
                    Earn reward points for every checkout
                  </li>
                </ul>

                <button
                  onClick={() => {
                    setshowguestpopup(!showguestpopup);
                    history.push("/login");
                  }}
                  type="button"
                  className="bg-[#a80f16] mt-2.5 uppercase text-skin-inverted text-[13px] font-bold px-5 py-3 w-full md:w-[70%] flex justify-center float-right"
                >
                  create an account
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
Guest.defaultProps = {
  showguestpopup: false,
};
Guest.propTypes = {
  showguestpopup: PropTypes.bool,
  setshowguestpopup: PropTypes.func.isRequired,
};
