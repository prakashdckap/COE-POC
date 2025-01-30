import { gql } from "@apollo/client";
import CART_DETAILS from "../fragments/cart-details";

const ADD_TO_CART = gql`
  mutation AddtoCart($cartId: String!, $lineItems: [LineItemsObj!]) {
    addToCart(cartId: $cartId, lineItems: $lineItems)  {
    cart{
      ${CART_DETAILS}
    }
    errors{
      code
      message
    }
  }
  }
`;

export default ADD_TO_CART;
