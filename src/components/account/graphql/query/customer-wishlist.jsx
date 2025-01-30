import { gql } from "@apollo/client";
import WISHLIST from "../fragments/wishlist";

const CUSTOMER_WISHLIST = gql`
query CustomerWishlist ($pageSize:Int, $currentPage:Int) {
    customerWishlist(pageSize:$pageSize, currentPage:$currentPage){   
      ${WISHLIST} 
    }
  }
`;

export default CUSTOMER_WISHLIST;
