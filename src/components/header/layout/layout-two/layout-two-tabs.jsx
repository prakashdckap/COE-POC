import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Disclosure, Tab } from "@headlessui/react";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import ImageTag from "../../../../theme-files/image";
import useCategory from "../../../../helper/hooks/header/useCategory";
import useLogout from "../../../../helper/hooks/customer/use-logout";
import useGetCustomerWishlist from "../../../../helper/hooks/customer/use-get-customer-wishlist";
import constants from "../../../../helper/constant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sidebarContent = {
  account: [
    { name: "My Account", link: "/login" },
    { name: "Sign In", link: "/login" },
    { name: "Create an Account", link: "/login" },
    { name: "Contact Us", link: "/contact-us" },
    { name: "Welcome to Element Vape!", link: "/" },
  ],
};

function Tabs({ setSidebarOpen }) {
  const { customerWishlistResponse, customerWishlistLoading } = useGetCustomerWishlist();
  const availableRewardPoints = useSelector((state) => state.availableRewardPoints);

  const { parentCategory, data } = useCategory();
  const customerToken = useSelector((state) => state.customerToken);
  const customerDetails = useSelector((state) => state.customerDetails);
  const { logout } = useLogout();

  let wishlistCount = "";

  if (customerWishlistResponse?.products?.length === 1) {
    wishlistCount = `${customerWishlistResponse?.products?.length} item`;
  } else if (customerWishlistResponse?.products?.length > 0) {
    wishlistCount = `${customerWishlistResponse?.products?.length} items`;
  } else {
    wishlistCount = "";
  }

  const availableRewardCount = availableRewardPoints > 0 ? availableRewardPoints : 0;

  const sideNavigation = [
    { name: "My Account", link: "/account" },
    { name: `Wishlist ${wishlistCount} `, link: "/account/my-wishlist" },
    { name: "Reward Points", link: "/account/rewards" },
    { name: "My Orders", link: "/account/my-orders" },
    { name: "Track Your Order", link: "/shippingtracking" },
    { name: "Store Credits", link: "account/store-credit-and-refunds" },
    { name: "Contact Us", link: "/contact-us" },
    { name: `Welcome, ${customerDetails?.firstName} ${customerDetails?.lastName}!`, link: "/" },
    { name: "Sign Out", link: "/customer/account/logoutSuccess" },
  ];

  useEffect(() => {
    parentCategory();
  }, []);

  const handleLinkNavigation = (name) => {
    setSidebarOpen(false);
    if (name === "Sign Out") {
      logout();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto  lg:max-w-none lg:mt-0 lg:col-span-4">
      <Tab.Group as="div">
        <Tab.List className="flex">
          <Tab
            className={({ selected }) =>
              classNames(
                selected
                  ? "text-skin-base bg-skin-inverted"
                  : "text-skin-inverted bg-[#1f1f1f]",
                "whitespace-nowrap text-[13px] font-medium uppercase w-[50%] py-[15px] h-[71px]"
              )
            }
          >
            Menu
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected
                  ? "text-skin-base bg-skin-inverted"
                  : "text-skin-inverted bg-[#1f1f1f]",
                "whitespace-nowrap text-[13px] font-medium uppercase w-[50%] py-[15px] h-[71px]"
              )
            }
          >
            Account
          </Tab>
        </Tab.List>

        <Tab.Panels as={Fragment}>
          <Tab.Panel className="my-5 px-2 mobile-megamenu">
            {data?.[0]?.map((item) => (
              <>
                {item?.[0]?.content?.label !== "NEW" ? (
                  <Disclosure>
                    {() => (
                      <div>
                        <Disclosure.Button className="flex items-center justify-between bg-[#f2f2f2] mb-2 p-1 mt-1 pl-2 w-full">
                          <p className="font-medium text-sm"> {item?.[0]?.content?.label}</p>
                          <div className="relative">
                            <ImageTag
                              width={70}
                              height={50}
                              className="object-contain"
                              src={item?.[0]?.content?.icon_img
                                ?.replaceAll('{{media url="', `${constants.magentoBaseUrl}media/`)
                                ?.replaceAll('"}}', "")
                                ?.replaceAll("&quot;", "")}
                              alt="img"
                            />
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-2 pt-4 pb-2 text-sm text-gray-500">
                          <div className="mobile-megamenu__content-1">
                            {ReactHtmlParser(
                              item?.[1]?.content?.content?.[0]
                                ?.replaceAll(`{{media url=`, `${constants.magentoBaseUrl}media/`)
                                ?.replaceAll(`}}`, "")
                                ?.replaceAll(`{{config path=web/secure`, "")
                                ?.replaceAll(`/"`, "/")
                                ?.replaceAll("&quot;", "")
                                ?.replaceAll("base_url", "")
                                ?.replaceAll('href="https://www.elementvape.com', 'href="')
                            )}

                            <div className="mt-5">
                              {ReactHtmlParser(
                                item?.[1]?.content?.content?.[1]
                                  ?.replaceAll("{{config path=web/secure/base_url}}", "/")
                                  ?.replaceAll("{{media url=", `${constants.magentoBaseUrl}media/`)
                                  ?.replaceAll("}}", "")
                                  ?.replaceAll(`{{config path=web/secure`, "")
                                  ?.replaceAll(`/"`, "/")
                                  ?.replaceAll("&quot;", "")
                                  ?.replaceAll('href="https://www.elementvape.com', 'href="')
                              )}
                            </div>
                          </div>

                          <div className="mobile-menu__category-img">
                            {ReactHtmlParser(
                              item?.[1]?.content?.content?.[2]
                                ?.replaceAll("{{config path=web/secure/base_url}}", "/")
                                ?.replaceAll("{{media url=", `${constants.magentoBaseUrl}media/`)
                                ?.replaceAll("}}", "")
                                ?.replaceAll(`{{config path=web/secure`, "")
                                ?.replaceAll(`/"`, "/")
                                ?.replaceAll("&quot;", "")
                                ?.replaceAll('href="https://www.elementvape.com', 'href="')
                            )}

                            {ReactHtmlParser(
                              item?.[1]?.content?.content?.[3]
                                ?.replaceAll("{{config path=web/secure/base_url}}", "/")
                                ?.replaceAll("{{media url=", `${constants.magentoBaseUrl}media/`)
                                ?.replaceAll("}}", "")
                                ?.replaceAll(`{{config path=web/secure`, "")
                                ?.replaceAll(`/"`, "/")
                                ?.replaceAll("&quot;", "")
                                ?.replaceAll('href="https://www.elementvape.com', 'href="')
                            )}
                          </div>

                          <div className="mobile-menu__category-img">
                            {item?.[1]?.content?.content?.[4] ? (
                              <div className="megamenu-img-grid">
                                {ReactHtmlParser(
                                  item?.[1]?.content?.content?.[4]
                                    ?.replaceAll("{{config path=web/secure/base_url}}", "/")
                                    ?.replaceAll(
                                      "{{media url=",
                                      `${constants.magentoBaseUrl}media/`
                                    )
                                    ?.replaceAll("}}", "")
                                    ?.replaceAll(`{{config path=web/secure`, "")
                                    // ?.replaceAll(`/"`, "/")
                                    ?.replaceAll("&quot;", "")
                                    ?.replaceAll('href="https://www.elementvape.com', 'href="')
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ) : (
                  <div className="flex items-center justify-between bg-[#f2f2f2] mb-2 p-1 mt-1 pl-2 w-full">
                    <Link
                      href={item?.[0]?.content?.url.replace(
                        '{{config path="web/unsecure/base_url"}}',
                        "/"
                      )}
                    >
                      <a
                        aria-hidden="true"
                        onClick={() => setSidebarOpen(false)}
                        className="font-medium text-sm"
                      >
                        {item?.[0]?.content?.label}
                      </a>
                    </Link>
                    <div className="relative w-[70px] h-[50px] overflow-hidden">
                      <ImageTag
                        layout="fill"
                        object-fit="contain"
                        src={item?.[0]?.content?.icon_img
                          ?.replaceAll('{{media url="', `${constants.magentoBaseUrl}media/`)
                          ?.replaceAll('"}}', "")
                          ?.replaceAll(`{{config path=web/secure`, "")
                          ?.replaceAll(`/"`, "/")
                          ?.replaceAll("&quot;", "")}
                        alt="img"
                      />
                    </div>
                  </div>
                )}
              </>
            ))}
          </Tab.Panel>

          <Tab.Panel
            as="dl"
            className={`${
              customerWishlistLoading ? "opacity-40 pointer-events-none" : null
            } text-skin-base flex mt-4 px-4 text-[14px] font-medium`}
          >
            <ul className="space-y-5 text-[#333]">
              {customerToken
                ? sideNavigation?.map(({ name, link }) => {
                    return (
                      <li key={link}>
                        <Link href={link}>
                          <a
                            aria-hidden="true"
                            className={
                              name ===
                              `Welcome, ${customerDetails?.firstName} ${customerDetails?.lastName}!`
                                ? "pointer-events-none"
                                : ""
                            }
                            onClick={() => handleLinkNavigation(name)}
                          >
                            {name}
                          </a>
                        </Link>
                        {name.toLocaleLowerCase() === "reward points" ? (
                          <p className="text-[#7d7d7d] text-[14px]">({availableRewardCount} RP)</p>
                        ) : null}
                      </li>
                    );
                  })
                : sidebarContent?.account?.map(({ name, link }) => (
                    <li key={link}>
                      <Link href={link}>
                        <a
                          aria-hidden="true"
                          className={
                            name === "Welcome to Element Vape!" ? "pointer-events-none" : ""
                          }
                          onClick={() => setSidebarOpen(false)}
                        >
                          {name}
                        </a>
                      </Link>
                    </li>
                  ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Tabs;

Tabs.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
};
