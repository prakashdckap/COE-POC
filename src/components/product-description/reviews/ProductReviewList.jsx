import { useState } from "react";
import { StarIcon, CheckIcon } from "@heroicons/react/solid";
import { VideoCamera } from "heroicons-react";
import PropTypes from "prop-types";

import Heading from "../../../theme-files/heading";
import Paragraph from "../../../theme-files/paragraph";
import SubHeading from "../../../theme-files/sub-heading";
import ImageTag from "../../../theme-files/image";
import InstaPopup from "../../home/instaComponents/instaPopup";
import { easeOfUse } from "./ReviewOptions";
import VoteUpdate from "./ReviewVotes";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

export default function ReviewList({ data, votesArr, setvotesArr }) {
  const [open, setOpen] = useState(false);
  const [detailsForPopup, setDetailsForPopup] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [playVideo, setPlayVideo] = useState(false);

  // to convert from html string to ascii
  const htmlToAscii = (htmlString, isReadMore) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    if (isReadMore) {
      return readMore ? doc.body.innerText : doc.body.innerText.slice(0, 300);
    }
    return doc.body.textContent;
  };

  // display name, rating and date
  const mainContent = (
    <div className="flex">
      <div className="relative flex items-center justify-center h-[45px] w-[45px] rounded-full bg-black text-skin-inverted text-sm font-normal">
        {data.user.display_name[0]}
        {data.verified_buyer ? (
          <CheckIcon className="absolute h-[15px] border border-white rounded-full bottom-0 right-0 bg-[#1dc187]" />
        ) : (
          ""
        )}
      </div>
      <div className="ml-2">
        <Heading className="text-sm font-bold">{data.user.display_name}</Heading>
        <div className="flex items-center ">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  data.score > rating ? "text-skin-base" : "text-gray-200",
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
  const subContent = (isReadMore) => {
    return (
      <>
        <SubHeading
          className={
            isReadMore
              ? "text-[15px] font-bold mt-3 font-open-sans mb-1"
              : "text-sm font-semibold md:font-bold mt-3 font-sans mb-1 font-open-sans"
          }
        >
          {htmlToAscii(data.title)}
        </SubHeading>
        <Paragraph
          className={
            isReadMore
              ? "text-[13px] font-open-sans font-normal text-[#6B6D75]"
              : "text-[14px] font-medium text-[#000] md:text-[13px] font-sans md:font-normal md:text-[#6B6D75] font-open-sans"
          }
        >
          {htmlToAscii(data.content, isReadMore)}
          {isReadMore && htmlToAscii(data.content, isReadMore).length >= 300 ? (
            <span style={{ color: "#2f84ed" }} onClick={() => setReadMore(!readMore)}>
              {readMore ? " Read Less" : " ...Read More"}
            </span>
          ) : (
            ""
          )}
        </Paragraph>
      </>
    );
  };

  const obj = {
    media_type: "image",
    post: {
      content: (
        <>
          {mainContent}
          {subContent(false)}
        </>
      ),
      created_time: data.created_at,
      votes_up: data.votes_up,
      votes_down: data.votes_down,
    },
  };

  // return image data for insta pop-up
  const getImageData = (item) => {
    const imageObj = { ...obj };
    imageObj.id = item.id;
    imageObj.medium_image_url = item?.original_url.replace("https:", "");
    return imageObj;
  };

  // return video data for insta pop-up
  const getVideoData = (item) => {
    const videoObj = { ...obj };
    videoObj.id = item.id;
    videoObj.media_type = "video";
    videoObj.medium_image_url = item?.thumbnail_url.replace("https:", "");
    videoObj.standard_resolution_url =
      "//cfvod.kaltura.com/pd/p/2519461/sp/251946100/serveFlavor/entryId/1_gfj0teum/v/1/ev/4/flavorId/1_yxxqlh8r";
    return videoObj;
  };

  const openInstaImage = (item) => {
    setDetailsForPopup(getImageData(item));
    setOpen(true);
  };

  const openInstaVideo = (item) => {
    setDetailsForPopup(getVideoData(item));
    setOpen(true);
  };

  // return image & video array for insta pop-up corosel
  const getInstaGallery = () => {
    let arr = [];
    let videoArr = [];
    if (data?.videos_data?.length) {
      videoArr = data?.videos_data.map((e) => getVideoData(e));
    }
    if (data?.images_data?.length) {
      arr = data?.images_data.map((e) => getImageData(e));
    }
    return [...arr, ...videoArr];
  };

  const PopupRightArrowClick = () => {
    const instaArray = getInstaGallery();
    const currentIndex = instaArray.findIndex((e) => e.id === detailsForPopup?.id);
    if (currentIndex >= 0) {
      if (instaArray[currentIndex + 1]) setDetailsForPopup(instaArray[currentIndex + 1]);
      else setDetailsForPopup(instaArray[0]);
    }
  };

  const PopupLeftArrowClick = () => {
    const instaArray = getInstaGallery();
    const currentIndex = instaArray.findIndex((e) => e.id === detailsForPopup?.id);
    if (currentIndex > 0) {
      if (instaArray[currentIndex - 1]) setDetailsForPopup(instaArray[currentIndex - 1]);
      else setDetailsForPopup(instaArray[instaArray.length - 1]);
    } else setDetailsForPopup(instaArray[instaArray.length - 1]);
  };

  const getEasyOfUseTitle = (value) => {
    if (value) {
      return easeOfUse.find((easy) => easy.value === value)?.name;
    }
  };

  return (
    <div className="review">
      <div className="py-[25px] border-b border-[#e3e3e3] font-sans reviews-text">
        <div className="flex justify-between items-baseline">
          <div>{mainContent}</div>
          <Paragraph className="font-normal text-sm text-[#6A6C77]">{`${
            new Date(data.created_at).getMonth() + 1
          }/${new Date(data.created_at).getDate()}/${new Date(
            data.created_at
          ).getFullYear()}`}</Paragraph>
        </div>
        <div className="ml-[10px] md:ml-[50px] font-open-sans">
          {data?.custom_fields ? (
            <div className="mt-[15px]">
              {data?.custom_fields?.["--106825"]?.title && (
                <Paragraph className="text-[#6B6D76] mb-[-5px]">
                  <span className="italic font-semibold text-[13px]">
                    {data?.custom_fields?.["--106825"]?.title}:
                  </span>
                  <span className="text-[13px] ml-[7px]">
                    {data?.custom_fields?.["--106825"]?.value}
                  </span>
                </Paragraph>
              )}
              {data?.custom_fields?.["--106826"]?.title && (
                <Paragraph className="text-[#6B6D76]">
                  <span className="italic font-semibold text-[13px]">
                    {data?.custom_fields?.["--106826"]?.title}:
                  </span>
                  <span className="text-[13px] ml-[7px]">
                    {getEasyOfUseTitle(data?.custom_fields?.["--106826"]?.value)}
                  </span>
                </Paragraph>
              )}
            </div>
          ) : (
            ""
          )}

          {subContent(true)}

          <div className="mt-[14px] flex">
            {data?.videos_data?.map((item) => (
              <div
                key={item?.id}
                className="relative overflow-hidden object-contain w-[130px] h-[130px] border border-solid border-[#cfd7e3] rounded-[3px] mr-[11px] mb-[11px] cursor-pointer"
              >
                <div className="h-full">
                  <div className="w-full h-full absolute">
                    <div className="bg-black h-full mb-8 flex justify-end items-end flex-col-reverse">
                      <VideoCamera className="w-8 h-6 text-white" />
                    </div>
                  </div>
                  <div
                    className="parentDiv"
                    onMouseEnter={() => setPlayVideo(true)}
                    onMouseLeave={() => setPlayVideo(false)}
                  >
                    {!playVideo ? (
                      <ImageTag
                        src={item?.thumbnail_url}
                        layout="fill"
                        onClick={() => openInstaVideo(item, "video")}
                        className="videoInsert object-cover opacity-70"
                      />
                    ) : (
                      <div className="w-[130px] h-[130px] md:w-[100%] bg-black">
                        <video
                          src={`https:${getVideoData(item)?.standard_resolution_url}`}
                          className="videoOpen"
                          controls={false}
                          autoPlay
                          muted
                          loop
                          onClick={() => openInstaVideo(item, "video")}
                        >
                          <track kind="captions" />
                          Video is currently unavailable
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {data?.images_data?.map((item) => (
              <div
                key={item?.id}
                className="relative overflow-hidden object-contain w-[130px] h-[130px] border border-solid border-[#cfd7e3] rounded-[3px] mr-[11px] mb-[11px] cursor-pointer"
              >
                <ImageTag
                  src={item?.thumb_url}
                  layout="fill"
                  onClick={() => openInstaImage(item)}
                />
              </div>
            ))}
          </div>

          <InstaPopup
            open={open}
            setOpen={setOpen}
            PopupRightArrowClick={PopupRightArrowClick}
            PopupLeftArrowClick={PopupLeftArrowClick}
            detailsForPopup={detailsForPopup}
            type="review"
            displayButton={data?.images_data?.length || data?.videos_data?.length}
            updateDetails={setDetailsForPopup}
          />
        </div>
        <VoteUpdate
          votesArr={votesArr}
          data={data}
          setvotesArr={setvotesArr}
          votes={votes}
          setVotes={setVotes}
        />
      </div>
    </div>
  );
}

ReviewList.propTypes = {
  data: PropTypes.shape().isRequired,
  votesArr: PropTypes.arrayOf().isRequired,
  setvotesArr: PropTypes.func.isRequired,
};
