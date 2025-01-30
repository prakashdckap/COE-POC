import { gql } from "@apollo/client";
import SHIPPING_METHOD from "../fragments/shipping-method";
import DISCOUNTS from "../fragments/discounts";

const SET_ESTIMATE_SHIPPING_METHOD = gql`
  mutation SetEstimateShipping
 ($cartId:String!, $address: EstimateAddress!, $shippingMethod: String!)
 {
  setEstimateShippingMethod
  (cartId: $cartId, address: $address, shippingMethod: $shippingMethod)
  {
    grandTotal
    routeShippingProtection
    adultSignatureFee
    exciseTax
    deliveryFee
    taxAmount
    discountAmount 
    discounts {
      ${DISCOUNTS}
    }
    subtotal
      availableShippingMethods{
      ${SHIPPING_METHOD}
      }
      shippingMethod{
     ${SHIPPING_METHOD}
      }
  }
}
`;

export default SET_ESTIMATE_SHIPPING_METHOD;
