import { gql } from "@apollo/client";
import ADDRESS from "../../../cart/graphql/fragments/address-object";
import PRICE_INTERFACE from "../../../cart/graphql/fragments/price-interface";
import PAYMENT_METHOD from "../../../cart/graphql/fragments/payment-method";
import SHIPPING_METHOD from "../../../cart/graphql/fragments/shipping-method";

const BILLING_ADDRESS = gql`
mutation SetBillingAddress ($cartId :String!,$billingAddress: BillingAddress!, $email:String!){
  setBillingAddress (cartId: $cartId, billingAddress: $billingAddress,email:$email){
        availablePaymentMethods{
            ${PAYMENT_METHOD}
          }
      billingAddress{
        ${ADDRESS}
      }
      shippingAddress{
        ${ADDRESS}
      }
      availableShippingMethods{
        ${SHIPPING_METHOD}
      }
      shippingMethod {
       ${SHIPPING_METHOD}
      }
      ${PRICE_INTERFACE}
    }
  }
  
`;

export default BILLING_ADDRESS;
