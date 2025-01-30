import { gql } from "@apollo/client";
import SHIPPING_METHOD from "../fragments/shipping-method";
import DISCOUNTS from "../fragments/discounts";

const ESTIMATE_SHIPPING_COST = gql`
  query EstimateShippingCost($cartId: String!, $address: EstimateAddress) {
    estimateShippingCost(cartId: $cartId, address: $address) {
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
      availableShippingMethods {
        ${SHIPPING_METHOD}
      }
      shippingMethod {
        ${SHIPPING_METHOD}
      }
    }
  }
`;

export default ESTIMATE_SHIPPING_COST;
