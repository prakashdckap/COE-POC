import DISCOUNTS from "./discounts";

const PRICE_INTERFACE = `
... on PriceInterface {
    grandTotal
    routeShippingProtection
    adultSignatureFee
    exciseTax
    deliveryFee
    mfpp
    taxAmount
    discountAmount 
    discounts {
      ${DISCOUNTS}
    }
    subtotal 
}
`;

export default PRICE_INTERFACE;
