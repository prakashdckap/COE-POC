import { useState } from "react";
import { useSelector } from "react-redux";
import { AxiosGet } from "../axios";

const getProductsList = () => {
  const { customerToken } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterAggregations, setFilterAggregations] = useState([]);

  // Function to search whether local pickup is available
  const onProductSearch = async (variables) => {
    setLoading(true);
    try {
      const response = await AxiosGet("products", variables, customerToken);
      if (response && response?.products) {
        setLoading(false);
        const items = response?.products?.items?.filter((product) => {
          if (product.stock_status === "IN_STOCK") return product;
        });
        const productsList = { ...response?.products, items };
        setProducts(productsList);
        return productsList;
      } else if (response && response?.errors?.length) {
        setLoading(false);
      } else {
        setLoading(false);
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductFiletrs = async (variables) => {
    setFiltersLoading(true);
    try {
      const response = await AxiosGet("product-filters", variables, customerToken);
      if (response && response?.products) {
        setFiltersLoading(false);
        setFilterAggregations(response?.products?.aggregations);
        return response?.products?.aggregations;
      } else if (response && response?.errors?.length) {
        setFiltersLoading(false);
      } else {
        setFiltersLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFiltersLoading(false);
    }
  };

  return {
    onProductSearch,
    loading,
    products,
    filterAggregations,
    getProductFiletrs,
    filtersLoading,
  };
};

export default getProductsList;
