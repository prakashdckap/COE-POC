import { gql } from "@apollo/client";
import CUSTOMER_ADDRESS from "./fragments/customer-address";

const AddAddress = gql`
  mutation Mutation($addressId: Int!, $address: Address!) {
    updateCustomerAddr(addressId: $addressId, address: $address) {
  ${CUSTOMER_ADDRESS}
    }
  }
`;

export default AddAddress;
