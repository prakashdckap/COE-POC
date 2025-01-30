import { gql } from "@apollo/client";
import CART_DETAILS from "../../../cart/graphql/fragments/cart-details";

const ADD_CART_ITEM_TO_WISHLIST = gql`
  mutation AddCartItemtoWishlist($cartId:String!, $wishlistId: ID, 
$itemUid: String!){
 addCartItemToWishlist(wishlistId: $wishlistId, cartId: $cartId, itemUid:
  $itemUid){
    cart{
    	${CART_DETAILS}
    }
    wishlistId

}
}
`;

export default ADD_CART_ITEM_TO_WISHLIST;
