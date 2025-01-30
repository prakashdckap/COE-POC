import { gql } from "@apollo/client";

const DEALER_INFO = gql`
  mutation SetDealerInfo($cartId: String, $setDealer: Boolean, $dealerInfo: DealerInfoObj) {
    setDealerInfo(cartId: $cartId, setDealer: $setDealer, dealerInfo: $dealerInfo)
  }
`;

export default DEALER_INFO;
