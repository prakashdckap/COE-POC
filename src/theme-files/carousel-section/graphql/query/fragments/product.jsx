import ATTRIBUTE_VALUE from "../../../../../helper/graphql/query/fragments/attribute-value";
import PRICE from "./price";

const PRODUCT = `... on Product {
  id
  name
  sku
  shortDescription {
    dataType
    value
  }
  description {
    dataType
    value
  }
  image {
    url
    label
    width
    height
  }
  mediaGallery {
    url
    label
  }
  customUrl
  seo {
    pageTitle
    metaKeywords
    metaDescription
  }
  status
  productType
  manufacturer
  reviewSummary {
    averageRating
    sumOfReviews
  }
  priceRange {
    minPrice {
      ${PRICE}
    }
    maxPrice {
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
    }
  }
  relatedProducts
  categories
  sortOrder
}`;
export default PRODUCT;
