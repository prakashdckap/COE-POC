import React, { useState, useEffect } from "react";
import { HeartIcon, PencilIcon, SearchIcon } from "@heroicons/react/solid";
import { Star, StarOutline } from "heroicons-react";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import PropTypes from "prop-types";
import Link from "next/link";
import Paragraph from "../../theme-files/paragraph";
import Heading from "../../theme-files/heading";
import Constant from "../../../pages/api/helper/constant";
import CreateReview from "./create-review";
import Reviewlist from "./product-reviewlist";
import ProductReviewFilterButtons from "./product-review-filter-buttons";
import ReviewProgressBar from "./review-progress-bar";
import Pagination from "../review/pagination";
import ReviewPagination from "./review-pagination";

function ProductReviews({ myRef, id }) {
  const vapeId = 75248;
  const flavourId = 75247;
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [starDistribution, setstartDistribution] = useState({});
  const [reviewsData, setReviewsData] = useState([]);
  const [searchOpen, setsearchOpen] = useState(false);
  const [createReviewOpen, setcreateReviewOpen] = useState(false);
  const [votesArr, setvotesArr] = useState([]);
  const [starHoverValue, setstarHoverValue] = useState(0);
  const [reviewFormErrors, setreviewFormErrors] = useState({
    score: false,
    title: false,
    review: false,
    name: false,
    email: false,
    vapeProducts: false,
  });
  const [flavorProfile, setFlavorProfile] = useState({
    Fruit: false,
    Dessert: false,
    Menthol: false,
    Tobacco: false,
    Other: false,
  });

  const [vapeProducts, setVapeProducts] = useState({
    BoxModKit: false,
    PodSystems: false,
    Disposables: false,
    Rebuildables: false,
    Other: false,
  });
  const [createReviewLoading, setcreateReviewLoading] = useState(false);
  const [values, setvalues] = useState({});
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState({});
  const [pagination, setPagination] = useState({});
  const [clearAll, setClearAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredReviews, setFilteredReviews] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [hostName, setHostName] = useState("");

  const [filterArr, setfilterArr] = useState([
    {
      id: 1,
      label: "vape",
      defaultbuttonName: "Vape Product",
      buttonName: "Vape Product",
      listItems: [
        { name: "all", selected: false },
        { name: "Box Mod Kit", selected: false },
        { name: "Pod Systems", selected: false },
        { name: "Disposables", selected: false },
        { name: "Rebuildables", selected: false },
      ],
    },
    {
      id: 2,
      label: "rating",
      defaultbuttonName: "Rating",
      buttonName: "Rating",
      listItems: [
        { name: "all", selected: false },
        { name: "5", selected: false },
        { name: "4", selected: false },
        { name: "3", selected: false },
        { name: "2", selected: false },
        { name: "1", selected: false },
      ],
    },
    {
      id: 3,
      label: "flavour",
      defaultbuttonName: "Flavour",
      buttonName: "Flavour",
      listItems: [
        { name: "all", selected: false },
        { name: "Fruit", selected: false },
        { name: "Dessert", selected: false },
        { name: "Menthol", selected: false },
        { name: "Tobacco", selected: false },
      ],
    },
    {
      id: 4,
      label: "images",
      defaultbuttonName: "Images & Videos",
      buttonName: "Images & Videos",
      listItems: [
        { name: "all", selected: false },
        { name: "With Images & Videos", selected: false },
      ],
    },
    {
      id: 5,
      label: "sort",
      defaultbuttonName: "sort",
      buttonName: "sort",
      listItems: [
        { name: "Select", selected: true },
        { name: "Newest", selected: false },
        { name: "Highest Rating", selected: false },
        { name: "Lowest Rating", selected: false },
        { name: "Helpful", selected: false },
      ],
    },
  ]);
  const [selectedDropDown, setselectedDropDown] = useState({ id: 0, status: false });

  const handleResetValues = () => {
    const resetValues = { score: "", title: "", review: "", name: "", email: "" };
    const reserStarHoverValue = 0;
    const resetFlavorProfile = {
      Fruit: false,
      Dessert: false,
      Menthol: false,
      Tobacco: false,
      Other: false,
    };
    const resetVapeProducts = {
      BoxModKit: false,
      PodSystems: false,
      Disposables: false,
      Rebuildables: false,
      Other: false,
    };
    setvalues(resetValues);
    setstarHoverValue(reserStarHoverValue);
    setFlavorProfile(resetFlavorProfile);
    setVapeProducts(resetVapeProducts);
  };

  const handlePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewsData?.slice(indexOfFirstReview, indexOfLastReview);

  // Selected Option Retrieval Function
  const getSelectedOption = (label) => {
    const sortObj = filterArr?.find((obj) => obj.label === label);
    const selectedItem = sortObj.listItems?.find((item) => item.selected);
    return selectedItem;
  };

  const handleGetBodyParams = () => {
    const body = {
      domain_key: id, // Product Id
      sortings: [
        {
          sort_by: "date",
          ascending: false,
        },
      ],
    };

    // SORTING
    if (getSelectedOption("sort")?.name?.toLowerCase() === "highest rating") {
      body.sortings = [
        {
          sort_by: "score",
          ascending: false,
        },
      ];
      setClearAll(true);
    }
    if (getSelectedOption("sort")?.name?.toLowerCase() === "lowest rating") {
      body.sortings = [
        {
          sort_by: "score",
          ascending: true,
        },
      ];
      setClearAll(true);
    }
    if (getSelectedOption("sort")?.name?.toLowerCase() === "helpful") {
      body.sortings = [
        {
          sort_by: "votes_up",
          ascending: false,
        },
      ];
      setClearAll(true);
    }

    // RATING
    if (
      getSelectedOption("rating") &&
      getSelectedOption("rating")?.name?.toLocaleLowerCase() !== "all"
    ) {
      body.scores = [getSelectedOption("rating").name];
      setClearAll(true);
    }

    // IMAGES AND VIDEOS
    if (
      getSelectedOption("images") &&
      getSelectedOption("images")?.name?.toLocaleLowerCase() !== "all"
    ) {
      body.pictured = true;
      setClearAll(true);
    }

    // CUSTOM OPTIONS
    if (
      getSelectedOption("vape") &&
      getSelectedOption("vape")?.name?.toLocaleLowerCase() !== "all"
    ) {
      if (body.crfs) {
        body.crfs = [
          ...body.crfs,
          {
            question_id: vapeId,
            answers: [getSelectedOption("vape").name],
          },
        ];
        setClearAll(true);
      } else {
        body.crfs = [
          {
            question_id: vapeId,
            answers: [getSelectedOption("vape").name],
          },
        ];
        setClearAll(true);
      }
    }

    if (
      getSelectedOption("flavour") &&
      getSelectedOption("flavour")?.name?.toLocaleLowerCase() !== "all"
    ) {
      if (body.crfs) {
        body.crfs = [
          ...body.crfs,
          {
            question_id: flavourId,
            answers: [getSelectedOption("flavour").name],
          },
        ];
        setClearAll(true);
      } else {
        body.crfs = [
          {
            question_id: flavourId,
            answers: [getSelectedOption("flavour").name],
          },
        ];
        setClearAll(true);
      }
    }

    return body;
  };

  // To Post Review with filters
  const handleFilters = () => {
    setloading(true);
    axios
      .post(
        `https://api-cdn.yotpo.com/v1/reviews/${Constant.YotpoSecretKey}/filter.json `,
        handleGetBodyParams()
      )
      .then((res) => {
        if (res.data.status.code === 200) {
          setReviewsData(res.data.response.reviews);
          setPagination(res?.data?.response?.pagination);
          setFilteredReviews(res?.data?.response?.found_filtered_reviews);
          // setTotalReviews(res.data.response.bottomline.total_review);
          // setAverageScore(res.data.response.bottomline.average_score);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setloading(true);
    axios
      .post(
        `https://api-cdn.yotpo.com/v1/reviews/${Constant.YotpoSecretKey}/filter.json?page=${currentPage} `,
        {
          domain_key: id,
          free_text_search: searchText,
          per_page: 8,
        }
      )
      .then((res) => {
        if (res.data.status.code === 200) {
          setReviewsData(res.data.response.reviews);
          setPagination(res?.data?.response?.pagination);
          setClearAll(true);
          // setTotalReviews(res.data.response.bottomline.total_review);
          // setAverageScore(res.data.response.bottomline.average_score);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  // To Get All Reviews
  useEffect(() => {
    if (!searchText && !clearAll) {
      setloading(true);
      axios
        .get(
          `https://api-cdn.yotpo.com/v1/widget/${Constant.YotpoSecretKey}/products/${id}/reviews.json?page=${currentPage}`
        )
        .then((res) => {
          if (res.data.status.code === 200) {
            setReviewsData(res.data.response.reviews);
            setTotalReviews(res.data.response.bottomline.total_review);
            setAverageScore(res.data.response.bottomline.average_score);
            setstartDistribution(res.data.response.bottomline.star_distribution);
            setReviewsPerPage(res.data);
            setPagination(reviewsPerPage?.response?.pagination);
            setloading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else if (searchText?.length) {
      handleSearch();
    }
  }, [id, currentPage, clearAll]);

  useEffect(() => {
    setHostName(window.location.host);
  }, []);

  const socialIcon = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${hostName}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      title: "Share on Facebook",
    },
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${hostName}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      title: "Share on Twitter",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${hostName}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
      title: "Share on LinkedIn",
    },
  ];

  useEffect(() => {
    handleFilters();
  }, [filterArr]);

  // To initiall set the upVotes and DownVotes in a single object with id
  useEffect(() => {
    const res = reviewsData?.map((data) => ({
      upVote: false,
      downVote: false,
      id: data?.id,
    }));
    setvotesArr(res);
  }, [reviewsData]);

  const validateEmail = () => {
    const { email } = values;
    const mail = email?.replace(/ /g, "")?.split(",");
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
      return true;
    }
    return false;
  };

  // Create Review Form Validation
  const handleCreateReviewValidaton = () => {
    const { score, title, review, name, email } = values;
    const isVapeProductsValid = Object.values(vapeProducts).some((value) => value);
    if (score && title && review && name && email && validateEmail() && isVapeProductsValid) {
      return true;
    }

    setreviewFormErrors({
      score: !score,
      title: !title,
      review: !review,
      name: !name,
      email: !!(!email || !validateEmail()),
      vapeProducts: !isVapeProductsValid,
    });

    return false;
  };

  const flavorMapping = {
    Fruit: "Fruit",
    Dessert: "Dessert",
    Menthol: "Menthol",
    Tobacco: "Tobacco",
    Other: "Other",
  };

  const vapeMapping = {
    BoxModKit: "Box Mod Kit",
    PodSystems: "Pod Systems",
    Disposables: "Disposables",
    Rebuildables: "Rebuildables",
    Other: "Other",
  };

  // Create Review Function
  const handleCreateReview = () => {
    if (handleCreateReviewValidaton()) {
      setcreateReviewLoading(true);
      const { score, title, review, email, name } = values;
      const { host } = window.location;
      const { protocol } = window.location;
      const { pathname } = window.location;
      const { href } = window.location;

      // Map the selected flavor profiles
      const selectedFlavors = Object.keys(flavorProfile)
        .filter((key) => flavorProfile[key])
        .map((key) => flavorMapping[key]);
      const flavorCustomField = selectedFlavors.length > 0 ? selectedFlavors.join(",") : "";

      // Map the selected vape products
      const selectedVapeProducts = Object.keys(vapeProducts)
        .filter((key) => vapeProducts[key])
        .map((key) => vapeMapping[key]);
      const vapeCustomField = selectedVapeProducts.length > 0 ? selectedVapeProducts.join(",") : "";

      const data = {
        appkey: Constant.YotpoSecretKey,
        domain: `${protocol}//${host}`,
        sku: id,
        product_title: pathname?.replace("/", ""),
        product_url: href,
        display_name: name,
        email,
        is_incentivized: true,
        review_content: review,
        review_title: title,
        review_score: score,
        custom_fields: {
          "--75247": flavorCustomField,
          "--75248": vapeCustomField,
        },
      };
      axios
        .post("https://api.yotpo.com/v1/widget/reviews", data)
        .then((res) => {
          if (res.data.message === "ok") {
            handleResetValues();
            setResponseMessage("ok");
            setcreateReviewOpen(!createReviewOpen);
            setreviewFormErrors({
              score: false,
              title: false,
              review: false,
              name: false,
              email: false,
              vapeProducts: false,
            });
          } else if (res.data.message === "duplicate_review") {
            setResponseMessage("duplicate_review");
          }
          setcreateReviewLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setcreateReviewLoading(false);
        });
    }
  };

  const handleCloseSuccessMessage = () => {
    setResponseMessage("");
  };

  // Clear all filters
  const clearAllFilters = () => {
    const resetArr = filterArr?.map((obj) => ({
      ...obj,
      buttonName: obj.defaultbuttonName,
      listItems: obj?.listItems?.map((item) => {
        if (obj.label === "sort" && item?.name?.toLowerCase() === "select") {
          return {
            ...item,
            selected: true,
          };
        }
        return {
          ...item,
          selected: false,
        };
      }),
    }));
    setfilterArr(resetArr);
    setClearAll(false);
    setSearchText("");
  };

  return (
    <div className="mt-5">
      <div ref={myRef} className="flex items-center flex-col border-t  border-[#e3e3e3] relative">
        <Heading className="font-bold hidden md:flex text-[20px] my-10">Ratings & Reviews</Heading>
        <div className="flex justify-between items-center md:hidden w-full">
          <Heading className="font-bold block md:hidden text-[18px] my-10">
            Ratings & Reviews
          </Heading>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setcreateReviewOpen(!createReviewOpen);
                handleCloseSuccessMessage();
              }}
              type="button"
              className="text-[#136bea] md:border py-1.5 px-2 text-sm md:text-[#6B6D76] flex justify-self-end content-end items-end self-end place-items-end"
            >
              Write A Review
            </button>
          </div>
        </div>
        <div className={`flex w-full ${starDistribution ? "justify-end" : "justify-between"}`}>
          {!reviewsData?.length ? (
            <div className="hidden md:block">
              <div className="relative h-[1.5rem] my-3 w-[120px] overflow-hidden block mx-auto">
                <div className="flex absolute top-0 left-0 w-[100%] text-skin-base justify-center">
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                </div>
                <div
                  className="flex absolute top-0 left-0 overflow-hidden text-skin-base justify-center  w-[100%]"
                  // style={{ width: `${(parseFloat(averageScore).toFixed(2) / 5) * 100 + 2}%` }}
                >
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                  <i className="inline">
                    <StarOutline className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </i>
                </div>
              </div>
              <Paragraph className="text-[#000] text-[12px] font-normal text-xs ml-[1.5rem] lg:ml-2">
                {totalReviews > 0 ? `${totalReviews} ` : "0 "}
                Reviews
              </Paragraph>
            </div>
          ) : (
            ""
          )}
          <div className="flex w-full sm:w-8/12 md:w-10/12 lg:w-8/12 justify-center sm:justify-between items-center">
            <ReviewProgressBar
              totalReviews={totalReviews}
              averageScore={averageScore}
              starDistribution={starDistribution}
              filterArr={filterArr}
              setfilterArr={setfilterArr}
            />
            <div className="absolute top-10 right-0 md:static hidden md:flex md:items-end ">
              <button
                onClick={() => {
                  setcreateReviewOpen(!createReviewOpen);
                  handleCloseSuccessMessage();
                }}
                type="button"
                className="text-[#136bea] flex justify-between items-center md:border py-1.5 px-2 text-sm font-medium md:text-[#6B6D76]"
              >
                <PencilIcon className="w-5 h-5 mr-2 text-[#2f84ed]" />
                Write A Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {createReviewOpen ? (
        <CreateReview
          reviewFormErrors={reviewFormErrors}
          values={values}
          setvalues={setvalues}
          handleCreateReview={handleCreateReview}
          createReviewLoading={createReviewLoading}
          flavorProfile={flavorProfile}
          setFlavorProfile={setFlavorProfile}
          vapeProducts={vapeProducts}
          setVapeProducts={setVapeProducts}
          starHoverValue={starHoverValue}
          setstarHoverValue={setstarHoverValue}
          responseMessage={responseMessage}
          setResponseMessage={setResponseMessage}
        />
      ) : null}

      {responseMessage === "ok" ? (
        <div className="relative bg-[#fff] text-center p-[40px] border border-solid border-[#e3e3e3] font-open-sans mt-5">
          <div
            className="inline-block py-[6px] px-[11px] absolute right-1 top-3"
            onClick={handleCloseSuccessMessage}
            onKeyUp={handleCloseSuccessMessage}
            role="button"
            tabIndex={0}
          >
            <span>
              <XIcon className="h-6 w-6 text-[#6A6C77]" />
            </span>
          </div>
          <div className="mb-5 text-[21px] leading-[18px]">
            <span className="mb-5 text-[26px] flex justify-center items-center text-[#2f84ed] antialiased">
              <HeartIcon className="h-8 w-8" />
            </span>
            <span className="uppercase text-[#2f84ed] font-bold antialiased">
              Thank you for posting a review!
            </span>
          </div>
          <div className="mb-5 text-[#737373]">
            <span className="text-[#6A6C77] text-sm leading-[17px] antialiased">
              We value your input. Share your review so everyone else can enjoy it too.
            </span>
          </div>
          <div className="flex flex-wrap justify-center space-x-1 items-center font-open-sans antialiased">
            {socialIcon?.map((item) => (
              <div
                key={item.name}
                title={item.title}
                className="py-[6px] mb-1 px-[11px] bg-[#6A6C77]"
              >
                <Link href={item.href} passHref>
                  <a target="_blank" rel="noopener noreferrer" className="text-gray-600">
                    <span className="flex justify-center items-center">
                      <item.icon className="h-[19px] w-[19px] text-[#fff]" aria-hidden="true" />{" "}
                      <span className="ml-1 uppercase text-sm text-[#fff]">Share</span>
                    </span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {totalReviews ? (
        <div>
          <div
            className={`${
              loading ? "opacity-40 pointer-events-none" : null
            } flex justify-start md:justify-center items-center mt-[45px] py-4 ratings-overflow`}
          >
            <div className="flex items-center mr-2">
              {!searchOpen ? (
                <button
                  onClick={() => setsearchOpen(true)}
                  type="button"
                  className="w-[36px] min-h-[36px] inline-block bg-[#eee] text-[#6B6D76] rounded-full p-1.5"
                >
                  <SearchIcon />
                </button>
              ) : null}

              {searchOpen ? (
                <div className="flex items-center">
                  <form onSubmit={(e) => handleSearch(e)}>
                    <input
                      type="search"
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      placeholder="Search Reviews"
                      className="border-[1px] border-[#575757] border-solid rounded-full h-10 w-60 sm:w-72 pl-4 pr-3 focus:border-[0px] focus:border-[#575757]"
                    />
                  </form>

                  <button
                    className="ml-2 text-sm text-[#136bea]"
                    onClick={() => setsearchOpen(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>

            {!searchOpen
              ? filterArr?.map((filter) => (
                  <ProductReviewFilterButtons
                    key={filter.id}
                    buttonName={filter.buttonName}
                    defaultButtonName={filter.defaultbuttonName}
                    listItems={filter.listItems}
                    id={filter.id}
                    setselectedDropDown={setselectedDropDown}
                    selectedDropDown={selectedDropDown}
                    setfilterArr={setfilterArr}
                    filterArr={filterArr}
                    label={filter.label}
                  />
                ))
              : null}
          </div>
          {clearAll && filteredReviews ? (
            <div className="ml-1 md:ml-[80px] lg:ml-[350px]">
              <button
                type="button"
                className="text-center w-[80px]  text-[#6B6D76] text-[12px] py-[6px] px-[11px] rounded-[3px] mt-1 capitalize border border-solid bg-transparent border-[#e3e3e3] font-medium hover:border-[#6B6D76]"
                onClick={() => clearAllFilters()}
              >
                Clear All
              </button>
            </div>
          ) : (
            ""
          )}

          <div className={`${loading ? "opacity-40 pointer-events-none" : null} reviews my-5`}>
            {reviewsData?.length ? (
              reviewsData.map((data) => (
                <Reviewlist
                  data={data}
                  votesArr={votesArr}
                  setvotesArr={setvotesArr}
                  key={data?.id}
                />
              ))
            ) : (
              <div className="w-[200px] mx-auto">
                <Paragraph className="  text-center text-[#6a6c77] text-[14px]">
                  Sorry, no reviews match your criteria. Clear or modify your filters and try again.
                </Paragraph>

                <button
                  type="button"
                  className="text-center w-full text-[14px] mt-1 capitalize font-semibold hover:opacity-70 pointer"
                  onClick={() => clearAllFilters()}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {reviewsData.length ? (
            <ReviewPagination
              pageSize={Math.ceil(pagination?.total / pagination?.per_page)}
              currentPage={currentPage}
              setPageIndex={setCurrentPage}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="mt-10">
          <div className="relative h-[1.5rem] mb-5 w-[120px] overflow-hidden block mx-auto">
            <div className="flex absolute top-0 left-0 w-[100%] text-[#599dd2]">
              <i className="inline">
                <StarOutline />
              </i>
              <i className="inline">
                <StarOutline />
              </i>
              <i className="inline">
                <StarOutline />
              </i>
              <i className="inline">
                <StarOutline />
              </i>
              <i className="inline">
                <StarOutline />
              </i>
            </div>
            <div className="flex absolute top-0 left-0 overflow-hidden text-[#599dd2] w-[100%]">
              <i className="inline">
                <Star />
              </i>
              <i className="inline">
                <Star />
              </i>
              <i className="inline">
                <Star />
              </i>
              <i className="inline">
                <Star />
              </i>
              <i className="inline">
                <Star />
              </i>
            </div>
          </div>

          <div className="font-sans flex items-center justify-center">
            <button
              type="button"
              onClick={() => setcreateReviewOpen(!createReviewOpen)}
              className="py-[10px] px-[15px] uppercase text-center text-[12px] bg-[#6A6C77] text-[#fff] mb-[10px]"
            >
              Be the first to write a review
            </button>
          </div>
        </div>
      )}
      {/* <div className="flex items-center justify-start my-[20px]"></div>
      <button onClick={() => handlePage()}>Next Page</button> */}
    </div>
  );
}

export default ProductReviews;

ProductReviews.propTypes = {
  id: PropTypes.number.isRequired,
};

/* {!searchOpen ? (
          <div className="flex justify-start md:justify-center items-center">
            <div className="ml-2">
              <select
                name=""
                id=""
                className="px-4 text-[13px] text-[#000] w-auto rounded-full focus:border focus:border-[#000] bg-[#eee] focus:bg-[#000] focus:text-[#fff] py-2 pl-2"
              >
                <option value="">sort</option>
                <option value="">Newest</option>
                <option value="">Highest Rating</option>
                <option value="">Lowest Rating</option>
                <option value="">Most Helpful</option>
              </select>
            </div>
            <div className="ml-2">
              <select
                name=""
                id=""
                className="px-4 text-[13px] text-[#000] w-auto rounded-full focus:border focus:border-[#000] bg-[#eee] focus:bg-[#000] focus:text-[#fff] py-2 pl-2"
              >
                <option value="">All</option>
                <option value="">Box Mod kit</option>
                <option value="">Pod Systems</option>
                <option value="">Disposables</option>
                <option value="">Rebuildables</option>
              </select>
            </div>
            <div className="ml-2">
              <select
                name=""
                id=""
                className="px-4 text-[13px] text-[#000] w-auto rounded-full focus:border focus:border-[#000] bg-[#eee] focus:bg-[#000] focus:text-[#fff] py-2 pl-2"
              >
                <option value="">All</option>
                <option value="">Fruit</option>
                <option value="">Dessert</option>
                <option value="">Menthol</option>
                <option value="">Tobacco</option>
              </select>
            </div>
            <div className="ml-2">
              <select
                name=""
                id=""
                className="px-4 text-[13px] text-[#000] w-auto rounded-full focus:border focus:border-[#000] bg-[#eee] focus:bg-[#000] focus:text-[#fff] py-2 pl-2"
              >
                <option value="">All</option>
                <option value="">With Images & videos</option>
              </select>
            </div>
          </div>
        ) : null} */
