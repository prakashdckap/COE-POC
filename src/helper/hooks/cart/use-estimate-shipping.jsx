import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/client";
import ESTIMATE_SHIPPING_COST from "../../../components/cart/graphql/query/estimate-shipping-cost";
import useCustomerCart from "../customer/use-customer-cart";
import { SET_CHECKOUT_SHIPPING_ADDRESS } from "../../../redux/actions";

export default function useEstimateShipping() {
  const [estimateShipping, setestimateShipping] = useState({});
  const [update, setUpdate] = useState(false);
  const customerCartId = useSelector((state) => state.customerCartId);
  const customerToken = useSelector((state) => state.customerToken);
  const guestCartId = useSelector((state) => state.guestCartId);
  const { cartDetailsRefetch } = useCustomerCart();
  const dispatch = useDispatch();

  const [
    estimateShippingData,
    { loading: estimateShippingLoading, refetch: estimateShippingRefetch },
  ] = useLazyQuery(ESTIMATE_SHIPPING_COST);

  const handleEstimateShipping = (addressObj) => {
    if (addressObj?.country && customerToken ? customerCartId : guestCartId)
      if (update) {
        estimateShippingRefetch({
          cartId: customerToken ? customerCartId : guestCartId,
          address: addressObj,
        })
          .then((res) => {
            if (res.data) {
              setestimateShipping(res.data);
              setUpdate(true);
              cartDetailsRefetch();
            }
          })
          .catch((err) => console.log("err", err));
      } else {
        estimateShippingData({
          skip: !addressObj?.country || addressObj?.postcode?.length < 5,
          variables: {
            cartId: customerToken ? customerCartId : guestCartId,
            address: addressObj,
          },
        })
          .then((res) => {
            if (res.data) {
              setestimateShipping(res.data);
              setUpdate(true);
              cartDetailsRefetch();
            }
          })
          .catch((err) => console.log("err", err));
      }
  };

  return {
    handleEstimateShipping,
    estimateShipping,
    estimateShippingLoading,
    estimateShippingRefetch,
  };
}
