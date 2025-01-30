import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import SHIPPING_ADDRESS from "../../components/checkout/graphql/mutation/shipping-address";
import {
  SET_CHECKOUT_SHIPPING_ADDRESS,
  SET_CHECKOUT_SHIPPING_METHOD,
  SET_AVAILABLE_SHIPPING_METHODS,
  SET_IS_SHIPPING_ADDRESS_VERIFIED,
  // SET_NOTIFICATION,
} from "../../redux/actions";
import useSetShippingMethod from "./use-set-shipping-method";
import useSetDealerInfo from "./use-set-dealer-info";
import { useRouter } from "next/router";

export default function useSetShippingAddress() {
  const dispatch = useDispatch();
  const [setShippingAddress, { loading: shippingAddressLoading }] = useMutation(SHIPPING_ADDRESS);
  const [shippingResponse, setshippingResponse] = useState([]);
  const { handleShippingMethod, shippingMethodLoading } = useSetShippingMethod();
  const { handleDealerInfo } = useSetDealerInfo();
  const { checkoutShippingAddress, customerAddressList, checkoutShippingMethod } = useSelector(
    (state) => state
  );
  const history = useRouter();

  /** to avoid duplicate API call which causing @Internal @Server @Error compare address in below function*/
  const avoidDuplicateApicall = (data) => {
    try {
      const defaultShippingAddress = customerAddressList?.find(
        (address) => address?.defaultShipping
      );
      if (
        data &&
        checkoutShippingAddress?.firstName &&
        !data?.shippingAddress?.customerAddressId &&
        data?.shippingAddress?.address
      ) {
        let { city, company, country, firstName, lastName, postcode, region, telephone, street } =
          checkoutShippingAddress;
        let {
          city: dCity,
          company: dCompany,
          country: dCountry,
          firstName: dFirstName,
          lastName: dLastName,
          postcode: dPostcode,
          region: dRegion,
          telephone: dTelephone,
          street: dStreet,
        } = data?.shippingAddress?.address;
        if (
          city === dCity &&
          company === dCompany &&
          country === dCountry &&
          firstName === dFirstName &&
          lastName === dLastName &&
          postcode === dPostcode &&
          telephone === dTelephone &&
          region === dRegion?.code &&
          `${street}` === `${dStreet}`
        ) {
          return true;
        } else return false;
      } else if (!data?.shippingAddress?.address && !data?.shippingAddress?.customerAddressId)
        return true;
      else return false;
    } catch (error) {
      return false;
    }
  };

  const handleSetShippingAddress = (
    data,
    component = "",
    setchecked,
    setaddressVerificationPopup,
    setshowDropDownForm,
    setshowSavedAddress,
    dealerObj
  ) => {
    const duplicateApiCall = avoidDuplicateApicall(data) || false;

    if (data?.cartId && !duplicateApiCall) {
      setShippingAddress({
        skip: !data || !data?.region,
        variables: data,
      })
        .then((res) => {
          if (res.data && !res.errors?.length) {
            setshippingResponse(res);
            if (component === "pickupLocally") {
              const newObj = {
                ...res.data.setShippingAddress.shippingAddress,
                ...dealerObj,
              };
              dispatch(SET_CHECKOUT_SHIPPING_ADDRESS(newObj || {}));
            } else
              dispatch(
                SET_CHECKOUT_SHIPPING_ADDRESS(res.data.setShippingAddress.shippingAddress || {})
              );

            const shippingMethods = res.data.setShippingAddress.availableShippingMethods;
            dispatch(SET_AVAILABLE_SHIPPING_METHODS(shippingMethods));
            if (shippingMethods?.length) {
              /**  if (shippingMethods[0]?.methodCode !== checkoutShippingMethod?.methodCode) @oldCode */
              if (history?.pathname === "/checkout") {
                const existingMethod = shippingMethods?.find(
                  (method) => method.methodCode === checkoutShippingMethod?.methodCode
                );
                if (existingMethod?.methodCode) {
                  handleShippingMethod(existingMethod, true);
                } else {
                  handleShippingMethod(shippingMethods[0], true);
                }
              }
            }
            if (setaddressVerificationPopup) {
              setaddressVerificationPopup(false);
              dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(true));
            }
            if (setshowDropDownForm) setshowDropDownForm(false);
            if (setshowSavedAddress) setshowSavedAddress(false);
          }
        })
        .then(() => {
          if (dealerObj) handleDealerInfo(dealerObj);
        })
        .catch((err) => console.log(err));
    } else {
      if (setaddressVerificationPopup) setaddressVerificationPopup(false);
      if (setshowDropDownForm) setshowDropDownForm(false);
      if (setshowSavedAddress) setshowSavedAddress(false);
    }
  };
  return {
    handleSetShippingAddress,
    shippingResponse,
    shippingAddressLoading,
    shippingMethodLoading,
  };
}
