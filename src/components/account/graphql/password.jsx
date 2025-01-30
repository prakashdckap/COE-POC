import { gql } from "@apollo/client";

const PASSWORD = gql`
  mutation passwordMutation($emailId: String!, $passwordToken: String!, $newPassword: String!) {
    resetPassword(email: $emailId, passwordToken: $passwordToken, newPassword: $newPassword)
  }
`;

export default PASSWORD;
