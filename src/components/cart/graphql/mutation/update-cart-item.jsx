import { gql } from "@apollo/client";
import CART_DETAILS from "../fragments/cart-details";

const UPDATE_CART_ITEM = gql`
mutation UpdateCartItems ($cartId: String!, $updateItems : [UpdateItemObj]){
    updateCart(cartId:$cartId, updateItems :$updateItems){
     ${CART_DETAILS}
    }
  }
`;

export default UPDATE_CART_ITEM;
