import { gql } from "@apollo/client";

const GET_SUBSCRIPTION_STATUS = gql`
  query GetSubscriptionStatus {
    getSubscriptionStatus
  }
`;

export default GET_SUBSCRIPTION_STATUS;
