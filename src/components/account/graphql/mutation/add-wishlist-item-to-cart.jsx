import { gql } from "@apollo/client";
import WISHLIST from "../fragments/wishlist";
import ERRORS from "../fragments/errors";

const ADD_WISHLIST_ITEM_TO_CART = gql`
  mutation AddWishlistItemsToCart($wishlistId :ID!, $cartId: String!, 
$itemIds: [String!]!){
  addWishlistItemsToCart(wishlistId: $wishlistId, cartId: $cartId, 
  itemIds: $itemIds){
    wishlist{
      ${WISHLIST}
    }
    errors{
      ${ERRORS}
    }
    addedProductsCount
    addedProductNames
  }
}
`;

export default ADD_WISHLIST_ITEM_TO_CART;
