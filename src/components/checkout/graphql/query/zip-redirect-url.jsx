import { gql } from "@apollo/client";

const ZIP_REDIRECT_URL = gql`
  query ZipRedirectUrl($cartId: String!) {
    setZipRedirectUrl(cartId: $cartId)
  }
`;

export default ZIP_REDIRECT_URL;
