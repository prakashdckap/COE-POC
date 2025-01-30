import { gql } from "@apollo/client";

const CREATE_SEZZLE_CHECKOUT = gql`
  mutation CreateSezzleCheckout($updatedCart: Boolean, $cartId: String) {
    createSezzleCheckout(updatedCart: $updatedCart, cartId: $cartId) {
      checkout_url
      success
    }
  }
`;

export default CREATE_SEZZLE_CHECKOUT;
