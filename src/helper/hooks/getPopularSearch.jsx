import { useState } from "react";
import { useSelector } from "react-redux";
import { AxiosGet } from "../axios";

const getPopularSearchList = () => {
  const { customerToken } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [popularSearch, setPopularSearch] = useState({});

  // Function to search whether local pickup is available
  const onPopularSearch = async (variables) => {
    setLoading(true);
    try {
      const response = await AxiosGet("popular-search", variables, customerToken);
      if (response && response?.xsearchPopularSearches) {
        setLoading(false);
        setPopularSearch(response?.xsearchPopularSearches);
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
        setPopularSearch({});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { onPopularSearch, loading, popularSearch };
};

export default getPopularSearchList;
