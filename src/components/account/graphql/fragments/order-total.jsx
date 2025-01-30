const ORDER_TOTAL = `
... on OrderTotal{
    storeCredit
    adultSignatureFee
    deliveryFee
    exciseTax
    routeShippingFee  
    subTotal
    grandTotal
    taxTotal
    shippingTotal
    currencyCode
    rewardPoints
    discounts {
      amount
      label
    }
}

`;

export default ORDER_TOTAL;
