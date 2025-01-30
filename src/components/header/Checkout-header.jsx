import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useLogout from "../../helper/hooks/customer/use-logout";
import ImageTag from "../../theme-files/image";

const CheckoutHeader = () => {
  const history = useRouter();
  const path = history?.pathname;
  const sessionTimeout = useSelector((state) => state.sessionTimeout);
  const { logout, logOutTime } = useLogout();
  const { pathname } = history;
  const customerToken = useSelector((state) => state.customerToken);

  useEffect(() => {
    if (!customerToken) {
      window.location.href = "/login";
    }
    if (sessionTimeout && new Date().getTime() - sessionTimeout > logOutTime) {
      logout(true);
    }
  }, [logout, sessionTimeout, pathname]);

  return (
    <div className="bg-skin-inverted p-[7px] w-full">
      <div
        className={`${
          path === "/account/order-detail/print" ? " justify-start" : "justify-center"
        } flex`}
      >
        {/* Headless Logo Start */}
        <div className="hidden md:block">
          <Link href="/">
            {/* Desktop Logo */}
            <a>
              <ImageTag
                className="object-contain"
                src="/headless-logo.png"
                height={70}
                width={300}
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
                width={300}
              />
            </a>
          </Link>
        </div>
        {/* Headless Logo End */}
      </div>
    </div>
  );
};

export default CheckoutHeader;
