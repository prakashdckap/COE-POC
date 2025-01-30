import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import RewardsMenu from "./rewards-menu";
import CUSTOMER_REWARD_POINTS from "../graphql/query/customer-reward-points";
import { SET_AVAILABLE_REWARD_POINTS } from "../../../redux/actions";

export default function MyAccount() {
  const customerToken = useSelector((state) => state.customerToken);
  const dispatch = useDispatch();
  const { data: rewardPointsResponse, loading: customerRewardPointsLoading } = useQuery(
    CUSTOMER_REWARD_POINTS,
    {
      skip: !customerToken,
      fetchPolicy: "network-only",
    }
  );
  useEffect(() => {
    if (rewardPointsResponse?.customerRewardPoints?.balance) {
      dispatch(SET_AVAILABLE_REWARD_POINTS(rewardPointsResponse?.customerRewardPoints?.balance));
    }
  }, [rewardPointsResponse, customerRewardPointsLoading]);

  const availableRewardPoints = useSelector((state) => state.availableRewardPoints);

  return (
    <>
      <RewardsMenu />
      <div className="py-6 px-4 sm:p-6 lg:pb-8 border border-[#ebebeb]">
        <div>
          <h2 className="text-lg leading-6 font-semibold font-sans text-[#282828] mb-2">
            Current Balance
          </h2>
          <span className="text-4xl font-bold">{availableRewardPoints}</span>
          &nbsp;&nbsp;
          <span className="font-normal text-[13px] font-sans text-[#6d6d6d]">Reward Points</span>
        </div>
      </div>
    </>
  );
}
