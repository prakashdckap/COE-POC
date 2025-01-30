import { gql } from "@apollo/client";

const GUEST_PLACE_ORDER = gql`
  mutation PlaceOrder($cartId: String!, $placeOrderInput: PlaceOrderInfo) {
    placeOrder(cartId: $cartId, input: $placeOrderInput) {
      platformOrderId
      status
      customerId
      orderDate
      orderTotal
    }
  }
`;

export default GUEST_PLACE_ORDER;
