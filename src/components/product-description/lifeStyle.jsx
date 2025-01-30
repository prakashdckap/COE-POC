import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import { Autoplay, Navigation, Pagination } from "swiper";
import Link from "next/link";
import Constant from "../../../pages/api/helper/constant";
import ImageTag from "../../theme-files/image";
import InstaPopup from "../home/instaComponents/instaPopup";
import SubHeading from "../../theme-files/sub-heading";
import Paragraph from "../../theme-files/paragraph";
import Heading from "../../theme-files/heading";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LifeStyle({ id }) {
  const [loading, setloading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesAllList, setImagesAllList] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [detailsForPopup, setDetailsForPopup] = useState({});

  // To Post Review with filters
  useEffect(() => {
    const body = {
      domain_key: id, // Product Id
      pictured: true,
      sortings: [
        {
          sort_by: "date",
          ascending: false,
        },
      ],
    };

    setloading(true);
    axios
      .post(`https://api-cdn.yotpo.com/v1/reviews/${Constant.YotpoSecretKey}/filter.json `, body)
      .then((res) => {
        if (res.data.status.code === 200) {
          setProduct(res.data.response?.products || []);
          setImages(res.data.response?.reviews || []);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [id]);

  // to convert from html string to ascii
  const htmlToAscii = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent;
  };

  // display shop now details
  const shopNowContent = (data) => {
    if (product?.length)
      return (
        <div className="flex pb-10">
          <div
            className="flex items-center justify-center h-[120px] w-[120px] md:h-[150px] md:w-[150px] text-sm font-normal shadow"
            style={{ borderWidth: 1 }}
          >
            <img src={product[0].image_url} height={120} width={120} alt={product[0].name} />
          </div>
          <div className="ml-2 w-[185px] pl-2 py-2">
            <div className="flex items-center">
              <Heading className="text-[22px] font-open-sans font-bold pr-2">{data?.score}</Heading>{" "}
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    data?.score > rating ? "text-[#FEC600]" : "text-gray-200",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <Heading className="text-sm shop-now-title py-2">{product[0].name}</Heading>
            <Link href={`${product[0].product_link}?button=shop_now`}>
              <a target="_blank">
                <button type="button" className="shop-now-button bg-[#2f84ed] pt-2">
                  Shop Now
                </button>
              </a>
            </Link>
          </div>
        </div>
      );
  };

  // display main details
  const mainContent = (data) => (
    <div className="flex">
      <div className="relative flex items-center justify-center h-[45px] w-[45px] rounded-full bg-black text-skin-inverted text-sm font-normal">
        {data?.user.display_name[0]}
        {data?.verified_buyer ? (
          <CheckIcon className="absolute h-[15px] border border-white rounded-full bottom-0 right-0 bg-[#1dc187]" />
        ) : (
          ""
        )}
      </div>
      <div className="ml-2">
        <Heading className="text-sm font-bold font-open-sans">{data?.user.display_name}</Heading>
        <div className="flex items-center ">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  data?.score > rating ? "text-skin-base" : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // display comment details
  const subContent = (data) => {
    return (
      <>
        <SubHeading className="text-sm font-semibold md:font-bold mt-3 font-sans mb-1 font-open-sans">
          {htmlToAscii(data?.title)}
        </SubHeading>
        <Paragraph className="text-[14px] font-medium text-[#000] md:text-[13px] font-sans md:font-normal md:text-[#6B6D75] font-open-sans">
          {htmlToAscii(data?.content)}
        </Paragraph>
      </>
    );
  };

  // return image data for insta pop-up
  const getImageData = (item) => {
    const imageObj = {
      up: 0,
      down: 0,
      media_type: "image",
      ...item,
      post: {
        content: (
          <>
            {mainContent(item)}
            {subContent(item)}
          </>
        ),
        shopNow: shopNowContent(item),
        created_time: item.created_at,
        votes_up: item.votes_up,
        votes_down: item.votes_down,
      },
    };
    imageObj.id = item.id;
    imageObj.medium_image_url = item?.original_url.replace("https:", "");
    if (imageObj) return imageObj;
  };

  useEffect(() => {
    // convert multi dimentional array of images into 1d array
    const allImage = images.map((data) => {
      return data?.images_data?.map((img) => {
        const obj = getImageData({ ...data, ...img });
        return obj;
      });
    });
    const allImagesList = [...[].concat(...allImage)];
    setImagesAllList(allImagesList || []);
  }, [images]);

  const openInstaImage = (item) => {
    setDetailsForPopup(getImageData(item));
    setOpen(true);
  };

  const PopupRightArrowClick = () => {
    const instaArray = [...imagesAllList];
    const currentIndex = instaArray.findIndex((e) => e.id === detailsForPopup?.id);
    if (currentIndex >= 0) {
      if (instaArray[currentIndex + 1]) setDetailsForPopup(instaArray[currentIndex + 1]);
      else setDetailsForPopup(instaArray[0]);
    }
  };

  const PopupLeftArrowClick = () => {
    const instaArray = [...imagesAllList];
    const currentIndex = instaArray.findIndex((e) => e.id === detailsForPopup?.id);
    if (currentIndex > 0) {
      if (instaArray[currentIndex - 1]) setDetailsForPopup(instaArray[currentIndex - 1]);
      else setDetailsForPopup(instaArray[instaArray.length - 1]);
    } else setDetailsForPopup(instaArray[instaArray.length - 1]);
  };

  const updateDetails = (details = detailsForPopup) => {
    if (detailsForPopup) {
      setDetailsForPopup(details);
    }
  };

  if (!loading && imagesAllList.length > 3)
    return (
      <div id="lifestyle-images">
        <div className="flex justify-center title">
          <h1 className="text-2xl font-medium tex=[Open Sans]">Lifestyle Images</h1>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-0 md:my-2 home-swiper lg:pb-16 md:pb-8">
            <Swiper
              spaceBetween={10}
              loop
              autoplay={false}
              speed={500}
              slidesPerView={7}
              slidesPerGroup={1}
              modules={[Autoplay, Navigation, Pagination]}
              navigation
              breakpoints={{
                320: {
                  slidesPerView: 3,
                },
                600: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 6,
                },
                1100: {
                  slidesPerView: 6.5,
                },
                1200: {
                  slidesPerView: 7,
                },
                1440: {
                  slidesPerView: 7.5,
                },
              }}
            >
              {imagesAllList?.map((data) => {
                return (
                  <>
                    {data?.id ? (
                      <SwiperSlide key={data.id}>
                        <div className="relative overflow-hidden object-contain w-[150px] h-[150px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] 2xl:w-[190px] 2xl:h-[190px] border border-solid border-[#CFD7E3] rounded-[3px] mr-[11px] mb-[11px] cursor-pointer">
                          <ImageTag
                            src={data?.thumb_url}
                            layout="fill"
                            onClick={() => openInstaImage(data)}
                          />
                        </div>
                      </SwiperSlide>
                    ) : null}
                  </>
                );
              })}
            </Swiper>
          </div>
        </div>
        <InstaPopup
          open={open}
          setOpen={setOpen}
          PopupRightArrowClick={PopupRightArrowClick}
          PopupLeftArrowClick={PopupLeftArrowClick}
          detailsForPopup={detailsForPopup}
          updateDetails={updateDetails}
          type="review"
          displayButton={imagesAllList?.length}
        />
      </div>
    );
}

LifeStyle.defaultProps = {
  id: "",
};

LifeStyle.propTypes = {
  id: PropTypes.string,
};

export default LifeStyle;
