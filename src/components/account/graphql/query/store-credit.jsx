import { gql } from "@apollo/client";

const STORE_CREDIT = gql`
  query StoreCreditHistory($pageSize: Int, $currentPage: Int) {
    storeCreditHistory(pageSize: $pageSize, currentPage: $currentPage) {
      items {
        action {
          arguments
          text
        }
        change
        comment
        date
        newBalance
        transactionId
      }
      totalCount
    }
  }
`;

export default STORE_CREDIT;
