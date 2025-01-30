import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import BILLING_ADDRESS from "../../components/checkout/graphql/mutation/billing-address";
import {
  SET_CHECKOUT_BILLING_ADDRESS,
  SET_AVAILABLE_PAYMENT_METHODS,
  SET_CHECKOUT_PAYMENT_METHOD,
  // SET_NOTIFICATION,
  // SET_AVAILABLE_SHIPPING_METHODS,
  // SET_CHECKOUT_SHIPPING_METHOD,
  // SET_CHECKOUT_SHIPPING_ADDRESS,
} from "../../redux/actions";
import useCustomerCart from "./customer/use-customer-cart";

export default function useSetBillingAddress() {
  const dispatch = useDispatch();
  const [setBillingAddress, { loading: billingAddressLoading }] = useMutation(BILLING_ADDRESS);
  const [billingResponse, setbillingResponse] = useState([]);
  const { checkoutPaymentMethod, checkoutBillingAddress, customerAddressList, customerDetails } =
    useSelector((state) => state);
  const { cartDetailsRefetch } = useCustomerCart();

  /** to avoid duplicate API call which causing @Internal @Server @Error compare address in below function*/
  const avoidDuplicateApicall = (data) => {
    try {
      const defaultBillingAddress = customerAddressList?.find((address) => address?.defaultBilling);
      if (data && checkoutBillingAddress?.firstName) {
        let { city, company, country, firstName, lastName, postcode, region, telephone, street } =
          checkoutBillingAddress;
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
        } = data?.billingAddress.address;
        if (
          city === dCity &&
          company === dCompany &&
          country === dCountry &&
          firstName === dFirstName &&
          lastName === dLastName &&
          postcode === dPostcode &&
          telephone === dTelephone &&
          `${street}` === `${dStreet}`
        ) {
          if (typeof dRegion === "string" && region !== dRegion) {
            return false;
          } else if (region === dRegion?.code) {
            return false;
          } else {
            return true;
          }
        } else return false;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  const handleSetBillingAddress = (data, setisError, setopen, setvalues, values) => {
    const duplicateApiCall = avoidDuplicateApicall(data) || false;

    if (!duplicateApiCall)
      setBillingAddress({
        skip: !data || !data?.region,
        variables: data,
      })
        .then((res) => {
          if (res.data && !res.errors?.length) {
            setbillingResponse(res);

            // cartDetailsRefetch();
            if (setopen) setopen(false);

            dispatch(SET_CHECKOUT_BILLING_ADDRESS(res.data.setBillingAddress.billingAddress));
            dispatch(
              SET_AVAILABLE_PAYMENT_METHODS(res.data.setBillingAddress.availablePaymentMethods)
            );
            if (checkoutPaymentMethod?.methodCode === "mr_quadpay") {
              dispatch(
                SET_CHECKOUT_PAYMENT_METHOD(res.data.setBillingAddress.availablePaymentMethods[1])
              );
            } else
              dispatch(
                SET_CHECKOUT_PAYMENT_METHOD(res.data.setBillingAddress.availablePaymentMethods[0])
              );
          } else if (res.errors.length) {
            if (setisError(true));
          }
        })
        .catch((err) => {
          console.log(err);
          if (setisError) setisError(true);
        });
  };
  return { handleSetBillingAddress, billingResponse, billingAddressLoading };
}
