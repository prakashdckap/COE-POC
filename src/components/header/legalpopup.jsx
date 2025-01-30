import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import ImageTag from "../../theme-files/image";
import { LEGAL_POPUP_STATUS } from "../../redux/actions";

export default function Legalpopup({ setlegalpopupshow }) {
  const dispatch = useDispatch();
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);
  const router = useRouter();

  const handleClose = (accepted) => {
    accepted ? acceptedAge() : notAcceptedAge();
  };

  const acceptedAge = () => {
    dispatch(LEGAL_POPUP_STATUS(false));
    setlegalpopupshow(false);
  };

  const notAcceptedAge = () => {
    dispatch(LEGAL_POPUP_STATUS(true));
    router.push("https://www.google.com/");
  };

  /** ######### @ADA compliance DO NOT REMOVE ######### */

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      // Shift key pressed for reverse tabbing
      if (event.shiftKey) {
        if (document.activeElement === yesButtonRef.current) {
          noButtonRef.current.focus();
          event.preventDefault();
        }
      } else {
        // Regular tabbing
        if (document.activeElement === noButtonRef.current) {
          yesButtonRef.current.focus();
          event.preventDefault();
        }
      }
    }
  };
  /** ######### @ADA compliance DO NOT REMOVE ######### */

  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex="1"
      onKeyDown={handleKeyDown}
      className="fixed h-screen top-0 left-0 w-full h-full z-50 bg-gray-700/50"
    >
      <div
        className="bg-skin-inverted mt-14 px-2 py-1.5 text-center w-11/12 sm:w-[39rem] mx-auto"
        role="alert"
      >
        <h4 className="bg-skin-secondary text-skin-inverted mb-2.5 py-2.5 text-[13px]">
          AGE VERIFICATION
        </h4>
        <div className="w-60 mx-auto">
          <ImageTag
            src="https://admin.elementvape.com/media/logo/stores/1/logo_ev_02.png"
            height={56}
            width={240}
            alt="Element Vape"
          />
        </div>
        <p className="text-[13px] text-skin-base mb-4 px-2">
          The products available on Element Vape are{" "}
          <span className="font-bold">
            age-restricted and intended for adults of legal smoking age only.
          </span>{" "}
          All orders placed on the website will be verified by an industry leading Age Verification
          software for validation.
        </p>
        <p className="text-[13px] mb-4">
          By entering our website, you affirm that you are of legal smoking age in your
          jurisdication and you agree to be Age Verified.
        </p>
        <div className="flex flex-wrap justify-around pb-10">
          <button
            type="button"
            className="w-10/12 sm:w-52 whitespace-nowrap mr-0 py-[7px] px-[15px] font-bold border border-skin-primary text-sm bg-skin-secondary text-skin-inverted uppercase"
            ref={yesButtonRef}
            onClick={() => handleClose(true)}
            autoFocus
          >
            yes, i am of legal age
          </button>
          <button
            type="button"
            className="w-10/12 sm:w-44 ml-0 py-[7px] px-[15px] mt-4 sm:mt-0 font-bold border border-gray-400 text-sm uppercase"
            ref={noButtonRef}
            onClick={() => handleClose(false)}
          >
            no, i don&apos;t agree
          </button>
        </div>
      </div>
    </div>
  );
}
Legalpopup.propTypes = {
  setlegalpopupshow: PropTypes.func.isRequired,
};
