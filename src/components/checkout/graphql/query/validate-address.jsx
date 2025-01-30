import { gql } from "@apollo/client";

const VALIDATE_ADDRESS = gql`
  query validateAddress($address: ValidateAddress) {
    validateAddress(address: $address) {
      data {
        street
        city
        region
        region_code
        region_id
        zip
        country
      }
      success
    }
  }
`;

export default VALIDATE_ADDRESS;
