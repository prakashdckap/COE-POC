import { gql } from "@apollo/client";

const AddAddress = gql`
    mutation DeleteCustomerAdd($addressId: Int!) {
        deleteCustomerAddr(addressId: $addressId)
    }
`;

export default AddAddress;