import client from "../helper/graphql";
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
  SET_SEZZLE_URL,
} from "../redux/actions";
import store from "../redux/store";

export const performLogout = () => {
  store.dispatch(CUSTOMER_TOKEN(""));
  store.dispatch(UPDATE_CUSTOMER_CART_ID(""));
  store.dispatch(UPDATE_CUSTOMER_DETAILS({}));
  store.dispatch(UPDATE_CART_ITEMS([]));
  store.dispatch(UPDATE_CART_DETAIL({}));
  store.dispatch(SET_AVAILABLE_PAYMENT_METHODS([]));
  store.dispatch(SET_AVAILABLE_SHIPPING_METHODS([]));
  store.dispatch(SET_CHECKOUT_BILLING_ADDRESS({}));
  store.dispatch(SET_CHECKOUT_SHIPPING_ADDRESS({}));
  store.dispatch(SET_CHECKOUT_SHIPPING_METHOD({}));
  store.dispatch(SET_CHECKOUT_PAYMENT_METHOD({}));
  store.dispatch(UPDATE_GUEST_CART_ID(""));
  store.dispatch(SHOW_CART(false));
  store.dispatch(SET_CHECKOUT_EMAIL(""));
  store.dispatch(SET_PAYMENT_DETAILS({}));
  store.dispatch(SET_COUPON(false));
  store.dispatch(SET_CUSTOMER_ADDRESS_LIST([]));
  store.dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(false));
  store.dispatch(SET_AGE_VERIFICATION_DETAILS({}));
  store.dispatch(SET_STORE_CREDIT({}));
  store.dispatch(SET_ORDER_DETAIL({}));
  store.dispatch(SET_NEWSLETTER_SUBSCRIPTION(false));
  store.dispatch(SET_SESSION_TIMEOUT(false));
  store.dispatch(SET_AVAILABLE_REWARD_POINTS(0));
  store.dispatch(SET_REFERRAL_SUBSCRIPTION(false));
  store.dispatch(SET_ROUTE_SHIPPING_VALUE(""));
  store.dispatch(SET_LOGIN_ATTEMPTS(0));
  store.dispatch(SHOW_USER(false));
  store.dispatch(SET_SEZZLE_URL({}));

  localStorage?.setItem("bulkdata", JSON.stringify({}));
  client.resetStore();

  // Preserve specific localStorage item
  const keyToPreserve = "preventPopup";
  const preserveValue = localStorage.getItem(keyToPreserve);

  // Clear all localStorage
  localStorage.clear();

  // Restore the preserved key
  if (preserveValue !== null) {
    localStorage.setItem(keyToPreserve, preserveValue);
  }
  window.location.href = "/login";

  return "Session expired";
};
