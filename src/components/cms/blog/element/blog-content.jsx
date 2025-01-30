import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { ChevronRight } from "heroicons-react";
import LoadingSpinner from "../../../../helper/loading-spinner";
import OrderedList from "../../../../theme-files/ordered-list";
import ListItem from "../../../../theme-files/list-item";
import constants from "../../../../helper/constant";
import SEOHead from "../../../../helper/SEOHeader";

function BlogContent({ blogList, loading, handleProductList, totalCount, blogDescription }) {
  const history = useRouter();
  const [currPage, setcurrPage] = useState(1);
  let categoryHeading;

  if (history?.query?.categoryType?.toLocaleLowerCase() === "product-spotlight") {
    categoryHeading = "Product Review";
  } else if (history?.query?.categoryType) {
    categoryHeading = history?.query?.categoryType;
  } else if (history?.query?.author) {
    categoryHeading = history?.query?.author;
  } else {
    categoryHeading = "Latest";
  }

  const isBlogDescription = blogDescription ? blogList?.slice(0, 3) : blogList;

  const navigation = [
    { href: "/", name: "Home", current: false },
    { href: "/blog", name: "Blog", current: false },
    {
      href: {
        pathname: `/blog/category/${categoryHeading?.toLocaleLowerCase()}`,
      },

      name: history?.query?.categoryType || history?.query?.author,
      current: true,
    },
  ];

  // Handling see more functionality
  const handleSeeMore = () => {
    setcurrPage(currPage + 1);
    handleProductList(true, currPage + 1);
  };

  // To retrieve month in form of text
  const retrieveMonth = (month) => {
    let monthString = "";
    if (month === "01") {
      monthString = "January";
    } else if (month === "02") {
      monthString = "February";
    } else if (month === "03") {
      monthString = "March";
    } else if (month === "04") {
      monthString = "April";
    } else if (month === "05") {
      monthString = "May";
    } else if (month === "06") {
      monthString = "June";
    } else if (month === "07") {
      monthString = "July";
    } else if (month === "08") {
      monthString = "August";
    } else if (month === "09") {
      monthString = "September";
    } else if (month === "10") {
      monthString = "October";
    } else if (month === "11") {
      monthString = "November";
    } else {
      monthString = "December";
    }

    return monthString;
  };

  // Formatted Date to display
  const getDisplayDate = (responseDate) => {
    const date = responseDate?.split(" ")[0];
    const day = date?.split("-")[2];
    const month = date?.split("-")[1];
    const year = date?.split("-")[0];

    return `${retrieveMonth(month)} ${day},  ${year}`;
  };

  return (
    <>
      <div className={`px-0 ${loading ? "opacity-40 pointer-events-none" : ""}`}>
        <div className="container mx-auto">
          {history?.query?.categoryType || history?.query?.author ? (
            <nav aria-label="Breadcrumb" className="px-4 md:px-0 text-center mx-auto mb-5">
              <OrderedList role="list" className="flex items-center ">
                {navigation?.map((item, i) => (
                  <ListItem key={item?.name}>
                    <div
                      className={`${
                        item?.current ? "font-bold" : "font-medium"
                      } flex items-center text-xs capitalize font-medium text-[#282828] hover:underline`}
                    >
                      <Link href={item?.href}>{item?.name}</Link>
                      {i < navigation?.length - 1 ? (
                        <ChevronRight className="h-4 text-[#282828]" />
                      ) : null}
                    </div>
                  </ListItem>
                ))}
              </OrderedList>
            </nav>
          ) : null}
        </div>

        <div className={`${blogDescription ? "bg-[#f3f3f3] py-[30px] px-[30px]" : ""}`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[19px] text-skin-base mt-10 md:mt-0 font-bold tracking-tight text-[#282828] uppercase text-center pb-5 pt-5">
              {categoryHeading}
            </h2>
            <div className="flex flex-col md:grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-6 px-[15px] md:px-[20px]">
              {isBlogDescription.map((blog) => (
                <div key={blog.post_id} className="group relative">
                  <div className="aspect-w-1 aspect-h-1 float-left md:float-none w-[50%] md:w-full mr-[3%] md:mr-0 overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none">
                    {blog.first_image ? (
                      <Link
                        href={{
                          pathname: `/blog/post/${blog?.identifier}`,
                        }}
                      >
                        <a className="h-[155px] md:h-[170px] w-[100%] m-0 block">
                          <img
                            src={blog.first_image?.replace(
                              "dev3.elementvape.com",
                              "headless.elementvape.com"
                            )}
                            alt={blog.first_image}
                            className="h-[100%] w-[100%] object-cover"
                          />
                        </a>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-4">
                    {blog.categories?.map((item) => (
                      <span
                        className="text-[11px] text-skin-base font-bold uppercase mr-2"
                        key={item?.category_id}
                      >
                        <Link
                          href={
                            history?.pathname === "/blog/category/[categoryType]"
                              ? `/${item?.category_url_path}`
                              : item?.category_url?.replace(constants.magentoBaseUrl, "")
                          }
                          className="mr-5"
                        >
                          {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                          {item?.title}
                        </Link>
                      </span>
                    ))}

                    <h6 className="my-3 text-[15px] md:text-[20px] text-skin-base font-semibold">
                      <Link
                        href={{
                          pathname: `/blog/post/${blog?.identifier}`,
                        }}
                      >
                        {blog.title}
                      </Link>
                    </h6>

                    <p className="text-[13px] text-skin-base">
                      {getDisplayDate(blog.publish_time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-10">
              {blogDescription ? (
                <Link href="/blog">
                  <a className="uppercase mt-14 mb-10 md:mb-0 bg-skin-secondary border border-transparent py-3 px-8 flex items-center justify-center text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted disabled:opacity-40 disabled:cursor-not-allowed">
                    VIEW ALL BLOGS
                  </a>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSeeMore()}
                  disabled={blogList?.length >= totalCount}
                  className="uppercase mt-14 mb-10 md:mb-0 bg-skin-secondary border border-transparent py-3 px-8 flex items-center justify-center text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? <LoadingSpinner message="loading" /> : "See More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogContent;

BlogContent.defaultProps = {
  blogList: {},
  loading: false,
  totalCount: 0,
  blogDescription: false,
};
BlogContent.propTypes = {
  blogList: PropTypes.arrayOf(),
  loading: PropTypes.bool,
  handleProductList: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  blogDescription: PropTypes.bool,
};
