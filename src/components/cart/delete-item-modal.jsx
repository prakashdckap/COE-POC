import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Paragraph from "../../theme-files/paragraph";
import useRemoveFromCart from "../../helper/hooks/cart/use-remove-from-cart";
import LoadingSpinner from "../../helper/loading-spinner";
import useClearShoppingCart from "../../helper/hooks/cart/use-clear-shopping-cart";

export default function DeleteItemModal({ show, setshow, productId }) {
  const { removeFromCart, removeProductFromCartLoading } = useRemoveFromCart();
  const { clearAllItemsFromCart, clearShoppingCartLoading } = useClearShoppingCart();
  const cartItems = useSelector((state) => state.cartItems);

  const handleClearCart = () => {
    const productIdArr = cartItems?.map((item) => item?.productId);
    if (productIdArr?.length) clearAllItemsFromCart(productIdArr, setshow);
  };

  const handleRemoveItem = () => {
    removeFromCart(productId, setshow);
  };

  if (show)
    return (
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="fixed z-[99999] inset-0 overflow-y-auto" onClose={setshow}>
          <div className="flex text-center md:block md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className="hidden fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity md:block"
                style={{ display: "block" }}
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div
                className="flex text-base justify-center text-left transform transition w-full md:inline-block md:px-4 md:my-8 md:align-middle mt-6 md:max-w-md"
                role="region"
                aria-label="Notification"
              >
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 w-4/5 md:w-auto">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setshow(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="w-full mt-3">
                    <Paragraph
                      className="text-center text-sm font-medium mt-3 w-full whitespace-pre-line"
                      role="alert"
                    >
                      {productId
                        ? "Are you sure you would like to remove this item from the shopping cart?"
                        : "Are you sure you want to remove all items from your shopping cart?"}
                    </Paragraph>
                    <div className="flex justify-center mt-8 ">
                      <button
                        onClick={() => setshow(false)}
                        type="button"
                        className="text-xs mr-3 bg-skin-white border-2 border-black font-semibold py-3 px-8 flex items-center justify-center text-black  uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => (productId ? handleRemoveItem() : handleClearCart())}
                        type="button"
                        className="text-xs bg-skin-secondary border font-semibold border-transparent py-3 px-8 flex items-center justify-center text-white  uppercase"
                      >
                        {removeProductFromCartLoading || clearShoppingCartLoading ? (
                          <LoadingSpinner message="deleting" />
                        ) : (
                          "OK"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
}

DeleteItemModal.defaultProps = {
  show: false,
  productId: "",
};

DeleteItemModal.propTypes = {
  show: PropTypes.bool,
  setshow: PropTypes.func.isRequired,
  productId: PropTypes.string,
};
