const CUSTOMER_ADDRESS = `
... on CustomerAddrObj {
    city
    company
    country
    defaultBilling
    defaultShipping
    firstName
    id
    lastName
    postcode
    fax
    region{
      region
      code
    }
    street
    telephone
  }
`;

export default CUSTOMER_ADDRESS;
