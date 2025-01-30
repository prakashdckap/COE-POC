import { gql } from "@apollo/client";
import PRODUCT from "./fragments/product";

const PRODUCT_LIST = gql`
  query ProductListing($categoryId: Int, $pageSize: Int, $currentPage: Int, $sort: SortObj, $filters: [CustomFilterObj], $priceFilter:PriceFilter) {
    products(
      filter: { categoryIds: { eq: $categoryId }, customFilter: $filters, priceFilter: $priceFilter }
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

export default PRODUCT_LIST;
