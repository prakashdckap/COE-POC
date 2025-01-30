import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import PLACE_SEZZLE_ORDER from "../graphql/mutation/place-sezzle-order";
import usePlaceOrder from "../../../helper/hooks/use-place-order";
import { Gtag_PurchaseEvent } from "../../../utils/google-tags/events";

// eslint-disable-next-line react/prop-types
const SezzleButton = ({ checkoutUrl, cartId, setOrderProcessingLoading, cartDetails }) => {
  const cartItems = useSelector((state) => state.cartItems);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const history = useRouter();

  const { clearCheckoutData } = usePlaceOrder();
  const [placeSezzleOrder, { data }] = useMutation(PLACE_SEZZLE_ORDER, {
    variables: {
      cartId,
    },
  });
  const script = document.createElement("script");

  let dealerInfo = {
    dealerId: null,
    dealerName: null,
    dealerNo: null,
    dealerHours: null,
  };

  useEffect(() => {
    if (history?.query?.isPudo === "true" && checkoutShippingAddress?.dealerId) {
      dealerInfo = {
        dealerId: checkoutShippingAddress?.dealerId,
        dealerName: checkoutShippingAddress?.dealerName,
        dealerNo: checkoutShippingAddress?.dealerNo,
        dealerHours: checkoutShippingAddress?.dealerHours,
      };
    }
    if (checkoutUrl) {
      console.log("Sezzle button mounted");
      // Load the Sezzle script dynamically
      script.src = "https://checkout-sdk.sezzle.com/checkout.min.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        console.log("window.checkout", window.Checkout);
        // Initialize the Sezzle button after the script is loaded
        // eslint-disable-next-line no-undef
        const checkout = new Checkout({
          mode: "iframe",
          publicKey: process.env.NEXT_PUBLIC_SEZZLE_KEY,
          apiMode: process.env.NEXT_PUBLIC_SEZZLE_API_MODE,
          apiVersion: "v2",
          fontFamily: "Inter",
          fontSize: 13,
          alignmentSwitchMinWidth: "center",
        });
        if (checkout) {
          console.log("Initializing Sezzle button", window.Checkout);
          checkout.init({
            onClick(event) {
              console.log("Checkout clicked", event, data);
              event.preventDefault();
              checkout.startCheckout({
                checkout_url: checkoutUrl,
              });
            },
            async onComplete(event) {
              setOrderProcessingLoading(true);
              const sezzleData = await placeSezzleOrder({
                variables: {
                  cartId,
                  dealerInfo,
                },
              });
              const sezzleOrderId = sezzleData?.data.placeSezzleOrder.order.order_number;
              Gtag_PurchaseEvent(cartItems, sezzleOrderId, "Sezzle", cartDetails);
              clearCheckoutData(sezzleOrderId);
              sezzleData?.data && setOrderProcessingLoading(false);
              console.log("sezzleevent", event);
            },
            onCancel() {
              setOrderProcessingLoading(false);
              console.log("Checkout canceled");
            },
            onFailure() {
              setOrderProcessingLoading(false);
              console.log("Checkout failed");
            },
          });
        }
      };
      document.head.appendChild(script);
    }
    // Cleanup the script on component unmount
    return () => {
      if (script) {
        // document.head.removeChild(script);
      }
    };
  }, [checkoutUrl]);

  return (
    <div>
      <div id="sezzle-smart-button-container">
        <button
          id="sezzle-smart-button"
          className="sezzle-smart-button sezzle-smart-button-light disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-60"
          type="button"
        >
          <span
            className="template-text align-middle sezzle-font"
            style={{ verticalAlign: "super" }}
          >
            Continue with{" "}
          </span>
          <img
            className="sezzle-smart-button-logo-img"
            src="https://media.sezzle.com/branding/2.0/Sezzle_Logo_FullColor_WhiteWM.svg"
            alt="Sezzle"
          />
        </button>
      </div>
    </div>
  );
};

export default SezzleButton;

export function SezzleButtonValidation({ isDisabled = false, handleClick = () => {} }) {
  return (
    <button
      id="sezzle-smart-button"
      className="sezzle-smart-button sezzle-smart-button-light disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-60"
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
    >
      <span className="template-text align-middle sezzle-font">Pay with </span>
      <img
        className="sezzle-smart-button-logo-img"
        src="https://media.sezzle.com/branding/2.0/Sezzle_Logo_FullColor_WhiteWM.svg"
        alt="Sezzle"
      />
    </button>
  );
}
