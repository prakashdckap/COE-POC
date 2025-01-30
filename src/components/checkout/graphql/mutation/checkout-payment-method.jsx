import { gql } from "@apollo/client";
import PRICE_INTERFACE from "../../../cart/graphql/fragments/price-interface";

const SET_PAYMENT_METHOD = gql`
mutation SetPaymentMethod ($cartId:String!, $paymentMethod: String!){
  setPaymentMethod(cartId: $cartId, paymentMethod: $paymentMethod){
    paymentMethod
    ${PRICE_INTERFACE}
  }
} 
`;

export default SET_PAYMENT_METHOD;
