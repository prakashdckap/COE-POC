import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosGraphQL } from "../../../src/helper/axios";
import BlogContent from "../../../src/components/cms/blog/element/blog-content";

export default function CategoryType() {
  const history = useRouter();
  const [blogCategoryList, setblogCategoryList] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalCount, settotalCount] = useState(0);
  const path = history?.asPath;

  // API to fetch list of blogs
  const handleProductCategoryList = async (seeMore, pageCount) => {
    setloading(true);
    const response = await AxiosGraphQL("blog", {
      pageSize: 6,
      currPage: !seeMore ? 1 : pageCount,
      urlkey: path,
    });
    if (response && !response?.errors?.length) {
      if (seeMore) {
        setblogCategoryList((product) => [...product, ...response.BlogUrlKey.items]);
      } else {
        setblogCategoryList(response?.BlogUrlKey?.items);
        settotalCount(response?.BlogUrlKey?.total_count);
      }
      setloading(false);
    } else {
      setloading(false);
    }
  };

  // Rendering product list for initial load
  useEffect(() => {
    handleProductCategoryList(false);
  }, [path]);

  return (
    <div>
      <BlogContent
        blogList={blogCategoryList}
        loading={loading}
        handleProductList={handleProductCategoryList}
        totalCount={totalCount}
      />
    </div>
  );
}
