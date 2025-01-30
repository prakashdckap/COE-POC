import { gql } from "@apollo/client";

const REGISTER = gql`
  mutation Register($customer: RegisterInput) {
    register(registerInput: $customer)
  }
`;

export default REGISTER;
