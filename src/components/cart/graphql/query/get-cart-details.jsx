import { gql } from "@apollo/client";
import CART_DETAILS from "../fragments/cart-details";

const GET_CART_DETAILS = gql`
query Cart ($cartId: String!){
    cart (cartId: $cartId){
      ${CART_DETAILS}
    }
  }
`;

export default GET_CART_DETAILS;
