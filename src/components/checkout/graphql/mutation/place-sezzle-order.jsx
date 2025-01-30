import { gql } from "@apollo/client";

const PLACE_SEZZLE_ORDER = gql`
  mutation PlaceSezzleOrder($cartId: String, $dealerInfo: DealerInfoObj) {
    placeSezzleOrder(cart: $cartId, dealerInfo: $dealerInfo) {
      order {
        order_id
        order_number
      }
    }
  }
`;

export default PLACE_SEZZLE_ORDER;
