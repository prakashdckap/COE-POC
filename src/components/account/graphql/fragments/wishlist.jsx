import PRODUCT from "../../../product-listing/graphql/query/fragments/product";

const WISHLIST = `
... on WishlistObj{
  id
  name   
  itemsCount   
  pageInfo {
    currentPage
    pageSize
    totalPages
  }
  products {
    productId
    comments
    quantity
    saleableQuantity
    rowTotal
    customOptions {
      code
      name
      value
      valueName
      price
    }
    product {
      ${PRODUCT}
    }
  }
}

`;

export default WISHLIST;
