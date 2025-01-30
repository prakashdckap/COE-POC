import { useEffect, useState } from "react";
import FooterNewsletter from "./layout/layout-two/footer-newsletter";
import FooterLinks from "./layout/layout-two/footer-links";
import FooterCopyright from "./layout/layout-two/footer-copyright";
import FooterCookies from "./layout/layout-two/footer-cookies";
import PushNotification from "./layout/layout-two/elements/push-notification";
import { handleFocusOnTopPage } from "../header/layout/layout-two/elements/adaSkipSections";

export default function Footer() {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollPos(window.pageYOffset);
    };
    setScrollPos(window.pageYOffset);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="md:container md:mx-auto">
        <FooterNewsletter />
      </div>
      <footer className="relative container mx-auto">
        <FooterLinks />
        <FooterCopyright />
        <FooterCookies />
        <PushNotification />

        {scrollPos > 100 ? (
          <button
            onClick={() => {
              handleFocusOnTopPage();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="fixed z-[9999] fill-[#fff] hover:fill-[#000] flex justify-center items-center right-[15px] bottom-[15px] text-[#fff] hover:text-[#000] focus:fill-[#000] focus:text-[#000] focus:bg-[#fff] h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-[#000] border border-[#000] hover:bg-[#fff] rounded-full"
            type="button"
            aria-label="back-to-top"
          >
            <svg
              className="h-[14px] md:h-[20px] hover:fill-[#000]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          </button>
        ) : (
          ""
        )}
      </footer>
    </>
  );
}
