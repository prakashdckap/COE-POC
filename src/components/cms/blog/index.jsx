import BlogContent from "./element/blog-content";
import BlogStatic from "./element/blog-static";
import useBlog from "../../../helper/hooks/cms/useBlog";

function CmsBlog() {
  const { blogList, loading, totalCount, handleProductList } = useBlog();

  return (
    <>
      <BlogStatic />
      <BlogContent
        blogList={blogList}
        loading={loading}
        handleProductList={handleProductList}
        totalCount={totalCount}
      />
    </>
  );
}

export default CmsBlog;
