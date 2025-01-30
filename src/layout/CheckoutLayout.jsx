import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CheckoutLinks from "./CheckoutLinks";
import Summary from "../components/cart/summary";
import Logo from "../theme-files/logo";
import useLogout from "../helper/hooks/customer/use-logout";

const CheckoutLayout = ({ children }) => {
  const history = useRouter();
  const { sessionTimeout, customerCartId, cartItems } = useSelector((state) => state);
  const { logout, logOutTime } = useLogout();

  const pathName = history.pathname;

  useEffect(() => {
    if (sessionTimeout && new Date().getTime() - sessionTimeout > logOutTime) {
      logout(true);
    } else if (!customerCartId) {
      logout(true);
    } else if (!cartItems?.length) {
      history?.push("/");
    }
  }, [logout, sessionTimeout, pathName]);

  return (
    <div className="grid sm:grid sm:grid-cols-2 lg:grid-cols-2 sm:gap-4 space-y-2 sm:space-y-0">
      <div className="space-x-0 md:space-x-16 bg-white px-5">
        <b>&nbsp;</b>
        <Logo />

        {pathName !== "/checkout/information" ? <CheckoutLinks /> : null}

        {children}
      </div>
      <div className="bg-skin-fill h-screen">
        <div className="md:w-12/12 md:w-10/12">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export const getLayout = (page) => <CheckoutLayout>{page}</CheckoutLayout>;

CheckoutLayout.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CheckoutLayout;
