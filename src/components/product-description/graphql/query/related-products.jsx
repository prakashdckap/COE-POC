import { gql } from "@apollo/client";
import PRODUCT from "../../../product-listing/graphql/query/fragments/product";

const RELATED_PRODUCTS = gql`
query RelatedProductListing(
    $productIds: [Int]
    $pageSize: Int
    $currentPage: Int
    $sort: SortObj
  ) {
    products(
      filter: { productIds: { in: $productIds} }
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        ${PRODUCT}
      }
      totalCounts
    }
  }
`;

export default RELATED_PRODUCTS;
