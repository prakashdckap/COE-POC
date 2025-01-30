import { Fragment } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

function ModalSuccess({ open, setOpen, children }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:mt-[10px] sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom  bg-[#4b810e] text-left overflow-hidden shadow-xl transform transition-all sm:align-top  sm:max-w-xl sm:w-full">
              <div className="p-6">
                <div className="block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6 bg-[#4b810e] text-white" aria-hidden="true" />
                  </button>
                </div>
                <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-white">
                  <CheckIcon className="h-6 w-6 text-[#4b810e]" aria-hidden="true" />
                </div>
              </div>
              <div className="bg-white py-[56px] px-[28px]  w-full">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default ModalSuccess;
ModalSuccess.defaultProps = {
  open: false,
};
ModalSuccess.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
