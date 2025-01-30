import { gql } from "@apollo/client";
import PRICE_INTERFACE from "../fragments/price-interface";
import REWARD_POINTS from "../fragments/reward-points";

const APPLY_REWARD_POINTS = gql`
 mutation applyRewardPoints ($cartId: String!, $amount: Int)	{
  applyRewardPointsOnCart (cartId: $cartId, amount: $amount){
    ${PRICE_INTERFACE}
    appliedRewardPoints{
     ${REWARD_POINTS}
    }
  }
}
`;

export default APPLY_REWARD_POINTS;
