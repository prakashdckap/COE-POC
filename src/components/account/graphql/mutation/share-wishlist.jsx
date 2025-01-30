import { gql } from "@apollo/client";

const SHARE_WISHLIST = gql`
  mutation ShareWishlist($wishlistId: ID!, $email: String!, $message: String) {
    shareWishlist(wishlistId: $wishlistId, emailId: $email, message: $message)
  }
`;

export default SHARE_WISHLIST;
