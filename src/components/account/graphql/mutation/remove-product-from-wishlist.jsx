import { gql } from "@apollo/client";
import WISHLIST from "../fragments/wishlist";
import ERRORS from "../fragments/errors";

const REMOVE_PRODUCT_FROM_WISHLIST = gql`
  mutation RemoveItemsFromWishlist($wishlistId: ID!, $itemIds: [String!]!) {
    removeItemsFromWishlist(wishlistId: $wishlistId, itemIds: $itemIds) {
      wishlist {
       ${WISHLIST}
      }
      errors {
          ${ERRORS}
      }
    }
  }
`;

export default REMOVE_PRODUCT_FROM_WISHLIST;
