import { gql } from "@apollo/client";
import ADDRESS from "../../../cart/graphql/fragments/address-object";
import SHIPPING_METHOD from "../../../cart/graphql/fragments/shipping-method";
import PRICE_INTERFACE from "../../../cart/graphql/fragments/price-interface";

const SHIPPING_ADDRESS = gql`
mutation SetShippingAddress ($cartId :String!,$shippingAddress: ShippingAddress!){
    setShippingAddress (cartId: $cartId, shippingAddress: $shippingAddress){
      availableShippingMethods{
        ${SHIPPING_METHOD}
      }
      shippingAddress{
        ${ADDRESS}
      }
      ${PRICE_INTERFACE}
    }
  }
  
`;

export default SHIPPING_ADDRESS;
