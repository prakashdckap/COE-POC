import { gql } from "@apollo/client";
import PRODUCT from "./fragments/product";

const PRODUCT_DETAIL = gql`
  query ProductDetails($productId: [Int]) {
    products(filter: { productIds: { in: $productId} }) {
      items {
        ${PRODUCT}
      }
      totalCounts
    }
  }
`;

export default PRODUCT_DETAIL;
