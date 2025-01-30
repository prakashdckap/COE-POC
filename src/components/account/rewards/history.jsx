import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import CUSTOMER_REWARD_POINTS from "../graphql/query/customer-reward-points";
import RewardsMenu from "./rewards-menu";
import Paragraph from "../../../theme-files/paragraph";
import { SET_REFERRAL_SUBSCRIPTION } from "../../../redux/actions";
import REWARDS_SUBSCRIPTION from "../graphql/mutation/rewards-subscription";
import PaginationTwo from "../../../helper/pagination-two";

export default function MyAccount() {
  const dispatch = useDispatch();
  const [rewardPointsResponse, setrewardPointsResponse] = useState(null);
  const referralSubscription = useSelector((state) => state.referralSubscription);
  const customerToken = useSelector((state) => state.customerToken);
  const [currentPage, setcurrentPage] = useState(1);
  const [contentLimit, setcontentLimit] = useState(10);
  const contentLimitArr = [10, 20, 50];

  const [rewardSubscription, { loading: rewardSubscriptionLoading }] =
    useMutation(REWARDS_SUBSCRIPTION);

  const handleRewardSubscription = () => {
    rewardSubscription({
      skip: !customerToken,
      variables: {
        subscribe: !referralSubscription,
      },
    })
      .then((res) => {
        if (res?.data && !res?.data?.errors?.length) {
          dispatch(SET_REFERRAL_SUBSCRIPTION(res?.data?.rewardSubscription));
        }
      })
      .catch((err) => console.log(err));
  };

  const { data: rewardPoints, loading: customerRewardPointsLoading } = useQuery(
    CUSTOMER_REWARD_POINTS,
    {
      variables: {
        pageSize: contentLimit,
        currentPage,
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );

  const totalCount =
    rewardPoints?.customerRewardPoints?.history?.length > 10
      ? 20
      : rewardPoints?.customerRewardPoints?.totalCount;
      // : rewardPoints?.customerRewardPoints?.history?.length;
  const pageCount = Math.ceil(totalCount / contentLimit);

  useEffect(() => {
    setrewardPointsResponse(rewardPoints?.customerRewardPoints);
  }, [rewardPoints]);
  // Function to format date
  const parseDate = (str) => {
    const mdy = str.split("-");
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  };

  const datediff = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <RewardsMenu />
      <div
        className={`${
          customerRewardPointsLoading || rewardSubscriptionLoading
            ? "opacity-40 pointer-events-none"
            : null
        } py-6 px-4 sm:p-6 lg:pb-8 border shadow`}
      >
        <div>
          <h2 className="text-[26px] font-normal font-sans leading-6 text-skin-secondary mb-3">
            My Reward Points
          </h2>

          {referralSubscription ? (
            <p className="mb-5 font-normal font-sans text-[#282828] text-sm">
              {" "}
              To unsubscribe from points expiring notification click{" "}
              <button type="button" className="medium" onClick={() => handleRewardSubscription()}>
                {" "}
                <span className="font-medium">here</span>
              </button>
            </p>
          ) : (
            <p className="mb-5 font-light">
              {" "}
              To subscribe to points expiring and balance update notification click{" "}
              <button type="button" className="medium" onClick={() => handleRewardSubscription()}>
                {" "}
                here
              </button>
            </p>
          )}

          <hr className="mt-3 mb-3" />

          <span className="font-light text-[16px] font-sans">TRANSACTIONS HISTORY</span>

          <hr className="mt-3 mb-3" />

          <div>
            <table className="w-full mt-5 myreward-points-table">
              {rewardPointsResponse?.history?.length ? (
                <thead className="border-b-[1px] hidden sm:table-header-group">
                  <tr>
                    <th className="text-left pr-5 pb-3 text-sm font-medium font-sans text-[#282828]">
                      ID
                    </th>
                    <th className="text-left pr-5 pb-3 text-sm font-medium font-sans text-[#282828]">
                      COMMENT
                    </th>
                    <th className="text-left pr-5 pb-3 text-sm font-medium font-sans text-[#282828]">
                      POINTS
                    </th>
                    <th className="text-left pb-3 text-sm font-medium font-sans text-[#282828]">
                      CREATED
                    </th>
                  </tr>
                </thead>
              ) : null}

              <tbody>
                {rewardPointsResponse?.history?.length ? (
                  rewardPointsResponse?.history?.map((item) => (
                    <tr key={item?.transactionId} className="flex flex-col sm:table-row mb-6">
                      <td className="py-1.5 sm:py-2.5 whitespace-nowrap pr-5 font-normal text-[13px] font-sans text-[#282828] flex sm:table-cell text-left items-center">
                        <span className="font-bold text-[13px] font-sans text-[#282828] Capitalize block sm:hidden mr-2">
                          ID:{" "}
                        </span>{" "}
                        {item?.transactionId}
                      </td>
                      <td className="py-1.5 sm:py-2.5  pr-5 font-normal text-[13px] font-sans text-[#282828] flex sm:table-cell text-start items-start">
                        <span className="font-bold text-[13px] font-sans text-[#282828] Capitalize block sm:hidden mr-2">
                          Comment: <span className="font-normal">{item?.comment}</span>
                        </span>{" "}
                        <span className="font-normal sm:block hidden ">{item?.comment}</span>
                      </td>
                      {item?.amountUsed.toString().charAt(0) === "-" ? (
                        <td className="py-1.5 sm:py-2.5 whitespace-nowrap pr-5 text-red-600 font-normal text-[13px] font-sans flex sm:table-cell text-left items-center">
                          <span className="font-bold text-[13px] font-sans text-[#282828] Capitalize block sm:hidden mr-2">
                            Points:{" "}
                          </span>{" "}
                          {item?.amountUsed}
                        </td>
                      ) : (
                        <td className="py-1.5 sm:py-2.5 whitespace-nowrap pr-5 text-green-600 font-normal text-[13px] font-sans flex sm:table-cell text-left items-center">
                          <span className="font-bold text-[13px] font-sans Capitalize text-[#282828] block sm:hidden mr-2">
                            Points:{" "}
                          </span>{" "}
                          +{item?.amountUsed}
                        </td>
                      )}
                      {datediff(
                        parseDate(item?.created?.split(" ")[0]),
                        parseDate(new Date().toISOString()?.split("T")[0])
                      ) === 0 ? (
                        <td className="py-1.5 sm:py-2.5 whitespace-nowrap pr-5 font-normal text-[13px] font-sans text-[#282828] flex sm:table-cell text-left items-center">
                          <span className="font-bold text-[13px] font-sans text-[#282828] Capitalize  block sm:hidden mr-2">
                            Created:{" "}
                          </span>
                          <span>Today</span>
                        </td>
                      ) : (
                        <td className="py-1.5 sm:py-2.5 whitespace-nowrap pr-5 font-normal text-[13px] font-sans text-[#282828] flex sm:table-cell text-left items-center">
                          <span className="font-bold text-[13px] font-sans text-[#282828] Capitalize  block sm:hidden mr-2">
                            Created:{" "}
                          </span>
                          {datediff(
                            parseDate(item?.created?.split(" ")[0]),
                            parseDate(new Date().toISOString()?.split("T")[0])
                          )}{" "}
                          {`day${
                            datediff(
                              parseDate(item?.created?.split(" ")[0]),
                              parseDate(new Date().toISOString()?.split("T")[0])
                            ) > 1
                              ? "s"
                              : ""
                          } ago`}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <Paragraph className="text-center font-medium text-lg my-5 text-gray-500">
                    No History Found
                  </Paragraph>
                )}
              </tbody>
            </table>
          </div>
        </div>
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
  );
}
