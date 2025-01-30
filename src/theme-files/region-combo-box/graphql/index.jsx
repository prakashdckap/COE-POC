import { gql } from "@apollo/client";

const GET_REGION_LIST = gql`
    query RegionList ($countryCode: String) {
        countries (countryCode: $countryCode){
            code
            name
            platformId
        }
    }
`;

export default GET_REGION_LIST;
