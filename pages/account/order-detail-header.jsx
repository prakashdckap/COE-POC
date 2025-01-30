import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Calendar } from "heroicons-react";
import { useRouter } from "next/router";

import useReorder from "../../src/helper/hooks/customer/use-reorder";
import SEOHead from "../../src/helper/SEOHeader";
import LoadingSpinner from "../../src/helper/loading-spinner";
import constants from "../../src/helper/constant";

export default function OrderDetailHeader() {
  const history = useRouter();
  const orderDetailState = useSelector((state) => state.orderDetail);
  const [orderDetail, setorderDetail] = useState({});
  const { handleReorder, reorderLoading } = useReorder();

  const { orderId, orderDate, status, paymentMethod } = orderDetail;

  const sezzleReference = paymentMethod?.additionalData?.find(
    (data) => data.name === "sezzle_reference_id"
  );

  useEffect(() => {
    setorderDetail(orderDetailState);
    if (!orderDetailState?.orderId) {
      history.back();
    }
  }, [orderDetailState]);

  // To retrieve month in form of text
  const retrieveMonth = (month) => {
    let monthString = "";
    if (month === "01") {
      monthString = "January";
    } else if (month === "02") {
      monthString = "February";
    } else if (month === "03") {
      monthString = "March";
    } else if (month === "04") {
      monthString = "April";
    } else if (month === "05") {
      monthString = "May";
    } else if (month === "06") {
      monthString = "June";
    } else if (month === "07") {
      monthString = "July";
    } else if (month === "08") {
      monthString = "August";
    } else if (month === "09") {
      monthString = "September";
    } else if (month === "10") {
      monthString = "October";
    } else if (month === "11") {
      monthString = "November";
    } else {
      monthString = "December";
    }

    return monthString;
  };

  // Formatted Date to display
  const getDisplayDate = (responseDate) => {
    const date = responseDate?.split(" ")[0];
    const day = date?.split("-")[2];
    const month = date?.split("-")[1];
    const year = date?.split("-")[0];

    return `${retrieveMonth(month)} ${day},  ${year}`;
  };

  return (
    <div className={`${!orderDetail?.orderId ? "hidden" : null}`}>
      {orderId ? (
        <SEOHead
          title={`Order # ${orderId}`}
          canonicalUrl={`${constants.replaceUrl}/${history?.query?.slug?.[0]}`}
        />
      ) : (
        ""
      )}
      <h1 className="text-center text-2xl font-normal my-5">Order # {orderId}</h1>
      <div className="mb-[25px]">
        <button
          type="button"
          className="button border border-black rounded-md px-2 text-base uppercase mb-2.5"
        >
          {status}
        </button>
        {sezzleReference?.name && (
          <div className="flex items-center mb-2">
            <Calendar className="h-4 w-4 mr-2" />

            <p className="capitalize text-sm text-[#282828]">
              <span className="font-[12px]">Sezzle Order Reference ID:</span>{" "}
              <span className="font-[12px] font-semibold">{sezzleReference?.value}</span>
            </p>
          </div>
        )}
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex items-center mt-3 mb-5">
          <Calendar className="h-4 w-4 mr-2" />

          <p className="capitalize text-sm text-[#282828]">
            <span className="font-bold text-lg">Created:</span>{" "}
            <span className="text-lg">{getDisplayDate(orderDate?.split(" ")[0])}</span>
          </p>
        </div>

        {orderDetail?.isInStock && orderDetail?.status?.toLowerCase() !== "on hold" ? (
          <button
            type="button"
            className="text-sm inline-flex capitalize font-medium mr-7 disabled:cursor-not-allowed disabled:opacity-50 focus:underline"
            onClick={() => handleReorder(orderId)}
            disabled={reorderLoading}
          >
            <span className="pr-1">Reorder</span> {reorderLoading ? <LoadingSpinner /> : ""}
          </button>
        ) : null}

        <button type="button" className="text-sm font-medium">
          <a href="/account/order-detail/print" target="_blank">
            Print Order
          </a>
        </button>
      </div>
    </div>
  );
}
