import { gql } from "@apollo/client";

const COUNTRIES_LIST = gql`
  query CountryList {
    countries {
      code
      name
      platformId
    }
  }
`;

export default COUNTRIES_LIST;
