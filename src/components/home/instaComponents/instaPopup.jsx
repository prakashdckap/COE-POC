import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { ThumbUp, ThumbDown } from "heroicons-react";
import ImageTag from "../../../theme-files/image";
import ModalInstagram from "../../../theme-files/modal/instagram";
import Paragraph from "../../../theme-files/paragraph";

function InstaPopup({
  open,
  setOpen,
  PopupRightArrowClick,
  PopupLeftArrowClick,
  detailsForPopup,
  updateDetails,
  type,
  displayButton,
}) {
  const [readMore, setReadMore] = useState(false);
  const [startX, setStartX] = useState(null); // for slide functionality
  const [endX, setEndX] = useState(null);
  const videoRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [popupData, setPopData] = useState({ ...detailsForPopup });

  const handleVideoEnded = () => {
    setShowImage(true);
  };

  const handleVideoStart = () => {
    setShowImage(false);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
  };

  const getFormatedDate = (date) => {
    if (date) {
      const dateConst = new Date(date);
      const day = dateConst.getDate();
      const formattedDay = day < 10 ? `0${day}` : day;
      const formatedDate = `${dateConst.getMonth() + 1}/${formattedDay}/${dateConst
        .getFullYear()
        .toLocaleString()
        ?.slice(3, 5)}`;
      return formatedDate;
    }
    return "";
  };

  useEffect(() => {
    setReadMore(false);
  }, [open, detailsForPopup]);

  useEffect(() => {
    setPopData({ ...detailsForPopup });
  }, [detailsForPopup]);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  // to update vote value in array
  const updatedVote = (isUpvote) => {
    // if (isUpvote) {
    //   updateDetails({ ...detailsForPopup, up: detailsForPopup?.up ? 0 : 1, down: 0 });
    // } else {
    //   updateDetails({ ...detailsForPopup, up: 0, down: detailsForPopup?.down ? 0 : 1 });
    // }
    return isUpvote;
  };

  const voteUp = (id) => {
    updateDetails({ ...detailsForPopup, up: detailsForPopup?.up ? 0 : 1, down: 0 });
    axios
      .post(`https://api.yotpo.com/instagrams/${id}/vote/up`)
      .then((res) => {
        if (res?.data?.status?.code === 200) {
          updatedVote(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const voteDown = (id) => {
    updateDetails({ ...detailsForPopup, up: 0, down: detailsForPopup?.down ? 0 : 1 });
    axios
      .post(`https://api.yotpo.com/instagrams/${id}/vote/down`)
      .then((res) => {
        if (res?.data?.status?.code === 200) {
          updatedVote(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // event handlers for swipe functionality starts

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (startX !== null) {
      const deltaX = e.clientX - startX;
      if (deltaX > 10) {
        // Right swipe detected
        PopupLeftArrowClick(e);
      } else if (deltaX < -10) {
        // Left swipe detected
        PopupRightArrowClick(e);
      }
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX !== null) {
      setEndX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (startX !== null && endX !== null) {
      const deltaX = endX + 50 - startX;
      if (deltaX > 5) {
        // Right swipe
        PopupLeftArrowClick(e);
      } else if (deltaX < -5) {
        // Left swipe
        PopupRightArrowClick(e);
      }
      setStartX(null);
      setEndX(null);
    }
  };
  // event handlers for swipe functionality ends

  if (open)
    return (
      <ModalInstagram
        PopupRightArrowClick={PopupRightArrowClick}
        PopupLeftArrowClick={PopupLeftArrowClick}
        open={open}
        setOpen={setOpen}
        displayButton={displayButton}
      >
        <div className="grid lg:grid-cols-5 home-instagram">
          <div className="col-span-3">
            {(detailsForPopup?.medium_image_url || detailsForPopup?.standard_resolution_url) &&
            detailsForPopup?.media_type === "image" ? (
              <ImageTag
                src={`https:${detailsForPopup?.medium_image_url}`}
                height={1500}
                width={1500}
                className="popup-image object-contain"
                onDragEnd={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            ) : (
              <div className="w-[100%] h-[375px] md:h-[650px] md:w-[100%] bg-black">
                <video
                  src={`https:${detailsForPopup?.standard_resolution_url}`}
                  className="videoOpen"
                  controls
                  autoPlay
                  muted={false}
                  ref={videoRef}
                  onEnded={handleVideoEnded}
                  onPlay={handleVideoStart}
                >
                  <track kind="captions" />
                  Video is currently unavailable
                </video>
                {showImage && <ReplayIcon className="replay-icon" handleReplay={handleReplay} />}
              </div>
            )}
          </div>
          <div className="col-span-3 lg:col-span-2 py-[27px] px-[30px]">
            {type === "review" ? (
              <>
                {detailsForPopup?.post?.shopNow}
                <span className="text-[13px] font-sans ml-3 ig-date">
                  {getFormatedDate(detailsForPopup?.post?.created_time)}
                </span>
                {detailsForPopup?.post?.content}
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="leading-none h-10 w-10 bg-black rounded-full text-white font-bold hover:text-gray-500 text-[13px]"
                >
                  E
                </button>
                <span className="text-[14px] md:text-[13px] font-sans font-bold ml-3">
                  elementvape
                </span>
                <span className="text-[13px] font-sans ml-3 ig-date">
                  {getFormatedDate(detailsForPopup?.post?.created_time)}
                </span>
                <Paragraph className="text-[14px] md:text-[13px] mt-5 whitespace-pre-wrap">
                  {readMore
                    ? detailsForPopup?.post?.content
                    : detailsForPopup?.post?.content?.split("\n")?.slice(0, 2)?.join("\n")}
                </Paragraph>
              </>
            )}
            <br />
            {/* below code is to like or dis-like button UI */}
            <span className="like-dislike">
              {!type && detailsForPopup?.post?.content?.split("\n")?.length > 2 && (
                <button
                  type="button"
                  className="text-black font-bold text-[11px]"
                  onClick={toggleReadMore}
                  style={{ paddingTop: 8, color: "#6A6C77" }}
                >
                  READ {readMore ? "LESS" : "MORE..."}
                </button>
              )}
              <br />
              <span className="text-[18px] font-sans ig-count">
                {popupData?.post?.votes_up || 0 + detailsForPopup?.up || 0}
              </span>
              <button
                type="button"
                className="text-black font-bold text-[11px]"
                onClick={() => voteUp(detailsForPopup?.image_id)}
                style={{ paddingTop: 8, color: "#838489", paddingRight: 12 }}
              >
                <ThumbUp />
              </button>
              <span className="text-[18px] font-sans ig-count">
                {popupData?.post?.votes_down || 0 + detailsForPopup?.down || 0}
              </span>
              <button
                type="button"
                className="text-black font-bold text-[11px]"
                onClick={() => voteDown(detailsForPopup?.image_id)}
                style={{ paddingTop: 8, color: "#838489" }}
              >
                <ThumbDown />
              </button>
            </span>
          </div>
        </div>
      </ModalInstagram>
    );
}

function ReplayIcon({ handleReplay }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      x="0"
      y="0"
      viewBox="0 0 256 256"
      className="text-white replay-btn"
      onClick={handleReplay}
    >
      <g
        strokeMiterlimit="10"
        fontFamily="none"
        fontSize="none"
        fontWeight="none"
        textAnchor="none"
      >
        <path
          fill="#fff"
          d="M25 2a2 2 0 100 4c10.517 0 19 8.483 19 19s-8.483 19-19 19A18.97 18.97 0 016 25a18.926 18.926 0 016-13.855V15a2 2 0 104 0V4H5a2 2 0 100 4h4.525C4.907 12.21 2 18.272 2 25c0 12.679 10.321 23 23 23s23-10.321 23-23S37.679 2 25 2z"
          transform="matrix(.75 0 0 .75 32 32) rotate(90 142.592 116.48) scale(5.12)"
        />
        <path
          fill="#fdfdfd"
          d="M54.405 264.245l-4.75-8.84h-5.12v8.84h-2.9v-21.84h7.23c2.46 0 4.353.56 5.68 1.68 1.32 1.12 1.98 2.75 1.98 4.89 0 1.36-.367 2.543-1.1 3.55-.733 1.013-1.757 1.77-3.07 2.27l5.14 9.27v.18zm-9.87-19.47v8.28h4.42c1.427 0 2.563-.37 3.41-1.11.847-.74 1.27-1.73 1.27-2.97 0-1.347-.403-2.383-1.21-3.11-.8-.713-1.963-1.077-3.49-1.09zm22.33 19.77c-2.2 0-3.99-.723-5.37-2.17s-2.07-3.38-2.07-5.8v-.5c0-1.613.307-3.053.92-4.32.613-1.26 1.473-2.25 2.58-2.97a6.518 6.518 0 013.6-1.07c2.107 0 3.747.693 4.92 2.08 1.167 1.393 1.75 3.383 1.75 5.97v1.16h-10.99c.033 1.6.5 2.893 1.4 3.88.893.98 2.03 1.47 3.41 1.47.98 0 1.81-.2 2.49-.6.68-.4 1.273-.93 1.78-1.59l1.7 1.32c-1.36 2.093-3.4 3.14-6.12 3.14zm-.34-14.55c-1.127 0-2.067.407-2.82 1.22-.76.813-1.233 1.957-1.42 3.43h8.13v-.21c-.08-1.407-.46-2.5-1.14-3.28-.68-.773-1.597-1.16-2.75-1.16zm23.59 6.06v.26c0 2.467-.567 4.453-1.7 5.96-1.127 1.513-2.657 2.27-4.59 2.27-1.967 0-3.517-.627-4.65-1.88v7.82h-2.77v-22.47h2.53l.14 1.8c1.133-1.4 2.703-2.1 4.71-2.1 1.947 0 3.49.733 4.63 2.2 1.133 1.473 1.7 3.52 1.7 6.14zm-2.78-.06c0-1.827-.39-3.273-1.17-4.34-.78-1.053-1.85-1.58-3.21-1.58-1.68 0-2.94.743-3.78 2.23v7.76c.833 1.473 2.107 2.21 3.82 2.21 1.327 0 2.383-.527 3.17-1.58.78-1.053 1.17-2.62 1.17-4.7zm9.32-14.79v23.04h-2.77v-23.04zm17.37 23.04h-2.91c-.16-.32-.29-.89-.39-1.71-1.293 1.34-2.833 2.01-4.62 2.01-1.6 0-2.913-.453-3.94-1.36-1.027-.907-1.54-2.053-1.54-3.44 0-1.693.643-3.007 1.93-3.94 1.287-.933 3.093-1.4 5.42-1.4h2.7v-1.28c0-.967-.29-1.737-.87-2.31-.58-.58-1.433-.87-2.56-.87-.993 0-1.823.25-2.49.75-.673.5-1.01 1.107-1.01 1.82h-2.79c0-.813.29-1.597.87-2.35.573-.753 1.353-1.35 2.34-1.79.98-.44 2.06-.66 3.24-.66 1.873 0 3.34.467 4.4 1.4 1.06.933 1.61 2.22 1.65 3.86v7.47c0 1.493.19 2.68.57 3.56zm-7.52-2.11c.873 0 1.7-.227 2.48-.68.78-.453 1.343-1.04 1.69-1.76v-3.33h-2.17c-3.4 0-5.1.997-5.1 2.99 0 .867.29 1.547.87 2.04.58.493 1.323.74 2.23.74zm12.34-14.12l4.05 12.17 3.78-12.17h2.97l-6.53 18.74c-1.007 2.693-2.61 4.04-4.81 4.04l-.53-.04-1.03-.2v-2.25l.75.06c.94 0 1.67-.19 2.19-.57.527-.38.96-1.073 1.3-2.08l.62-1.65-5.79-16.05zm22.33-5.61l6.21 18.01 6.24-18.01h3.15l-8.1 21.84h-2.55l-8.08-21.84zm21.11 5.61v16.23h-2.78v-16.23zm-3-4.31c0-.447.137-.827.41-1.14.273-.307.68-.46 1.22-.46.54 0 .95.153 1.23.46.28.313.42.693.42 1.14 0 .453-.14.83-.42 1.13-.28.3-.69.45-1.23.45s-.947-.15-1.22-.45c-.273-.3-.41-.677-.41-1.13zm6.76 12.5v-.21c0-2.493.59-4.497 1.77-6.01 1.18-1.513 2.727-2.27 4.64-2.27 1.9 0 3.403.65 4.51 1.95v-8.46h2.78v23.04h-2.55l-.14-1.74c-1.107 1.36-2.65 2.04-4.63 2.04-1.88 0-3.413-.77-4.6-2.31-1.187-1.54-1.78-3.55-1.78-6.03zm2.78.11c0 1.833.377 3.273 1.13 4.32.767 1.033 1.82 1.55 3.16 1.55 1.76 0 3.043-.79 3.85-2.37v-7.45c-.827-1.527-2.1-2.29-3.82-2.29-1.36 0-2.423.523-3.19 1.57-.753 1.053-1.13 2.61-1.13 4.67zm21.96 8.23c-2.2 0-3.99-.723-5.37-2.17s-2.07-3.38-2.07-5.8v-.5c0-1.613.307-3.053.92-4.32.613-1.26 1.473-2.25 2.58-2.97a6.502 6.502 0 013.59-1.07c2.113 0 3.753.693 4.92 2.08 1.173 1.393 1.76 3.383 1.76 5.97v1.16h-11c.04 1.6.507 2.893 1.4 3.88.9.98 2.037 1.47 3.41 1.47.987 0 1.82-.2 2.5-.6.68-.4 1.273-.93 1.78-1.59l1.7 1.32c-1.36 2.093-3.4 3.14-6.12 3.14zm-.35-14.55c-1.12 0-2.06.407-2.82 1.22-.76.813-1.23 1.957-1.41 3.43h8.13v-.21c-.08-1.407-.46-2.5-1.14-3.28-.68-.773-1.6-1.16-2.76-1.16zm9.15 6.18v-.2c0-1.587.313-3.017.94-4.29.627-1.267 1.497-2.247 2.61-2.94 1.113-.687 2.387-1.03 3.82-1.03 2.207 0 3.993.763 5.36 2.29 1.367 1.533 2.05 3.57 2.05 6.11v.2c0 1.58-.303 2.997-.91 4.25-.607 1.253-1.473 2.23-2.6 2.93-1.12.7-2.41 1.05-3.87 1.05-2.2 0-3.983-.767-5.35-2.3-1.367-1.527-2.05-3.55-2.05-6.07zm2.79.14c0 1.793.417 3.237 1.25 4.33.84 1.087 1.96 1.63 3.36 1.63 1.407 0 2.527-.55 3.36-1.65.827-1.107 1.24-2.657 1.24-4.65 0-1.773-.423-3.213-1.27-4.32-.84-1.107-1.96-1.66-3.36-1.66-1.373 0-2.48.543-3.32 1.63-.84 1.093-1.26 2.657-1.26 4.69z"
          transform="matrix(.75 0 0 .75 32 32)"
        />
      </g>
    </svg>
  );
}

ReplayIcon.propTypes = {
  handleReplay: PropTypes.func.isRequired,
};

InstaPopup.defaultProps = {
  open: false,
  detailsForPopup: {},
  type: "",
};

InstaPopup.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  PopupRightArrowClick: PropTypes.func.isRequired,
  PopupLeftArrowClick: PropTypes.func.isRequired,
  detailsForPopup: PropTypes.shape(),
  updateDetails: PropTypes.func.isRequired,
  type: PropTypes.string,
  displayButton: PropTypes.number.isRequired,
};

export default InstaPopup;
