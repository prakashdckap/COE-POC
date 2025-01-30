import { gql } from "@apollo/client";
import CART_DETAILS from "../fragments/cart-details";

const MERGE_CARTS = gql`
  mutation MergeCarts($sourceCartId: String!, $destCartId: String!){
  mergeCarts(sourceCartId: $sourceCartId, destCartId: $destCartId){
    ${CART_DETAILS}
  }
}
`;

export default MERGE_CARTS;
