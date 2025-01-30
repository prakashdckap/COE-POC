import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { ChevronRight } from "heroicons-react";
import ReactHtmlParser from "react-html-parser";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import Image from "next/image";
import { AxiosGraphQL } from "../../../src/helper/axios";
import OrderedList from "../../../src/theme-files/ordered-list";
import ListItem from "../../../src/theme-files/list-item";
import BlogContent from "../../../src/components/cms/blog/element/blog-content";
import useBlog from "../../../src/helper/hooks/cms/useBlog";
import SEOHead from "../../../src/helper/SEOHeader";
import constants from "../../../src/helper/constant";
import TextInput from "../../../src/theme-files/text-input";
import { SET_NOTIFICATION } from "../../../src/redux/actions";
import { useDispatch } from "react-redux";
import BlogComment from "./BlogComment";
import LoadingSpinner from "../../../src/helper/loading-spinner";

export default function BlogDetail() {
  const history = useRouter();
  const dispatch = useDispatch();
  const [blogPost, setblogPost] = useState([]);
  const [loading, setloading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [reCAPTCHA, setreCAPTCHA] = useState(null);
  const [reError, setReError] = useState(false);
  const [values, setvalues] = useState({});
  const [error, setError] = useState({});
  const [errorText, seterrorText] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const path = history?.asPath;
  const captchaRef = useRef();
  const { blogList, loading: blogLoading, totalCount, handleProductList } = useBlog();
  const [replyIndex, setReplyIndex] = useState(null);
  const inputRef = useRef(null);

  const handleReply = (index) => {
    setReplyIndex(index);
    setvalues({});
  };

  const navigation = [
    { href: "/", name: "Home", current: false },
    { href: "/blog", name: "Blog", current: false },
  ];

  // API to fetch list of blogs
  const handleBlogPost = useCallback(async () => {
    setloading(true);
    const response = await AxiosGraphQL("blog", {
      urlkey: path,
    });
    if (response && !response?.errors?.length) {
      setblogPost(response?.BlogUrlKey?.items[0]);
      setloading(false);
    } else {
      setloading(false);
    }
  }, [path]);

  // Rendering product list for initial load
  useEffect(() => {
    handleBlogPost();
  }, [handleBlogPost]);

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

  const verify = (e) => {
    setreCAPTCHA(e);
  };

  const getComments = async () => {
    await AxiosGraphQL("get-blog-comments", {
      post_id: blogPost?.post_id,
      pageSize: 10,
      currentPage: 1,
    })
      .then((response) => {
        setCommentArray(response?.data?.blogComments);
        setCommentCount(response?.data?.blogComments?.total_count);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const handleAddComment = async (value, comment_id) => {
    await AxiosGraphQL("add-blog-comment", {
      author_email: value?.email,
      author_nickname: value?.fullname,
      parent_id: comment_id || 0,
      post_id: blogPost?.post_id,
      text: value?.comment,
      pageSize: 10,
      currentPage: 1,
    })
      .then(() => {
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: "You submitted your comment for moderation, please wait for approval",
            type: "success",
          })
        );
        setReplyIndex(null);
        setvalues({});
        setShowSubmit(false);
        setApiLoading(false);
        getComments();
        inputRef.current.value = "";
      })
      .catch((err) => {
        setvalues({});
        setError(err?.response?.data);
        setApiLoading(false);
      });
  };

  useEffect(() => {
    if (blogPost?.post_id) {
      getComments();
    }
  }, [blogPost?.post_id]);
  const validateEmail = () => {
    const { email } = values;
    const mail = email?.replace(/ /g, "")?.split(",");
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
      seterrorText("");
      return true;
    }
    seterrorText("Please enter a valid email address (Ex: johndoe@domain.com).");
    return false;
  };

  useEffect(() => {
    validateEmail();
  }, [values?.email]);

  const validateAndSubmit = (comment_id) => {
    const { comment, email, fullname } = values;

    if (reCAPTCHA && comment && email && fullname && validateEmail()) {
      handleAddComment(values, comment_id);
      setApiLoading(true);
      setReError(false);
    } else {
      setReError(true);
    }
  };

  return (
    <div className={`px-5 md:px-0 ${loading ? "opacity-40 pointer-events-none" : ""}`}>
      <SEOHead
        title={blogPost?.meta_title}
        description={blogPost?.meta_description}
        image={blogPost?.first_image}
        keywords={blogPost.meta_keywords}
        canonicalUrl={`${constants.replaceUrl}${path}`}
      />
      <nav aria-label="Breadcrumb" className="container px-0 md:px-[10px] mx-auto mb-10">
        {blogPost?.categories?.length ? (
          <OrderedList role="list" className="flex items-center ">
            {navigation?.map((item) => (
              <ListItem key={item?.name}>
                <div
                  className={`${
                    item?.current ? "font-bold" : "font-medium"
                  } flex items-center text-xs capitalize font-medium text-[#282828] hover:underline`}
                >
                  <Link href={item?.href}>{item?.name}</Link>
                  <ChevronRight className="h-4 text-[#282828]" />
                </div>
              </ListItem>
            ))}

            <ListItem key={blogPost?.categories[0]?.category_id}>
              <div className="flex items-center text-xs capitalize font-medium text-[#282828] hover:underline ">
                <Link
                  href={{
                    pathname: `/${blogPost?.categories[0]?.category_url_path}`,
                  }}
                >
                  {blogPost?.categories[0]?.title}
                </Link>
                <ChevronRight className="h-4 text-[#282828]" />
              </div>
            </ListItem>

            <ListItem>
              <div className="flex items-center text-xs capitalize font-bold text-[#282828] hover:underline ">
                <Link
                  href={{
                    pathname: blogPost?.canonical_url?.replace(constants.magentoBaseUrl, ""),
                    // query: { id },
                  }}
                >
                  {blogPost?.title}
                </Link>
              </div>
            </ListItem>
          </OrderedList>
        ) : null}
      </nav>

      {loading ? (
        <div className="min-h-[100vh] flex justify-center items-center">
          <svg
            className="h-[100px] animate-pulse"
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            fill="#cacaca"
          >
            <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z" />
          </svg>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            {blogPost?.categories?.map((category) => (
              <p
                className="text-[11px] font-bold uppercase w-full text-center first:mb-6"
                key={category?.category_id}
              >
                <Link
                  className="hover:underline text-center cursor-pointer"
                  href={{
                    pathname: `/${category?.category_url_path}`,
                  }}
                >
                  {category?.title}
                </Link>
              </p>
            ))}

            <h1 className="mb-3 mt-2 text-[24px] md:text-[37px] px-0 md:px-7 font-semibold uppercase">
              {blogPost?.title}
            </h1>

            <p className="text-[13px] w-full">
              Posted: {blogPost.publish_time ? getDisplayDate(blogPost?.publish_time) : null}
            </p>

            {blogPost?.featured_image ? (
              <div className="mt-[20px] relative overflow-hidden w-full image-height">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={blogPost?.featured_image || ""}
                  alt="featured_image"
                />
              </div>
            ) : (
              <div className="bg-transparent w-full h-[215px] md:h-[432px]"></div>
            )}
          </div>

          <div className="blog-description">
            {ReactHtmlParser(
              blogPost?.content
                ?.replaceAll("&gt;", ">")
                ?.replaceAll("&lt;", "<")
                ?.replaceAll("{{media url=", `${constants.magentoBaseUrl}media/`)
                .replaceAll("}}", "")
                .replaceAll('href="https://www.elementvape.com', 'href="')
            )}
          </div>

          {blogPost?.author?.name ? (
            <p className="font-bold mt-2 text-center text-[14px]">
              Written By:{" "}
              {blogPost?.author?.name ? (
                <Link
                  href={{
                    pathname: `/blog/author/${blogPost?.author?.identifier}`,
                    query: { id: blogPost.author?.author_id },
                  }}
                >
                  <a className="hover:underline">{blogPost?.author?.name}</a>
                </Link>
              ) : null}
            </p>
          ) : (
            ""
          )}
        </div>
      )}

      <div className="py-[50px] max-w-3xl mx-auto">
        <div className="border-b border-[#222] mb-[5px]">
          <h6>{`${commentCount || 0} ${
            commentCount == 1 || commentCount == 0 ? "Comment" : "Comments"
          }`}</h6>
        </div>
        <div className="bg-[#fafafa] border[#eee] p-[20px] mt-[20px] ">
          {replyIndex === null && (
            <>
              <textarea
                placeholder="Add a comment..."
                rows={5}
                className={
                  error?.comment ? "error-field" : "" + " resize p-3 w-full border border-[#eee] "
                }
                id="commentBox"
                onClick={() => {
                  setShowSubmit(true);
                  setReplyIndex(null);
                }}
                values={values?.comment}
                onChange={(e) => setvalues({ ...values, comment: e.target.value })}
                ref={inputRef}
              />

              {!values?.comment && reError ? (
                <span className="text-[#e02b27] text-sm">required field</span>
              ) : null}
              {showSubmit && (
                <div className="block sm:flex justify-between mt-[5%] w-full">
                  <div className="w-full sm:w-[48%]">
                    <TextInput
                      type="text"
                      placeholder="Full Name"
                      name="fullname"
                      values={values}
                      setvalues={setvalues}
                      errors={error?.fullname || false}
                      isRequired
                      isClicked={error?.fullname || false}
                      ref={inputRef}
                    />
                    {!values?.fullname && reError ? (
                      <span className="text-[#e02b27] text-sm">required field</span>
                    ) : null}
                  </div>
                  <div className="w-full sm:w-[48%]">
                    <TextInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      values={values}
                      setvalues={setvalues}
                      errors={error?.email || false}
                      isRequired
                      isClicked={error?.email || false}
                      ref={inputRef}
                    />
                    {values?.email && errorText ? (
                      <span className="text-[#e02b27] text-sm">{errorText}</span>
                    ) : null}
                    {!values?.email && reError ? (
                      <span className="text-[#e02b27] text-sm">required field</span>
                    ) : null}
                  </div>
                </div>
              )}
              {showSubmit && (
                <div className="flex justify-between mt-[5%] w-full comment-captcha">
                  <div className="flex justify-start">
                    <ReCAPTCHA
                      sitekey={constants.RECAPTCHA_KEY}
                      ref={captchaRef}
                      onChange={verify}
                      isolated
                    />

                    {reError && !reCAPTCHA && (
                      <small
                        className={
                          reError ? "text-[#e02b27] text-sm show" : "text-[#e02b27] text-sm hidden"
                        }
                      >
                        ReCAPTCHA required!
                      </small>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={!values?.comment?.length > 0}
                      className=" disabled:opacity-40 disabled:pointer-events-none mt-8 bg-skin-secondary uppercase border border-transparent py-1 px-4 flex items-center justify-center text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted"
                      onClick={() => validateAndSubmit(false)}
                    >
                      {values?.email &&
                      values?.comment &&
                      reCAPTCHA &&
                      values.fullname &&
                      apiLoading ? (
                        <LoadingSpinner message="loading" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          <BlogComment
            commentArray={commentArray}
            handleReply={handleReply}
            replyIndex={replyIndex}
            values={values}
            setvalues={setvalues}
            error={error}
            setShowSubmit={setShowSubmit}
            inputRef={inputRef}
            setReplyIndex={setReplyIndex}
            validateAndSubmit={validateAndSubmit}
            reError={reError}
            verify={verify}
            reCAPTCHA={reCAPTCHA}
            apiLoading={apiLoading}
            errorText={errorText}
          />
        </div>
      </div>
      <BlogContent
        blogList={blogList}
        loading={blogLoading}
        handleProductList={handleProductList}
        totalCount={totalCount}
        blogDescription
      />
    </div>
  );
}
