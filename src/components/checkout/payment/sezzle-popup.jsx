import { useCallback, useEffect, useRef, useState } from "react";
import React, { Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

import SezzleButton from "./sezzle";
import Image from "next/image";

function SezzlePopupComponent({ checkoutUrl, cartId, closeValidatedSezzle }) {
  const dialogRef = useRef();
  const { grandTotal } = useSelector((state) => state.cartDetails);
  const cartDetails = useSelector((state) => state.cartDetails);

  const [isOpen, setIsOpen] = useState(checkoutUrl && cartId ? false : false);
  const [sezzleOpen, setSezzleOpen] = useState(false);

  const closeModal = () => {
    dialogRef?.current?.close();
    closeValidatedSezzle(false);
    setIsOpen(false);
  };

  const handleSetLoading = (loading) => {
    closeValidatedSezzle(loading);
    !loading && closeModal();
  };

  const handleCLickOutSide = useCallback(() => {
    return false;
  }, [isOpen]);

  const hanleSezzleClick = useCallback(() => {
    setSezzleOpen(true);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(checkoutUrl && cartId ? true : false);
  }, []);

  if (isOpen) {
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 sezzle-modal" onClose={handleCLickOutSide}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={`fixed inset-0 bg-opacity-70 ${
                  sezzleOpen ? "bg-transparent sr-only" : "bg-[#272727f2]"
                }`}
              />
            </Transition.Child>

            <div className={`fixed inset-0 overflow-y-auto ${sezzleOpen ? "sr-only" : ""}`}>
              <div className="flex items-center justify-center p-16 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full min-w-[320px] max-w-[500px] min-h-[600px] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all rounded-md">
                    <div className="flex flex-col box-border">
                      <button type="button" className="close-sezzle-modal" onClick={closeModal}>
                        <span className="sr-only">Close</span>
                        <XIcon className="h-[22px] w-[22px]" aria-hidden="true" />
                      </button>
                      <header className="bg-[#f2f2f2] legacyStyles h-[30px]">
                        <div className="px-3">
                          <div className="flex justify-between">
                            <button
                              data-wpe-name="btn-return-to-merchant"
                              type="button"
                              className="mr-3"
                              onClick={closeModal}
                            >
                              <span
                                translate="no"
                                className="text-[#8427d7] sezzle-text-back inline-flex"
                              >
                                <LeftArrow />
                                <span className="pt-1 font-semibold uppercase"> Element Vape</span>
                              </span>
                            </button>
                            <div className="pt-2 text-xs font-bold">
                              <span className="sezzle-badge lg ml-4 rounded-xl px-[8px]">
                                ${grandTotal?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </header>
                      <div className="bg-[#fff] box-border text-[#1a0826] sezzle-pay-model">
                        <div className="flex justify-center items-center pt-6">
                          <Image
                            src="/assets/info/sezzle-overlay-image.png"
                            className="w-[16px] h-[16px] pointer-events-none"
                            alt="Sezzle Info"
                            width={320}
                            height={200}
                          />
                        </div>
                        <div className="w-full flex justify-center py-6">
                          <div onClick={hanleSezzleClick}>
                            <SezzleButton
                              checkoutUrl={checkoutUrl}
                              cartId={cartId}
                              setOrderProcessingLoading={handleSetLoading}
                              cartDetails={cartDetails}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="w-full flex justify-center pt-6 text-[#8427d7] sezzle-return"
                          onClick={closeModal}
                        >
                          <LeftArrow />
                          Return to Element Vape
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
}

function LeftArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-5 h-5 pr-1 pt-1"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

export const SezzlePopup = memo(SezzlePopupComponent);
