import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const SezzleModalContent = ({ isOpen, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 sezzle-modal"
        onClose={onClose}
        role="region"
        aria-label="Notification"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0a3b63] bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center p-32 text-center">
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
                className="w-full min-w-[350px] max-w-[430px] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
                style={{ borderRadius: 10 }}
              >
                <div className="flex flex-col box-border">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-[#000] hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-4 lg:right-4"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-[22px] w-[22px]" aria-hidden="true" />
                  </button>
                  <div
                    className="bg-[#fff] box-border text-[#1a0826] pt-[5px] px-[50px] pb-[20px] flex flex-col justify-between sezzleModalContent"
                    role="alert"
                  >
                    <div>
                      <div className="sezzle-modal-logo" title="Sezzle Logo" />
                    </div>
                    <h1 className="sezzle-modal-title">How it works</h1>
                    <div className="sezzle-content">
                      <p className="flex justify-center">
                        Split your entire order into 4 interest-free payments over 6 weeks. No fees
                        if you pay on time with zero impact to your credit.
                      </p>{" "}
                      <p className="flex justify-center pt-4">
                        After clicking &rdquo;Complete Order&rdquo; on this site, you will be
                        redirected to Sezzle to complete your purchase securely.
                      </p>
                    </div>
                    <div className="sezzle-payment-pie" style={{ margin: "15px 0px -60px 0px" }} />
                    <div className="w-full flex justify-center text-xs pt-2">
                      <div
                        style={{ justifyContent: "space-around" }}
                        className="flex md:min-w-[380px] md:max-w-[380px] min-w-[300px] max-w-[300px]"
                      >
                        <span className="inline-block">
                          <p className="sezzle-amount">25%</p>
                          <p className="sezzle-payment-date">today</p>
                        </span>
                        <span className="inline-block">
                          <p className="sezzle-amount">25%</p>
                          <p className="sezzle-payment-date">week 2</p>
                        </span>
                        <span className="inline-block">
                          <p className="sezzle-amount">25%</p>
                          <p className="sezzle-payment-date">week 4</p>
                        </span>
                        <span className="inline-block">
                          <p className="sezzle-amount">25%</p>
                          <p className="sezzle-payment-date">week 6</p>
                        </span>
                      </div>
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

SezzleModalContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default SezzleModalContent;
