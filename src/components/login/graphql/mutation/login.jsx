import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $passwd: String!) {
    login(email: $email, password: $passwd)
  }
`;

export default LOGIN;
