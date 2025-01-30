import { gql } from "@apollo/client";

const REWARDS_SUBSCRIPTION = gql`
  mutation Subscription($subscribe: Boolean!) {
    rewardSubscription(subscribe: $subscribe)
  }
`;

export default REWARDS_SUBSCRIPTION;
