import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useGetOrderDetail from "../../../helper/hooks/customer/use-get-order-detail";
import useReorder from "../../../helper/hooks/customer/use-reorder";
import { EmptyOrderList, MyOrderTableHeader } from "./Healper";
import OrderItem from "./OrderItem";

export default function OrderList({ orders, OrderListLoading }) {
  const history = useRouter();
  const { pathname } = history;

  const [ctrlClicked, setCtrlClicked] = useState(false);

  const { handleReorder, reorderLoading } = useReorder();
  const { getOrderDetailResponse, orderDetailResponse, orderDetailLoading } = useGetOrderDetail();

  // Redirecting to Order Detail Page
  const handleRedirection = (e, orderId) => {
    if (e.ctrlKey) {
      getOrderDetailResponse({ variables: { orderNumber: orderId } });
      setCtrlClicked(true);
    } else {
      getOrderDetailResponse({ variables: { orderNumber: orderId } });
    }
  };

  useEffect(() => {
    if (orderDetailResponse) {
      if (ctrlClicked) {
        window.open("/account/order-detail", "_blank");
        setCtrlClicked(false);
      } else {
        history?.push({ pathname: "/account/order-detail" });
      }
    }
  }, [orderDetailResponse]);

  if (orders?.length) {
    return (
      <div
        className={`${
          pathname === "/account/my-orders"
            ? "p-5 border border-[#ebebeb] bg-[#fff] myorder-list "
            : ""
        } overflow-auto`}
      >
        <table
          className={`${
            OrderListLoading || reorderLoading || orderDetailLoading
              ? "opacity-40 pointer-events-none"
              : ""
          } min-w-full table-auto border-collapse w-full myorder-table`}
        >
          <MyOrderTableHeader />

          <tbody>
            {orders?.map(
              (item) =>
                item && (
                  <OrderItem
                    item={item}
                    handleReorder={handleReorder}
                    handleRedirection={handleRedirection}
                  />
                )
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <EmptyOrderList orders={orders} OrderListLoading={OrderListLoading} />;
  }
}
