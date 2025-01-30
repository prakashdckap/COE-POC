import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/solid";
import TextInput from "../../theme-files/text-input";
import Paragraph from "../../theme-files/paragraph";

function Reward({ handleApplyRewardPoints, applyRewardPointsLoading }) {
  const [open, setOpen] = useState(false);

  const [values, setvalues] = useState({});
  const [maxRewards, setmaxRewards] = useState(false);
  const [cancelRewards, setCancelRewards] = useState(false);
  const [show, setShow] = useState(true);
  const cartDetails = useSelector((state) => state.cartDetails);

  // Apply and Remove rewards button handler
  const handleRewardPoints = () => {
    // if (!cartDetails?.appliedRewardPoints?.applied) {
    // handleApplyRewardPoints(values?.reward);
    setmaxRewards(false);
    // }
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
    if (maxRewards)
      setvalues({
        reward: cartDetails?.appliedRewardPoints?.spentPoints
          ? cartDetails?.appliedRewardPoints?.spentPoints
          : cartDetails?.appliedRewardPoints?.maxPoints,
      });
    else if (cartDetails?.appliedRewardPoints?.applied)
      setvalues({
        reward:
          cartDetails?.appliedRewardPoints?.spentPoints && !maxRewards
            ? ""
            : cartDetails?.appliedRewardPoints?.spentPoints,
      });
    else setvalues({ reward: "" });
  }, [maxRewards]);

  useEffect(() => {
    if (cartDetails?.appliedRewardPoints?.applied)
      setmaxRewards(
        cartDetails?.appliedRewardPoints?.spentPoints ===
          cartDetails?.appliedRewardPoints?.maxPoints
      );
  }, [cartDetails?.appliedRewardPoints?.applied]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (cartDetails?.appliedRewardPoints?.earnPoints)
  //       dispatch(
  //         SET_NOTIFICATION({
  //           status: true,
  //           message: `Checkout now and earn ${cartDetails?.appliedRewardPoints?.earnPoints} Reward Points for this order.`,
  //           type: "success",
  //         })
  //       );
  //   }, 500);
  // }, [cartDetails?.totalQuantity]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (cartDetails?.appliedRewardPoints?.spentPoints)
  //       dispatch(
  //         SET_NOTIFICATION({
  //           status: true,
  //           message: `${cartDetails?.appliedRewardPoints?.spentPoints} Reward Points were applied.`,
  //           type: "success",
  //         })
  //       );
  //   }, 500);
  // }, [cartDetails?.appliedRewardPoints?.spentPoints]);

  const handleSelectReward = () => {
    if (!maxRewards) {
      handleApplyRewardPoints(
        cartDetails?.appliedRewardPoints?.maxPoints,
        setCancelRewards,
        setShow
      );
    } else {
      handleApplyRewardPoints(0, setCancelRewards, setShow);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full relative flex items-center justify-between py-[7px] pr-[30px] pl-[5px] border-t-[1px] border-[#ebebeb]"
      >
        <Paragraph className="text-[14px] leading-[1.35] font-medium uppercase text-[#282828]">
          Use Reward Points{" "}
        </Paragraph>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 absolute right-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 absolute right-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        )}
        {/* {open ? <ChevronUp className="absolute right-0  font-light" /> : <ChevronDown className="absolute right-0 font-normal"  />} */}
      </button>

      {open && (
        <div
          className={` ${
            applyRewardPointsLoading ? "opacity-40 pointer-events-none relative" : null
          } `}
        >
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
                <span>
                  {cartDetails?.appliedRewardPoints?.spentPoints} Reward Points were applied.
                </span>
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

          {cartDetails?.appliedRewardPoints?.maxPoints ? (
            <div className="text-[13px] leading-[1.35] text-[#282828] mb-[15px] font-sans">
              You have{" "}
              <span className="font-bold">
                {cartDetails?.appliedRewardPoints?.maxPoints} Reward Points
              </span>{" "}
              available.
            </div>
          ) : null}

          <span className="text-[13px] leading-[1.35] text-[#898989] font-sans">
            Enter amount of points to spend
          </span>

          <TextInput
            type="number"
            // placeholder="Enter amount of points to spend"
            name="reward"
            values={values}
            setvalues={setvalues}
            className=""
          />

          {/* <div className="text-[13px] leading-[1.35] text-[#e02b27] mt-[7px]">This is a required field.</div> */}
          <div className="flex">
            <button
              disabled={applyRewardPointsLoading || !values?.reward}
              onClick={() => {
                handleRewardPoints();
                handleApplyRewardPoints(values?.reward, setCancelRewards, setShow);
              }}
              type="button"
              // className=" w-1/2 bg-skin-button-accent-hover hover:bg-skin-primary py-3 px-2 mr-1 text-xs font-medium text-white mt-2 uppercase disabled:cursor-not-allowed disabled:opacity-50"
              className=" text-[12px] leading-[1.35] border-[#000] py-[7px] px-[15px] cursor-pointer hover:bg-[#000] hover:text-white hover:border-[#a80f16]  text-[#000] mt-2 uppercase  border"
            >
              {/* Apply Points */}
              apply points
            </button>
            <button
              disabled={
                applyRewardPointsLoading ||
                !values?.reward ||
                !cartDetails?.appliedRewardPoints?.applied
              }
              onClick={() => {
                setvalues({ reward: "" });
                handleApplyRewardPoints(0, setCancelRewards, setShow);
                setmaxRewards(false);
              }}
              type="button"
              // className="w-1/2 bg-skin-button-accent-hover hover:bg-skin-primary py-3 px-4 text-xs font-medium text-white mt-2 uppercase disabled:cursor-not-allowed disabled:opacity-50"
              className="text-[12px] leading-[1.35] border-[#000] py-[7px] px-[15px] ml-[5px] cursor-pointer hover:bg-[#000] hover:text-white hover:border-[#a80f16]  text-[#000] mt-2 uppercase  border "
            >
              Cancel Points
            </button>
          </div>

          <div className="pt-[10px] flex">
            <input
              type="checkbox"
              name="maximumRewards"
              onClick={() => {
                setmaxRewards(!maxRewards);
                handleSelectReward();
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
            <label htmlFor="rewards" className="text-[13px] text-[#282828] font-light ml-2">
              Use maximum{" "}
              <span className="text-[13px] font-semibold">
                {cartDetails?.appliedRewardPoints?.maxPoints} Reward Points
              </span>
            </label>
          </div>
          {applyRewardPointsLoading ? (
            <div className="absolute top-[30%] right-[50%]">
              <span className="">
                <i className="fa fa-spinner animate-spin text-[26px]" aria-hidden="true" />
              </span>
            </div>
          ) : null}

          <hr className="my-[13px] text-[#ccc]" />
        </div>
      )}
    </>
  );
}

export default Reward;
