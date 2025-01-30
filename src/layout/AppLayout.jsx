import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Notification from "../helper/notifications/notification";
import HeaderLayoutTwo from "../components/header/layout/layout-two";
import HeaderWarning from "../components/header/warning/header-warning";
import HeaderAlert from "../components/header/warning/header-alert";
import Footer from "../components/footer";
import CheckoutHeader from "../components/header/Checkout-header";
import { memo, useEffect, useState } from "react";
import { SET_ON_PAGE_TOP_PROMO_BANNER, SET_TOP_PROMO_BANNER } from "../redux/actions";

const AppFullLayout = ({ children }) => {
  const { pathname } = useRouter();
  const notification = useSelector((state) => state.notification);
  const topPromoBanner = useSelector((state) => state.topPromoBanner);
  const onpagetopPromoBanner = useSelector((state) => state.onpagetopPromoBanner);
  const dispatch = useDispatch();
  const history = useRouter();
  const [hostName, setHostName] = useState("");

  useEffect(() => {
    dispatch(SET_TOP_PROMO_BANNER([]));
    dispatch(SET_ON_PAGE_TOP_PROMO_BANNER([]));
  }, [history]);

  // UseEffect to get the hostName
  useEffect(() => {
    setHostName(`${window.location.protocol}//${window.location.host}/`);
  }, []);
  // Function to update the banner link
  const getUpdatedBannerLink = (bannerLink) => {
    if (!bannerLink) return "";

    const currentProtocolAndHost = hostName;
    return bannerLink
      .replace(/^https:\/\/staging\.elementvape\.com/, currentProtocolAndHost)
      .replace(/^https:\/\/www\.elementvape\.com/, currentProtocolAndHost);
  };

  return (
    <>
      {pathname === "/checkout" ? (
        <>
          <CheckoutHeader />
          <main>{children}</main>
          <Footer />
          {notification && notification?.status ? <Notification /> : null}
        </>
      ) : (
        <>
          {pathname !== "/account/order-detail/print" ? (
            <>
              {onpagetopPromoBanner?.length ? (
                onpagetopPromoBanner?.map((banner) => (
                  <div className="md:mx-[20px]">
                    {banner?.banner_link ? (
                      <a href={getUpdatedBannerLink(banner?.banner_link)}>
                        <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                      </a>
                    ) : (
                      <>
                        <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                      </>
                    )}
                  </div>
                ))
              ) : (
                <></>
              )}
              {topPromoBanner?.length ? (
                topPromoBanner?.map((banner) => (
                  <div className="md:mx-[20px]">
                    {banner?.banner_link ? (
                      <a href={getUpdatedBannerLink(banner?.banner_link)}>
                        <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                      </a>
                    ) : (
                      <>
                        <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                      </>
                    )}
                  </div>
                ))
              ) : (
                <></>
              )}
              <HeaderWarning />
              <HeaderLayoutTwo />
              <HeaderAlert />
            </>
          ) : (
            <CheckoutHeader />
          )}

          <main>{children}</main>

          {pathname !== "/account/order-detail/print" ? (
            <>
              <Footer />
            </>
          ) : null}

          {notification && notification?.status ? <Notification /> : null}
        </>
      )}
    </>
  );
};

AppFullLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export const AppLayout = memo(AppFullLayout);
