/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { SET_ORDER_DETAIL } from "../../redux/actions";
import PaginationTwo from "../../helper/pagination-two";
import OrderFilter from "./MyOrder/MyOrderFilter";
import OrderFilterEntity from "./MyOrder/OrderFilterEntity";
import { OrderBack } from "./MyOrder/Healper";
import OrderListComponent from "./MyOrder/OrderList";
import useOrderList from "../../helper/hooks/customer/useOrderList";
import { getFilterEntities } from "./helper";
import { removeKeyFromObj } from "./MyOrder/orderHelper";

export default function MyOrders() {
  const history = useRouter();
  const dispatch = useDispatch();
  const customerToken = useSelector((state) => state.customerToken);

  const [orders, setorders] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [contentLimit, setcontentLimit] = useState(10);
  const [filter, setFilter] = useState({});
  const [filterEntries, setFilterEntries] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [filterKey, setFilterKeys] = useState([]);
  const contentLimitArr = [10, 20, 50];

  const { orderList, OrderListRefetch, OrderListLoading, orderPageInfo } = useOrderList({
    currentPage,
    pageSize: contentLimit,
    filter,
  });

  useEffect(() => {
    const filterArr = [filter];
    const filteredObj = getFilterEntities(filterArr);
    setFilterEntries(filteredObj);
    setFilterKeys(filterData);

    if (customerToken) OrderListRefetch();
  }, [customerToken, filter]);

  const totalCount = orderPageInfo.totalCount;
  const pageCount = Math.ceil(totalCount / contentLimit);

  useEffect(() => {
    setcurrentPage(1);
  }, [contentLimit]);

  useEffect(() => {
    setorders(orderList);
    dispatch(SET_ORDER_DETAIL(orderList));
  }, [orderList]);

  // Clearing Order Detial Redux Store
  useEffect(() => {
    dispatch(SET_ORDER_DETAIL([]));
  }, []);

  const clearFilter = () => {
    setShowFilter(false);
    setFilter({});
    setFilterData({});
    history?.push("/account/my-orders");
  };

  // remove filter keys and set the state
  const handleRemove = (keyToRemove) => {
    const returnData = removeKeyFromObj(keyToRemove, filter, filterData, customerToken);
    setFilter(returnData.filter);
    setFilterData(returnData.filterData);
  };

  return (
    <div>
      {/** Display @filter form in MyOrders  */}
      <OrderFilter
        filter={setFilter}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        filterData={filterData}
        setFilterData={setFilterData}
      />
      {/** Display @filter value in MyOrders  */}
      <OrderFilterEntity
        filterEntries={filterEntries}
        clearFilter={clearFilter}
        handleRemove={handleRemove}
        filterKey={filterKey}
      />
      {/** Display @order list  */}
      <OrderListComponent orders={orders} OrderListLoading={OrderListLoading} />

      {/** pagination for order list  */}
      {orders?.length ? (
        <PaginationTwo
          totalCount={totalCount}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
          contentLimit={contentLimit}
          setcontentLimit={setcontentLimit}
          contentLimitArr={contentLimitArr}
          pageCount={pageCount}
        />
      ) : null}

      {/** Display @back button and clear filter  */}
      <OrderBack clearFilter={clearFilter} />
    </div>
  );
}
