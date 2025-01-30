import { gql } from "@apollo/client";
import CART_DETAILS from "../../../cart/graphql/fragments/cart-details";

const REORDER = gql`
mutation CustomerReorder($orderNumber :String){
    customerReorder(orderId: $orderNumber){
      cart{
       ${CART_DETAILS}
      }
      errors {
        code
        message
      }
    }
  }
`;

export default REORDER;
