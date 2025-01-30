import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import client from "../../graphql";
import {
  CUSTOMER_TOKEN,
  UPDATE_CUSTOMER_CART_ID,
  UPDATE_CART_ITEMS,
  SHOW_CART,
  UPDATE_CART_DETAIL,
  SET_CHECKOUT_SHIPPING_ADDRESS,
  SET_CHECKOUT_SHIPPING_METHOD,
  SET_CHECKOUT_PAYMENT_METHOD,
  SET_CHECKOUT_BILLING_ADDRESS,
  SET_AVAILABLE_SHIPPING_METHODS,
  SET_AVAILABLE_PAYMENT_METHODS,
  UPDATE_CUSTOMER_DETAILS,
  UPDATE_GUEST_CART_ID,
  SET_CHECKOUT_EMAIL,
  SET_PAYMENT_DETAILS,
  SET_COUPON,
  SET_CUSTOMER_ADDRESS_LIST,
  SET_AGE_VERIFICATION_DETAILS,
  SET_STORE_CREDIT,
  SET_ORDER_DETAIL,
  SET_NEWSLETTER_SUBSCRIPTION,
  SET_SESSION_TIMEOUT,
  SET_AVAILABLE_REWARD_POINTS,
  SET_IS_SHIPPING_ADDRESS_VERIFIED,
  SET_REFERRAL_SUBSCRIPTION,
  SET_ROUTE_SHIPPING_VALUE,
  SET_LOGIN_ATTEMPTS,
  SHOW_USER,
} from "../../../redux/actions";
import { AxiosGraphQL } from "../../axios";

export default function useLogout() {
  const dispatch = useDispatch();
  const history = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { sessionTimeout, customerToken } = useSelector((state) => state);
  const logOutTimeInMiliSec = 172800000; /** enabled @_2_days session to user logout */

  const clearReduxCache = () => {
    dispatch(CUSTOMER_TOKEN(""));
    dispatch(UPDATE_CUSTOMER_CART_ID(""));
    dispatch(UPDATE_CUSTOMER_DETAILS({}));
    dispatch(UPDATE_CART_ITEMS([]));
    dispatch(UPDATE_CART_DETAIL({}));
    dispatch(SET_AVAILABLE_PAYMENT_METHODS([]));
    dispatch(SET_AVAILABLE_SHIPPING_METHODS([]));
    dispatch(SET_CHECKOUT_BILLING_ADDRESS({}));
    dispatch(SET_CHECKOUT_SHIPPING_ADDRESS({}));
    dispatch(SET_CHECKOUT_SHIPPING_METHOD({}));
    dispatch(SET_CHECKOUT_PAYMENT_METHOD({}));
    dispatch(UPDATE_GUEST_CART_ID(""));
    dispatch(SHOW_CART(false));
    dispatch(SET_CHECKOUT_EMAIL(""));
    dispatch(SET_PAYMENT_DETAILS({}));
    dispatch(SET_COUPON(false));
    dispatch(SET_CUSTOMER_ADDRESS_LIST([]));
    dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(false));
    dispatch(SET_AGE_VERIFICATION_DETAILS({}));
    dispatch(SET_STORE_CREDIT({}));
    dispatch(SET_ORDER_DETAIL({}));
    dispatch(SET_NEWSLETTER_SUBSCRIPTION(false));
    dispatch(SET_SESSION_TIMEOUT(false));
    dispatch(SET_AVAILABLE_REWARD_POINTS(0));
    dispatch(SET_REFERRAL_SUBSCRIPTION(false));
    dispatch(SET_ROUTE_SHIPPING_VALUE(""));
    dispatch(SET_LOGIN_ATTEMPTS(0));
    dispatch(SHOW_USER(false));
  };

  const clearAll = (isChangePassword) => {
    setLogoutLoading(false);
    clearTimeout(sessionTimeout);
    client.resetStore();
    clearReduxCache();
    localStorage?.setItem("bulkdata", JSON.stringify({}));
    // Preserve specific localStorage item
    const keyToPreserve = "preventPopup";
    const preserveValue = localStorage.getItem(keyToPreserve);

    localStorage.clear();

    // Restore the preserved key for push notification
    if (preserveValue !== null) {
      localStorage.setItem(keyToPreserve, preserveValue);
    }

    if (isChangePassword) {
      window.location.href = "/login";
    } else {
      history?.push("/customer/account/logoutSuccess");
    }
    return true;
  };

  const logout = async (isChangePassword) => {
    if (customerToken) {
      try {
        setLogoutLoading(true);
        const response = await AxiosGraphQL("logout", {}, customerToken);
        if (response.data || response.errors) {
          return clearAll(isChangePassword);
        }
        return clearAll(isChangePassword);
      } catch (error) {
        clearAll(isChangePassword);
        console.error("Error in handleAllow:", error);
      }
    } else {
      clearAll(isChangePassword);
    }
  };

  return { logout, clearReduxCache, logoutLoading, logOutTime: logOutTimeInMiliSec };
}
