import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, PlusIcon, MinusIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";

export default function GalleryPopup({
  isOpen = false,
  onClose,
  children,
  swipersRef,
  imageIndex,
}) {
  const onCLoseDummy = () => {};

  const removeAllClass = (element) => {
    if (element) {
      // Loop through all classes and remove class for zoom
      while (element.classList.length > 0) {
        element.classList.remove(element.classList.item(0));
      }
      element.classList.add("image-swiper-slide");
    }
  };
  useEffect(() => {
    
    if (swipersRef?.current) {
      swipersRef?.current.swiper.slideTo(8);
    }
  }, []);

  const getZoomValue = () => {
    const zoomEle = document.getElementsByClassName("image-swiper-slide")[0];

    try {
      if (zoomEle.classList[1]) {
        const classValue = parseInt(zoomEle.classList[1].replace("zoom-", ""));
        removeAllClass(zoomEle);
        return { zoomEle, classValue };
      }
    } catch (error) {
      return { zoomEle };
    }
    return { zoomEle };
  };

  const zoomOut = () => {
    const { zoomEle, classValue } = getZoomValue();
    if (classValue > 1) {
      const zoomValue = `zoom-${classValue - 1}`;
      zoomEle.classList.add(zoomValue);
    }
  };

  const zoomIn = () => {
    const { zoomEle, classValue } = getZoomValue();
    if (classValue < 19) {
      const zoomValue = `zoom-${classValue + 1}`;
      zoomEle.classList.add(zoomValue);
    } else if (!classValue) {
      zoomEle.classList.add("zoom-1");
    } else {
      zoomEle.classList.add("zoom-19");
    }
  };

  return (
    <>
      {isOpen ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 sezzle-modal pdp-image" onClose={onCLoseDummy}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#fff]" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="min-w-full min-h-screen transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                    <div className="box-border min-h-screen">
                      <button
                        type="button"
                        className="absolute top-4 right-4 text-[#808080] z-50"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-[50px] w-[50px]" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="absolute top-4 left-4 text-[#808080] z-50 hidden sm:block"
                        onClick={zoomIn}
                      >
                        <span className="sr-only">Zoom-in</span>
                        <PlusIcon className="h-[50px] w-[50px]" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="absolute top-20 left-4 text-[#808080] z-50 hidden sm:block"
                        onClick={zoomOut}
                      >
                        <span className="sr-only">Zoom-out</span>
                        <MinusIcon className="h-[50px] w-[50px]" aria-hidden="true" />
                      </button>
                      <div className="custom-fullscreen">{children}</div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        children
      )}
    </>
  );
}

GalleryPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};