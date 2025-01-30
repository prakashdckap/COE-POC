import React from "react";
import { useRouter } from "next/router";
import { CheckCircle } from "heroicons-react";
import Heading from "../../../theme-files/heading";
import Paragraph from "../../../theme-files/paragraph";
import useGetOrderPrintDetail from "../../../helper/hooks/customer/use-get-order-print-detail";
import LoadingSpinner from "../../../helper/loading-spinner";
import useGetOrderDetail from "../../../helper/hooks/customer/use-get-order-print-detail copy";

function OrderSuccess({ zipOrderId, zipSuccessLoading }) {
  const history = useRouter();
  const orderID = zipOrderId ? zipOrderId : history.query.id;
  const { getOrderPrintDetailResponse } = useGetOrderPrintDetail();
  const { getOrderDetailResponse } = useGetOrderDetail();

  const handleOrderPrintDetailRedirection = (orderId) => {
    getOrderPrintDetailResponse({ variables: { orderNumber: orderId } });
  };

  const handleRedirectToOrderDetails = () => {
    orderID && getOrderDetailResponse({ variables: { orderNumber: orderID } });
  };

  return (
    <div
      className={`${
        zipSuccessLoading ? "opacity-40" : "opacity-100"
      } flex flex-col items-center py-[50px] px-[30px] min-h-[67vh]`}
    >
      <CheckCircle className="h-[150px] w-[150px] text-[#278500]" />
      <Heading className="text-[40px]  text-gray-800 mb-[30px]">
        Thank you for your purchase!
      </Heading>
      <button
        type="button"
        onClick={() => handleOrderPrintDetailRedirection(orderID)}
        className={`${
          zipSuccessLoading ? "cursor-not-allowed" : ""
        } font-medium text-skin-secondary mb-[30px] hover:underline hover:underline-offset-4`}
      >
        {/* <a href="/account/order-detail/print" target="_blank"> */}
        Print receipt
        {/* </a> */}
      </button>
      <Paragraph
        className={`${
          zipSuccessLoading ? "cursor-not-allowed" : ""
        } mb-[30px] hover:underline hover:underline-offset-4 cursor-pointer`}
        onClick={handleRedirectToOrderDetails}
      >
        Your order Id is{" "}
        <span className="font-medium">
          {zipSuccessLoading ? <span>processing...</span> : <span>#{orderID}</span>}
        </span>
      </Paragraph>
      <Paragraph className="mb-[30px]">
        We'll email you an order confirmation with details and tracking info.
      </Paragraph>
      <button
        type="button"
        className={`inline-flex justify-center ${
          zipSuccessLoading ? "cursor-not-allowed" : ""
        } py-2 px-4 lg:px-8 capitalize  border border-transparent text-sm font-medium  text-white bg-skin-primary hover:bg-skin-button-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        onClick={() => {
          history.push("/");
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
