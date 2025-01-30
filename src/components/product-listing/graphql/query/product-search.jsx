import { gql } from "@apollo/client";
import PRODUCT from "./fragments/product";

const PRODUCT_SEARCH = gql`
  query ProductSearch($text: String!, $pageSize: Int, $currentPage: Int, $sort: SortObj,  $filters: [CustomFilterObj], $priceFilter:PriceFilter) {
    search(text: $text, pageSize: $pageSize, currentPage: $currentPage, sort: $sort, filter: { customFilter: $filters, priceFilter: $priceFilter }) {
      items {
        ${PRODUCT}
      }
      totalCounts
      categories {
        name
        platformCategoryId
        customUrl {
          url
          isCustomized
        }
      }
      popularSearch {
        count
        textSearched
      }
    }
  }
`;

export const MAGENTO_SEARCH = gql`
  query Products($search: String) {
    products(search: $search) {
      items {
        name
      }
      total_count
    }
  }
`;

export default PRODUCT_SEARCH;
