import CATEGORY_DETAIL from "./category-detail";
import PRODUCT from "../../../../components/product-listing/graphql/query/fragments/product";

const URL_CATEGORY = `

... on UrlCategory {
  totalCount
  type
  products {
    ${PRODUCT}
  }
  category {
    ${CATEGORY_DETAIL}
  }
}
`;

export default URL_CATEGORY;
