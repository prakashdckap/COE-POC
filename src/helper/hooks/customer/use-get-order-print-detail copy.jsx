import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import ORDER_DETAIL from "../../../components/account/graphql/query/order-detail";
import { SET_ORDER_DETAIL } from "../../../redux/actions";

export default function useGetOrderDetail() {
  const history = useRouter();
  const dispatch = useDispatch();
  const [getOrderDetailResponse, { loading: orderDetailLoading, data: orderDetailResponse }] =
    useLazyQuery(ORDER_DETAIL);

  useEffect(() => {
    if (orderDetailResponse?.customerOrderDetail?.orderId) {
      dispatch(SET_ORDER_DETAIL(orderDetailResponse?.customerOrderDetail));
      history?.push({ pathname: "/account/order-detail" });
    }
  }, [orderDetailResponse]);

  return { getOrderDetailResponse, orderDetailLoading, orderDetailResponse };
}
