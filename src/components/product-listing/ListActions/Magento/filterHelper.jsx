export const getPriceList = (filterData = []) => {
  const priceArr = [];
  const priceRangeFilter = filterData?.filter((item) => item?.label === "Price");

  priceRangeFilter[0]?.options?.map((option) =>
    priceArr.push(parseInt(option?.label?.replaceAll("'", "").split("-")[1], 10))
  );
  return priceArr;
};

export const getSortedFilters = (filterData = []) => {
  // Formatting brands and price filter in top
  const brandFilterObj = filterData?.find((data) => data?.label?.toLowerCase() === "brand");
  const priceFilterObj = filterData?.find((data) => data?.label?.toLowerCase() === "price");

  let newFilters = [];

  if (brandFilterObj?.label && priceFilterObj?.label) {
    const filteredObj = filterData?.filter(
      (data) =>
        data?.label?.toLowerCase() !== "brand" &&
        data?.label?.toLowerCase() !== "price" &&
        data?.label?.toLowerCase() !== "category"
    );
    newFilters = [brandFilterObj, priceFilterObj, ...filteredObj];
  } else if (brandFilterObj?.label && !priceFilterObj?.label) {
    const filteredObj = filterData?.filter(
      (data) => data?.label?.toLowerCase() !== "brand" && data?.label?.toLowerCase() !== "category"
    );
    newFilters = [brandFilterObj, ...filteredObj];
  } else if (priceFilterObj?.label && !brandFilterObj?.label) {
    const filteredObj = filterData?.filter(
      (data) => data?.label?.toLowerCase() !== "price" && data?.label?.toLowerCase() !== "category"
    );
    newFilters = [priceFilterObj, ...filteredObj];
  } else {
    newFilters = filterData.filter((data) => data?.label?.toLowerCase() !== "category");
  }
  return newFilters;
};

export const getDefaultExpand = (newFilters = [], lastSelectedFilter, filter = []) => {
  return newFilters?.map((section) => {
    if (filter?.find((sec) => sec?.attribute_code === section?.attribute_code)?.attribute_code) {
      return {
        ...section,
        open:
          lastSelectedFilter === section?.attribute_code || section?.attribute_code === "brands",
        options: section?.options?.map((option) => {
          if (
            option?.value ===
            filter
              ?.find((sec) => sec?.attribute_code === section?.attribute_code)
              ?.options?.find((opt) => opt?.value === option?.value)?.value
          ) {
            return {
              ...option,
              checked: true,
            };
          }
          return option;
        }),
      };
    }
    return {
      ...section,
      open:
        lastSelectedFilter === section?.attribute_code ||
        section?.attribute_code === "brands" ||
        false,
    };
  });
};
