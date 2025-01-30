import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyAccountSideBar from "../components/account/my-account-sidebar";
import OrderDetailHeader from "../../pages/account/order-detail-header";
import { CheckIcon } from "@heroicons/react/solid";
import { SET_WISHLIST_ERROR, SET_WISHLIST_SUCCESS, SET_WISHLIST_WARNING } from "../redux/actions";
import Link from "next/link";
import useCustomerCart from "../helper/hooks/customer/use-customer-cart";

const UserAccountLayout = ({ children, heading, headTag }) => {
  const history = useRouter();
  const path = history.pathname;
  const [hideMenu, setHideMenu] = useState(true);
  const customerToken = useSelector((state) => state.customerToken);
  const setWishlistSuccess = useSelector((state) => state.setWishlistSuccess);
  const setWishlistError = useSelector((state) => state.setWishlistError);

  const dispatch = useDispatch();
  const { cartDetailsRefetch } = useCustomerCart();

  useEffect(() => {
    if (!customerToken) history.push("/login");
  }, []);

  useEffect(() => {
    const isMobile = () => {
      return window.innerWidth < 768;
    };
    if (isMobile()) setHideMenu(false);
    else if (window.innerWidth >= 768) setHideMenu(true);
  }, [path]);

  useEffect(() => {
    if (!history?.query?.id) {
      dispatch(SET_WISHLIST_SUCCESS(""));
    }
    dispatch(SET_WISHLIST_ERROR(""));
    dispatch(SET_WISHLIST_WARNING(""));
  }, [history]);

  useEffect(() => {
    cartDetailsRefetch();
  }, [setWishlistSuccess]);

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial screen width when the component mounts
    updateScreenWidth();

    // Add event listener to update screen width when window is resized
    window.addEventListener("resize", updateScreenWidth);

    // Clean up event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return (
    <>
      {headTag}

      <div id="main_content">
        <main className="container mx-auto px-5 md:px-[10px]">
          {path === "/account/order-detail" ? (
            <div className="pr-4 sm:pr-6 lg:pr-8">
              <OrderDetailHeader />
            </div>
          ) : null}
          {path !== "/account/order-detail" ? (
            <h2 className="text-center mt-[10px] md:mt-[60px] text-2xl">{heading}</h2>
          ) : null}

          <div className="container mx-auto pb-6 lg:pb-16 px-0 md:px-[10px] ">
            <div className="bg-white rounded-lg">
              <div className="flex justify-end rounded-none">
                <button
                  type="button"
                  onClick={() => setHideMenu(!hideMenu)}
                  className="bg-white rounded-none overflow-hidden block md:hidden"
                >
                  <div className="flex justify-end mr-1">
                    <div className="h-[35px] w-[35px] rounded-none bg-skin-secondary flex items-center justify-center flex-col p-2">
                      <span className="border border-b border-[#ffffff] w-full mb-1" />
                      <span className="border border-b border-[#ffffff] w-full mb-1" />
                      <span className="border border-b border-[#ffffff] w-full" />
                    </div>
                  </div>
                </button>
              </div>
              <div className="mt-4">
                {setWishlistError?.length > 0 &&
                  setWishlistError?.map((product, index) => (
                    <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#fae5e5] text-[#e02b27] text-[13px] font-normal font-sans w-full leading-[1.35]">
                      <i class="fa-solid fa-triangle-exclamation text-[18px] text-[#b30000] absolute left-2.5"></i>
                      <span>
                        {product?.message} "{product?.productName}"&#46;
                      </span>
                    </div>
                  ))}
                {setWishlistSuccess?.products?.length > 0 &&
                (setWishlistSuccess?.products?.length > 1 || setWishlistError?.length) ? (
                  <div className=" relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
                    <CheckIcon className="w-5 h-5 absolute left-2.5" />
                    <span>
                      <span className="success-wishlist-message">
                        {setWishlistSuccess?.count} product(s) have been added to{" "}
                        <Link className="" href={"/shoppingcart"}>
                          <span className="text-[#006400] shopping-cart-color cursor-pointer hover:text-[#282828] leading-[1.35] success-wishlist-message">
                            shopping cart
                          </span>
                        </Link>
                      </span>
                    </span>
                    &#58;{" "}
                    {setWishlistSuccess?.products?.map((updatedProduct) => (
                      <span>
                        "
                        <span className="success-wishlist-message leading-[1.35]">
                          {updatedProduct}
                        </span>
                        ",{" "}
                      </span>
                    ))}
                  </div>
                ) : (
                  setWishlistSuccess?.products?.map((updatedProduct) => (
                    <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
                      <CheckIcon className="w-5 h-5 absolute left-2.5" />
                      <span>
                        {setWishlistSuccess?.option === "cart" ? (
                          <span>
                            You added {updatedProduct} to your{" "}
                            <Link className="" href={"/shoppingcart"}>
                              <span className="text-[#006400] shopping-cart-color cursor-pointer hover:text-[#282828]">
                                shopping cart
                              </span>
                            </Link>
                            .
                          </span>
                        ) : (
                          `${updatedProduct} has been updated in your Wish List.`
                        )}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 md:grid md:grid-cols-12 md:divide-y-0">
                {screenWidth > 767 ? (
                  <MyAccountSideBar currentPage="/account/address-book" />
                ) : hideMenu ? (
                  <MyAccountSideBar currentPage="/account/address-book" />
                ) : (
                  ""
                )}

                <div className="pt-8 pb-10 md:col-span-8 lg:col-span-9 ">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export const getLayout = (page, heading, headTag) => (
  <UserAccountLayout heading={heading} headTag={headTag}>
    {page}
  </UserAccountLayout>
);

UserAccountLayout.propTypes = {
  children: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  headTag: PropTypes.string.isRequired,
};

export default UserAccountLayout;
