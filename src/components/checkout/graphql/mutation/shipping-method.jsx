import { gql } from "@apollo/client";
import PRICE_INTERFACE from "../../../cart/graphql/fragments/price-interface";
import SHIPPING_METHOD from "../../../cart/graphql/fragments/shipping-method";

const SET_SHIPPING_METHOD = gql`
mutation SetShippingMethod($cartId: String!, $shippingMethod: String!) {
    setShippingMethod(cartId: $cartId, shippingMethod: $shippingMethod) {
      ${PRICE_INTERFACE}
      shippingMethod {
        ${SHIPPING_METHOD}
      }
    }
  }
  
`;

export default SET_SHIPPING_METHOD;
