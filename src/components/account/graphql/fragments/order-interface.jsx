const ORDER_INTERFACE = `
... on OrderItemInterface {
    exciseTax
    discounts {
      amount
          label
      }
    productName
    productSku
    customOptions {
      label
      value
    }
    productPrice
    status
    quantityCancelled
    quantityInvoiced
    quantityOrdered
    quantityRefunded
    quantityReturned
    quantityShipped
 }
 
`;

export default ORDER_INTERFACE;
