import { gql } from "@apollo/client";
import WISHLIST from "../fragments/wishlist";
import ERRORS from "../fragments/errors";

const ADD_PRODUCT_TO_WISHLIST = gql`
  mutation AddItemsToWishlist($wishlistId: ID, $items: [AddWishlistItem]) {
    addItemsToWishlist(wishlistId: $wishlistId, items: $items) {
      wishlist {
        ${WISHLIST}
      }
      errors {
        ${ERRORS}
      }
    }
  }
`;

export default ADD_PRODUCT_TO_WISHLIST;
