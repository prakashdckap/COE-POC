import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import ORDER_DETAIL from "../../../components/account/graphql/query/order-detail";
import { SET_ORDER_DETAIL } from "../../../redux/actions";

export default function useGetOrderPrintDetail() {
  const history = useRouter();
  const dispatch = useDispatch();
  const [
    getOrderPrintDetailResponse,
    { loading: orderPrintDetailLoading, data: orderPrintDetailResponse },
  ] = useLazyQuery(ORDER_DETAIL);

  useEffect(() => {
    if (orderPrintDetailResponse?.customerOrderDetail?.orderId) {
      dispatch(SET_ORDER_DETAIL(orderPrintDetailResponse?.customerOrderDetail));
      history?.push({ pathname: "/account/order-detail/print" });
    }
  }, [orderPrintDetailResponse]);

  return { getOrderPrintDetailResponse, orderPrintDetailLoading, orderPrintDetailResponse };
}
