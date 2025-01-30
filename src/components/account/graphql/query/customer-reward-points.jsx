import { gql } from "@apollo/client";

const CUSTOMER_REWARD_POINTS = gql`
  query CustomerRewardPoints($pageSize: Int, $currentPage: Int) {
    customerRewardPoints(pageSize: $pageSize, currentPage: $currentPage) {
      totalCount
      balance
      history {
        code
        comment
        transactionId
        created
        amountUsed
        amountEarned
      }
    }
  }
`;

export default CUSTOMER_REWARD_POINTS;
