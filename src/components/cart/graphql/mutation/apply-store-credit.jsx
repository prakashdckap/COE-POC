import { gql } from "@apollo/client";

const APPLY_STORE_CREDIT = gql`
  mutation ApplystoreCredit($cartId: String!, $amount: Float!) {
    applyStoreCreditOnCart(cartId: $cartId, amount: $amount) {
      creditAmount
      creditAmountAvailable
      creditUsed
    }
  }
`;

export default APPLY_STORE_CREDIT;
