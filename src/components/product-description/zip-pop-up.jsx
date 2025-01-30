import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import zipWidgetCartIcon from "../../image/zipWidgetCartIcon.svg";
import zipWidgetCardIcon from "../../image/zipWidgetCardIcon.svg";
import zipWidgetGridIcon from "../../image/zipWidgetGridIcon.svg";

function ZipPopUp({ showZipPopUp, setShowZipPopUp }) {
  const options = ["English", "Spanish", "French"];
  const onOptionChangeHandler = (event) => {
    console.log("User Selected Value - ", event.target.value);
  };

  return (
    <Transition appear show={showZipPopUp} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowZipPopUp}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[375px] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col box-border">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-[#000] hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-4 lg:right-4"
                    onClick={() => setShowZipPopUp(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-[22px] w-[22px]" aria-hidden="true" />
                  </button>
                  <div className="bg-[#ede6ff] box-border text-[#1a0826] pt-[30px] px-[25px] pb-[28px] flex flex-col justify-between">
                    <div>
                      <Link href="https://zip.co/us/how-it-works">
                        <span>
                          <svg
                            width="88"
                            height="32"
                            viewBox="0 0 88 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Zip - Pay in 4 installments, zero interest</title>{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.96815 25.7839L2.73119 31.9993H29.4411L28.5681 24.882H16.1128L16.0051 23.999L27.4752 15.9843L26.7088 9.75549H0L0.874114 16.8739H13.3483L13.4583 17.7636L1.96815 25.7839Z"
                              fill="#1A0826"
                            />{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M29.8125 9.75525L32.5437 31.9991H59.2747L56.5424 9.75525H29.8125Z"
                              fill="#AA8FFF"
                            />{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M32.401 6.80355C34.1504 8.35962 36.6739 8.35962 38.0367 6.80355C39.4006 5.24747 39.0874 2.72397 37.3381 1.16789C35.5898 -0.389298 33.0663 -0.389298 31.7024 1.16789C30.3396 2.72397 30.6517 5.24747 32.401 6.80355Z"
                              fill="#1A0826"
                            />{" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M77.427 21.3141L69.0612 21.323L68.4059 15.985L76.815 15.9916C78.792 16.015 79.805 17.129 79.9682 18.6529C80.0726 19.6336 79.6239 21.3141 77.427 21.3141ZM87.3077 17.7643C86.6901 12.764 82.7627 9.734 77.4247 9.75499H59.6448L62.376 32H70.3741L69.8265 27.5506H78.2911C84.953 27.5506 88.0019 23.3988 87.3077 17.7643Z"
                              fill="#1A0826"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                    <div className="text-[34px] text-[#1a0826] font-light mt-[18px] mb-[10px] leading-[38px] font-serif">
                      Shop online now, pay over time.
                    </div>
                    <div className="text-[14px] leading-[18.2px] font-medium text-[#1a0826] font-sans">
                      We split the purchase amount into 4 <br /> interest-free payments spread over
                      6 <br />
                      weeks.
                    </div>
                  </div>

                  <div className="bg-[#fffffa] text-[#1a0826] font-sans pt-[30px] pb-[13px] flex flex-col justify-between">
                    <div className="px-[30px] pb-[13px]">
                      <div className="flex flex-row items-center justify-start">
                        <div className="w-[17%]">
                          <div className="relative overflow-hidden w-[32px] h-[32px]">
                            <Image
                              src={zipWidgetCartIcon}
                              alt="Choose Zip at checkout"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        </div>

                        <div className="w-[83%] text-[#1a0826] flex flex-col items-start">
                          <div className="text-[18px] font-semibold leading-[23.4px] mb-[5px]">
                            Choose Zip at checkout
                          </div>
                          <div className="text-[12px] leading-[15.6px] font-medium">
                            Quick and easy. No hidden fees.
                          </div>
                        </div>
                      </div>

                      <div className="my-[20px] flex flex-row items-center justify-start">
                        <div className="w-[17%]">
                          <div className="relative overflow-hidden w-[32px] h-[32px]">
                            <Image
                              src={zipWidgetCardIcon}
                              alt="Use your debit or credit card"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        </div>

                        <div className="w-[83%] text-[#1a0826] flex flex-col items-start">
                          <div className="text-[18px] font-semibold leading-[23.4px] mb-[5px]">
                            Use your debit or credit card
                          </div>
                          <div className="text-[12px] leading-[15.6px] font-medium">
                            No long forms and instant approval.
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-start">
                        <div className="w-[17%]">
                          <div className="relative overflow-hidden w-[32px] h-[32px]">
                            <Image
                              src={zipWidgetGridIcon}
                              alt="Choose Zip at checkout"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        </div>

                        <div className="w-[83%] text-[#1a0826] flex flex-col items-start">
                          <div className="text-[18px] font-semibold leading-[23.4px] mb-[5px]">
                            Pay in 4 installments
                          </div>
                          <div className="text-[12px] leading-[15.6px] font-medium">
                            Enjoy your purchase straight away.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-[17px] mx-[24px] mb-[8px] tracking-[0.1px] font-sans font-medium text-[11px] text-center leading-[15px]">
                      <span>
                        Eligibility criteria and late fees apply. Fees excluded in Canada. See
                        complete{" "}
                        <a
                          className="text-[#785bc5] underline underline-offset-1"
                          href="https://zip.co/us/quadpay-terms-of-service"
                        >
                          US Terms
                        </a>{" "}
                        or{" "}
                        <a
                          className="text-[#785bc5] underline underline-offset-1"
                          href="https://zip.co/en-ca/quadpay-terms-of-service"
                        >
                          Canada Terms
                        </a>{" "}
                        for more detail. Estimated payments on product pages exclude taxes, shipping
                        and merchant fees added at checkout. Loans to California residents are
                        pursuant to CFL license #60DBO-110414.
                      </span>
                    </div>
                    <div className="pl-[30px] font-sans text-[11px] text-left leading-[14.4px] font-medium flex">
                      © 2023 Zip Co Limited <span className="mx-[0.4rem]"> | </span>
                      <select className="font-semibold" onChange={onOptionChangeHandler}>
                        {options.map((option, index) => {
                          return <option key={index}>{option}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ZipPopUp;

ZipPopUp.defaultProps = {
  showZipPopUp: false,
};

ZipPopUp.propTypes = {
  showZipPopUp: PropTypes.bool,
  setShowZipPopUp: PropTypes.func.isRequired,
};
