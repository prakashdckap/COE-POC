import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import GET_CUSTOMER_DETAILS from "../../../components/account/graphql/get-customer-details";
import {
  UPDATE_CUSTOMER_CART_ID,
  UPDATE_CUSTOMER_DETAILS,
  SET_CHECKOUT_EMAIL,
  SET_NEWSLETTER_SUBSCRIPTION,
  UPDATE_GUEST_CART_ID,
} from "../../../redux/actions";
// import useCustomerCart from "./use-customer-cart";
import useMergeCarts from "../cart/use-merge-carts";
import ROUTE_SHIPPING from "../../../components/checkout/graphql/mutation/route-shipping";

function useCustomerDetails() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({});
  const customerToken = useSelector((state) => state.customerToken);
  const {
    data,
    refetch: customerDetailsRefetch,
    loading: customerDetailsReload,
  } = useQuery(GET_CUSTOMER_DETAILS, {
    skip: !customerToken,
  });
  const { customerCartId, guestCartId, customerDetails, cartItems } = useSelector((state) => state);
  // const { cartDetailsRefetch } = useCustomerCart();
  const { handleMergeCarts, mergeCartsLoading } = useMergeCarts();
  const [guestCart, setGuestCart] = useState(guestCartId);
  const [routeShipping] = useMutation(ROUTE_SHIPPING);
  useEffect(() => {
    if (customerToken && !customerCartId?.length && data?.customerDetails?.cartId) {
      dispatch(UPDATE_CUSTOMER_CART_ID(data?.customerDetails?.cartId));
      dispatch(SET_NEWSLETTER_SUBSCRIPTION(data?.customerDetails?.isSubscribed));
    }
    if (customerToken && !customerDetails.firstname && data?.customerDetails) {
      dispatch(UPDATE_CUSTOMER_DETAILS(data?.customerDetails));
      dispatch(UPDATE_CUSTOMER_CART_ID(data?.customerDetails?.cartId));
      dispatch(SET_CHECKOUT_EMAIL(data?.customerDetails?.email));
      if (data?.customerDetails?.isSubscribed === "false") {
        dispatch(SET_NEWSLETTER_SUBSCRIPTION(false));
      } else dispatch(SET_NEWSLETTER_SUBSCRIPTION(true));
    }
  }, [data]);

  useMemo(() => {
    if (customerCartId && guestCart && guestCartId && !cartItems?.length) {
      handleMergeCarts({
        destCartId: customerCartId,
        sourceCartId: guestCartId,
      });
      dispatch(UPDATE_GUEST_CART_ID(""));
      setGuestCart("");
    }
  }, [customerCartId]);

  const handleInputChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return {
    data,
    handleInputChange,
    customerDetailsRefetch,
    mergeCartsLoading,
    customerDetailsReload,
  };
}
export default useCustomerDetails;
