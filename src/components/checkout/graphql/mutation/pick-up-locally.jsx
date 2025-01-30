import { gql } from "@apollo/client";

const PICK_UP_LOCALLY = gql`
  mutation SetPickUpLocally($cartId: String!, $isPudo: Boolean!) {
    setPickUpLocally(cartId: $cartId, isPudo: $isPudo)
  }
`;

export default PICK_UP_LOCALLY;
