import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { HeartIcon, MailIcon } from "@heroicons/react/outline";
import { ClipboardListOutline } from "heroicons-react";
import { UserIcon } from "@heroicons/react/solid";

import useLogout from "../../helper/hooks/customer/use-logout";
import PageLink from "../../theme-files/link";
import { SHOW_USER } from "../../redux/actions";

export default function UserProfilePopup() {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);
  const history = useRouter();

  const accountActionClass =
    "pb-3 flex flex-wrap items-center text-xs font-semibold uppercase text-skin-base hover:text-skin-hover";

  const { logout, logoutLoading } = useLogout();

  const logoutSuccess = () => {
    const isLogOut = logout();
    isLogOut && history?.push("/customer/account/logoutSuccess");
  };

  const accountRedirection = () => {
    history?.push("/account/account-information");
    hideUserPopup();
  };

  const hideUserPopup = () => {
    setTimeout(() => {
      dispatch(SHOW_USER(false));
    }, 1000);
  };

  return (
    <div className="absolute duration-150 ease-in-out shadow border-r-2 border-b-2 right-[10px] md:right-[-65px]  mt-3 md:mt-3 w-80 2xl:w-80 p-5 bg-skin-inverted z-[999]">
      <div className="text-center mb-6">
        <div className="rounded-full mx-auto my-[20px] flex justify-center items-center bg-skin-hover h-20 w-20">
          <UserIcon className="text-skin-inverted text-sm" height={50} width={50} />
        </div>
        <div className="mt-[2rem] flex justify-center items-center">
          <div
            className="uppercase cursor-pointer text-xs font-semibold text-skin-primary"
            onClick={accountRedirection}
            onKeyUp={accountRedirection}
            role="button"
            tabIndex="0"
          >
            Hi, {customerDetails?.firstName}
          </div>

          <button className="ml-1.5" onClick={logoutSuccess} type="button">
            <h6 className="cursor-pointer text-[16px] text-[#f44336] font-semibold hover:text-skin-base">
              {logoutLoading ? (
                <i class="fa-solid fa-spinner animate-spin" aria-hidden="true" />
              ) : (
                <i className="fa fa-sign-out" aria-hidden="true" />
              )}
            </h6>
          </button>
        </div>
      </div>
      <div>
        <button onClick={hideUserPopup} type="button" className={accountActionClass}>
          <HeartIcon className="w-4 mr-3" />
          <PageLink href="/account/my-wishlist">wishlist</PageLink>
        </button>
        <button type="button" onClick={hideUserPopup} className={accountActionClass}>
          <ClipboardListOutline className="w-4 mr-3" />
          <PageLink href="/account/my-orders">My orders</PageLink>
        </button>
        <button type="button" onClick={hideUserPopup} className={accountActionClass}>
          <MailIcon className="w-4 mr-3" />
          <PageLink href="/contact-us">Contact Us</PageLink>
        </button>
      </div>
    </div>
  );
}
