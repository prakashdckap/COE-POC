import Link from "next/link";
import InputEmail from "../../theme-files/input-email";
import useForgetPassword from "../../helper/hooks/customer/use-forget-password";
import LoadingSpinner from "../../helper/loading-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import constants from "../../helper/constant";

export default function ForgetPassword() {
  const { userForgetPassword, loading, handleInputChange } = useForgetPassword();
  const [reCAPTCHA, setReCAPTCHA] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const captchaRef = useRef();

  const verify = (value) => {
    setReCAPTCHA(value);
    if (value) setCaptchaError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    let valid = true;

    if (!email) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!reCAPTCHA) {
      setCaptchaError(true);
      valid = false;
    } else {
      setCaptchaError(false);
    }
    if (valid) {
      userForgetPassword({ email });
    }
  };

  return (
    <>
      <div className="forgot-page flex flex-col items-center justify-center py-[10px] sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-medium text-[#282828]">FORGOT YOUR PASSWORD?</h2>
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl py-5 md:py-12 px-5 border-[#ebebeb] border text-center mx-2 mt-5 md:mx-0">
          <span className="text-[#282828] font-normal leading-2 text-[13px]">
            Please enter your email address below to receive a password reset link.
          </span>
          <div
            className="flex items-center justify-center mt-1"
            aria-label="Required field indicator"
          >
            <span className="text-[#e02b27] m-1 text-[13px]">*</span>{" "}
            <span className="text-[#282828] font-normal leading-2 text-[13px]">
              Indicates a required field
            </span>
          </div>
          <div className="mt-3">
            <form onSubmit={handleSubmit} className="space-y-6 pt-2 text-left">
              <InputEmail
                id="email"
                name="email"
                onChange={handleInputChange}
                className="appearance-none mt-1 block w-full px-3 pt-[10px] py-2 border border-gray-300 placeholder-gray-400 focus:outline-none  focus:border-skin-secondary sm:text-[13px] text-[#000] font-normal"
              >
                Email Address <span className="text-[#e02b27]">*</span>
              </InputEmail>
              {emailError && (
                <span className="text-[#e02b27] text-[13px] leading-[1.35]  forgot-password-error-message">
                  This is a required field.
                </span>
              )}

              <ReCAPTCHA
                sitekey={constants.RECAPTCHA_KEY}
                ref={captchaRef}
                onChange={verify}
                isolated
              />
              {captchaError && (
                <span className="text-[#e02b27] text-[13px] leading-[1.35] forgot-password-error-message">
                  This is a required field.
                </span>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full border flex justify-center text-xs bg-[#a80f16] text-skin-inverted py-[7px] px-[15px] uppercase hover:border hover:border-[#282828] hover:bg-skin-inverted hover:text-[#282828]"
                >
                  {loading ? <LoadingSpinner message="loading" /> : "Reset my password"}
                </button>
                <div className="text-center text-[13px] font-bold block w-full mt-[10px] underline uppercase text-[#282828]">
                  <Link href="/login">Go Back</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
