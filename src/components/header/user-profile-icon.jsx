import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import UserProfilePopup from "./userprofilepopup";
import ImageTag from "../../theme-files/image";
import { SHOW_USER } from "../../redux/actions";
import useOnClickOutside from "../../helper/hooks/use-detect-outside-click";

export default function UserProfileIcon() {
  const dispatch = useDispatch();
  const history = useRouter();
  const { customerToken, showUser, customerCartId } = useSelector((state) => state);
  const { ref, showMenu, setShowMenu } = useOnClickOutside(false, "showUser");

  function toggleProfile() {
    if (customerToken && customerCartId) {
      dispatch(SHOW_USER(!showUser));
      setShowMenu(!showMenu);
    } else if (history?.pathname !== "/login") {
      history?.push("/login");
    }
  }

  return (
    <div
      className="flow-root text-sm lg:relative flex items-center justify-center min-w-[32px] px-0 md:px-[10px]"
      ref={ref}
    >
      <button
        className="relative flex items-center justify-center "
        type="button"
        onClick={() => toggleProfile()}
        aria-label="Quick Profile"
      >
        <ImageTag src="/icons/user.svg" alt="profile" height={20} width={20} />
      </button>
      {showUser ? <UserProfilePopup /> : null}
    </div>
  );
}
