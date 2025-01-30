import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import {
  FullCircle,
  HalfCircle,
  HalfQuarterCircle,
  QuarterCircle,
} from "./modules/sezzle-asset/SezzleCircle";
import TrustPilot from "./modules/sezzle-asset/trustpilot";

const SezzlePdpModel = ({ isOpen, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 sezzle-modal" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#010d16] bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex items-center justify-center p-10 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full min-w-[350px] max-w-[350px] max-h-[675px] transform bg-white text-left align-middle shadow-xl transition-all overflow-y-scroll"
                style={{ borderRadius: 10 }}
              >
                <div className="flex flex-col box-border">
                  <button
                    type="button"
                    className="absolute top-4 right-4 hover:text-[#000] text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-4 lg:right-4"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-[22px] w-[22px]" aria-hidden="true" />
                  </button>
                  <div className="bg-[#fff] box-border text-[#1a0826] pt-[8px] px-[25px] pb-[28px] flex flex-col justify-between">
                    <div style={{ maxHeight: 60 }}>
                      <div className="sezzle-modal-logo" title="Sezzle Logo" />
                    </div>
                    <TrustPilot />
                    <div className="text-[20px] text-[#000] font-semibold text-center sezzle-font">
                      Buy Now. Pay Later.
                    </div>
                    <p class="sezzle-row">
                      <span>
                        Available for purchases of $35 to $2,500.<sup>1</sup>
                      </span>
                      <span>
                        Instant decision. No impact to your credit score.<sup>2</sup>
                      </span>
                    </p>

                    <div
                      className="sezzle-four-pay bg-[#e4c9ff] bg-opacity-20"
                      style={{ borderRadius: 10 }}
                    >
                      <div className="sezzle-pie-area">
                        <div className="due-today">
                          <div className="payment-item">
                            <div title="pie at 25%">
                              <QuarterCircle />
                            </div>
                            <p className="breakdown-row">
                              <span className="percentage">25%</span>
                              <span className="due">Today</span>
                            </p>
                          </div>
                        </div>
                        <div className="future-payments">
                          <div className="payment-item">
                            <div title="pie at 50%">
                              <HalfCircle />
                            </div>
                            <p className="breakdown-row">
                              <span className="percentage">25%</span>
                              <span className="due">Week 2</span>
                            </p>
                          </div>
                          <div className="payment-item">
                            <div title="pie at 75%">
                              <HalfQuarterCircle />
                            </div>
                            <p className="breakdown-row">
                              <span className="percentage">25%</span>
                              <span className="due">Week 4</span>
                            </p>
                          </div>
                          <div className="payment-item">
                            <div title="pie at 100%">
                              <FullCircle />
                            </div>
                            <p className="breakdown-row">
                              <span className="percentage">25%</span>
                              <span className="due">Week 6</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[13.2px] text-[#000] font-medium mt-5 text-center">
                      1. Pay later by selecting Sezzle at checkout.
                    </div>
                    <div className="text-[13.2px] text-[#000] font-medium mt-4 text-center">
                      2. Complete your purchase with a 25% down payment.
                    </div>
                    <div className="text-[13.2px] text-[#000] font-medium mt-4 text-center">
                      3. Schedule the rest of your payments.
                    </div>
                    <div className="text-[9.5px] text-[#444444] mt-5 text-center leading-normal">
                      Pay in 4 and Pay in 2 loans are originated by WebBank except loans in IA,
                      Puerto Rico and Canada. For example, for a $300 Pay in 4 loan, you would make
                      one $75 down payment today, then three $75 payments every two weeks for a
                      35.40% annual percentage rate (APR) and a total of payments of $305.99 which
                      includes a $5.99 Service Fee (finance charge) charged at loan origination.
                      Service fees vary and can range from $0 to $5.99 depending on the purchase
                      price and Sezzle product. Actual fees are reflected in checkout.{" "}
                    </div>
                    <div className="text-[9.5px] text-[#444444] text-center">
                      <span className="text-[#8333d4] font-medium">
                        <Link href="https://sezzle.com/how-it-works" target="_blank">
                          <a target="_blank">Learn more about Sezzle buy now, pay later here.</a>
                        </Link>
                      </span>
                    </div>
                    <div className="text-[9.5px] text-[#444444] mt-5 text-center leading-snug">
                      <sup>1</sup> Subject to approval.{" "}
                      <span className="text-[#8333d4] font-medium">
                        <Link href="https://sezzle.com/legal" target="_blank">
                          <a target="_blank">Click here for complete terms.</a>
                        </Link>{" "}
                      </span>
                      First payment date and amount may fluctuate based on eligibility and time of
                      merchant order completion.
                    </div>
                    <div className="text-[9.5px] text-[#444444] mt-5 text-center leading-snug">
                      <sup>2</sup> Signing up for Sezzle will not impact your credit score. You may
                      opt-in to our free credit reporting program, Sezzle Up, to have your payments
                      reported to credit bureaus.
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
};

SezzlePdpModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default SezzlePdpModel;
