import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import UnorderedList from "../../theme-files/unordered-list";
import Paragraph from "../../theme-files/paragraph";
import PageLink from "../../theme-files/link";
import Heading from "../../theme-files/heading";
import MinicartItems1 from "./minicart-items-1";

export default function Minicart2({ toggleCart }) {
  const history = useRouter();
  const { cartItems, cartDetails, displayCart, checkoutShippingAddress } = useSelector(
    (state) => state
  );

  const [allowCheckout, setAllowCheckout] = useState(true);

  useEffect(() => {
    // to check whete cart items not exied more than 40 qty
    const allowButton = !cartItems?.some((product) => product?.quantity > 40);
    setAllowCheckout(allowButton);
  }, [cartItems]);

  return (
    <div
      className="fixed overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {displayCart && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="flex flex-col bg-white shadow-xl h-full">
                <div className="flex-1 py-6 px-4 sm:px-6 lg:h-400px overflow-y-scroll no-scrollbar">
                  <div className="flex items-start justify-between">
                    <Heading className="text-lg font-medium text-gray-900" id="slide-over-title">
                      Shopping cart
                    </Heading>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => toggleCart()}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-12">
                    <div
                      className="flow-root no-scrollbar"
                      style={{ height: "450px", overflowY: "scroll" }}
                    >
                      <UnorderedList className="-my-6 divide-y divide-gray-200">
                        {cartItems?.length ? (
                          cartItems?.map((item) => (
                            <MinicartItems1
                              key={item?.product?.id}
                              image={item?.product?.image?.url}
                              url={item?.product?.customUrl}
                              quantity={item?.quantity}
                              price={item?.product?.priceRange?.minPrice?.finalPrice?.value}
                              name={item?.product?.name}
                              toggleCart={toggleCart}
                              cartItem={item}
                            />
                          ))
                        ) : (
                          <Paragraph className="text-center font-medium text-lg my-5 text-gray-500">
                            No Items Found
                          </Paragraph>
                        )}
                      </UnorderedList>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <Paragraph>Subtotal</Paragraph>
                    <Paragraph>
                      {" "}
                      &#x20B9; {cartDetails?.subtotal ? cartDetails?.subtotal?.toFixed(2) : "0.00"}
                    </Paragraph>
                  </div>
                  <Paragraph className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </Paragraph>
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        allowCheckout &&
                        history.push(
                          `${
                            checkoutShippingAddress?.firstName
                              ? "/checkout/shipping"
                              : "/checkout/information"
                          }`
                        )
                      }
                      disabled={!cartItems?.length || !allowCheckout}
                      type="button"
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <PageLink href="/shoppingcart">
                      or{" "}
                      <button
                        type="button"
                        className="text-indigo-600 font-medium hover:text-indigo-500"
                        onClick={() => toggleCart()}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </PageLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Minicart2.propTypes = {
  toggleCart: PropTypes.func.isRequired,
};
