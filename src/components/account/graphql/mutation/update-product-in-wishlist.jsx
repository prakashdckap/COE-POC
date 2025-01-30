import { gql } from "@apollo/client";
import WISHLIST from "../fragments/wishlist";
import ERRORS from "../fragments/errors";

const UPDATE_PRODUCT_IN_WISHLIST = gql`
  mutation UpdateItemFromWishlist($wishlistId:ID!, $updateItems: [UpdateWishlistItem]) {
    updateItemsInWishlist(wishlistId: $wishlistId, updateItems: $updateItems) {
      errors {
        ${ERRORS}
      }
      wishlist {
        ${WISHLIST}
      }
    }
  }
`;

export default UPDATE_PRODUCT_IN_WISHLIST;
