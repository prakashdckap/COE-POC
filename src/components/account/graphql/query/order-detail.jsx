import { gql } from "@apollo/client";
import ORDER_INTERFACE from "../fragments/order-interface";
import ORDER_TOTAL from "../fragments/order-total";
import ADDRESS from "../../../cart/graphql/fragments/address-object";

const ORDER_DETAIL = gql`
  query OrderDetail($orderNumber: String!) {
    customerOrderDetail(orderNumber: $orderNumber) {
      orderId
      status
      orderDate
      isInStock
      orderedItems {
        ${ORDER_INTERFACE}
      }
      billingAddress {
        ${ADDRESS}
      }
      shippingAddress {
        ${ADDRESS}
      }
      dealerInfo {
        hours
        dealerid
        number
        name
      }
      paymentMethod {
        name
        type
        ccData {
          ccNum
          ccType
        }
        additionalData{
          name
          value
        }
      }
      shippingMethod
      orderTotal {
        ${ORDER_TOTAL}
      }
      shipments {
        number
        items {
          ${ORDER_INTERFACE}
        }
        trackingInfo {
          number
          title
        }
      }
    }
  }
`;

export default ORDER_DETAIL;
