const BUNDLE_PRODUCT = `... on Product {
  bundleProductOptions {
    bundleItems {
      option_id
      options {
        id
        uid
        label
        position
        price
        price_type
        product {
          id
          uid
          name
          qty
          sale_qty
          sku
          stock_status
          media_gallery {
            url
          }
        }
        quantity
      }
      position
      required
      sku
      title
      type
      uid
    }
  }
}`;
export default BUNDLE_PRODUCT;
