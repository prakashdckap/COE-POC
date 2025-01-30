import { useState, useEffect } from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReplyOutline } from "heroicons-react";
import PropTypes from "prop-types";
import OrderDetailHeader from "../../../pages/account/order-detail-header";

export default function ViewOrder({ isPrint = false }) {
  const history = useRouter();
  const orderDetailState = useSelector((state) => state.orderDetail);
  const [orderDetail, setorderDetail] = useState({});

  useEffect(() => {
    setorderDetail(orderDetailState);
  }, [orderDetailState]);

  const {
    orderedItems,
    orderTotal,
    shippingAddress,
    billingAddress,
    shippingMethod,
    paymentMethod,
    dealerInfo,
  } = orderDetail;

  return (
    <div className="w-full">
      {isPrint ? <OrderDetailHeader /> : null}

      <div className="w-full flex flex-wrap">
        <div className="w-full">
          <div className="border p-5">
            <div className="overflow-x-auto ">
              <h2 className="mt-5 mb-3 font-light text-2xl">Items Ordered</h2>
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th
                      scope="col"
                      className="hidden sm:table-cell break-words whitespace-normal px-[8px] py-[10px] text-left text-sm font-medium text-[#282828] uppercase tracking-wider"
                    >
                      Product name
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-[8px] py-[10px] text-left text-sm font-medium text-[#282828] uppercase tracking-wider"
                    >
                      sku
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-[8px] py-[10px] text-left text-sm font-medium text-[#282828] uppercase tracking-wider"
                    >
                      price
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-[8px] py-[10px] text-left text-sm font-medium text-[#282828] uppercase tracking-wider"
                    >
                      qty
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-[8px] py-[10px] text-left text-sm font-medium text-[#282828] uppercase tracking-wider"
                    >
                      excise tax
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-[8px] py-[10px] text-right text-sm font-medium text-[#282828] uppercase tracking-wider"
                    >
                      subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderedItems?.length
                    ? orderedItems?.map((item) => (
                        <tr className="bg-white border-b" key={item?.productSku}>
                          <td
                            data-th="Product Name:  "
                            className="sm:before:content-none before:font-bold before:content-[attr(data-th)] block sm:table-cell break-words whitespace-normal px-[0px] md:px-[8px] py-2 mb-4 text-[13px] font-sans text-[#282828]"
                          >
                            {item?.productName}
                            {item?.customOptions?.map((option) => (
                              <div key={option?.label} className="mt-3">
                                <p className="font-bold">{option?.label}</p>
                                <span>{option?.value}</span>
                              </div>
                            ))}

                            {item?.customOptions?.length
                              ? item?.customOptions?.map((option) => (
                                  <>
                                    <p className="mt-2 font-bold text-sm" key={option?.code}>
                                      {option?.name}
                                    </p>
                                    <p>{option?.valueName ? `${option?.valueName}` : null}</p>
                                  </>
                                ))
                              : null}
                            {/* <span className="block"><{item?.customOptions}/span> */}
                          </td>
                          <td
                            data-th="Sku: "
                            className="sm:before:content-none before:content-[attr(data-th)] before:font-bold block sm:table-cell pl-0 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828]"
                          >
                            {item?.productSku}
                          </td>
                          <td
                            data-th="Price: "
                            className="sm:before:content-none before:content-[attr(data-th)] before:font-bold block sm:table-cell pl-0 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold"
                          >
                            ${item?.productPrice?.toFixed(2)}
                          </td>
                          <td
                            data-th="Qty: "
                            className=" sm:before:content-none before:content-[attr(data-th)] before:font-bold block sm:table-cell pl-0 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828]"
                          >
                            {parseInt(item?.quantityOrdered) ? (
                              <div>Ordered: {item?.quantityOrdered}</div>
                            ) : (
                              ""
                            )}
                            {parseInt(item?.quantityCancelled) ? (
                              <div>Cancelled: {item?.quantityCancelled}</div>
                            ) : (
                              ""
                            )}
                            {parseInt(item?.quantityShipped) ? (
                              <div>Shipped: {item?.quantityShipped}</div>
                            ) : (
                              ""
                            )}
                            {parseInt(item?.quantityRefunded) ? (
                              <div>Refunded: {item?.quantityRefunded}</div>
                            ) : (
                              ""
                            )}
                            {parseInt(item?.quantityReturned) ? (
                              <div>Returned: {item?.quantityReturned}</div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td
                            data-th="Excise tax: "
                            className="sm:before:content-none before:content-[attr(data-th)] before:font-bold block sm:table-cell pl-0 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828]"
                          >
                            ${item?.exciseTax?.toFixed(2)}
                          </td>
                          <td
                            data-th="Subtotal: "
                            className=" sm:before:content-none before:content-[attr(data-th)] before:font-bold block sm:table-cell pl-0 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans font-bold text-light md:text-right"
                          >
                            ${(item?.productPrice * parseInt(item?.quantityOrdered, 10)).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
                <tfoot>
                  <tr className="flex justify-start md:justify-between sm:table-row items-center">
                    <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                      Subtotal :
                    </td>
                    <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                      .
                    </td>
                    <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                      ${orderTotal?.subTotal}
                    </td>
                  </tr>
                  {orderTotal?.discounts?.map((discount) => {
                    return (
                      <tr className="flex justify-start md:justify-between sm:table-row items-center">
                        <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                          Discount {discount?.amount ? `(${discount?.label})` : ""} :
                        </td>
                        <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                          .
                        </td>
                        <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                          &#45;${discount?.amount}
                        </td>
                      </tr>
                    );
                  })}

                  {orderTotal?.rewardPoints ? (
                    <tr className="flex justify-start md:justify-between sm:table-row items-center">
                      <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                        Reward Point&#40;s&#41; :
                      </td>
                      <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                        .
                      </td>
                      <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                        &#45;${orderTotal?.rewardPoints}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {orderTotal?.storeCredit * -1 ? (
                    <tr className="flex justify-start md:justify-between sm:table-row items-center">
                      <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                        Store Credit :
                      </td>
                      <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                        .
                      </td>
                      <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                        &#45;${orderTotal?.storeCredit * -1}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  <tr className="flex justify-start md:justify-between sm:table-row items-center">
                    <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                      Shipping & Handling :
                    </td>
                    <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                      .
                    </td>
                    <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                      ${orderTotal?.shippingTotal?.toFixed(2)}
                    </td>
                  </tr>
                  {orderTotal?.exciseTax ? (
                    <tr className="flex justify-start md:justify-between sm:table-row items-center">
                      <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                        Excise Tax:
                      </td>
                      <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                        .
                      </td>
                      <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                        ${orderTotal?.exciseTax?.toFixed(2)}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  <tr className="flex justify-start md:justify-between sm:table-row items-center">
                    <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                      Sales Tax:
                    </td>
                    <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                      .
                    </td>
                    <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                      ${orderTotal?.taxTotal?.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="flex justify-start md:justify-between sm:table-row items-center">
                    <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                      Delivery Fee:
                    </td>
                    <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                      .
                    </td>
                    <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                      {" "}
                      ${orderTotal?.deliveryFee?.toFixed(2)}
                    </td>
                  </tr>
                  {orderTotal?.adultSignatureFee ? (
                    <tr className="flex justify-start md:justify-between sm:table-row items-center break-words">
                      <td className="inline-block sm:table-cell text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                        Adult Signature Service (Required under PACT Act):
                      </td>
                      <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                        .
                      </td>
                      <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                        ${orderTotal?.adultSignatureFee?.toFixed(2)}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  <tr className="flex justify-start md:justify-between sm:table-row items-center">
                    <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                      Route Shipping Protection
                    </td>
                    <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                      .
                    </td>
                    <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] text-right">
                      ${orderTotal?.routeShippingFee?.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="my-5">
                    <td className="border-t" colSpan={6} />
                  </tr>
                  <tr className="flex justify-start md:justify-between sm:table-row items-center">
                    <td className="inline-block sm:table-cell whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold px-[0px] md:px-[8px]">
                      Grand Total:
                    </td>
                    <td className="hidden sm:table-cell text-transparent" colSpan={4}>
                      .
                    </td>
                    <td className="inline-block sm:table-cell pl-2.5 sm:px-[8px] py-2 whitespace-nowrap text-[13px] font-sans text-[#282828] font-bold text-right">
                      ${orderTotal?.grandTotal?.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={() => history?.push("/account/my-orders")}
                className={`${
                  history?.pathname !== "/account/order-detail/print"
                    ? "w-full md:w-5/12 lg:w-4/12"
                    : "w-[70px]"
                } uppercase bg-skin-secondary text-skin-inverted text-xs py-2 px-2`}
              >
                <i
                  className={`inline-block align-middle w-[1.5rem] h-[1.5rem] ${
                    history?.pathname !== "/account/order-detail/print" ? "mr-2" : ""
                  }`}
                >
                  <ReplyOutline />
                </i>
                {history?.pathname !== "/account/order-detail/print" ? " Back to my orders" : null}
              </button>
            </div>
          </div>
          <div className="flex-1 border mt-8 p-5 mb-7">
            <h2 className="mb-3 font-light text-2xl border-b pb-2.5">ORDER INFORMATION</h2>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 mb-5">
                <h3 className="text-base font-medium mb-1">Shipping Address</h3>
                <span className="text-sm">
                  {shippingAddress?.firstName} {shippingAddress?.lastName}
                  {/* <br /> */}
                  {shippingAddress?.company}
                  <br />
                  {shippingAddress?.street?.map((street) => street)}
                  <br /> {shippingAddress?.city}, {shippingAddress?.region},{" "}
                  {shippingAddress?.postcode}
                  <br />
                  {shippingAddress?.country}
                  <br />
                  T: {shippingAddress?.telephone}
                </span>
              </div>
              <div className="w-full sm:w-6/12 mb-5">
                <h3 className="text-base font-medium">Shipping Method</h3>
                <span className="text-sm">{shippingMethod}</span>
                {dealerInfo?.name ? (
                  <>
                    <h3 className="text-base font-medium pt-4">Dealer Name</h3>
                    <span className="text-sm">{dealerInfo?.name}</span>
                  </>
                ) : (
                  ""
                )}

                {dealerInfo?.hours ? (
                  <>
                    <h3 className="text-base font-medium pt-4">Pickup Hours</h3>
                    <span className="text-sm">{dealerInfo?.hours}</span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 mb-5">
                <h3 className="text-base font-medium mb-1">Billing Address</h3>
                <span className="text-sm">
                  {billingAddress?.firstName} {billingAddress?.lastName}
                  {/* <br /> */}
                  {billingAddress?.company}
                  <br />
                  {billingAddress?.street?.map((street) => street)}
                  <br /> {billingAddress?.city}, {billingAddress?.region},{" "}
                  {billingAddress?.postcode}
                  <br />
                  {billingAddress?.country}
                  <br />
                  T: {billingAddress?.telephone}
                </span>
              </div>
              <div className="w-full sm:w-6/12 mb-5">
                <h3 className="text-base font-medium mb-1">Payment Method</h3>
                <span className="text-sm mb-1.5">{paymentMethod?.name}</span>
                {paymentMethod?.name === "Sezzle" ? (
                  ""
                ) : (
                  <div className="flex flex-wrap">
                    <h4 className="w-6/12 p-1.5 text-sm font-bold">Credit Card Type</h4>
                    <span className="w-6/12 text-sm font-normal">
                      {paymentMethod?.ccData?.ccType}
                    </span>
                    <h4 className="w-6/12 p-1.5 text-sm font-bold">Credit Card Number</h4>
                    <span className="w-6/12 text-sm font-normal">
                      {paymentMethod?.ccData?.ccNum?.replace("XXXX", "XXXX-")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewOrder.defaultProps = {
  isPrint: false,
};
ViewOrder.propTypes = {
  isPrint: PropTypes.bool,
};
