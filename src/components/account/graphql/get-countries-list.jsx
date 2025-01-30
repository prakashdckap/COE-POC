import { gql } from "@apollo/client";

const GET_COUNTRIES_LIST = gql`
    query CountryList{
        countries{
            code
            name
            platformId
        }
    }
`;

export default GET_COUNTRIES_LIST;
