// Base64Url decoding function
export function base64UrlDecode(base64Url) {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

// JWT decoding function
export function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const payload = parts[1];
  const decodedPayload = base64UrlDecode(payload);

  let data = JSON.parse(decodedPayload);
  return String(data.uid);
}

// Function to format the date string
export const formatDate = (dateString) => {
  // const dateString = "Tue May 14 2024 00:00:00 GMT+0530 (India Standard Time)";
  const date = new Date(dateString);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  const dateParts = formattedDate.split(" ");

  return `${dateParts[0]}`;
};

export const getFilterEntities = (filterArr) => {
  if (Array.isArray(filterArr)) {
    return filterArr
      ?.map((filterData) => {
        if (
          filterData?.orderNumber ||
          filterData?.orderStatus ||
          filterData?.maxTotal ||
          filterData?.minTotal ||
          filterData?.fromDate ||
          filterData?.toDate ||
          filterData?.namesku ||
          filterData?.invoiceNumber ||
          filterData.createdby
        ) {
          const result = {
            orderNumber: filterData?.orderNumber,
            orderStatus: filterData?.orderStatus,
            OrderTotal: { Max: filterData?.maxTotal, Min: filterData?.minTotal },
            OrderDate: { From: filterData?.fromDate, To: filterData?.toDate },
            ProductSku: filterData?.namesku,
            invoiceNumber: filterData?.invoiceNumber,
            createdby: filterData.createdby,
          };

          return result;
        }

        return null;
      })
      .filter((obj) => obj !== null); // Filter out null values
  }
  return [];
};

export const statusOptions = [
  { value: "canceled", displayName: "Canceled" },
  { value: "closed", displayName: "Closed" },
  { value: "delivered", displayName: "Delivered" },
  { value: "hold", displayName: "On Hold" },
  { value: "review", displayName: "Payment Review" },
  { value: "pending", displayName: "Pending" },
  { value: "processing", displayName: "Processing" },
  { value: "recieved", displayName: "Recieved" },
  { value: "shipped", displayName: "Shipped" },
  { value: "fraud", displayName: "Suspect Fraud" },
];
