import { gql } from "@apollo/client";

const GET_CUSTOMER_DETAILS = gql`
  query CustomerDetails {
    customerDetails {
      email
      cartId
      firstName
      lastName
      ageVerified
      isSubscribed
      wishlistId
      customerStoreCredit
    }
  }
`;

export default GET_CUSTOMER_DETAILS;
