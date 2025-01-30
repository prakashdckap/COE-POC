import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { ExclamationIcon } from "@heroicons/react/outline";
import STORE_CREDIT from "./graphql/query/store-credit";
import Paragraph from "../../theme-files/paragraph";
import PaginationTwo from "../../helper/pagination-two";

export default function MyAccount() {
  const [storeCredit, setstoreCredit] = useState([]);
  const customerDetails = useSelector((state) => state.customerDetails);
  const customerToken = useSelector((state) => state.customerToken);

  const [currentPage, setcurrentPage] = useState(1);
  const [contentLimit, setcontentLimit] = useState(10);
  const contentLimitArr = [10, 20, 50];

  useEffect(() => {
    setcurrentPage(1);
  }, [contentLimit]);

  const { data: storeCreditHistory, loading: storeCreditHistoryLoading } = useQuery(STORE_CREDIT, {
    skip: !customerToken,
    variables: {
      pageSize: contentLimit,
      currentPage,
    },
  });

  const totalCount = storeCreditHistory?.storeCreditHistory?.totalCount;
  const pageCount = Math.ceil(totalCount / contentLimit);

  useEffect(() => {
    if (storeCreditHistory) {
      setstoreCredit(storeCreditHistory);
    }
  }, [storeCreditHistory]);

  const convertedValue = (amount) => {
    const numberAmount = Number(amount.replace(/[^0-9.]+/g, ""));
    const formattedAmount = (amount.includes("-") ? "-$" : "+$") + numberAmount.toFixed(2);
    return formattedAmount;
  };

  // This method for changing the Date format MM-DD-YYYY
  const formatDate = (dateString) => {
    // Split the date string by "-"
    const parts = dateString.split("-");

    // Rearrange the parts to MM-DD-YYYY format
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

    return formattedDate;
  };

  return (
    <div className=" lg:pb-8">
      <div className="mb-3">
        <h2 className="leading-6 font-normal text-[24px] text-[#282828]">
          Store Credit Balance: <span>$</span>
          {storeCredit?.storeCreditHistory?.items?.length ? (
            <span>{Number(storeCredit?.storeCreditHistory?.items[0]?.newBalance)?.toFixed(2)}</span>
          ) : (
            "0.00"
          )}
        </h2>
      </div>
      {storeCreditHistoryLoading ? (
        "Loading..."
      ) : (
        <div>
          {storeCredit?.storeCreditHistory?.items?.length ? (
            <>
              <div className="p-[16px] border border-[#ebebeb] shadow store-credit-list">
                <table
                  className="min-w-full table-auto border-collapse w-full  store-credit-table
                 "
                >
                  <thead className="hidden sm:table-header-group">
                    <tr className="border-b">
                      <th
                        scope="col"
                        className=" text-left text-sm text-gray-900 font-medium uppercase text"
                      >
                        Transaction Id
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-gray-900 font-medium uppercase"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-gray-900 font-medium uppercase"
                      >
                        Change
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-gray-900 font-medium uppercase"
                      >
                        New Balance
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-gray-900 font-medium uppercase"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-gray-900 font-medium uppercase"
                      >
                        Comment
                      </th>
                      <th scope="col" className="relative ">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeCredit?.storeCreditHistory?.items?.map((item) => (
                      <tr key={item.chage} className="flex flex-col sm:table-row mb-6">
                        <td className=" whitespace-nowrap text-sm text-gray-800 flex sm:table-cell text-left">
                          <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                            Transaction Id:{" "}
                          </span>{" "}
                          {item?.transactionId}
                        </td>
                        <td className=" whitespace-nowrap text-sm text-gray-800 flex sm:table-cell text-left">
                          <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                            Date:{" "}
                          </span>{" "}
                          {/* {item?.date?.split(" ")[0]} */}
                          {formatDate(item?.date?.split(" ")[0])}
                        </td>
                        <td className=" whitespace-nowrap text-sm flex sm:table-cell text-left">
                          <span className="font-bold text-sm Capitalize  block sm:hidden mr-2">
                            Change:{" "}
                          </span>

                          {item?.change.toString().charAt(0) === "-" ? (
                            <span className="text-[#b71c1c]">{convertedValue(item?.change)}</span>
                          ) : (
                            <span className="text-[#0a820b] ">{convertedValue(item?.change)}</span>
                          )}
                        </td>
                        <td className=" whitespace-nowrap text-sm text-gray-800 flex sm:table-cell text-left">
                          {" "}
                          <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                            New Balance:{" "}
                          </span>
                          <span>$</span>
                          <span>{Number(item?.newBalance).toFixed(2)}</span>
                        </td>
                        <td className=" whitespace-nowrap text-sm text-gray-800 flex sm:table-cell text-left">
                          {" "}
                          <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                            Action:{" "}
                          </span>
                          {item?.action?.text?.includes("#") ? (
                            <span>
                              {item?.action?.text.split("#")[0]} #
                              {item?.action?.arguments[0]
                                .replaceAll(`"`, "")
                                .replaceAll("[", "")
                                .replaceAll("]", "")}
                            </span>
                          ) : (
                            <span>{item?.action?.text}</span>
                          )}
                          {/* {item?.action?.text} */}
                        </td>
                        <td className=" whitespace-nowrap text-sm text-gray-800 flex sm:table-cell text-center">
                          {" "}
                          <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                            Comment:{" "}
                          </span>
                          {item?.comment !== null ? item?.comment : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalCount >= 1 ? (
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
            </>
          ) : (
            <div className="mb-3 p-3 sm:p-6 w-full max-h-3 bg-[#fef0d5] inline-flex items-center">
              <ExclamationIcon className="w-5 h-5 bg-[#fef0d5] mr-3 text-[#c07600]" />
              <Paragraph> You have no store credit history.</Paragraph>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
