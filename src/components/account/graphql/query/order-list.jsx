import { gql } from "@apollo/client";

const ORDER_LIST = gql`
  query OrderList($currentPage: Int, $pageSize: Int, $filter: OrderFilter) {
    customerOrderList(currentPage: $currentPage, pageSize: $pageSize, filter: $filter) {
      orderItems {
        orderId
        status
        shipTo
        orderDate
        orderTotal {
          amount
          currencyCode
        }
        isInStock
      }
      pageInfo {
        currentPage
        pageSize
        totalPages
      }
      totalCount
    }
  }
`;

export default ORDER_LIST;
