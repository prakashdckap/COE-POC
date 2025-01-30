import ShippingMethod from "./shipping-method";
import ShipTo from "./ship-to";

function CheckoutShipping() {
  return (
    <>
      <ShipTo />
      <ShippingMethod />
    </>
  );
}

export default CheckoutShipping;
