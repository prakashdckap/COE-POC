import { useSelector } from "react-redux";
import PaymentMethod from "./payment-method";
import ShipTo from "../shipping/ship-to";
import CardDetails from "./card-details";
import usePlaceOrder from "../../../helper/hooks/use-place-order";
import LoadingSpinner from "../../../helper/loading-spinner";

function CheckoutPayment() {
  const checkoutPaymentMethod = useSelector((state) => state.checkoutPaymentMethod);

  const { handlePlaceOrder, placeOrderLoading } = usePlaceOrder();

  // Place Order Function
  const placeOrder = () => {
    handlePlaceOrder();
  };

  return (
    <>
      <ShipTo />
      <PaymentMethod />

      {checkoutPaymentMethod?.methodCode === "authnetcim" ? <CardDetails /> : null}
      <button
        type="button"
        onClick={() => placeOrder()}
        className="inline-flex justify-center py-2 px-4 mt-5 border border-transparent capitalize  text-sm font-medium rounded-md text-white bg-skin-button-accent hover:bg-skin-button-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {placeOrderLoading ? <LoadingSpinner message="Order Processing" /> : "Place Order"}
      </button>
    </>
  );
}

export default CheckoutPayment;
