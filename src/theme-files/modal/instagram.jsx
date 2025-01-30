import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/outline";

function ModalInstagram({
  open,
  setOpen,
  children,
  PopupRightArrowClick,
  PopupLeftArrowClick,
  displayButton,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-[99999] inset-0 overflow-y-auto" onClose={setOpen}>
        {/* <div className="relative"> */}
        {/*  <button className="absolute top-0 right-0" type="button"> */}
        {/*    x */}
        {/*  </button> */}
        {/* </div> */}
        <div className="flex min-h-screen text-center md:block" style={{ fontSize: 0 }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-[0.6] transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <button
            type="button"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-[#c5c5c5] z-10 focus-visible:outline-0"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close</span>
            <XIcon
              className="h-[27px] w-[27px] md:h-[30px] md:w-[30px] text-[#c5c5c5] md:text-[#c5c5c5]"
              aria-hidden="true"
            />
          </button>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom text-left bg-white shadow-xl transform transition-all sm:align-middle w-full lg:w-[74%] rounded-[3px]">
              {displayButton > 1 && (
                <button type="button" onClick={PopupLeftArrowClick} className="insta-left-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                  </svg>
                </button>
              )}
              <div className="w-full">{children}</div>
              {displayButton > 1 && (
                <button type="button" onClick={PopupRightArrowClick} className="insta-right-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                  </svg>
                </button>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default ModalInstagram;
ModalInstagram.defaultProps = {
  open: false,
};
ModalInstagram.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  PopupRightArrowClick: PropTypes.func.isRequired,
  PopupLeftArrowClick: PropTypes.func.isRequired,
  displayButton: PropTypes.number.isRequired,
};
