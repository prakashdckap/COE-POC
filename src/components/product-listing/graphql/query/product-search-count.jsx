import { gql } from "@apollo/client";

const PRODUCT_SEARCH_COUNT = gql`
  query productSearchCount($text: String!) {
    searchCount(text: $text)
  }
`;

export default PRODUCT_SEARCH_COUNT;
