import { gql } from "@apollo/client";
import CART_DETAILS from "../../../cart/graphql/fragments/cart-details";

const ROUTE_SHIPPING = gql`
 mutation RouteShipping($cartId:String!, $isEnabled: Boolean){
  routeShippingEnabled(cartId: $cartId, isEnabled: $isEnabled){
    ${CART_DETAILS}
  } 
}
`;

export default ROUTE_SHIPPING;
