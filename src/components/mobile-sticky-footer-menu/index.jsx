import { HomeIcon, HeartIcon, ShoppingCartIcon, UserIcon, CogIcon } from "@heroicons/react/solid";
import Link from "../../theme-files/link";

export default function MobileStickyFooterMenu() {
  return (
    <div id="sticky_bottom_mobile_menu">
      <div
        id="stickymenu_bottom_mobile"
        className="d-flex align-items-center justify-content-center d-md-none text-center"
      >
        <div className="stickymenu-item">
          <Link href="/">
            <HomeIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span>Home</span>
          </Link>
        </div>

        <div className="stickymenu-item">
          <Link href="/account/my-wishlist">
            <HeartIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span>Wishlist</span>
          </Link>
        </div>

        <div className="stickymenu-item">
          <Link href="#" className="nov-toggle-page">
            <ShoppingCartIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span>Cart</span>
          </Link>
        </div>
        <div className="stickymenu-item">
          <Link href="#" className="nov-toggle-page">
            <UserIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span>Account</span>
          </Link>
        </div>
        <div className="stickymenu-item">
          <Link href="#" className="nov-toggle-page">
            <CogIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span>Setting</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
