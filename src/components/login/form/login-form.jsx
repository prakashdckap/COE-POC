import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "../../../theme-files/link";
import Label from "../../../theme-files/label";
import Input from "../../../theme-files/input-checkbox";
import useLogin from "../../../helper/hooks/customer/use-login";
import LoadingSpinner from "../../../helper/loading-spinner";
import TextInput from "../../../theme-files/text-input";
import { useSelector } from "react-redux";
import constants from "../../../helper/constant";

export default function Login({ popup, setshowguestpopup }) {
  const history = useRouter();
  const captchaRef = useRef();

  const path = history?.pathname;
  const { userLogin, loading, customerDetailsReload } = useLogin(setshowguestpopup, captchaRef);
  const [isColor, setIsColor] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [values, setvalues] = useState({});
  const [errorText, seterrorText] = useState("");
  const [reCAPTCHA, setreCAPTCHA] = useState(null);
  const [reError, setReError] = useState(false);
  const setLoginAttempts = useSelector((state) => state.setLoginAttempts);

  const handleChnageTextColor = () => {
    setIsColor(!isColor);
  };

  const validateEmail = () => {
    const { email } = values;
    const mail = email?.replace(/ /g, "")?.split(",");
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i.test(mail)) {
      seterrorText("");
      return true;
    }
    seterrorText("Please enter a valid email address (Ex: johndoe@domain.com).");
    return false;
  };

  const handleSubmit = (e) => {
    const recaptcha = popup ? reCAPTCHA : setLoginAttempts > 4 ? reCAPTCHA : true;
    e.preventDefault();
    const { email, passwd } = values;
    if (recaptcha && email && passwd && validateEmail()) {
      userLogin(values, setshowguestpopup, captchaRef);
      setreCAPTCHA(null);
      setReError(false);
    } else setReError(true);
  };

  const verify = (e) => {
    setreCAPTCHA(e);
  };

  useEffect(() => {
    if (clicked) validateEmail();
  }, [values?.email]);

  useEffect(() => {
    if (!loading && !customerDetailsReload) {
      setclicked(false);
    }
  }, [loading, customerDetailsReload]);

  return (
    <>
      <div
        className={
          path === "/login" && !popup
            ? "mx-auto w-full lg:w-full p-0 md:px-7 md:py-[15px] md:border"
            : "border-0"
        }
      >
        <h2
          className={
            path === "/login" && !popup
              ? "text-[18px] text-skin-base mt-4  font-semibold"
              : "text-[16px] text-[#282828] font-bold pt-[20px]"
          }
        >
          {path === "/login" && !popup ? "SIGN IN" : "CHECKOUT USING YOUR ACCOUNT"}
        </h2>

        <div className={path === "/login" && !popup ? "mt-[30px]" : "mt-[30px]"}>
          <div className="flex items-center mt-1" aria-label="Required field indicator">
            <span className="text-[#d0021b] m-1 ml-0 text-[13px]">*</span>{" "}
            <span className="text-[#282828] font-normal leading-2 text-[13px]">
              Indicates a required field
            </span>
          </div>
          <div className="mt-6">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={path === "/login" && !popup ? "space-y-6" : "space-y-1.5"}
            >
              <TextInput
                name="email"
                label="Email Address"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
              {values?.email ? <span className="text-[#e02b27] text-sm">{errorText}</span> : null}
              <TextInput
                type="password"
                name="passwd"
                label="Password"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />

              <div className={path === "/login" && !popup ? "hidden" : "hidden"}>captacha</div>
              <div
                className={
                  path === "/login" && !popup
                    ? "flex items-start md:items-center pb-[17px] justify-between flex-col md:flex-row"
                    : "inline-block"
                }
              >
                <div
                  className={
                    path === "/login" && !popup ? "flex items-center mb-4 md:mb-0" : "hidden"
                  }
                >
                  <Label className="containercheckbox">
                    <Input
                      name="remember-me"
                      type="checkbox"
                      onChange={(e) => {
                        setvalues((val) => ({ ...val, remember: e.target.checked }));
                      }}
                      id="remember-me"
                      className="h-4 w-4  border-[#979797]"
                      tabIndex="-1"
                      role="checkbox"
                      checked={values.remember} // Bind checked state to values.remember
                      aria-label="Keep me logged in"
                    />
                    <span
                      className="checkbox-checkmark rounded-sm align-bottom"
                      tabIndex="0"
                      role="checkbox"
                      aria-checked={values.remember}
                      aria-label="Keep me logged in"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setvalues((val) => ({ ...val, remember: !val.remember }));
                          e.preventDefault(); // Prevents scrolling on Space
                        }
                      }}
                    />
                  </Label>

                  <Label
                    htmlFor="remember-me"
                    className="block text-xs text-skin-base font-semibold whitespace-pre"
                  >
                    Keep me logged in
                  </Label>
                  <div
                    onFocus={handleChnageTextColor}
                    onKeyUp={handleChnageTextColor}
                    role="link"
                    tabIndex="0"
                    className="relative whitespace-pre inline-block items-center group font-semibold text-[#a8a8a8] text-xs ml-2.5 focus:text-[#a80f16] underline cursor-help"
                  >
                    What is this?
                    <div className="z-10 mb-6 leading-[1.4] border-[1px] font-normal border-[#bbb] border-solid text-xs login-tooltip py-[12px] px-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted hidden h-auto group-hover:justify-center group-hover:items-center group-hover:flex group-focus:flex -top-1 -right-3 translate-x-[99%] before:content-[''] before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-t-0 before:border-r-0 before:rotate-45">
                      <span>
                        When you check this, you will not be automatically logged out for longer
                        period.
                      </span>
                    </div>
                  </div>
                </div>
                <div className={path === "/login" && !popup ? "text-sm" : "hidden"}>
                  <a
                    href="/forget-password"
                    className="font-medium text-xs text-skin-base hover:text-skin-secondary underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className={path === "/login" && !popup ? "hidden" : "block"}>
                <div className="flex w-[60%] justify-start">
                  <ReCAPTCHA sitekey={constants.RECAPTCHA_KEY} ref={captchaRef} onChange={verify} />
                </div>
                {reError && !reCAPTCHA && (
                  <div className="flex w-[60%] mt-1 justify-start">
                    <small
                      className={
                        reError
                          ? "text-sm text-[#f44336] font-medium show"
                          : "text-sm text-[#f44336] font-medium hidden"
                      }
                    >
                      ReCAPTCHA required!
                    </small>
                  </div>
                )}
              </div>
              <div className="">
                {setLoginAttempts > 4 && !popup ? (
                  <>
                    <div>
                      <ReCAPTCHA
                        sitekey={constants.RECAPTCHA_KEY}
                        ref={captchaRef}
                        onChange={verify}
                      />
                    </div>
                    {reError && !reCAPTCHA && (
                      <div className="flex w-[60%] mt-1 justify-start">
                        <small
                          className={
                            reError
                              ? "text-[13px] text-[#e02b27] font-normal show"
                              : "text-[13px] text-[#e02b27] font-normal hidden"
                          }
                        >
                          ReCAPTCHA required!
                        </small>
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              <div
                className={
                  path === "/login" && !popup
                    ? ""
                    : "flex justify-end w-full items-center text-center"
                }
              >
                <button
                  type="submit"
                  onClick={() => setclicked(true)}
                  className={
                    path === "/login" && !popup
                      ? "inline-flex items-center px-10 py-2 mb-4 border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-white bg-skin-secondary hover:bg-black uppercase text-sm font-medium"
                      : "flex w-full md:w-[36%] justify-center items-center border border-skin-secondary md:border-[#000]  hover:border-skin-secondary bg-skin-secondary md:bg-skin-inverted text-[13px] text-[#fff] text-center md:text-[#000] py-2.5 px-[20px] hover:bg-[#000] hover:text-skin-inverted uppercase font-bold mt-[25px]"
                  }
                >
                  {clicked && values?.email && values?.passwd && loading ? (
                    <LoadingSpinner message="loading" />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <div className={path === "/login" && !popup ? "hidden" : "block"}>
                <div
                  // href="/forget-password"
                  onClick={() => {
                    setshowguestpopup(false);
                    history.push("/forget-password");
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" ||
                      e.key === " " ||
                      e.keyCode === 13 ||
                      e.keyCode === 32
                    ) {
                      setshowguestpopup(false);
                      history.push("/forget-password");
                    }
                  }}
                  // onKeyUp={() => {
                  //   setshowguestpopup(false);
                  //   history.push("/forget-password");
                  // }}
                  role="link"
                  tabIndex="0"
                  className="text-[13px] font-sans mt-[30px] md:mt-[20px] md:text-[#1979c3] cursor-pointer font-medium md:font-normal text-skin-base"
                >
                  Forgot your password?
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
Login.defaultProps = {
  popup: false,
};
Login.propTypes = {
  popup: PropTypes.bool,
  setshowguestpopup: PropTypes.func.isRequired,
};
