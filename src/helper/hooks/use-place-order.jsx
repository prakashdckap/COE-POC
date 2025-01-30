import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import GUEST_PLACE_ORDER from "../../components/checkout/graphql/mutation/guest-place-order";
import {
  UPDATE_GUEST_CART_ID,
  SET_CHECKOUT_BILLING_ADDRESS,
  SET_CHECKOUT_SHIPPING_METHOD,
  SET_AVAILABLE_SHIPPING_METHODS,
  SET_CHECKOUT_SHIPPING_ADDRESS,
  SET_CHECKOUT_PAYMENT_METHOD,
  SET_AVAILABLE_PAYMENT_METHODS,
  UPDATE_CART_DETAIL,
  UPDATE_CART_ITEMS,
  SHOW_CART,
  SET_PAYMENT_DETAILS,
  SET_COUPON,
  SET_STORE_CREDIT,
  SET_IS_SHIPPING_ADDRESS_VERIFIED,
  SET_CHECKOUT_ERROR,
  SET_SEZZLE_URL,
} from "../../redux/actions";
import useCustomerDetails from "./customer/use-customer-details";
import { Gtag_PurchaseEvent } from "../../utils/google-tags/events";

export default function usePlaceOrder() {
  const dispatch = useDispatch();
  const history = useRouter();
  const cartItems = useSelector((state) => state.cartItems);
  const cartDetails = useSelector((state) => state.cartDetails);

  const [orderResponse, setorderResponse] = useState([]);
  const { customerDetailsRefetch } = useCustomerDetails();

  const [placeOrder, { loading: placeOrderLoading }] = useMutation(GUEST_PLACE_ORDER);

  const clearCheckoutData = (platformOrderId) => {
    try {
      customerDetailsRefetch();
      if (platformOrderId) {
        history?.push({
          pathname: "/checkout/success",
          query: { id: platformOrderId },
        });
      }

      dispatch(SHOW_CART(false));
      setTimeout(() => {
        dispatch(UPDATE_CART_DETAIL({}));
        dispatch(UPDATE_CART_ITEMS([]));
        dispatch(UPDATE_GUEST_CART_ID(""));
        dispatch(SET_CHECKOUT_BILLING_ADDRESS({}));
        dispatch(SET_CHECKOUT_SHIPPING_ADDRESS({}));
        dispatch(SET_CHECKOUT_SHIPPING_METHOD({}));
        dispatch(SET_AVAILABLE_SHIPPING_METHODS([]));
        dispatch(SET_AVAILABLE_PAYMENT_METHODS([]));
        dispatch(SET_CHECKOUT_PAYMENT_METHOD({}));
        dispatch(SET_PAYMENT_DETAILS({}));
        dispatch(SET_COUPON(false));
        dispatch(SET_STORE_CREDIT({}));
        dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(false));
        dispatch(SET_SEZZLE_URL({}));
      }, 500);
      return true;
    } catch (error) {
      console.log("ReduxError Reset", error);
      return true;
    }
  };

  const handlePlaceOrder = (data, setOrderProcessingLoading) => {
    setOrderProcessingLoading(true);
    placeOrder({
      variables: data,
    })
      .then((res) => {
        if (res?.data && !res?.errors?.length) {
          setorderResponse(res?.data);
          Gtag_PurchaseEvent(
            cartItems,
            res?.data?.placeOrder?.platformOrderId,
            "Credit/Debit Card",
            cartDetails
          );
          clearCheckoutData(res?.data?.placeOrder?.platformOrderId).then(() => {
            setOrderProcessingLoading(false);
          });
        } else if (res?.errors[0]?.message && typeof (res?.errors[0]?.message !== "object")) {
          setOrderProcessingLoading(false);
          dispatch(SET_CHECKOUT_ERROR(errorMessageReplace(res?.errors[0]?.message)));
        }
      })
      .catch((err) => {
        console.log(err);
        setOrderProcessingLoading(false);
      });
  };

  const errorMessageReplace = (message) => {
    if (message.match("Unable to Place order: Authorize.Net CIM Gateway")) {
      if (message.match("more than 10 payment profiles")) {
        return {
          error: `There’s an issue with your payment profile. Please contact our support team, and we’ll be happy to assist you.`,
        };
      } else {
        return {
          error:
            "Transaction failed. This transaction has been declined. Please contact our support team for further assistance.",
        };
      }
    }
    if (message.match("Due to your local rules and regulations")) {
      return {
        localRules: message?.replace("Unable to Place order:", ""),
      };
    } else if (message.match("Due to the state rules and regulations")) {
      return { localRules: message };
    }
    return {
      error: message,
    };
  };

  return { handlePlaceOrder, orderResponse, placeOrderLoading, clearCheckoutData };
}
