import { gql } from "@apollo/client";
import COUPON from "../fragments/coupon";
import PRICE_INTERFACE from "../fragments/price-interface";

const APPLY_COUPON = gql`
  mutation ApplyCouponOnCart($cartId: String!, $code: String!) {
    applyCouponOnCart(cartId: $cartId, code: $code) {
      coupon {
        ${COUPON}
      }
      ${PRICE_INTERFACE}
    }
  }
`;

export default APPLY_COUPON;
