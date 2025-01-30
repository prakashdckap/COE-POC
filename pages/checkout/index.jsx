import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import OrderSummary from "../../src/components/checkout/module/layout-two/order-summary";
import PaymentMethods from "../../src/components/checkout/module/layout-two/payment-method";
import PlaceOrder from "../../src/components/checkout/module/layout-two/place-order";
import ShipToOptions from "../../src/components/checkout/module/layout-two/ship-to";
import ShippingMethods from "../../src/components/checkout/module/layout-two/shipping-method";
import Heading from "../../src/theme-files/heading";
import ROUTE_SHIPPING from "../../src/components/checkout/graphql/mutation/route-shipping";
import useGetDefaultAddresses from "../../src/helper/hooks/use-get-default-addresses";
import ConfirmAddressPopup from "../../src/components/checkout/module/layout-two/confirm-address-popup";
import SEOHead from "../../src/helper/SEOHeader";
import SummaryContainer from "../../src/components/checkout/module/layout-two/summary-container";
import useSetPudoShipping from "../../src/helper/hooks/use-set-pudo-shipping";
import useSetZipPaymentMethod from "../../src/helper/hooks/use-set-zip-payment-method";
import useEstimateShipping from "../../src/helper/hooks/cart/use-estimate-shipping";
import useEstimateShippingMethod from "../../src/helper/hooks/cart/use-estimate-shipping-method";
import { check } from "prettier";
import CheckoutDisplayError from "../../src/components/checkout/module/layout-two/checkout-display-error";
import { SET_CHECKOUT_ERROR } from "../../src/redux/actions";
import EstimationCost from "../../src/components/checkout/module/layout-two/estimationCost";
import useSetRouteShiping from "../../src/helper/hooks/setRouteShippingFee";
import constants from "../../src/helper/constant";
import { useRouter } from "next/router";

function CheckOut() {
  const dispatch = useDispatch();
  const history = useRouter();
  // const [routeShipping, { loading: routeShippingLoading }] = useMutation(ROUTE_SHIPPING);
  const { routeShippingFeeUpdate, routeShippingLoading } = useSetRouteShiping();
  const { handleDefaultAddresses, shippingAddressLoading, billingAddressLoading } =
    useGetDefaultAddresses();
  const { customerToken, checkoutShippingAddress, selectedState, checkoutErrorMessage } =
    useSelector((state) => state);
  const [addressVerificationPopup, setaddressVerificationPopup] = useState(false);
  const [enteredAddress, setenteredAddress] = useState({});
  const [showDropdownForm, setshowDropDownForm] = useState(false);
  const [showSavedAddress, setshowSavedAddress] = useState(false);
  const [pudoLoading, setPudoLoading] = useState(false);
  const [orderProcessingLoading, setOrderProcessingLoading] = useState(false);
  const [zipOrderProcessingLoading, setZipOrderProcessingLoading] = useState(false);
  const [ZipMerchantFee, setZipMerchantFee] = useState([]);
  const [open, setopen] = useState(false);
  const [values, setvalues] = useState({
    city: selectedState?.city || "",
    zip: selectedState?.zipCode,
  });
  const [dropdownSelectedData, setdropdownSelectedData] = useState({
    country: selectedState?.country || "",
    region: selectedState?.region || "",
  });
  const [checked, setchecked] = useState("home");
  const [requestObject, setRequestObject] = useState({});

  const [validCvvError, setValidCvvError] = useState("");

  const { handleZipPaymentMethod, ZipPaymentMethodResponse, ZipPayemntMethodLoading } =
    useSetZipPaymentMethod();

  useEffect(() => {
    dispatch(SET_CHECKOUT_ERROR(""));
    if (customerToken && !checkoutShippingAddress?.firstName) {
      handleDefaultAddresses();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(SET_CHECKOUT_ERROR(""));
    }, 40000);
  }, [checkoutErrorMessage]);

  useEffect(() => {
    setZipMerchantFee(ZipPaymentMethodResponse);
  }, [ZipPaymentMethodResponse]);

  useEffect(() => {
    if (!values?.zip) {
      if (!(dropdownSelectedData?.region?.code || values?.region)) {
        setRequestObject({
          country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
        });
      } else {
        setRequestObject({
          city: dropdownSelectedData?.region?.code || values?.region,
          country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
        });
      }
    } else {
      setRequestObject({
        city: dropdownSelectedData?.region?.code || values?.region,
        country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
        postcode: values?.zip,
      });
    }
  }, [values, dropdownSelectedData]);

  const { handleEstimateShipping, estimateShipping, estimateShippingLoading } =
    useEstimateShipping();

  // close error popup
  const handleClear = () => {
    dispatch(SET_CHECKOUT_ERROR(""));
  };

  return (
    <div className="relative">
      <SEOHead
        title="One Step Checkout"
        description="One Step Checkout"
        canonicalUrl={`${constants.replaceUrl}/${history?.query?.slug?.[0]}`}
      />
      <div
        className={`${
          shippingAddressLoading || billingAddressLoading ? "opacity-40 pointer-events-none" : null
        } bg-[#f5f5f5]`}
      >
        <Heading className="py-[30px] text-center font-bold text-[30px]">CHECKOUT</Heading>
        <div className="w-full lg:w-[920px] mx-auto flex flex-wrap lg:flex-nowrap gap-7 checkout-main px-[10px] md:px-[11px]">
          <div className="w-[520px] mx-auto lg:w-[537px] order-2 lg:order-1">
            <ShipToOptions
              setaddressVerificationPopup={setaddressVerificationPopup}
              setenteredAddress={setenteredAddress}
              showDropdownForm={showDropdownForm}
              setshowDropDownForm={setshowDropDownForm}
              showSavedAddress={showSavedAddress}
              setshowSavedAddress={setshowSavedAddress}
              setPudoLoading={setPudoLoading}
              values={values}
              setvalues={setvalues}
              dropdownSelectedData={dropdownSelectedData}
              setdropdownSelectedData={setdropdownSelectedData}
              setchecked={setchecked}
              checked={checked}
              handleEstimateShipping={handleEstimateShipping}
              estimateShipping={estimateShipping}
              requestObject={requestObject}
              open={open}
              setopen={setopen}
              pudoLoading={pudoLoading}
              routeShipping={routeShippingFeeUpdate}
            />
            <ShippingMethods
              routeShipping={routeShippingFeeUpdate}
              pudoLoading={pudoLoading}
              dropdownSelectedData={dropdownSelectedData}
              setdropdownSelectedData={setdropdownSelectedData}
              values={values}
              estimateShippingResponse={estimateShipping}
              setchecked={setchecked}
              checked={checked}
              open={open}
              setopen={setopen}
            />
            <PaymentMethods
              handleZipPaymentMethod={handleZipPaymentMethod}
              setZipMerchantFee={setZipMerchantFee}
              ZipMerchantFee={ZipMerchantFee}
              ZipPayemntMethodLoading={ZipPayemntMethodLoading}
              values={values}
              setvalues={setvalues}
              dropdownSelectedData={dropdownSelectedData}
              setdropdownSelectedData={setdropdownSelectedData}
              validCvvError={validCvvError}
              setValidCvvError={setValidCvvError}
              setshowDropDownForm={setshowDropDownForm}
              open={open}
              setopen={setopen}
            />

            {/* {ORDER SUMMARY FOR MOBILE VIEW} */}
            <div className="bg-[#fff] p-[20px] border border-[#e6e6e6]  mt-[25px] lg:hidden">
              <Heading className="uppercase font-semibold text-[18px] ">Order Summary</Heading>
              <hr />
              <SummaryContainer />
            </div>

            <PlaceOrder
              setenteredAddress={setenteredAddress}
              setaddressVerificationPopup={setaddressVerificationPopup}
              setOrderProcessingLoading={setOrderProcessingLoading}
              setZipOrderProcessingLoading={setZipOrderProcessingLoading}
              validCvvError={validCvvError}
              ZipPaymentMethodResponse={ZipPaymentMethodResponse}
            />

            {addressVerificationPopup ? (
              <ConfirmAddressPopup
                setaddressVerificationPopup={setaddressVerificationPopup}
                enteredAddress={enteredAddress}
                setshowDropDownForm={setshowDropDownForm}
                setshowSavedAddress={setshowSavedAddress}
                addressVerificationPopup={addressVerificationPopup}
              />
            ) : null}
            {checkoutErrorMessage?.error && (
              <CheckoutDisplayError
                handleClear={handleClear}
                checkoutErrorMessage={checkoutErrorMessage?.error}
              />
            )}
          </div>
          <div
            className={`${
              routeShippingLoading ? "opacity-40" : null
            } w-[520px] mx-auto lg:w-[355px] grid grid-cols-1 order-1 lg:order-2`}
          >
            <OrderSummary
              ZipMerchantFee={ZipMerchantFee}
              ZipPayemntMethodLoading={ZipPayemntMethodLoading}
              estimateShippingLoading={estimateShippingLoading}
            />
            <EstimationCost
              ZipMerchantFee={ZipMerchantFee}
              ZipPayemntMethodLoading={ZipPayemntMethodLoading}
              estimateShippingLoading={estimateShippingLoading}
            />
          </div>
        </div>
      </div>
      {orderProcessingLoading || zipOrderProcessingLoading ? (
        <div className="flex fixed top-0 h-[100vh] bg-[#a7a7a7] opacity-90 w-full z-30 justify-center items-center">
          <div className="text-[24px] font-bold uppercase text-[#a80f16] no-wrap" role="alert">
            Order is being processed
          </div>
          <div className="grid gap-2 ml-2">
            <div className="flex mt-1 items-center justify-center space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-[#a80f16] rounded-full" />
              <div className="w-2 h-2 bg-[#a80f16] rounded-full" />
              <div className="w-2 h-2 bg-[#a80f16] rounded-full" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CheckOut;
