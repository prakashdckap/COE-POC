import { gql } from "@apollo/client";

const DELETE_CUSTOMER_ACCOUNT = gql`
  query DeleteCustomerRequest($password: String!) {
    deleteCustomerRequest(password: $password)
  }
`;

export default DELETE_CUSTOMER_ACCOUNT;
