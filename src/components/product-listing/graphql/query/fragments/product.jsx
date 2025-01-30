import ATTRIBUTE_VALUE from "../../../../../helper/graphql/query/fragments/attribute-value";
import BUNDLE_PRODUCT from "./bundleProducts";
import PRICE from "./price";

const PRODUCT = `... on Product {
  id
  name
  sku
  stockStatus
  saleQty
  shortDescription {
    value
  }
  description {
    value
  }
  image {
    url
  }
  mediaGallery {
    url
    label
    position
    uid
    videoContent {
      videoUrl
      videoTitle
    }
  }
  customUrl
  seo {
    pageTitle
    metaKeywords
    metaDescription
  }
  status
  productType
  priceRange {
    minPrice {
      ${PRICE}
    }
  }
  metafields {
    attributeCode
       ${ATTRIBUTE_VALUE}
  }
  productOptions {
    required
    attributeCode
    attributeName
    attributeOptions {
      optionCode
      optionName
      optionValue
      optionImage
      quantity
      saleQty
      optionPrice {
        currency
        value
      }
    }
  }
  options {
    required
    attributeCode
    attributeName
    attributeOptions {
      optionCode
      optionName
      optionValue
      optionImage
      quantity
      saleQty
      optionPrice {
        currency
        value
      }
    }
  }
  categories
  productAttachment {
    id
    sort_order
    title
    file_type
    file_url
  }
  brands
  ${BUNDLE_PRODUCT}
}`;
export default PRODUCT;
