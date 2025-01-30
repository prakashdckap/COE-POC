export const featuredSort = { name: "Featured", current: true, value: "featured" };
export const relevanceSort = { name: "Relevance", current: true, value: "relevance" };

export const plpSortOptions = [
  { name: "Most Reviewed", current: false, value: "most_reviewed" },
  { name: "New Arrivals", current: false, value: "new_arrivals" },
  { name: "Price High - Low", current: false, value: "price" },
  { name: "Price Low - High", current: false, value: "price" },
];

export const magentoFeaturedSort = { name: "Featured", current: true, value: "|" };
export const magentoRelevanceSort = { name: "Relevance", current: true, value: "|" };

export const magnetoPlpSortOptions = [
  { name: "Most Reviewed", current: false, value: "most_reviewed|DESC" },
  { name: "New Arrivals", current: false, value: "new_products|ASC" },
  { name: "Price High - Low", current: false, value: "price|DESC" },
  { name: "Price Low - High", current: false, value: "price|ASC" },
];
export const priceReset = { min: 0, max: 100, request: false };

export const nearestNumber = (min, max, target) => {
  // Calculate the absolute difference between each number and the target
  const diffA = Math.abs(min - target);
  const diffB = Math.abs(max - target);

  // Return the number with the smallest difference
  return diffA < diffB ? "lower" : "greater";
};

export const sortedArrayOptions = (options) => {
  return options?.sort((a, b) => {
    let fa = a.label.toLowerCase();
    let fb = b.label.toLowerCase();
    if (fa < fb) return -1;
    if (fa > fb) return 1;
    return 0;
  });
};

export function addItemsRepeatedly(elem = "", n = 1) {
  // returns an array with element elem repeated n times.
  return Array(n).fill(elem);
}

export const findMissingElements = (arr1, arr2, key) => {
  try {
    // Create a set of keys from the second array
    const arr2Keys = new Set(arr2.map((item) => item[key]));
    // Filter the first array to find elements whose key is not in the second array
    return arr1.filter((item) => !arr2Keys.has(item[key]));
  } catch (error) {
    return [];
  }
};
