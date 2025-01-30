import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LOGIN from "../../../components/login/graphql/mutation/login";
import {
  CUSTOMER_TOKEN,
  SET_LOGIN_ATTEMPTS,
  SET_REFERRAL_SUBSCRIPTION,
  SET_SESSION_TIMEOUT,
  UPDATE_CART_ITEMS,
} from "../../../redux/actions";
import useCustomerDetails from "./use-customer-details";
import useGetAddressList from "./use-get-address-list";
import GET_SUBSCRIPTION_STATUS from "../../../components/account/graphql/query/get-subscription-status";
import { encrypt } from "../../encryption";
import useCustomerCart from "./use-customer-cart";

function useLogin(setshowguestpopup, captchaRef) {
  const [loginMutation, { loading }] = useMutation(LOGIN);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartDetails = useSelector((state) => state.cartDetails);
  const { customerDetailsRefetch, customerDetailsReload: customerDataLoading } =
    useCustomerDetails();
  const { addressListRefetch } = useGetAddressList();
  const customerToken = useSelector((state) => state.customerToken);
  const cartItems = useSelector((state) => state.cartItems);
  const { data: customerDetails, customerDetailsReload } = useCustomerDetails();

  const [referralSubscriptionDataRefetch, { data: refrelData }] = useLazyQuery(
    GET_SUBSCRIPTION_STATUS,
    {
      skip: !customerToken,
    }
  );
  const getSubscription = () => {
    referralSubscriptionDataRefetch();
  };

  useEffect(() => {
    if (refrelData) dispatch(SET_REFERRAL_SUBSCRIPTION(refrelData?.getSubscriptionStatus));
  }, [refrelData]);

  useEffect(() => {
    if (customerDetails) {
      router.push("/account");
      if (setshowguestpopup) setshowguestpopup(false);
    }
  }, [customerDetails]);

  function userLogin(valueInput) {
    loginMutation({
      variables: {
        email: valueInput.email,
        passwd: valueInput?.passwd,
      },
    }).then((res) => {
      if (valueInput.remember) {
        localStorage.setItem(
          "l",
          encrypt({
            email: valueInput.email,
            passwd: valueInput.passwd,
          })
        );
      }
      if (res?.data?.login) {
        dispatch(CUSTOMER_TOKEN(res?.data?.login));
        dispatch(UPDATE_CART_ITEMS([]));
        // if (setshowguestpopup) setshowguestpopup(false);
        customerDetailsRefetch();
        addressListRefetch();
        getSubscription();
        dispatch(SET_LOGIN_ATTEMPTS(0));
        if (!valueInput.remember) {
          dispatch(SET_SESSION_TIMEOUT(new Date().getTime()));
        }
      }

      if (res?.errors?.length) {
        dispatch(SET_LOGIN_ATTEMPTS(1));
        captchaRef?.current?.reset();
      }
    });
  }

  return { userLogin, loading: loading || customerDataLoading, customerDetailsReload };
}

export default useLogin;
