import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import Input from "../../../theme-files/input-text";
import ModalSuccess from "../../../theme-files/modal/success";
import ModalFailure from "../../../theme-files/modal/failure";
import Paragraph from "../../../theme-files/paragraph";
import Link from "../../../theme-files/link/index";
import InputEmail from "../../../theme-files/input-email";
import InputCheckbox from "../../../theme-files/input-checkbox";
import Label from "../../../theme-files/label";
import { AxiosGraphQL } from "../../../helper/axios/index";
import LoadingSpinner from "../../../helper/loading-spinner";
import Customerreview from "../../home/About-customerreview";
import { CheckIcon } from "@heroicons/react/solid";
import constants from "../../../helper/constant";

export default function DoWeShip() {
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reError, setReError] = useState(false);
  const [reCAPTCHA, setreCAPTCHA] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorBoxOpen, setErrorBoxOpen] = useState(false);
  const captchaRef = useRef();
  const [zipcode, setZipcode] = useState("");
  const [emailAddress, setEmailAddress] = useState(false);
  const [checkBox, setCheckBox] = useState(null);
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState(null);
  const [errorText, seterrorText] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [successErrorMessage, setSuccessErrorMessage] = useState(false);

  const handleInputChange = (event) => {
    setZipcode(event.target.value);
    return true;
  };

  const verify = (e) => {
    setreCAPTCHA(e);
  };

  const onSearch = async () => {
    setLoading(true);
    if (reCAPTCHA && zipcode) {
      setError(false);
      if (zipcode) {
        if (!zipcode) {
          setLoading(false);
          setError(true);
        } else {
          AxiosGraphQL("do-we-ship", { zipcode }).then((response) => {
            if (response.doWeShip && response) {
              setOpen(true);
              setLoading(false);
            } else {
              setErrorBoxOpen(true);
              setLoading(false);
            }
            captchaRef.current.reset();
            setreCAPTCHA(null);
            setReError(false);
            setError(false);
          });
        }
      } else {
        setLoading(false);
        setError(true);
      }
    } else {
      setLoading(false);
      reCAPTCHA ? setReError(false) : setReError(true);
      zipcode ? setError(false) : setError(true);
    }
  };

  const handleSubmit = () => {
    if (emailAddress && checkBox && validateEmail()) {
      setSuccessErrorMessage(false);
      setSuccessMessage(false);
      setErrorLoading(true);
      setEmailAddressError(false);
      setCheckBoxError(false);
      seterrorText(false);

      let zipCodeRegex = /Zip Code (\w+)/;
      let emailRegex = /email ([\w.@]+)/;
      //graphql
      AxiosGraphQL("doWeShipFormSubmit", {
        input: { zipcode: zipcode, email: emailAddress, isChecked: checkBox },
      }).then((response) => {
        if (response?.doWeShipFormSubmit) {
          let zipCodeMatch = response?.doWeShipFormSubmit?.success_message.match(zipCodeRegex);
          let emailMatch = response?.doWeShipFormSubmit?.success_message.match(emailRegex);

          let zipCode = zipCodeMatch ? zipCodeMatch[1] : null;
          let email = emailMatch ? emailMatch[1] : null;

          if (zipCode && email) {
            setSuccessErrorMessage(
              `You have already subscribed for the Zip Code "${zipCode}" with the email "${email}"`
            );
          } else {
            setSuccessMessage(`You have successfully subscribed for the Zip Code "${zipCode}"`);
          }
          setErrorBoxOpen(false);
          setErrorLoading(false);
          setEmailAddress(false);
          setCheckBox(false);
        } else {
          setErrorLoading(false);
        }
      });
    } else {
      emailAddress ? setEmailAddressError(false) : setEmailAddressError(true);
      checkBox ? setCheckBoxError(false) : setCheckBoxError(true);
    }
  };

  // Email Validation
  const validateEmail = () => {
    const mail = emailAddress?.replace(/ /g, "")?.split(",");
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
      seterrorText("");
      return true;
    }
    seterrorText("Please enter a valid email address (Ex: johndoe@domain.com).");
    return false;
  };

  return (
    <>
      <div className="mt-8 text-2xl text-center leading-7 text-gray-900 sm:text-3xl sm:truncate">
        <h2 className="text-[22px] font-semibold mb-[30px] text-skin-base">DO WE SHIP TO YOU?</h2>
      </div>
      {successMessage ? (
        <div className="container mx-auto md:px-[10px] ">
          <div className="flex relative  pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
            <CheckIcon className="w-5 h-5 absolute left-2.5" />
            <span>{successMessage}</span>
          </div>
        </div>
      ) : (
        ""
      )}
      {successErrorMessage ? (
        <div className="container mx-auto md:px-[10px] ">
          <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#fae5e5] text-[#e02b27] text-[13px] font-normal font-sans w-full leading-[1.35]">
            <i class="fa-solid fa-triangle-exclamation text-[18px] text-[#b30000] absolute left-2.5"></i>
            <span>{successErrorMessage}</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container mx-auto mb-10 bg-white mt-0 flex md:justify-between md:flex-row flex-col">
        <div className="space-y-10  do-we-ship-form ">
          <div className="mx-auto w-full md:w-full py-[2rem] px-[1rem] md:p-[42px] border border-[#bfbfbf] shadow-lg flex justify-center">
            <form className="space-y-6 px-0 do-we-ship relative">
              <h2 className="text-[16px] font-semibold text-skin-base text-center">
                CHECK YOUR ZIP CODE
              </h2>
              <Input
                id="zipcode"
                name="zipcode"
                placeholder="Enter Your Zip Code Here"
                onChange={handleInputChange}
                value={zipcode}
                className="appearance-none block w-full pr-3 pl-8 py-3 border font-medium border-[#979797] text-xs focus:outline-none placeholder:text-skin-base mt-2"
              />
              <SearchIcon className="w-4 h-4 absolute top-[36px] ml-2 stroke-2" />
              <small
                className={
                  error
                    ? "doweship-error-message text-[#e02b27] show"
                    : "doweship-error-message text-[#e02b27] hidden"
                }
              >
                This is a required field.
              </small>

              <ReCAPTCHA
                sitekey={constants.RECAPTCHA_KEY}
                ref={captchaRef}
                onChange={verify}
                isolated
                className="do-we-ship-captcha"
              />

              {reError && !reCAPTCHA && (
                <small
                  className={
                    reError
                      ? "doweship-error-message text-[#e02b27]  show"
                      : "doweship-error-message text-[#e02b27] hidden"
                  }
                >
                  This is a required field.
                </small>
              )}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onSearch}
                  className="text-xs font-bold flex items-center justify-center p-3 text-skin-inverted hover:text-skin-base bg-skin-primary hover:border-black  hover:bg-skin-button-secondary-hover hover:border hover:border-skin-dark uppercase w-full"
                >
                  {loading ? <LoadingSpinner message="loading" /> : "Search"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="space-y-5  text-[#282828] do-we-content md:pt-[0px] pt-[40px] pl-[0px] md:pl-[42px]">
          <Paragraph className="font-medium text-sm text-[#454545]">
            Enter your U.S. Zip Code to check if we currently deliver{" "}
            <span className="font-bold">nicotine vape products</span> to your area!
          </Paragraph>
          <Paragraph className="font-medium text-sm text-[#454545]">
            Remember, an Adult Signature is required upon delivery, so you may want to check your
            place of business, family, or friends' addresses as well. Consider buying in bulk to
            maximize savings and reduce shipping fees.
          </Paragraph>
          <Paragraph className="font-medium text-sm text-[#454545]">
            Please note that this Zip Code checker is only for U.S. customers. If we don't currently
            serve your area, please check back in a few weeks—our shipping coverage is expanding
            quarterly. Sign up to receive notifications as soon as your area's coverage is updated!
          </Paragraph>
          <Paragraph className="font-bold text-sm text-[#454545]">
            We've partnered with PUDO to offer a convenient Pick-Up option at a local business near
            you, which you can select during checkout. This option provides additional shipping
            coverage across the U.S.
          </Paragraph>
          <Paragraph className="font-medium text-[#454545] text-xs p-3 mt-[30px] bg-[#f6f6f6]">
            Important: Due to regulatory restrictions, we may be unable to ship certain nicotine
            products to specific locations. If your order is affected, you'll see a notification at
            checkout with further details.
          </Paragraph>
          <div className="flex items-center font-medium text-[#454545] text-sm mt-[30px]">
            <InformationCircleIcon className="h-[1.3125rem] w-[1.3125rem] text-[#8a8c8e]" />
            <span className="ml-1">Need more information?</span>
            <span className="text-[#454545] ml-1 text-sm font-normal">Visit our </span>
            <Link href="/contact-us" className="ml-1 font-medium underline">
              Help Center
            </Link>
          </div>
          <div className="do-we-ship-review">
            <Customerreview />
          </div>
        </div>
      </div>
      {errorBoxOpen ? (
        <ModalFailure open={errorBoxOpen} setOpen={setErrorBoxOpen}>
          <div className="text-center md:p-[42px] p-[28px]">
            <Paragraph className="text-[14px] font-medium text-[#282828]">
              Shipping Status for &quot;{zipcode}&quot;
            </Paragraph>
            <Paragraph className="text-2xl font-medium my-[14px] font-Montserrat">
              We&apos;re sorry. We currently don&apos;t serve your Zip Code.
            </Paragraph>
            <div className="text-left">
              <Paragraph className="text-[14px] text-[#282828] font-Montserrat mb-[14px]">
                Please check back with us in several weeks, as our team will continue to find
                solutions.
              </Paragraph>
              <Paragraph className="text-[14px] text-[#282828] font-Montserrat mb-[14px] flex">
                <InformationCircleIcon className="h-5 w-5 text-gray-400" /> &nbsp; <b>Tip:</b>{" "}
                &nbsp; You can also try entering your business Zip Code.
              </Paragraph>
            </div>
          </div>
          <div className="bg-[#f6f6f6] md:p-[42px] p-[28px]">
            <Paragraph className="text-[16px] font-semibold text-[#000]  font-Montserrat">
              WANT TO KNOW ONCE YOUR REGION IS SERVED?
            </Paragraph>
            <Paragraph className="text-[14px] font-normal leading-[1.44] my-[14px] font-Montserrat">
              You can submit your email address below and we will contact you as soon as we can ship
              to your region
            </Paragraph>
            <Label className="checkbox-label flex items-start ">
              <span className="error-checkbox-span">
                <InputCheckbox
                  className={"h-[19px] w-[19px] bg-black"}
                  onChange={(e) => setCheckBox(e.target.checked)}
                />
              </span>
              <span className="text-[12px] pl-2 font-medium text-[#333] leading-[1.21] font-Montserrat">
                I certify that I am 21 years of age or older and have read and agree to be bound by
                the
                <span className="text-[#850002] underline px-1">
                  <a href="/terms-and-conditions">Terms and Conditions</a>
                </span>
                &amp;
                <span className="text-[#850002] underline px-1">
                  <a href="/privacy-policy">Privacy Policy. </a>
                </span>
              </span>
            </Label>
            <small
              className={
                checkBoxError
                  ? "doweship-error-message text-[#e02b27] show"
                  : "doweship-error-message text-[#e02b27] hidden"
              }
            >
              This is a required field.
            </small>
            <div className="mt-5 flex justify-between">
              <div className="w-[100%] pr-[10px]">
                <div className="mt-1 text-left ">
                  <InputEmail
                    name="email"
                    id="email"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="appearance-none text-[#454545 text-[11px] font-medium block w-full px-3 py-[10px] border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-[5px]"
                  >
                    Email Address
                  </InputEmail>
                  <small
                    className={
                      emailAddressError
                        ? "doweship-error-message text-[#e02b27] show"
                        : "doweship-error-message text-[#e02b27] hidden"
                    }
                  >
                    This is a required field.
                  </small>
                  <small
                    className={
                      errorText
                        ? "doweship-error-message text-[#e02b27] show"
                        : "doweship-error-message text-[#e02b27] hidden"
                    }
                  >
                    {errorText}
                  </small>
                </div>
              </div>
              <div className="mt-[5px]">
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex text-[12px] font-semibold items-center px-[15px] sm:px-10 py-[9px] sm:py-[11px] text-skin-inverted hover:text-skin-base bg-skin-primary hover:border-black  hover:bg-skin-button-secondary-hover hover:border hover:border-skin-dark uppercase"
                  >
                    {errorLoading ? <LoadingSpinner message="loading" /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalFailure>
      ) : (
        ""
      )}
      {open ? (
        <ModalSuccess open={open} setOpen={setOpen}>
          <div className="text-center">
            <Paragraph className="text-[14px] font-medium text-[#282828] leading-[1.44px]">
              Shipping Status for &quot;{zipcode}&quot;
            </Paragraph>
            <Paragraph className="text-[18px] font-medium text-[#282828] mt-3">
              Great news!
            </Paragraph>
            <Paragraph className="text-[18px] font-medium text-[#282828] mb-5">
              We do ship to your Zip Code!
            </Paragraph>
            <Link
              href="/new-arrivals"
              className="w-full mt-5 text-[12.25px] font-semibold items-center px-10 py-[12px] border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-primary bg-[#850002] hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
            >
              SHOP NEW ARRIVALS
            </Link>
          </div>
        </ModalSuccess>
      ) : (
        ""
      )}
    </>
  );
}
