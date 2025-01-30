import { gql } from "@apollo/client";

const CHANGE_PASSWORD = gql`
  mutation ChangeCustomerPassword($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      email
      firstname
      lastname
    }
  }
`;

export default CHANGE_PASSWORD;
