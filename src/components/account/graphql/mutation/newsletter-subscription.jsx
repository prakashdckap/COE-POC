import { gql } from "@apollo/client";

const NEWSLETTER_SUBSCRIPTION = gql`
  mutation UpdateCustomer($customerDetails: CustomerInfo) {
    updateCustomer(input: $customerDetails) {
      email
      firstName
      lastName
      isSubscribed
    }
  }
`;

export default NEWSLETTER_SUBSCRIPTION;
