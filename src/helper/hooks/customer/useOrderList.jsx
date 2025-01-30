import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ORDER_LIST from "../../../components/account/graphql/query/order-list";

const getOrderList = (variables) => {
  const customerToken = useSelector((state) => state.customerToken);

  const [orderList, setOrderList] = useState([]);
  const [orderPageInfo, setOrderPageInfo] = useState({});

  const {
    data: OrderList,
    refetch: OrderListRefetch,
    loading: OrderListLoading,
  } = useQuery(ORDER_LIST, {
    skip: !customerToken,
    variables: variables || {
      currentPage: 1,
      pageSize: 5,
      filter: {},
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (OrderList?.customerOrderList?.orderItems) {
      setOrderList(OrderList.customerOrderList.orderItems);
      setOrderPageInfo({
        pageInfo: OrderList.customerOrderList.pageInfo,
        totalCount: OrderList.customerOrderList.totalCount,
      });
    }
  }, [OrderList]);

  return { orderList, OrderListLoading, OrderListRefetch, orderPageInfo };
};

export default getOrderList;
