import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import PRODUCT_RECOMMENDATION from "../../components/product-description/graphql/query/product-recommendation";
import { adobeClient } from "../graphql";

function useProductRecommendations(payload) {
  const [productsRecommendation, setProductRecomand] = useState([]);

  const [getProducts, { data, loading }] = useLazyQuery(PRODUCT_RECOMMENDATION, {
    variables: payload,
    client: adobeClient,
  });

  useEffect(() => {
    if (data) {
      setProductRecomand(data?.recommendations?.results || []);
    }
  }, [data]);

  // API to fetch list of product recommendation
  const getProductRecommendations = async (payload) => {
    payload && getProducts();
  };

  // Rendering product list for initial load
  useEffect(() => {
    getProductRecommendations(false);
  }, []);

  return { productsRecommendation, loading, getProductRecommendations };
}

export default useProductRecommendations;
