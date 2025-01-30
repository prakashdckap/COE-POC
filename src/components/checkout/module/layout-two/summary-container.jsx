import { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import OrderDetails from "./order-details";
import CouponCode from "./coupon-code";
import StoreCredit from "./store-credit";
import Reward from "./reward";
import useAddCoupon from "../../../../helper/hooks/cart/use-add-coupon";
import useRemoveCoupon from "../../../../helper/hooks/cart/use-remove-coupon";
import useApplyRewardPoints from "../../../../helper/hooks/cart/use-apply-reward-points";

export default function SummaryContainer({ ZipMerchantFee }) {
  const customerDetails = useSelector((state) => state.customerDetails);
  const [rewardInfo, setrewardInfo] = useState(false);
  const [storeCreditInfo, setstoreCreditInfo] = useState(false);
  const { handleAddCoupon, applyCouponLoading, addCouponCartDetailsLoading } = useAddCoupon();
  const { handleRemoveCoupon, removeCouponLoading, removeCouponCartDetailsLoading } =
    useRemoveCoupon();
  const { handleApplyRewardPoints, applyRewardPointsLoading, cartRewardPointsLoading } =
    useApplyRewardPoints();
  return (
    <div>
      <OrderDetails
        ZipMerchantFee={ZipMerchantFee}
        addCouponCartDetailsLoading={addCouponCartDetailsLoading}
        removeCouponCartDetailsLoading={removeCouponCartDetailsLoading}
        cartRewardPointsLoading={cartRewardPointsLoading}
        applyRewardPointsLoading={applyRewardPointsLoading}
        removeCouponLoading={removeCouponLoading}
        applyCouponLoading={applyCouponLoading}
      />
      <CouponCode
        handleAddCoupon={handleAddCoupon}
        applyCouponLoading={applyCouponLoading}
        handleRemoveCoupon={handleRemoveCoupon}
        removeCouponLoading={removeCouponLoading}
      />
      <hr />
      {customerDetails?.customerStoreCredit && Number(customerDetails?.customerStoreCredit) > 0 ? (
        <>
          <div className="py-5">
            <button
              type="button"
              className="flex bg-[#000000] text-[#fff] text-sm p-[12px] font-medium uppercase text-center items-center justify-center w-full "
              onClick={() => setstoreCreditInfo(!storeCreditInfo)}
            >
              Apply Store Credit{" "}
              {!storeCreditInfo ? (
                <ChevronDownIcon className="ml-3 h-5 w-5" />
              ) : (
                <ChevronUpIcon className="ml-3 h-5 w-5" />
              )}
            </button>

            {storeCreditInfo ? <StoreCredit /> : null}
          </div>

          <hr />
        </>
      ) : null}
      <div className="py-5">
        <button
          type="button"
          className="flex bg-[#000000] text-[#fff] text-sm p-[12px] font-semibold uppercase text-center items-center justify-center w-full "
          onClick={() => setrewardInfo(!rewardInfo)}
        >
          Apply Reward Points{" "}
          {!rewardInfo ? (
            <ChevronDownIcon className="ml-3 h-5 w-5" />
          ) : (
            <ChevronUpIcon className="ml-3 h-5 w-5" />
          )}
        </button>

        {rewardInfo ? (
          <Reward
            handleApplyRewardPoints={handleApplyRewardPoints}
            applyRewardPointsLoading={applyRewardPointsLoading}
          />
        ) : null}
      </div>
    </div>
  );
}
