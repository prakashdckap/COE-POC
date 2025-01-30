import { gql } from "@apollo/client";

const ZIP_SUCCESS = gql`
  query ZipSuccess($cartId: String!, $orderStatus: String!, $zipToken: String!) {
    setZipSuccess(cartId: $cartId, orderStatus: $orderStatus, zipToken: $zipToken) {
      is_successful
      order_id
      order_increment_id
    }
  }
`;

export default ZIP_SUCCESS;
