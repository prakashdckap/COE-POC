import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import Link from "next/link";
import TextInput from "../../../theme-files/text-input";
import Paragraph from "../../../theme-files/paragraph";
import Image from "../../../theme-files/image";
import style from "./style.module.scss";
import { AxiosGraphQL } from "../../../helper/axios";
import LoadingSpinner from "../../../helper/loading-spinner";
import { UPDATE_SHIPPING_TRACKING_DETAILS, SET_NOTIFICATION } from "../../../redux/actions";
import SEOHead from "../../../helper/SEOHeader";
import constants from "../../../helper/constant";

function TrackShipping() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({});
  const [errorText, seterrorText] = useState("");
  const [reError, setReError] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [reCAPTCHA, setreCAPTCHA] = useState(null);
  const dispatch = useDispatch();
  const captchaRef = useRef();
  const router = useRouter();

  // Email Validation
  const validateEmail = () => {
    const { email } = value;
    const mail = email?.replace(/ /g, "")?.split(",");
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
      seterrorText("");
      return true;
    }
    seterrorText("Please enter a valid email address (Ex: johndoe@domain.com).");
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setclicked(true);
    setLoading(true);
    const { email, orderId } = value;

    if (reCAPTCHA && orderId && email && validateEmail()) {
      const response = await AxiosGraphQL("check-order-status", value);
      if (response.checkOrderStatus && response) {
        console.log("Check Order status - ", JSON.stringify(response.checkOrderStatus));
        setLoading(false);
        setclicked(false);
        dispatch(UPDATE_SHIPPING_TRACKING_DETAILS(response.checkOrderStatus));
        router.push(
          `/shippingtracking/result/order/id/${orderId}/email/${encodeURIComponent(email)}`
        );
      } else {
        setLoading(false);
        setclicked(false);
        captchaRef.current.reset();
        setreCAPTCHA(null);
        setReError(false);
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message:
              "Make sure that you have entered the Order Number and Email Address correctly.",
            type: "warning",
          })
        );
      }
    } else {
      setLoading(false);
      setReError(true);
    }
  };

  const verify = (e) => {
    setreCAPTCHA(e);
  };

  useEffect(() => {
    if (clicked) validateEmail();
  }, [value?.email]);

  return (
    <>
      <SEOHead
        title={"Check Order status"}
        // description={cmsPageObj?.meta_description}
        keywords={"Check Order status for Element Vape"}
        canonicalUrl={`${constants.replaceUrl}/${router?.query?.slug?.[0]}`}
      />
      <div className="mt-[15px] text-2xl text-center leading-7 mx-[15px] md:mx-0 text-gray-900 sm:text-3xl sm:truncate">
        <h2 className="text-[26px] text-[#282828] font-semibold mb-[15px]">Check Order Status</h2>
        <Paragraph className="text-[13px] leading-[16px] text-[#282828] font-semibold mb-[12px]">
          Please enter the required information below to check your order status.
        </Paragraph>
      </div>
      <div className="container shippingtracking mx-auto mb-[50px] bg-white mt-5 grid grid-cols-1 lg:grid-flow-col-dense lg:grid-cols-4">
        <div className="text-[#282828] border border-[#eee] bg-[#fafafa] mx-[10px] md:mx-0 space-y-6 lg:col-start-1 lg:col-span-2">
          <div className="mx-auto w-full lg:w-full px-7 pt-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <TextInput
                name="orderId"
                label=" Order Number (E.g.: 11XXXXXXXXX)"
                values={value}
                setvalues={setValue}
                isRequired
                className=" font-sans block w-full px-3 py-3 text-xs border border-[#eee] bg-[#fafafa] focus:outline-none text-[#282828] mt-[10px]"
                isClicked={clicked}
              />

              <TextInput
                name="email"
                label="Email Address"
                values={value}
                setvalues={setValue}
                isRequired
                isClicked={clicked}
              />

              {value?.email ? <span className="text-[#e02b27] text-sm">{errorText}</span> : null}

              <div className="mt-1 p-0 md:pb-4 md:pt-0 flex flex-wrap flex-col md:flex-row justify-start md:justify-between items-start md:items-center text-center">
                <ReCAPTCHA sitekey={constants.RECAPTCHA_KEY} ref={captchaRef} onChange={verify} />

                <button
                  onClick={() => {
                    setclicked(true);
                  }}
                  type="submit"
                  className="text-xs font-bold flex items-center justify-center h-[40px] py-[7px] px-[15px] text-skin-inverted hover:text-skin-base bg-skin-secondary hover:border-black  hover:bg-skin-button-secondary-hover hover:border hover:border-skin-dark uppercase"
                >
                  {loading ? <LoadingSpinner message="loading" /> : "Track Order"}
                </button>
              </div>
              {reError && !reCAPTCHA && (
                <small
                  className={
                    reError ? "text-xs text-[#e02b27] show" : "text-xs text-[#e02b27] hidden"
                  }
                >
                  ReCAPTCHA required!
                </small>
              )}
            </form>
          </div>
        </div>
        <div
          className={`space-y-4 md:block hidden lg:col-start-3 lg:col-span-3 ${style.rightImageParent}`}
        >
          <Link href="/new-arrivals">
            <Image
              className={style.rightImage}
              src="https://admin.elementvape.com/media/wysiwyg/aegis_max_kit.png"
              alt="Right image"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default TrackShipping;
