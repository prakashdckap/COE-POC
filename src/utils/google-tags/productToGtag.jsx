export const item_list = {
  featured_items: "Featured Items",
  related_items: "Related Items",
  recently_viewed: "Recently Viewed",
  result_items: "Result Items",
  compare_items: "Compare Items",
  search_items: "Search Items",
  interested_items: "Interested Items",
  recent_view_items: "Recent View Items",
  quick_view: "Quick View",
  "Customer who bought this also bought": "bought-bought",
  "Recommended for you": "recommended_for_you",
  trending: "Trending",
  Trending: "trending",
  "Related Products": "related_products",
  "related products": "related_products",
  "Best Seller": "best_seller",
  "best seller": "best_seller",
  "New Arrival": "new_arrival",
  "new arrival": "new_arrival",
  "You May Also Like": "you_may_also_like",
  "you may also like": "you_may_also_like",
};

export const currency = "USD";

export const convertProductToGtag = (product, list_name = "featured_items") => {
  const productGmt = {
    item_id: product.sku,
    item_name: product.name,
    price:
      product?.priceRange?.minPrice?.finalPrice?.value ||
      product?.price_range?.minimum_price?.final_price?.value ||
      0,
  };

  if (list_name) {
    productGmt.item_list_name = list_name;
    productGmt.item_list_id = item_list[list_name] || list_name;
  }

  return productGmt;
};

export const convertCartProductsToGmt = (productList, list_name = "featured_items") => {
  const cartList = productList.map(({ product, quantity, rowTotal }) => {
    return { ...convertProductToGtag(product, list_name), quantity, price: rowTotal };
  });
  return cartList;
};
