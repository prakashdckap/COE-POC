import { gql } from "@apollo/client";
import CART_DETAILS from "../fragments/cart-details";

const REMOVE_FROM_CART = gql`
mutation RemoveFromCart ($cartId : ID!, $productUid: String!){
  removeFromCart(cartId: $cartId,  productUid: $productUid){
   ${CART_DETAILS}
  }
}
`;

export default REMOVE_FROM_CART;
