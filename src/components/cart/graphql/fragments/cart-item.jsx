import PRODUCT from "../../../product-listing/graphql/query/fragments/product";

const CART_ITEM = `
... on CartItemObj {
    productId
    quantity
    rowTotal
    customOptions {
    code
    name
    value
    valueName
    }
    product{
      ${PRODUCT}
    } 
  }
`;

export default CART_ITEM;
