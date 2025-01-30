import { gql } from "@apollo/client";

const CREATE_CART = gql`
  mutation createCart {
    createCart
  }
`;

export default CREATE_CART;
