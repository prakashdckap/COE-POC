import { gql } from "@apollo/client";
import FILE_OBJECT from "../fragments/file-object";

const CUSTOMER_INFO_ZIP_DOWNLOAD = gql`
  query CustomerInfoZip($password: String!) {
    customerInfoZipDownload(password: $password) {
      catalog_compare_item {
        ${FILE_OBJECT}
      }
      customer_address {
        ${FILE_OBJECT}
      }
      customer_information {
        ${FILE_OBJECT}
      }
      catalog_product_frontend_action {
        ${FILE_OBJECT}
      }
      customer_salesrule {
        ${FILE_OBJECT}
      }
      customer_wishlist {
        ${FILE_OBJECT}
      }
      downloadable_products {
        ${FILE_OBJECT}
      }
      magento_reward {
        ${FILE_OBJECT}
      }
      magento_rma {
        ${FILE_OBJECT}
      }
      oauth_token {
        ${FILE_OBJECT}
      }
      persistent_session {
        ${FILE_OBJECT}
      }
      product_alert_price {
        ${FILE_OBJECT}
      }
      product_reviews {
        ${FILE_OBJECT}
      }
      report_compared_product_index {
        ${FILE_OBJECT}
      }
      salesrule_coupon_usage {
        ${FILE_OBJECT}
      }
      viewed_products {
        ${FILE_OBJECT}
      }
    }
  }
`;

export default CUSTOMER_INFO_ZIP_DOWNLOAD;
