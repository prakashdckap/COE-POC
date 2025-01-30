import { gql } from "@apollo/client";
import PRICE_INTERFACE from "../../../cart/graphql/fragments/price-interface";

const CUSTOMER_AGE_DETAILS = gql`
mutation SetCustomerAgeDetails($cartId:String!, $ageInfo: AgeDetailsInfo!){
  setCustomerAgeDetails(cartId: $cartId, ageInfo: $ageInfo){
    ${PRICE_INTERFACE}
  }
}
`;

export default CUSTOMER_AGE_DETAILS;
