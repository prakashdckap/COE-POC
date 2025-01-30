import { gql } from "@apollo/client";

const FORGETPASSWORD = gql`
    mutation PasswordResetEmail($email: String!) {
        passwordResetEmail(email: $email)
    }
`;

export default FORGETPASSWORD;
