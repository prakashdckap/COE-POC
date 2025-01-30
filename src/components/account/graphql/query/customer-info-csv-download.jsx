import { gql } from "@apollo/client";
import FILE_OBJECT from "../fragments/file-object";

const CUSTOMER_INFO_CSV_DOWNLOAD = gql`
  query CustomerInfoCSV($password: String!) {
    customerInfoCSVDownload(password: $password) {
      ${FILE_OBJECT}
    }
  }
`;

export default CUSTOMER_INFO_CSV_DOWNLOAD;
