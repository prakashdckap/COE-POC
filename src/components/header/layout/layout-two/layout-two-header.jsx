import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import ImageTag from "../../../../theme-files/image";
import LayoutTwoTabs from "./layout-two-tabs";
import Minicart from "../../../minicart";
import Legalpopup from "../../legalpopup";
import MobbileSidebar from "./layout-two-sidebar";
import SearchBar from "./search-bar";
import useLogout from "../../../../helper/hooks/customer/use-logout";
import UserProfileIcon from "../../user-profile-icon";
import MyModal from "./elements/mobile-search-modal";
import AdaSkipContent from "./elements/adaSkipSections";

function LayoutTwoHeader({ scrollPos }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [legalpopupshow, setlegalpopupshow] = useState();
  const [token, settoken] = useState(false);
  const [showSearch, setshowSearch] = useState(false);
  const history = useRouter();
  const { customerToken, customerCartId, legalPopupStatus } = useSelector((state) => state);
  const sessionTimeout = useSelector((state) => state.sessionTimeout);
  const { logout, logOutTime } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = history;

  useEffect(() => {
    setlegalpopupshow(legalPopupStatus);
  }, [legalPopupStatus]);

  useEffect(() => {
    if (customerToken && customerCartId) settoken(true);
    else settoken(false);
  }, [customerToken, customerCartId]);

  useEffect(() => {
    if (sessionTimeout && new Date().getTime() - sessionTimeout > logOutTime) {
      logout();
    }
  }, [logout, sessionTimeout, pathname]);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <header className={`container mx-auto ${scrollPos > 220 ? "" : "header-line"}`}>
      <AdaSkipContent />
      <Popover className="relative bg-white">
        <div
          className={`py-[16px] flex justify-between items-center container mx-auto px-2 lg:px-0 md:pl-0  md:justify-start`}
        >
          <div className="md:hidden flex items-center justify-center">
            <div className="flex flex-col">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md text-skin-base w-full"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open Menu"
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-8 w-8" aria-hidden="true" />
              </button>
              <MobbileSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            </div>

            {/* Search Icon for Mobile */}
            <button
              type="button"
              onClick={openModal}
              className={`relative flex items-center justify-center ${
                scrollPos > 220 ? "pl-[20px]" : "pl-[15px]"
              }`}
              aria-label="Open Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-[20px] h-[20px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              {/* <ImageTag src="/icons/search.svg" height={20} width={20} /> */}
            </button>

            <MyModal isOpen={isOpen} setIsOpen={setIsOpen} setshowSearch={setshowSearch} />
          </div>
          <div className="md:w-full md:relative">
            {/* Headless Logo Start */}
            <div className="text-center">
              <div className="hidden md:flex elementvape-logo items-center">
                <Link href="/">
                  {/* Desktop Logo */}
                  <a>
                    {/* <ImageTag */}
                    {/*  className="object-contain" */}
                    {/*  src="/headless-logo.png" */}
                    {/*  height={70} */}
                    {/*  width={300} */}
                    {/* /> */}
                    <img
                      className="object-contain"
                      src="/headless-logo.png"
                      height={70}
                      width={300}
                      alt="Element vape logo"
                    />
                  </a>
                </Link>
              </div>

              <div className="block md:hidden">
                <Link href="/">
                  {/* Mobile Logo */}
                  <a>
                    <ImageTag
                      className="object-contain"
                      src="/headless-logo.png"
                      height={45}
                      width={186}
                      alt="logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            {/* Headless Logo End */}
            {showSearch ? <SearchBar token={token} setshowSearch={setshowSearch} /> : null}

            {/* KLEVU SEARCH */}
            {/* <div style={{ display: showSearch ? "block" : "none" }}>
              <SearchBar token={token} setshowSearch={setshowSearch} />
            </div>*/}

            <Popover.Group
              as="nav"
              className={`${
                token ? "space-x-[5px]" : "space-x-[15px]"
              } hidden md:flex md:absolute h-[30px] md:items-center md:right-1 md:top-[25px]`}
            >
              {/* Search Icon for Desktop */}
              <button
                onClick={() => setshowSearch(!showSearch)}
                className="relative flex items-center justify-center min-w-[32px] px-[5px]"
                type="button"
                aria-label={showSearch ? "close search" : "search"}
                id="quick_search"
              >
                {!showSearch ? (
                  <img src="/icons/search-icon.svg" height={20} width={20} alt="search" />
                ) : (
                  <XIcon className="w-[30px] h-[30px] hover:text-[#f44336] duration-300" />
                )}
              </button>

              {/* Heart Icon for Desktop */}
              {token && (
                <i className="flex items-center justify-center min-w-[32px] px-[10px]">
                  <Link href="/account/my-wishlist">
                    <a className="py-[5px] px-[10px]">
                      <HeartIcon className="h-[24px] w-[24px]" />
                      <span className="sr-only">Wishlist</span>
                    </a>
                  </Link>
                </i>
              )}

              {/* User Icon for Desktop */}
              <UserProfileIcon />

              {/* Cart Icon for Desktop */}
              <Minicart />
            </Popover.Group>
          </div>
          <div className="flex md:hidden space-x-0 md:space-x-3 items-center justify-center">
            {token && (
              <i className="py-[5px] px-[10px] hide md:flex">
                <Link href="/account/my-wishlist">
                  <a>
                    <HeartIcon className="w-6" />
                  </a>
                </Link>
              </i>
            )}
            <UserProfileIcon />
            <Minicart />
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 transition transform origin-top-right md:hidden"
          >
            <div className="shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="px-5 -mt-20 h-screen overflow-y-auto">
                <div className="flex justify-between relative">
                  <LayoutTwoTabs />
                  <div className="-mr-2 absolute right-0 top-3">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {legalpopupshow && <Legalpopup setlegalpopupshow={setlegalpopupshow} />}
    </header>
  );
}

export default LayoutTwoHeader;
