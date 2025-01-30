import { gql } from "@apollo/client";

const ZIP_CANCEL = gql`
  query ZipCancel($cartId: String!, $orderStatus: String!, $zipToken: String!) {
    setZipCancel(cartId: $cartId, orderStatus: $orderStatus, zipToken: $zipToken)
  }
`;

export default ZIP_CANCEL;
