import {
  item_list,
  currency,
  convertProductToGtag,
  convertCartProductsToGmt,
} from "./productToGtag";

export const Gtag_FeaturedItemsEvent = (product, list_name = "featured_items") => {
  if (window?.dataLayer && product?.length) {
    try {
      window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window?.dataLayer?.push({
        event: "view_item_list",
        ecommerce: {
          item_list_name: list_name,
          item_list_id: item_list[list_name] || list_name,
          items: product.map((productData) => convertProductToGtag(productData, list_name)),
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error (Gtag_FeaturedItemsEvent) :", error);
    }
  } else {
    return;
  }
};

export const Gtag_SelectItemEvent = (product, list_name = "featured_items") => {
  if (window?.dataLayer && product) {
    try {
      window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window?.dataLayer?.push({
        event: "select_item",
        ecommerce: {
          item_list_name: list_name,
          item_list_id: item_list[list_name] || product?.url_key || list_name,
          items: [convertProductToGtag(product, list_name)],
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_SelectItemEvent) :", error);
    }
  } else {
    return;
  }
};

export const Gtag_ViewItemEvent = (product, list_name = "featured_items") => {
  if (window?.dataLayer && product) {
    try {
      window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window?.dataLayer?.push({
        event: "view_item",
        ecommerce: {
          currency,
          value: product?.priceRange?.minPrice?.finalPrice?.value || 0.0,
          items: [convertProductToGtag(product, list_name)],
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_ViewItemEvent) :", error);
    }
  } else {
    return;
  }
};

export const Gtag_AddToCartEvent = (product) => {
  if (window?.dataLayer && product?.sku) {
    try {
      window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window?.dataLayer?.push({
        event: "add_to_cart",
        ecommerce: {
          currency,
          value: product?.priceRange?.minPrice?.finalPrice?.value || 0.0,
          items: [convertProductToGtag(product, product?.customUrl)],
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_AddToCartEvent) :", error);
    }
  } else {
    return;
  }
};

export const Gtag_ViewCartEvent = (product) => {
  if (window?.dataLayer && product?.length) {
    try {
      const price = product?.reduce((p, { rowTotal }) => p + rowTotal, 0);
      window?.dataLayer?.push({ ecommerce: null });
      window?.dataLayer?.push({
        event: "view_cart",
        ecommerce: {
          currency,
          value: price || 0.0,
          items: convertCartProductsToGmt(product),
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_ViewCartEvent) 1001:", error);
    }
  } else {
    return;
  }
};

export const Gtag_RemoveCartItemEvent = (product) => {
  if (window?.dataLayer && product.sku) {
    try {
      window?.dataLayer?.push({ ecommerce: null });
      window?.dataLayer?.push({
        event: "remove_from_cart",
        ecommerce: {
          currency,
          value: product?.priceRange?.minPrice?.finalPrice?.value || 0.0,
          items: [convertProductToGtag(product, product?.customUrl)],
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_RemoveCartItemEvent) 1001:", error);
    }
  } else {
    return;
  }
};

export const Gtag_BeginCheckoutEvent = (product, grandTotal) => {
  if (window?.dataLayer && product?.length) {
    try {
      window?.dataLayer?.push({ ecommerce: null });
      window?.dataLayer?.push({
        event: "begin_checkout",
        ecommerce: {
          currency,
          value: grandTotal || 0.0,
          items: convertCartProductsToGmt(product),
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_BeginCheckoutEvent) 1001:", error);
    }
  } else {
    return;
  }
};

export const Gtag_AddPaymentInfoEvent = (
  product,
  payment_type = "Credit/Debit Card",
  grandtotal
) => {
  if (window?.dataLayer && product?.length) {
    try {
      const price = product?.reduce((p, { rowTotal }) => p + rowTotal, 0);
      window?.dataLayer?.push({ ecommerce: null });
      window?.dataLayer?.push({
        event: "add_payment_info",
        ecommerce: {
          currency,
          value: grandtotal || price || 0.0,
          payment_type: payment_type,
          items: convertCartProductsToGmt(product),
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_AddPaymentInfoEvent) 1001:", error);
    }
  } else {
    return;
  }
};

export const Gtag_PurchaseEvent = (
  product,
  orderID,
  payment_type = "Credit/Debit Card",
  cartData
) => {
  if (window?.dataLayer && product?.length) {
    try {
      const { grandTotal, taxAmount, shippingMethod } = cartData || {};
      Gtag_AddPaymentInfoEvent(product, payment_type, grandTotal);
      const price = product?.reduce((p, { rowTotal }) => p + rowTotal, 0);
      window?.dataLayer?.push({ ecommerce: null });
      window?.dataLayer?.push({
        event: "purchase",
        ecommerce: {
          transaction_id: orderID,
          value: grandTotal || price || 0.0,
          currency,
          payment_type: payment_type,
          tax: taxAmount || 0.0,
          shipping: shippingMethod?.amount || 0.0,
          items: convertCartProductsToGmt(product),
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_PurchaseEvent) 1001:", error);
    }
  } else {
    return;
  }
};

export const Gtag_AddToWishlistEvent = (product) => {
  if (window?.dataLayer && product?.sku) {
    try {
      window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window?.dataLayer?.push({
        event: "add_to_wishlist",
        ecommerce: {
          currency,
          value: product?.priceRange?.minPrice?.finalPrice?.value || 0.0,
          items: [convertProductToGtag(product, product?.customUrl)],
        },
      });
    } catch (error) {
      console.warn("Gtag Event Error(Gtag_AddToWishlistEvent) :", error);
    }
  } else {
    return;
  }
};
