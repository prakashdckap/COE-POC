import React, { useEffect, useState } from "react";
import axios from "axios";
import Constant from "../../helper/constant";
import Heading from "../../theme-files/heading";
import DisplayInstaList from "./instaComponents/displayInsta";
import InstaPopup from "./instaComponents/instaPopup";
import DisplayInstaMobile from "./instaComponents/instaMobile";

function SectionInsta() {
  const [totalCount, settotalCount] = useState(0);
  const [instagramImages, setinstagramImages] = useState([]);
  const [detailsForPopup, setDetailsForPopup] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [oddValue, setoddValue] = useState(false);
  const [instagram, setinstagram] = useState([]);
  const [popupIndex, setPopupIndex] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);
  const votes = { up: 0, down: 0 };
  const getInstaPost = () => {
    let postNo = 7;
    if (window?.innerWidth >= 1280) {
      postNo = 7;
    } else if (window?.innerWidth > 425) {
      postNo = 5;
    } else {
      postNo = 3;
    }
    return postNo;
  };

  useEffect(() => {
    axios
      .get(
        `https://api.yotpo.com/v1/widget/${
          Constant.YOTPO_INSTAGRAM_KEY
        }/albums/by_name?album_name=My%20Posts%20Album&page=${page}&per_page=${getInstaPost()}`
      )
      .then((res) => {
        if (res.status === 200) {
          const igResult = res.data.response.images.map((e, index) => {
            return { ...e, ...votes, index };
          });
          if (!instagram.length) {
            setinstagramImages(igResult);

            setinstagram([igResult]);
          } else {
            setinstagramImages([...instagramImages, ...igResult]);
            setinstagram((instagramPrev) => [...instagramPrev, igResult]);
          }
          settotalCount(res.data.response.pagination.total);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const updateDetails = (details = detailsForPopup) => {
    if (detailsForPopup) {
      const igArray = [...instagram];
      igArray[groupIndex][popupIndex] = details;
      setDetailsForPopup(details);
      setinstagram(igArray);
    }
  };

  // Load More functionality
  const loadMore = () => {
    if (totalCount > instagramImages.length) {
      if (page === 0) {
        setPage(page + 2);
      } else {
        setPage(page + 1);
      }
    }
  };

  const PopupRightArrowClick = () => {
    if (popupIndex < instagram[groupIndex].length - 1) {
      setDetailsForPopup(instagram[groupIndex][popupIndex + 1]);
      setPopupIndex((popup) => popup + 1);
    } else if (groupIndex < instagram.length - 1) {
      setDetailsForPopup(instagram[groupIndex + 1][0]);
      setPopupIndex(0);
      setGroupIndex(groupIndex + 1);
    } else {
      // to loop navigating to first image
      setDetailsForPopup(instagram[0][0]);
      setPopupIndex(0);
      setGroupIndex(0);
    }
  };

  const PopupLeftArrowClick = () => {
    if (groupIndex || popupIndex) {
      if (popupIndex > 0) {
        setDetailsForPopup(instagram[groupIndex][popupIndex - 1]);
        setPopupIndex((popup) => popup - 1);
      } else if (groupIndex < instagram.length) {
        setDetailsForPopup(instagram[groupIndex - 1][instagram[groupIndex - 1].length - 1]);
        setPopupIndex(instagram[groupIndex - 1].length - 1);
        setGroupIndex(groupIndex - 1);
      }
    } else {
      // to loop navigating to last image
      setDetailsForPopup(
        instagram[instagram.length - 1][instagram[instagram.length - 1].length - 1]
      );
      setPopupIndex(instagram[instagram.length - 1].length - 1);
      setGroupIndex(instagram.length - 1);
    }
  };

  if (instagramImages.length)
    return (
      <div className="container mx-auto pb-14 insta-section">
        <Heading className="text-[#000] text-center text-[18px] md:text-[23px] font-sans mb-[15px] uppercase">
          #ElementVape Gallery
        </Heading>
        <DisplayInstaList
          instagram={instagram}
          setOpen={setOpen}
          setDetailsForPopup={setDetailsForPopup}
          setPopupIndex={setPopupIndex}
          setGroupIndex={setGroupIndex}
        />
        <DisplayInstaMobile
          instagram={instagram}
          setOpen={setOpen}
          setDetailsForPopup={setDetailsForPopup}
          setPopupIndex={setPopupIndex}
          setGroupIndex={setGroupIndex}
        />
        {totalCount > instagramImages.length ? (
          <div className="pt-10 pb-[74px] flex justify-center">
            <button
              type="button"
              className="bg-white hover:bg-[#000000] hover:text-white text-black h-[40px] flex items-center justify-center text-sm border border-black px-[15px] py-[10px]"
              onClick={() => {
                loadMore();
                setoddValue(!oddValue);
              }}
              tabIndex={-1}
            >
              LOAD MORE
            </button>
          </div>
        ) : null}

        <InstaPopup
          open={open}
          setOpen={setOpen}
          PopupRightArrowClick={PopupRightArrowClick}
          PopupLeftArrowClick={PopupLeftArrowClick}
          detailsForPopup={detailsForPopup}
          updateDetails={updateDetails}
          displayButton={instagramImages?.length || instagram?.length}
        />
      </div>
    );
}

export default SectionInsta;
