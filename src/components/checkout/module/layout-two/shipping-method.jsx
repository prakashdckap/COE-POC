import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CheckoutRadio from "../../../../theme-files/form/CheckoutRadio";
import Heading from "../../../../theme-files/heading";
import protection from "../../../../image/protection.svg";
import route from "../../../../image/route-shipping.svg";
import routeIcon from "../../../../image/route-icon.svg";
import routeExtra from "../../../../image/route-extra.svg";
import ImageTag from "../../../../theme-files/image";
import Toggle from "./toggle-button";
import useSetShippingMethod from "../../../../helper/hooks/use-set-shipping-method";
import useEstimateShippingMethod from "../../../../helper/hooks/cart/use-estimate-shipping-method";
import { SET_CHECKOUT_SHIPPING_METHOD, SET_ESTIMATE_SHIPPING } from "../../../../redux/actions";
import RouteShippingPopup from "./route-pop-up";
import LoadingSpinner from "../../../../helper/loading-spinner";

function ShippingMethods({
  routeShipping,
  pudoLoading,
  dropdownSelectedData,
  setdropdownSelectedData,
  estimateShippingResponse,
  values,
  checked,
  setchecked,
}) {
  const {
    availableShippingMethods,
    checkoutShippingAddress,
    cartDetails,
    routeShippingValue,
    checkoutShippingMethod,
    loading,
  } = useSelector((state) => state);
  const [selectedMethod, setselectedMethod] = useState("");
  const [estimateSelectedMethod, setEstimateSelectedMethod] = useState("");
  const { handleShippingMethod, shippingMethodLoading } = useSetShippingMethod();
  const [availableMethods, setavailableMethods] = useState([]);
  const [showTooltip, setshowTooltip] = useState(false);
  const [showRoteShip, setShowRouteShip] = useState(false);
  const [methodsLoading, setMethodsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTooltip = () => {
    setshowTooltip(!showTooltip);
  };

  const closeRouteShip = () => {
    setShowRouteShip(false);
  };

  const openRouteShip = () => {
    setShowRouteShip(true);
  };

  useEffect(() => {
    setavailableMethods(availableShippingMethods);
  }, [availableShippingMethods, checkoutShippingAddress]);

  useEffect(() => {
    if (
      !availableShippingMethods?.length &&
      !estimateShippingResponse?.estimateShippingCost?.availableShippingMethods?.length &&
      loading
    ) {
      setMethodsLoading(true);
      setTimeout(() => setMethodsLoading(false), 6000);
    } else {
      setMethodsLoading(false);
    }
  }, [
    availableShippingMethods,
    checkoutShippingAddress,
    estimateShippingResponse?.estimateShippingCost?.availableShippingMethods,
  ]);

  useEffect(() => {
    if (checkoutShippingMethod?.methodCode) {
      setselectedMethod(checkoutShippingMethod?.methodCode);
    } else if (
      Array.isArray(availableMethods) &&
      !selectedMethod?.methodCode &&
      availableMethods.length
    ) {
      setselectedMethod(availableMethods[0]?.methodCode);
      // dispatch(SET_CHECKOUT_SHIPPING_METHOD(availableMethods[0]));
    }
  }, [availableMethods, checkoutShippingAddress?.firstName, checkoutShippingMethod]);

  useEffect(() => {
    if (selectedMethod) {
      const selected = availableShippingMethods?.find(
        (method) => method?.methodCode === selectedMethod
      );
      if (selected?.methodCode && selected?.methodCode !== checkoutShippingMethod?.methodCode) {
        // handleShippingMethod(selected, true);
      }
    }
  }, [selectedMethod]);

  const selectShippingMethods = (selectedMethod) => {
    if (selectedMethod) {
      setselectedMethod(selectedMethod);
      const selected = availableShippingMethods?.find(
        (method) => method?.methodCode === selectedMethod
      );
      if (selected?.methodCode) {
        handleShippingMethod(selected, true);
      }
    }
  };

  const { handleEstimateShippingMethod, estimateShippingMethodLoading } =
    useEstimateShippingMethod();

  useEffect(() => {
    if (!checkoutShippingAddress?.firstName && estimateSelectedMethod) {
      const selected =
        estimateShippingResponse?.estimateShippingCost?.availableShippingMethods?.find(
          (item) => item?.methodCode === estimateSelectedMethod
        )?.methodCode;
      if (
        (dropdownSelectedData?.region?.code || values?.region) &&
        (dropdownSelectedData?.country?.code || dropdownSelectedData?.country) &&
        values?.zip &&
        selected
      )
        handleEstimateShippingMethod(
          {
            city: dropdownSelectedData?.region?.code || values?.region,
            country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
            postcode: values?.zip,
          },
          selected
        );
    }
  }, [estimateSelectedMethod]);

  useEffect(() => {
    setdropdownSelectedData({ ...dropdownSelectedData });
    setEstimateSelectedMethod("");
  }, [dropdownSelectedData.country, dropdownSelectedData?.region]);

  // Choosing selected method as 1 method in estimate shipping response
  useEffect(() => {
    if (
      (!estimateSelectedMethod &&
        `${estimateShippingResponse?.estimateShippingCost?.availableShippingMethods}` !==
          `${availableShippingMethods}`) ||
      !checkoutShippingMethod?.methodCode
    ) {
      setEstimateSelectedMethod("");
    } else if (!estimateShippingResponse?.estimateShippingCost?.availableShippingMethods?.length) {
      setEstimateSelectedMethod("");
    } else if (estimateShippingResponse?.estimateShippingCost?.shippingMethod?.methodCode) {
      setEstimateSelectedMethod("");
    } else {
      setEstimateSelectedMethod("");
    }
  }, [estimateShippingResponse]);

  // Storing the estimate shipping in redux
  useEffect(() => {
    if (!checkoutShippingAddress?.firstName && estimateSelectedMethod) {
      const selected =
        estimateShippingResponse?.estimateShippingCost?.availableShippingMethods?.find(
          (item) => item?.methodCode === estimateSelectedMethod
        );
      if (selected) dispatch(SET_ESTIMATE_SHIPPING(selected));
    } else {
      dispatch(SET_ESTIMATE_SHIPPING({}));
    }
  }, [estimateSelectedMethod]);

  return (
    <div
      className={`${shippingMethodLoading || pudoLoading ? "opacity-40 pointer-events-none" : null} 
       bg-[#fff] mt-[25px] p-[24px] border border-[#e6e6e6]`}
    >
      <Heading className="uppercase pb-[10px] font-semibold text-lg text-[#282828] border-b-[1px] border-[#d9d9d9] mb-5">
        Shipping Methods
      </Heading>
      {checkoutShippingAddress?.firstName && availableMethods?.length
        ? availableMethods?.map((item) => (
            <CheckoutRadio
              key={item?.methodCode}
              item={item}
              setselectedMethod={selectShippingMethods}
              shippingMethodLoading={shippingMethodLoading}
            />
          ))
        : estimateShippingResponse?.estimateShippingCost?.availableShippingMethods?.map((item) => (
            <CheckoutRadio
              key={item?.methodCode}
              item={item}
              estimateSelectedMethod={estimateSelectedMethod}
              setEstimateSelectedMethod={setEstimateSelectedMethod}
              estimateCheckout
              estimateShippingMethodLoading={estimateShippingMethodLoading}
            />
          ))}

      {!availableShippingMethods?.length &&
      !estimateShippingResponse?.estimateShippingCost?.availableShippingMethods?.length &&
      !methodsLoading ? (
        <div className="text-[13px] text-[#282828] font-normal">
          Sorry, no quotes are available for this order at this time
        </div>
      ) : null}
      {methodsLoading ? <LoadingSpinner /> : ""}

      {cartDetails?.adultSignatureFee ? (
        <div className="flex bg-[#f6f6f6] p-[10px] justify-between mt-[15px]">
          <div className="flex justify-center items-center">
            <span className="text-sm text-[#292c2d] font-medium">Adult Signature Service</span>
            <div
              onFocus={handleTooltip}
              onKeyUp={handleTooltip}
              role="link"
              tabIndex="0"
              className="relative inline-block items-center group cursor-pointer  ml-2"
            >
              <span className="text-[11px] font-semibold border-[1px] border-[#bbb] group-hover:border-gray-900 group-focus:border-gray-900 rounded-full flex items-center justify-center h-[14px] w-[14px] text-[#bbb] group-hover:text-gray-900 group-focus:text-gray-900">
                ?
              </span>
              <div className="absolute hidden group-focus:flex group-hover:flex z-20 left-4 top-0 before:content-[''] before:absolute before:top-8 before:right-[98%] before:-translate-y-1/2 before:w-3.5 before:h-3.5 before:bg-skin-inverted before:border-[#bbb] before:border-[1px] before:border-b-0 before:border-r-0 before:rotate-45">
                {" "}
              </div>
              <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] font-medium border-[#bbb] border-solid text-xs w-[270px] shadow-lg rounded-[1px] p-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted hidden h-auto group-hover:justify-center group-hover:items-center group-hover:flex group-focus:flex translate-y-[47%] -top-2 -left-2 -translate-x-[70%] ">
                <span>
                  All orders will require Adult Signature Service. See Help Center for more details
                </span>
              </div>
            </div>
          </div>

          <span className="text-sm font-bold ml-auto text-[#292c2d]">
            {" "}
            &#x24;
            {cartDetails?.adultSignatureFee ? cartDetails?.adultSignatureFee?.toFixed(2) : "0.00"}
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-wrap items-center pt-[10px]">
        <div className="inline-flex flex-col mt-2 px-[5px] w-full select-none">
          <div className="text-[9.5px] text-[#333] flex justify-between">
            <div className="max-w-[70%] sm:max-w-[50%] flex">
              <div className="top-0 pointer-events-none">
                <ImageTag height={30} width={30} src={route} alt="logo" />
              </div>
              <div className="pl-3 text-[9.5px]">
                <div className="text-[12.5px] text-[#333] font-bold whitespace-nowrap">
                  Package Protection
                </div>
                Against loss, theft or damage in transit and instant resolution.
                <span
                  className="absolute cursor-pointer"
                  title="Learn More"
                  onClick={openRouteShip}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    height="12"
                    width="12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <span className="max-w-[20%]">
              <Toggle className="text-[#5dc8db]" routeShipping={routeShipping} />
              <span className="font-bold float-right">
                &#x24; {routeShippingValue ? routeShippingValue?.toFixed(2) : "0.00"}
              </span>
            </span>
          </div>
          <div className="capsule flex justify-between items-center min-w-[200px] max-w-[250px] sm:max-w-[50%] my-2 sm:ml-7 h-7 px-2 bg-slate-50 bg rounded-2xl pointer-events-none">
            <ImageTag height={24} width={24} src={routeExtra} alt="logo" />
            <span className="text-[9px] text-[#000] font-semibold px-1 whitespace-nowrap">
              100&#37; Carbon Neutral Shipping
            </span>
            <ImageTag
              height={30}
              width={40}
              src={routeIcon}
              alt="logo"
              className="min-[320px]:h-10"
            />
          </div>
        </div>
      </div>
      <RouteShippingPopup isOpen={showRoteShip} onClose={closeRouteShip} />
    </div>
  );
}

export default ShippingMethods;

ShippingMethods.defaultProps = {
  pudoLoading: false,
};
ShippingMethods.propTypes = {
  routeShipping: PropTypes.func.isRequired,
  pudoLoading: PropTypes.bool,
};
