import { gql } from "@apollo/client";
import COUPON from "../fragments/coupon";
import PRICE_INTERFACE from "../fragments/price-interface";

const REMOVE_COUPON = gql`
  mutation RemoveCouponFromCart($cartId: String!) {
    removeCouponFromCart(cartId: $cartId) {
      coupon {
        ${COUPON}
      }
      ${PRICE_INTERFACE}
    }
  }
`;

export default REMOVE_COUPON;
