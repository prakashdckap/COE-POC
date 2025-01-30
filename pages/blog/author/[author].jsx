import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosGraphQL } from "../../../src/helper/axios";
import BlogContent from "../../../src/components/cms/blog/element/blog-content";

export default function CategoryType() {
  const history = useRouter();
  const [blogAuthorList, setblogAuthorList] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalCount, settotalCount] = useState(0);

  const id = history?.query?.id;

  // API to fetch list of blogs
  const handleProductAuthorList = async (seeMore, pageCount) => {
    setloading(true);
    const response = await AxiosGraphQL("blog-author", {
      pageSize: 6,
      currPage: !seeMore ? 1 : pageCount,
      authorId: id?.toString(),
    });
    if (response && !response?.errors?.length) {
      if (seeMore) {
        setblogAuthorList((product) => [...product, ...response.blogPosts.items]);
      } else {
        setblogAuthorList(response?.blogPosts?.items);
        settotalCount(response?.blogPosts?.total_count);
      }
      setloading(false);
    } else {
      setloading(false);
    }
  };

  // Rendering product list for initial load
  useEffect(() => {
    handleProductAuthorList(false);
  }, [id]);

  return (
    <div>
      <BlogContent
        blogList={blogAuthorList}
        loading={loading}
        handleProductList={handleProductAuthorList}
        totalCount={totalCount}
      />
    </div>
  );
}
