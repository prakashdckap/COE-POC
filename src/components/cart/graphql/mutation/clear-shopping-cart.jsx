import { gql } from "@apollo/client";

const CLEAR_SHOPPING_CART = gql`
  mutation clearProductsInCart($cartId: ID!, $productUid: [String]!) {
    clearProductsFromCart(cartId: $cartId, productUid: $productUid)
  }
`;

export default CLEAR_SHOPPING_CART;
