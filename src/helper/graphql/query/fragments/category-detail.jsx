import ATTRIBUTE_VALUE from "./attribute-value";

const CATEGORY_DETAIL = `... on Category {
    companyId
    platformCategoryId
    parentId
    name
    isVisible
    description {
      dataType
      value
      __typename
    }
    categoryLandingPage {
      isEnabled
      dataType
      value
      __typename
    }
    image {
      url
      label
      width
      height
      __typename
    }
    customUrl {
      url
      isCustomized
    }
    productCount
    subCategoryCount
    seo {
      pageTitle
      metaKeywords
      metaDescription
    }
    metafields {
      attributeCode
      ${ATTRIBUTE_VALUE}
    }
    sortOrder
    breadcrumbs{
      name
      urlKey
      }
  }`;

export default CATEGORY_DETAIL;
