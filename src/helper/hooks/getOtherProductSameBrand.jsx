import { useState } from "react";
import { useSelector } from "react-redux";
import { AxiosGet } from "../axios";

const useProductsSameBrand = () => {
  const { customerToken } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Function to get products from same brand
  const getProductsSameBrand = async (variables) => {
    setLoading(true);
    try {
      const response = await AxiosGet("product-same-brand", variables, customerToken);
      if (response && response?.OtherProductSuggestions?.length) {
        setLoading(false);
        setProducts(response?.OtherProductSuggestions);
        return response?.OtherProductSuggestions;
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

  return { getProductsSameBrand, loading, products };
};

export default useProductsSameBrand;
