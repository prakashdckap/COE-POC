import { gql } from "@apollo/client";

const HOME_PAGE_CMS = gql`
  query homePageCMS {
    getHomePageCMS {
      section_name
      order
      content {
        type
        name
        value
        urls {
          name
          url
          redirectUrl
        }
        href
        selected_products {
          id
          sku
          name
        }
      }
    }
  }
`;

export default HOME_PAGE_CMS;
