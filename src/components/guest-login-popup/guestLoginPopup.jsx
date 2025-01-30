import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { XOutline } from "heroicons-react";
import Login from "../login/form/login-form";
import useLogin from "../../helper/hooks/customer/use-login";
import LoadingSpinner from "../../helper/loading-spinner";

export default function GuestLoginPopup({ showguestpopup, setshowguestpopup }) {
  const history = useRouter();
  const popupRef = useRef(null);

  const { userLogin, loading, customerDetailsReload } = useLogin(setshowguestpopup);

  const [errorText, seterrorText] = useState(false);
  const [values, setvalues] = useState({});
  const [reError, setReError] = useState(false);
  const [clicked, setclicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, passwd } = values;
    if (email && passwd && validateEmail()) {
      userLogin(values, setshowguestpopup);
      seterrorText(false);
      setReError(false);
    } else seterrorText("This is a required field.");
  };

  const validateEmail = () => {
    const { email } = values;
    const mail = email?.replace(/ /g, "")?.split(",");
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
      setReError("");
      return true;
    }
    setReError("Please enter a valid email address.");
    return false;
  };

  const handleInputChange = (event) => {
    let { value } = event.target || values[name];
    setvalues({
      ...values,
      // eslint-disable-next-line no-nested-ternary
      [event.target.name]: value,
    });
  };

  useEffect(() => {
    if (clicked) validateEmail();
  }, [values?.email]);

  useEffect(() => {
    if (!loading && !customerDetailsReload) {
      setclicked(false);
    }
  }, [loading, customerDetailsReload]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setshowguestpopup(false);
    }
  };

  useEffect(() => {
    if (showguestpopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showguestpopup]);

  return (
    <>
      {showguestpopup ? (
        <div className="fixed top-0 left-0 bottom-0 w-full z-50 bg-[rgba(0,0,0,.8)] flex justify-center items-start ">
          <div ref={popupRef}>
            <div className="">
              <XOutline
                className="guest-popup-close"
                onClick={() => {
                  setshowguestpopup(!showguestpopup);
                }}
              />
            </div>
            <div className="guest-user-popup ">
              <div className="guest-inner-popup">
                <div className="guest-user-content">
                  <div>
                    <div className="p-0">
                      <div className="info-summary-top">
                        <div className="md-content">
                          <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <div className="mt-[10px]">
                              <div className="w-[100%] popup-textfield">
                                <input
                                  className="mdl-textfield__input"
                                  type="text"
                                  name="email"
                                  placeholder=" "
                                  onChange={(e) => handleInputChange(e)}
                                />
                                <label className="mdl-textfield__label">
                                  Email<span className="text-red-600">*</span>
                                </label>
                                {errorText && !values?.email ? (
                                  <span className="text-[#e02b27] text-[13px]">{errorText}</span>
                                ) : null}
                                {clicked && reError && values?.email ? (
                                  <span className="text-[#e02b27] text-[13px]">{reError}</span>
                                ) : null}
                              </div>
                            </div>
                            <div className="mt-[10px]">
                              <div className="w-[100%] popup-textfield ">
                                <input
                                  className="mdl-textfield__input"
                                  type="password"
                                  name="passwd"
                                  placeholder=" "
                                  onChange={(e) => handleInputChange(e)}
                                />
                                <label className="mdl-textfield__label">
                                  Password<span className="text-red-600">*</span>
                                </label>
                                {errorText && !values?.passwd ? (
                                  <span className="text-[#e02b27] text-[13px]">{errorText}</span>
                                ) : null}
                              </div>
                            </div>
                            <div className="mt-[25px]">
                              <div className="w-[100%] block md:mb-0 md:float-left text-center">
                                <button
                                  className="mdl-button"
                                  type="submit"
                                  onClick={() => setclicked(true)}
                                >
                                  {clicked && values?.email && values?.passwd && loading ? (
                                    <LoadingSpinner message="loading" />
                                  ) : (
                                    "Sign in"
                                  )}
                                </button>
                              </div>
                              <div className="w-[100%] text-center mt-[5px] mb-[10px] mx-[0px] text-[14px] md:block">
                                <span
                                  className="text-[#9c9c9c] font-medium hover:text-[#f44336] cursor-pointer md:inline-block md:mt-[10px]"
                                  onClick={() => {
                                    setshowguestpopup(false);
                                    history.push("/forget-password");
                                  }}
                                >
                                  Forgot Your Password?
                                </span>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="text-center p-0">
                        <div className="md-content">
                          <p className="inline-block align-top my-[10px] mx-[0px] p-[15px] bg-[#f5f5f5] text-[14px] uppercase">
                            <span className="text-[#9c9c9c] font-medium">New customer?</span>
                            <a
                              className=" text-[#f44336] pl-1 font-medium hover:text-[#282828] cursor-pointer"
                              onClick={() => {
                                setshowguestpopup(!showguestpopup);
                                history.push("/login");
                              }}
                            >
                              Start Here.
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
GuestLoginPopup.defaultProps = {
  showguestpopup: false,
};
GuestLoginPopup.propTypes = {
  showguestpopup: PropTypes.bool,
  setshowguestpopup: PropTypes.func.isRequired,
};
