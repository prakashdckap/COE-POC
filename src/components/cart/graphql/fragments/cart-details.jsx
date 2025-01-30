import CART_ITEM from "./cart-item";
import SHIPPING_METHOD from "./shipping-method";
import DISCOUNTS from "./discounts";
import COUPON from "./coupon";
import ADDRESS from "./address-object";
import PAYMENT_METHOD from "./payment-method";
import REWARD_POINTS from "./reward-points";

const CART_DETAILS = `
... on Cart {
    cartId
    platformId
    customerId
    isTaxIncluded
    priceFrom 
    appliedStoreCredit {
      creditAmount
      creditAmountAvailable
      creditUsed
    }
    cartRules {
      ruleAmount
      ruleName
    }
    shippingAddress {
      ${ADDRESS}
    }
    billingAddress{
      ${ADDRESS}
    }
    availableShippingMethods{
      ${SHIPPING_METHOD}
    }
    availablePaymentMethods {
      ${PAYMENT_METHOD}
    }
    cartItems {
      ${CART_ITEM}
    }
    shippingMethod {
      ${SHIPPING_METHOD}
    }
    coupon{
      ${COUPON}
      }
    discounts{
      ${DISCOUNTS}
    }
    appliedRewardPoints{
      ${REWARD_POINTS}
    }
    
    taxAmount
    routeShippingProtection
    adultSignatureFee
    exciseTax
    deliveryFee
    discountAmount
    subtotal
    grandTotal
    currencyCode
    totalQuantity
    nonVapeFlag
    applicableRouteShipping
  }
`;
export default CART_DETAILS;
