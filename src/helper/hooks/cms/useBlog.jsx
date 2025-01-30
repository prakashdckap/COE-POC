import { useEffect, useState } from "react";
import { AxiosGraphQL } from "../../axios";

function useBlog() {
  const [blogList, setblogList] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalCount, settotalCount] = useState(0);

  // API to fetch list of blogs
  const handleProductList = async (seeMore, pageCount) => {
    setloading(true);
    const response = await AxiosGraphQL("blog-post-list", {
      pageSize: 6,
      currPage: !seeMore ? 1 : pageCount,
    });
    if (response && !response?.errors?.length) {
      if (seeMore) {
        setblogList((product) => [...product, ...response.blogPosts.items]);
      } else {
        setblogList(response?.blogPosts?.items);
        settotalCount(response?.blogPosts?.total_count);
      }
      setloading(false);
    } else {
      setloading(false);
    }
  };

  // Rendering product list for initial load
  useEffect(() => {
    handleProductList(false);
  }, []);

  return { blogList, loading, totalCount, handleProductList };
}

export default useBlog;
