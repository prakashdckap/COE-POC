import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { CheckIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { SET_CART_SUCCESS } from "../../../redux/actions";
import { useEffect, useState } from "react";
import HOME_PAGE_CMS from "../../home/graphql/query/home-page-cms";
import client from "../../../helper/graphql";

function HeaderAlert() {
  const offerNotification = useSelector((state) => state.offerNotification);
  const setCartsuccess = useSelector((state) => state.setCartSuccess);
  const history = useRouter();
  const dispatch = useDispatch();

  const [notificationData, setNotificationData] = useState([]);

  const initialOptions = {
    type: "loop",
    rewind: true,
    perPage: 1,
    perMove: 1,
    pagination: false,
    gap: 0,
    focus: "end",
    lazyLoad: "nearby",
    start: 0,
    autoplay: "play",
  };

  useEffect(() => {
    async function offerNotify() {
      // If there's no notification data yet, fetch it
      if (!offerNotification?.length) {
        try {
          // Fetch data for the home page CMS
          const { data: homePageCMSData } = await client.query({
            query: HOME_PAGE_CMS,
          });
          const homePageCMS = homePageCMSData?.getHomePageCMS;
          // Find the offer notification content
          const headerOfferNotification = homePageCMS?.find(
            (content) => content?.section_name === "offerNotification"
          );
          // If the content is found, update state with it, otherwise set as empty
          setNotificationData(headerOfferNotification?.content || []);
        } catch (error) {
          console.error("Error fetching home page CMS data:", error);
        }
      }
    }

    offerNotify();
  }, []);

  useEffect(() => {
    dispatch(SET_CART_SUCCESS(""));
  }, [history]);

  useEffect(() => {
    setNotificationData(offerNotification);
  }, []);

  return (
    <div
      className="container mx-auto px-0 md:px-[10px]"
      style={{ paddingTop: 15, paddingBottom: 1 }}
    >
      {setCartsuccess?.name && history?.pathname === "/" ? (
        <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
          <CheckIcon className="w-5 h-5 absolute left-2.5" />
          <span aria-live="polite" role="alert">
            <span>
              You added {setCartsuccess?.name} to your{" "}
              <Link
                className="border-b-[1px] border-b-[#006400] text-[#006400] shopping-cart-color"
                href={"/shoppingcart"}
              >
                <span className="text-[#006400] shopping-cart-color cursor-pointer hover:text-[#282828]">
                  shopping cart
                </span>
              </Link>
              .
            </span>
          </span>
        </div>
      ) : (
        <></>
      )}
      {notificationData?.length > 0 && (
        <div className="bg-skin-primary text-center text-skin-inverted font-semibold p-3 mb-[20px] text-sm ">
          <Splide options={{ ...initialOptions }} style={{ paddingTop: 0 }}>
            {notificationData?.map((ele) => {
              return (
                <SplideSlide key={ele?.value} className="splide_item">
                  <Link href={`/${ele?.href}`}>
                    <a>{ele?.value}</a>
                  </Link>{" "}
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      )}
    </div>
  );
}

export default HeaderAlert;
