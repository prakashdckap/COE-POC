import { gql } from "@apollo/client";

const REMOVE_STORE_CREDIT = gql`
  mutation RemoveStoreCredit($cartId: String!) {
    removeStoreCreditFromCart(cartId: $cartId) {
      creditAmount
      creditAmountAvailable
      creditUsed
    }
  }
`;

export default REMOVE_STORE_CREDIT;
