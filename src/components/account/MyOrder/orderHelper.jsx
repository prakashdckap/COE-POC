import { decodeJWT } from "../helper";

export const orderEntity = {
  nameSku: { key: "nameSku", title: "Product Name/SKU:" },
  createdby: { key: "createdby", title: "Created By:" },
  orderNumber: { key: "orderNumber", title: "Order Numer:" },
  orderStatus: { key: "orderStatus", title: "Order Status:" },
  invoiceNumber: { key: "invoiceNumber", title: "Invoice Number:" },
  minTotal: { key: "minTotal", title: "Order Total:" },
  maxTotal: { key: "maxTotal", title: "Order Total:" },
  fromDate: { key: "fromDate", title: "Order Date:" },
  toDate: { key: "toDate", title: "Order Date:" },
};

export const orderFilterKey = {
  namesku: "namesku",
  createdby: "createdby",
  fromDate: "fromDate",
  invoiceNumber: "invoiceNumber",
  maxTotal: "maxTotal",
  minTotal: "minTotal",
  orderNumber: "orderNumber",
  orderStatus: "orderStatus",
  toDate: "toDate",
};

export const removeKeyFromObj = (keyToRemove, filter, filterData, customerToken) => {
  const updatedFilter = { ...filter };
  const updatedFilterData = { ...filterData };

  if (keyToRemove === orderEntity.minTotal.key) {
    delete updatedFilter[keyToRemove];
    delete updatedFilter[orderEntity.maxTotal.key];
    delete updatedFilterData[orderEntity.maxTotal.key];
    delete updatedFilterData[keyToRemove];
  } else if (keyToRemove === orderEntity.fromDate.key) {
    delete updatedFilter[keyToRemove];
    delete updatedFilter[orderEntity.fromDate.key];
    delete updatedFilterData[orderEntity.fromDate.key];
    delete updatedFilterData[keyToRemove];
  } else {
    delete updatedFilter[keyToRemove];
    delete updatedFilterData[keyToRemove];
  }

  if (Object.keys(filterData).length == 1 || !Object.keys(filterData).length) {
    return { filter: {}, filterData: {} };
  } else if (Object.keys(filterData).length == 2) {
    if (
      Object.keys(filterData)[0] === orderEntity.fromDate.key ||
      Object.keys(filterData)[0] === orderEntity.minTotal.key
    ) {
      return { filter: {}, filterData: {} };
    } else {
      if (keyToRemove === orderEntity.createdby.key) {
        return {
          filter: { ...updatedFilter, createdby: decodeJWT(customerToken) },
          filterData: updatedFilterData,
        };
      } else {
        return {
          filter: updatedFilter,
          filterData: updatedFilterData,
        };
      }
    }
  } else {
    if (keyToRemove === orderEntity.createdby.key) {
      return {
        filter: { ...updatedFilter, createdby: decodeJWT(customerToken) },
        filterData: updatedFilterData,
      };
    } else {
      return {
        filter: updatedFilter,
        filterData: updatedFilterData,
      };
    }
  }
};
