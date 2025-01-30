import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Paragraph from "../../../../theme-files/paragraph";

function FooterCookies() {
  const dialogRef = useRef(null);
  const agreeButtonRef = useRef(null);
  const privacyPolicy = useRef(null);
  const legalPopupStatus = useSelector((state) => state.legalPopupStatus);

  const [hideCookies, setHideCookies] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const setCookies = () => {
    localStorage.setItem("cp", true);
    setHideCookies(false);
  };

  useEffect(() => {
    const cookie = localStorage.getItem("cp");
    if (cookie === "true") {
      setHideCookies(false);
    } else {
      setHideCookies(true);
    }
  }, []);

  /** ######### @ADA compliance DO NOT REMOVE ######### */
  useEffect(() => {
    const preventPopupValue = localStorage.getItem("preventPopup");
    setIsVisible(preventPopupValue);
  }, []);

  useEffect(() => {
    if (!legalPopupStatus && hideCookies) {
      dialogRef.current?.focus();
    }
  }, [legalPopupStatus, hideCookies, isVisible]);

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      // Shift key pressed for reverse tabbing
      if (event.shiftKey) {
        if (document.activeElement === privacyPolicy.current) {
          dialogRef.current?.focus();
          event.preventDefault();
        }
      } else {
        // Regular tabbing
        if (document.activeElement === dialogRef.current) {
          privacyPolicy.current?.focus();
          event.preventDefault();
        } else if (document.activeElement === privacyPolicy.current) {
          agreeButtonRef.current?.focus();
          event.preventDefault();
        }
      }
    }
  };
  /** ######### @ADA compliance DO NOT REMOVE ######### */

  return (
    <>
      {hideCookies ? (
        <div
          tabIndex={0}
          aria-modal="true"
          onKeyDown={handleKeyDown}
          className={`${
            !hideCookies ? "hide" : ""
          } fixed bottom-0 w-full left-0 z-[999] bg-white text-[#000] text-center py-[10px] px-[20px] footer-cookies flex flex-col md:flex-row justify-evenly items-center`}
          role="alert"
          ref={dialogRef}
          id="privacy-policy"
        >
          <Paragraph>
            This site uses cookies to provide an optimized shopping experience. By using this site,
            you agree the use of cookies within our
            <Link href="/privacy-policy-cookie-restriction-mode">
              <a
                className="pl-[5px] font-semibold"
                target="_blank"
                rel="noreferrer"
                ref={privacyPolicy}
              >
                privacy policy.
              </a>
            </Link>
          </Paragraph>
          <button
            onClick={setCookies}
            type="button"
            aria-label="Agree privacy policy"
            ref={agreeButtonRef}
          >
            <span className="font-semibold text-[#000] underline uppercase">I Agree</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FooterCookies;
