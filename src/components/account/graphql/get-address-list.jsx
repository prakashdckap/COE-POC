import { gql } from "@apollo/client";
import CUSTOMER_ADDRESS from "./fragments/customer-address";

const GET_CUSTOMER_ADDRESS_LIST = gql`
  query CustomerAddressList {
    customerAddressList {
    ${CUSTOMER_ADDRESS}
    }
  }
`;

export default GET_CUSTOMER_ADDRESS_LIST;
