import axios from 'axios';
import { getProductDetailsQuery } from './product-detail';

export const fetchProductDetails = async (sku, productType) => {
  const query = getProductDetailsQuery(sku, productType);

  try {
    const response = await axios.post("http://localhost:5002/graphql", {
      query: query,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data?.data;
  } catch (err) {
    throw new Error("Failed to fetch product details: " + err.message);
  }
};
