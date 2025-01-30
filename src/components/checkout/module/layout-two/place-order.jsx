import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";

import useValidateAddress from "../../../../helper/hooks/use-validate-address";
import usePlaceOrder from "../../../../helper/hooks/use-place-order";
import { SET_CHECKOUT_ERROR, SET_PAYMENT_DETAILS } from "../../../../redux/actions";
import LoadingSpinner from "../../../../helper/loading-spinner";
import DobVerification from "./dob-verification";
import ImageUploadVerification from "./image-upload-verification";
import useAgeVerification from "../../../../helper/hooks/use-age-verification";
import CUSTOMER_AGE_DETAILS from "../../graphql/mutation/customer-age-details";
import AgeVerificationError, { validateAge } from "./age-verification-error";
import { useRouter } from "next/router";
import { SezzleButtonValidation } from "../../payment/sezzle";
import useAccepectJsValidation from "../../../../helper/hooks/checkout/useAcceptJsValidation";
import useAgeValidParam from "../../../../helper/hooks/checkout/useAgeValidation";
import useOrderValidation from "../../../../helper/hooks/checkout/useOrderValidation";
import TermsConditionsValidation from "./Validations/TremsConditionValidation";
import AgeVarificationCheck from "./Validations/AgeVarificationCheck";
import { SezzlePopup } from "../../payment/sezzle-popup";
import useCreateSezzleUrl from "../../../../helper/hooks/checkout/useCreateSezzleUrl";

function PlaceOrder({
  setenteredAddress,
  setaddressVerificationPopup,
  setOrderProcessingLoading,
  validCvvError,
  ZipPayemntMethodLoading,
  ZipPaymentMethodResponse,
}) {
  const history = useRouter();
  const dispatch = useDispatch();
  // const timeoutRef = useRef(null); // Using useRef to store the timeout ID
  const lastClickRef = useRef(0); // Ref to store the last click timestamp

  const customerToken = useSelector((state) => state.customerToken);
  const checkoutPaymentMethod = useSelector((state) => state.checkoutPaymentMethod);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const checkoutBillingAddress = useSelector((state) => state.checkoutBillingAddress);
  const checkoutShippingMethod = useSelector((state) => state.checkoutShippingMethod);
  const paymentDetails = useSelector((state) => state.paymentDetails);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const customerDetails = useSelector((state) => state.customerDetails);
  const ageVerificationDetails = useSelector((state) => state.ageVerificationDetails);
  const isShippingAddressVerified = useSelector((state) => state.isShippingAddressVerified);
  const { nonVapeFlag, platformId, grandTotal } = useSelector((state) => state.cartDetails || {});
  const orderDetail = useSelector((state) => state.orderDetail);
  const checkoutErrorMessage = useSelector((state) => state.checkoutErrorMessage);
  const sezzleUrl = useSelector((state) => state.sezzleUrl);

  const [isCartCheckoutValidated, setIsCartCheckoutValidated] = useState(false);
  const [orderValidating, setOrderValidating] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [termsCheck, setTermsCheck] = useState(false);
  const [ageVerificationCheck, setAgeVerificationCheck] = useState(false);
  const [displaySecondLevelVerification, setdisplaySecondLevelVerification] = useState(false);
  const [dobValues, setdobValues] = useState({});
  const [fileUploadValues, setfileUploadValues] = useState({});
  const [ageError, setAgeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ageValidationForVape, setAgeValidationForVape] = useState(false);
  const [title, setTitle] = useState("");
  const avoidDuplicateOrders = false; /** to avlid duplicate place order events */
  const [setCustomerAgeDetails] = useMutation(CUSTOMER_AGE_DETAILS);

  const { handleValidateAddress } = useValidateAddress();
  const { handleAcceptJs, creditCardLoading } = useAccepectJsValidation();
  const { handleAgeVerificationData } = useAgeValidParam();
  const { handleAgeVerification, loading } = useAgeVerification(setdisplaySecondLevelVerification);
  const { handlePlaceOrder, placeOrderLoading } = usePlaceOrder();
  const { handleOrderVerification } = useOrderValidation(setOrderValidating);
  const { sezzleUrlLoading } = useCreateSezzleUrl(ZipPaymentMethodResponse);

  // Hitting Age Verification API whenever the checkbox is checked
  useEffect(() => {
    if (ageVerificationCheck) {
      handleAgeVerification(handleAgeVerificationData(false, dobValues));
      setAgeValidationForVape(true);
    } else if (nonVapeFlag && !ageVerificationCheck) {
      setAgeValidationForVape(true);
    } else {
      setAgeValidationForVape(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageVerificationCheck]);

  useEffect(() => {
    if (orderDetail?.orderId || orderDetail?.length) {
      // display terms and conditions for only first time hide for others
      setTermsCheck(true);
    }
  }, [orderDetail]);

  // Cleanup on component unmount
  // useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  const toggleTermsCheck = useCallback(() => {
    setTermsCheck(!termsCheck);
  }, [termsCheck]);

  const toggleAgeCheck = useCallback(() => {
    setAgeVerificationCheck(!ageVerificationCheck);
  }, [ageVerificationCheck]);

  const openPickUpLocallyError = () => {
    setTitle("ATTENTION");
    setErrorMessage("Please select the pickup address");
    setAgeError(true);
  };

  const validateAddress = () => {
    const addressEntered = {
      firstName: checkoutShippingAddress.firstName,
      lastName: checkoutShippingAddress.lastName,
      company: checkoutShippingAddress.company,
      street: checkoutShippingAddress.street,
      city: checkoutShippingAddress.city,
      postcode: checkoutShippingAddress.postcode,
      telephone: checkoutShippingAddress.telephone,
      region: checkoutShippingAddress.region,
      country: checkoutShippingAddress.country,
    };
    setenteredAddress(addressEntered);
    handleValidateAddress(
      {
        street: checkoutShippingAddress?.street,
        country: checkoutShippingAddress?.country,
        city: checkoutShippingAddress?.city,
        region: checkoutShippingAddress?.region,
        zip: checkoutShippingAddress?.postcode,
      },
      setaddressVerificationPopup,
      addressEntered
    );
  };

  // Place Order Function
  const placeOrder = async () => {
    // avoidDuplicateOrders = true;
    // Set the timeout to reset the state
    // timeoutRef.current = setTimeout(() => (avoidDuplicateOrders = false), 2000); // Reset after 2 seconds

    const currentTime = Date.now(); // Get current time in milliseconds
    // Check if the button was clicked within the last 500ms (500ms cooldown period)

    if (history?.query?.isPudo === "true" && !checkoutShippingAddress?.dealerId) {
      openPickUpLocallyError();
    } else if (isShippingAddressVerified || history?.query?.isPudo) {
      if (currentTime - lastClickRef.current < 5000) {
        return; // Ignore click if it's too soon after the last click
      }

      // Update the last click timestamp
      lastClickRef.current = currentTime;
      setclicked(true);
      let dealerInfo = {
        dealerId: null,
        dealerName: null,
        dealerNo: null,
        dealerHours: null,
      };
      if (history?.query?.isPudo === "true" && checkoutShippingAddress?.dealerId) {
        dealerInfo = {
          dealerId: checkoutShippingAddress?.dealerId,
          dealerName: checkoutShippingAddress?.dealerName,
          dealerNo: checkoutShippingAddress?.dealerNo,
          dealerHours: checkoutShippingAddress?.dealerHours,
        };
      }
      // AGE VERIFICATION Success
      if (
        (checkoutPaymentMethod && ageVerificationDetails?.result?.action !== "FAIL") ||
        customerDetails.ageVerified ||
        nonVapeFlag
      ) {
        if (checkoutPaymentMethod?.methodCode === "authnetcim") {
          setOrderProcessingLoading(true);
          const acceptObj = await handleAcceptJs();
          const { cardType, cardNumber, year, month, cvv } = paymentDetails;
          // CREDIT CARD
          const data = {
            cartId: customerToken ? customerCartId : guestCartId,
            placeOrderInput: {
              paymentMethod: checkoutPaymentMethod?.methodCode,
              paymentInformation: {
                ccType: cardType,
                ccExpYear: year?.year?.toString(),
                ccExpMonth: month?.id,
                ccCid: cvv,
                ccLast4: cardNumber?.toString()?.slice(-4),
                ...acceptObj,
              },
              veratadDetail: ageVerificationDetails?.result?.detail,
              veratadAction: ageVerificationDetails?.result?.action,
              veratadTimestamp: ageVerificationDetails?.meta?.timestamp,
              veratadConfirmation: ageVerificationDetails?.meta?.confirmation.toString(),
              dealerInfo,
            },
          };

          if (
            data?.placeOrderInput?.paymentMethod &&
            !fileUploadValues?.file &&
            !fileUploadValues?.fileType &&
            acceptObj?.acceptjsValue
          ) {
            handlePlaceOrder(data, setOrderProcessingLoading, grandTotal);
          } else {
            setOrderProcessingLoading(false);
          }
        }
      } else {
        // Age Validation Pop-Up
        const allowAge = validateAge(dobValues?.dob);
        // AGE VERIFICATION Failed
        if (
          !fileUploadValues?.file &&
          !fileUploadValues?.fileType &&
          dobValues?.dob &&
          !customerDetails.ageVerified &&
          ageVerificationDetails?.meta?.confirmation
        ) {
          if (allowAge) {
            handleAgeVerification(handleAgeVerificationData(true, dobValues));
            setCustomerAgeDetails({
              variables: {
                cartId: customerToken ? customerCartId : guestCartId,
                ageInfo: {
                  dob: dobValues?.dob,
                  image: fileUploadValues?.file,
                  fileType: fileUploadValues?.fileType,
                  veratadDetail: ageVerificationDetails?.result?.detail,
                  veratadAction: ageVerificationDetails?.result?.action,
                  veratadTimestamp: ageVerificationDetails?.meta?.timestamp,
                  veratadConfirmation: ageVerificationDetails?.meta?.confirmation.toString(),
                },
              },
            });
          } else if (dobValues?.dob) {
            setAgeError(true);
            setErrorMessage(
              "The product(s) you are trying to checkout is age-restricted and intended for adults of legal smoking age only."
            );
            setTitle("UNDERAGE ERROR");
            return false;
          }
        }

        if (checkoutPaymentMethod && fileUploadValues?.file && fileUploadValues?.fileType)
          if (checkoutPaymentMethod?.methodCode === "authnetcim") {
            setOrderProcessingLoading(true);
            const acceptObj = await handleAcceptJs();
            const { cardType, cardNumber, year, month, cvv } = paymentDetails;
            // CREDIT CARD
            const data = {
              cartId: customerToken ? customerCartId : guestCartId,
              placeOrderInput: {
                paymentMethod: checkoutPaymentMethod?.methodCode,
                paymentInformation: {
                  ccType: cardType,
                  ccExpYear: year?.year?.toString(),
                  ccExpMonth: month?.id,
                  ccCid: cvv,
                  ccLast4: cardNumber?.toString()?.slice(-4),
                  ...acceptObj,
                },
                dob: dobValues?.dob,
                image: fileUploadValues?.file,
                fileType: fileUploadValues?.fileType,
                veratadDetail: ageVerificationDetails?.result?.detail,
                veratadAction: ageVerificationDetails?.result?.action,
                veratadTimestamp: ageVerificationDetails?.meta?.timestamp,
                veratadConfirmation: ageVerificationDetails?.meta?.confirmation.toString(),
                dealerInfo,
              },
            };

            if (
              // cardNumber && cvv && year && month?.id &&
              data?.placeOrderInput?.paymentMethod &&
              acceptObj?.acceptjsValue
            ) {
              handlePlaceOrder(data, setOrderProcessingLoading, grandTotal);
            } else {
              setOrderProcessingLoading(false);
            }
          }
      }
    } else {
      validateAddress();
    }
  };

  const validateForSezzle = async () => {
    if (history?.query?.isPudo === "true" && !checkoutShippingAddress?.dealerId) {
      // pick-up locally validation
      openPickUpLocallyError();
    } else if (isShippingAddressVerified || history?.query?.isPudo) {
      setclicked(true);

      // AGE VERIFICATION is Success and non-vape products are in cart
      if (
        (checkoutPaymentMethod && ageVerificationDetails?.result?.action !== "FAIL") ||
        customerDetails.ageVerified ||
        nonVapeFlag
      ) {
        if (checkoutPaymentMethod?.methodCode === "sezzlepay") {
          const isOrderVerified = await handleOrderVerification(
            dobValues,
            fileUploadValues,
            ageVerificationDetails
          );
          if (!isOrderVerified) {
            console.log("Order verification failed, halting further execution.");
            return;
          }
          setIsCartCheckoutValidated(true);
          return true;
        }
      } else {
        // Age Validation Pop-Up
        const allowAge = validateAge(dobValues?.dob);
        // AGE VERIFICATION Failed
        if (
          !fileUploadValues?.file &&
          !fileUploadValues?.fileType &&
          dobValues?.dob &&
          !customerDetails.ageVerified
        ) {
          if (allowAge) {
            handleAgeVerification(handleAgeVerificationData(true, dobValues));
            setCustomerAgeDetails({
              variables: {
                cartId: customerToken ? customerCartId : guestCartId,
                ageInfo: {
                  dob: dobValues?.dob,
                  image: fileUploadValues?.file,
                  fileType: fileUploadValues?.fileType,
                  veratadDetail: ageVerificationDetails?.result?.detail,
                  veratadAction: ageVerificationDetails?.result?.action,
                  veratadTimestamp: ageVerificationDetails?.meta?.timestamp,
                  veratadConfirmation: ageVerificationDetails?.meta?.confirmation.toString(),
                },
              },
            });
          } else if (dobValues?.dob) {
            setAgeError(true);
            setErrorMessage(
              "The product(s) you are trying to checkout is age-restricted and intended for adults of legal smoking age only."
            );
            setTitle("UNDERAGE ERROR");
            return false;
          }
        }
        if (checkoutPaymentMethod && fileUploadValues?.file && fileUploadValues?.fileType)
          if (checkoutPaymentMethod?.methodCode === "sezzlepay") {
            const isOrderVerified = await handleOrderVerification(
              dobValues,
              fileUploadValues,
              ageVerificationDetails
            );
            if (!isOrderVerified) {
              console.log("Order verification failed, halting further execution.");
              return;
            }
            setIsCartCheckoutValidated(true);
            return true;
          } else {
            console.log("Error Checkout Selected Payment Method Is Invalid");
          }
      }
    } else {
      // address validation
      validateAddress();
    }
  };

  const closeValidatedSezzle = (loading) => {
    setOrderProcessingLoading(loading);
    setIsCartCheckoutValidated(loading);
  };

  useEffect(() => {
    dispatch(SET_PAYMENT_DETAILS({ ...paymentDetails, clicked }));
  }, [clicked]);

  useEffect(() => {
    if (checkoutErrorMessage?.localRules) {
      setErrorMessage(checkoutErrorMessage?.localRules);
      setAgeError(true);
      setTimeout(() => {
        dispatch(SET_CHECKOUT_ERROR(""));
      }, 40000);
      checkoutErrorMessage?.title && setTitle("ATTENTION");
    }
  }, [checkoutErrorMessage]);

  useEffect(() => {
    if (!ageError) setTitle("");
  }, [ageError]);

  return (
    <div
      className={`bg-[#fff] my-[25px] p-[20px] border border-[#e6e6e6] ${
        loading || placeOrderLoading || creditCardLoading ? "opacity-40 pointer-events-none" : null
      }`}
    >
      <AgeVarificationCheck
        toggleAgeCheck={toggleAgeCheck}
        ageVerificationCheck={ageVerificationCheck}
        loading={loading}
      />

      <TermsConditionsValidation
        termsCheck={termsCheck}
        toggleTermsCheck={toggleTermsCheck}
        loading={loading}
      />

      <AgeVerificationError
        open={ageError}
        setOpen={setAgeError}
        message={errorMessage}
        title={title}
      />

      {(!ageVerificationCheck && !loading && !dobValues?.dob) ||
      customerDetails.ageVerified ||
      nonVapeFlag ? null : (
        <DobVerification isClicked={clicked} setdobValues={setdobValues} dobValues={dobValues} />
      )}
      {ageVerificationDetails?.result?.action === "FAIL" &&
      ageVerificationCheck &&
      !loading &&
      clicked &&
      displaySecondLevelVerification ? (
        <ImageUploadVerification setfileUploadValues={setfileUploadValues} />
      ) : null}

      {checkoutPaymentMethod?.methodCode === "sezzlepay" ? (
        <div className="flex justify-center">
          {sezzleUrl?.url && isCartCheckoutValidated ? (
            <>
              <SezzlePopup
                checkoutUrl={sezzleUrl?.url}
                cartId={platformId}
                closeValidatedSezzle={closeValidatedSezzle}
              />
            </>
          ) : (
            <SezzleButtonValidation
              handleClick={validateForSezzle}
              isDisabled={
                !sezzleUrl?.url ||
                !checkoutShippingAddress?.firstName ||
                !checkoutBillingAddress?.firstName ||
                !checkoutShippingMethod?.methodCode ||
                !termsCheck ||
                !ageValidationForVape ||
                ZipPayemntMethodLoading ||
                orderValidating ||
                loading ||
                sezzleUrlLoading
              }
            />
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={
            !checkoutShippingAddress?.firstName ||
            !checkoutBillingAddress?.firstName ||
            !checkoutShippingMethod?.methodCode ||
            !checkoutPaymentMethod ||
            !ageValidationForVape ||
            !termsCheck ||
            validCvvError ||
            loading ||
            avoidDuplicateOrders
          }
          onClick={() => placeOrder()}
          className="w-full inline-flex justify-center py-2 px-4 mt-5 border border-transparent uppercase  text-sm font-bold  text-white bg-[#A80F16]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A80F16] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {placeOrderLoading ? <LoadingSpinner message="Order Processing" /> : "Place Order"}
        </button>
      )}
    </div>
  );
}

PlaceOrder.propTypes = {
  setenteredAddress: PropTypes.func.isRequired,
  setaddressVerificationPopup: PropTypes.func.isRequired,
  ZipPaymentMethodResponse: PropTypes.object.isRequired,
};

export default PlaceOrder;
