import { useState } from "react";
import { useSelector } from "react-redux";
import { AxiosGet } from "../axios";

const getCategorySearchList = () => {
  const { customerToken } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});

  // Function to search whether local pickup is available
  const onCategorySearch = async (variables) => {
    setLoading(true);
    try {
      const response = await AxiosGet("category-search", variables, customerToken);
      if (response && response?.xsearchCategories) {
        setLoading(false);
        setCategories(response?.xsearchCategories);
      } else if (response && response?.errors?.length) {
        setLoading(false);
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: response?.errors[0]?.message,
            type: "error",
          })
        );
      } else {
        setLoading(false);
        setCategories({});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { onCategorySearch, loading, categories };
};

export default getCategorySearchList;
