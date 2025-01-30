import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/solid";
import TextInput from "../../../../theme-files/text-input";
import LoadingSpinner from "../../../../helper/loading-spinner";

function Reward({ handleApplyRewardPoints, applyRewardPointsLoading }) {
  const [values, setvalues] = useState("");
  const [maxRewards, setmaxRewards] = useState(false);
  const [cancelRewards, setCancelRewards] = useState(false);
  const [show, setShow] = useState(true);
  const cartDetails = useSelector((state) => state.cartDetails);

  // Apply and Remove rewards button handler
  const handleRewardPoints = (e) => {
    e.preventDefault();
    setmaxRewards(false);
  };

  // To clear input and set default value in input field
  useEffect(() => {
    if (cartDetails?.appliedRewardPoints?.spentPoints) {
      setvalues({ reward: cartDetails?.appliedRewardPoints?.spentPoints });
    } else {
      setvalues({ reward: "" });
    }
  }, [cartDetails]);

  useEffect(() => {
    if (maxRewards) setvalues({ reward: cartDetails?.appliedRewardPoints?.spentPoints });
    else if (cartDetails?.appliedRewardPoints?.applied)
      setvalues({ reward: cartDetails?.appliedRewardPoints?.spentPoints });
    else setvalues({ reward: "" });
  }, [maxRewards]);

  useEffect(() => {
    if (cartDetails?.appliedRewardPoints?.applied)
      setmaxRewards(
        cartDetails?.appliedRewardPoints?.spentPoints ===
          cartDetails?.appliedRewardPoints?.maxPoints
      );
  }, [cartDetails?.appliedRewardPoints?.applied]);

  return (
    <div
      className={`${
        applyRewardPointsLoading ? "opacity-40 pointer-events-none" : null
      } flex flex-col border-[1px] border-[#dcdcdc] p-[15px] relative`}
    >
      {applyRewardPointsLoading && (
        <div className="absolute top-[32%] right-[50%]">
          <i className="fa fa-spinner animate-spin text-[30px]" aria-hidden="true" />
        </div>
      )}
      <div
        onClick={() => setShow(false)}
        onKeyDown={() => setShow(false)}
        role="button"
        tabIndex="0"
      >
        {show &&
        cancelRewards === false &&
        cartDetails?.appliedRewardPoints?.applied &&
        cartDetails?.appliedRewardPoints?.spentPoints ? (
          <div className="flex mb-3 p-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full">
            <CheckIcon className="w-5 h-5 mr-[10px]" />
            <span>{cartDetails?.appliedRewardPoints?.spentPoints} Reward Points were applied.</span>
          </div>
        ) : (
          ""
        )}

        {show && cancelRewards ? (
          <div className="flex mb-3 p-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full">
            <CheckIcon className="w-5 h-5 mr-[10px]" />
            <span> Reward Points were cancelled.</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="text-sm text-[#292c2d] font-normal mb-[10px] ">
        You have{" "}
        <span className="text-sm font-semibold">
          {cartDetails?.appliedRewardPoints?.maxPoints} Reward Points
        </span>{" "}
        available.
      </div>

      <form className="flex justify-between">
        <div className="w-[62%]">
          <TextInput
            type="number"
            placeholder="Enter amount of points to spend"
            name="reward"
            values={values}
            setvalues={setvalues}
          />
        </div>
        <button
          disabled={applyRewardPointsLoading || !values?.reward}
          onClick={(e) => {
            handleRewardPoints(e);
            handleApplyRewardPoints(values?.reward, setCancelRewards, setShow);
          }}
          type="submit"
          className="flex items-center uppercase font-bold justify-center lg:mt-[2px] md:mt-[2px] xl:mt-[2px] 2xl:mt-[2px] mt-[4px] pointer text-[#fff] bg-[#a80f16] h-[40px] border-[1px] border-[#a80f16] w-[100px] text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {applyRewardPointsLoading && values?.reward ? <LoadingSpinner /> : "Apply"}
        </button>
      </form>

      <div>
        <div className="mt-5">
          <label className="containercheckbox">
            <input
              type="checkbox"
              name="maximumRewards"
              onClick={() => {
                setmaxRewards(!maxRewards);
                if (!maxRewards)
                  handleApplyRewardPoints(
                    cartDetails?.appliedRewardPoints?.maxPoints,
                    setCancelRewards,
                    setShow
                  );
                else if (maxRewards) handleApplyRewardPoints(0, setCancelRewards, setShow);
              }}
              checked={maxRewards}
              disabled={applyRewardPointsLoading || !cartDetails?.appliedRewardPoints?.maxPoints}
            />
            <span className="checkbox-checkmark rounded-sm" />
          </label>
          <label htmlFor="rewards" className="text-sm text-[#333] font-normal">
            Use maximum{" "}
            <span className="text-sm font-semibold">
              {cartDetails?.appliedRewardPoints?.maxPoints} Reward Points
            </span>
          </label>
        </div>
        <button
          disabled={
            applyRewardPointsLoading ||
            // !values?.reward ||
            !cartDetails?.appliedRewardPoints?.applied
          }
          onClick={() => {
            handleApplyRewardPoints(0, setCancelRewards, setShow);
          }}
          type="button"
          className="pointer text-[14px] float-right underline text-skin-primary underline-offset-1 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Reward;
