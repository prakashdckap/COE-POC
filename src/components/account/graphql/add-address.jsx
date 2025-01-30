import { gql } from "@apollo/client";
import CUSTOMER_ADDRESS from "./fragments/customer-address";

const AddAddress = gql`
  mutation Mutation($address: Address!) {
    createCustomerAddr(address: $address) {
   ${CUSTOMER_ADDRESS}
    }
  }
`;

export default AddAddress;
