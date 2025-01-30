import { gql } from "@apollo/client";
import URL_CATEGORY from "./fragments/url-category";
import PRODUCT from "../../../components/product-listing/graphql/query/fragments/product";

const URL_HANDLER = gql`
  query UrlHandler($urlKey: String!, $contentData: Boolean) {
    urlHandler(urlKey: $urlKey, contentData: $contentData) {
      redirection
      targetPath
      entityType
      entityId
      content {
        ... on UrlProduct {
        type
        product {
          ${PRODUCT}
        }
      }
        ... on UrlCategory {
          ${URL_CATEGORY}
        }
      }
    }
  }
`;
export default URL_HANDLER;
