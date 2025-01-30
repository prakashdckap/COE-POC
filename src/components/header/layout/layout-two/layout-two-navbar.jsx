import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import ReactHtmlParser from "react-html-parser";
import Link from "../../../../theme-files/link";
import useCategory from "../../../../helper/hooks/header/useCategory";
import constants, { magentoBaseUrl } from "../../../../helper/constant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LayoutTwoNavbar({ scrollPos }) {
  const [isShowing, setIsShowing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");

  const { parentCategory, data } = useCategory();

  useEffect(() => {
    parentCategory();
  }, []);

  const imageParser = (html) => {
    return html
      ?.replaceAll("https://www.elementvape.com/", "")
      ?.replaceAll(constants.magentoBaseUrl, "")
      ?.replaceAll(`href=\"{{config path=&quot;web/secure/base_url&quot;}}`, "href=")
      ?.replaceAll(`href="{{config path=web/secure/base_url}}`, "href=")
      ?.replaceAll(/href=([^ >]+)/g, (match, url) => `href="/${url.toLowerCase()}"`)
      ?.replaceAll("{{config path=web/secure/base_url}}", "/")
      ?.replaceAll("{{media url=&quot;", `${constants.magentoBaseUrl}media/`)
      ?.replaceAll("}}", "")
      ?.replaceAll("{{media url=", `${constants.magentoBaseUrl}media/`)
      ?.replaceAll("&quot;", "")
      ?.replaceAll('""', "")
      ?.replaceAll('"', "");
  };

  return (
    <div className="z-50 container mx-auto hidden md:block" id="main_navigation">
      <Popover className="bg-white">
        <div
          className={`${
            scrollPos > 220 ? "pb-[20px]" : "border-t-[1px] border-[#aaa] pt-[15px] pb-[20px]"
          } flex justify-center items-center px-[12px] `}
        >
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
            </Popover.Button>
          </div>
          <div className="open-tab hidden md:flex md:items-center md:justify-center p-0 m-0">
            <Popover.Group
              as="nav"
              className="flex"
              onMouseLeave={() => {
                setIsShowing(false);
                setCurrentMenu(null);
              }}
            >
              {data?.[0]?.map((item) => {
                let returnValue = <></>;
                if (item?.[0]?.content?.label !== "NEW") {
                  returnValue = (
                    <Popover
                      key={item?.[0]?.content?.label}
                      onMouseEnter={() => {
                        setIsShowing(true);
                        setCurrentMenu(item?.[0]?.content?.label);
                      }}
                      onMouseLeave={() => {
                        setIsShowing(false);
                        setCurrentMenu(null);
                      }}
                      style={{
                        margin: "0px",
                      }}
                    >
                      {({ open }) => (
                        <>
                          <div
                            className={classNames(
                              open ? "text-gray-900" : "text-skin-base font-bold",
                              "group mb-[1px] rounded-md flex flex-wrap justify-center items-center text-base font-medium hover:text-gray-900 open-tab-div"
                            )}
                          >
                            <a
                              href={item?.[0]?.content?.url
                                .replace('{{config path="web/unsecure/base_url"}}', "/")
                                .toLowerCase()}
                              onClick={() => {
                                setIsShowing(false);
                              }}
                              className={` ${
                                currentMenu === item?.[0]?.content?.label
                                  ? "text-[#a80f16]"
                                  : "text-[#222e46]"
                              }  font-bold hover:text-skin-secondary hover:underline hover:underline-offset-4 hover:decoration-[#a80f16] hover:decoration-4 whitespace-pre open-tab-a`}
                            >
                              {item?.[0]?.content?.label}
                            </a>
                          </div>

                          {item?.[0]?.content?.label === currentMenu ? (
                            <Transition
                              show={item?.[0]?.content?.label === currentMenu}
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 -translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 -translate-y-1"
                            >
                              <Popover.Panel
                                className={`absolute transform shadow-xl w-full left-0 bg-white z-[99] ${
                                  isShowing === false ? "hidden" : ""
                                }`}
                              >
                                <div className="header-megamenu p-5">
                                  <nav
                                    className={`${item?.[0]?.content?.label?.toLowerCase()} flex  bg-white   mx-auto  w-[100%] `}
                                    // className={`${item?.[0]?.content?.label?.toLowerCase()} flex gap-y-10 px-4 sm:px-6  bg-white sm:grid-cols-2 sm:gap-x-8 py-[20px] mt-[10px] lg:px-8 xl:pr-12`}
                                    aria-labelledby="solutions-heading"
                                  >
                                    <div className="flex mx-[-10px]">
                                      <div className="megamenu-subcategory">
                                        {ReactHtmlParser(
                                          imageParser(
                                            item?.[1]?.content?.content?.[0]?.replaceAll(
                                              `href=${magentoBaseUrl}`,
                                              'href="'
                                            )
                                          )
                                        )}
                                        <div className="megamenu-content__2">
                                          {ReactHtmlParser(
                                            imageParser(
                                              item?.[1]?.content?.content?.[1]?.replaceAll(
                                                `href=${magentoBaseUrl}`,
                                                'href="'
                                              )
                                            )
                                          )}
                                        </div>
                                      </div>
                                      <div className="megamenu-subcategory megamenu-img-grid">
                                        {ReactHtmlParser(
                                          imageParser(
                                            item?.[1]?.content?.content?.[2]?.replaceAll(
                                              `href=${magentoBaseUrl}`,
                                              'href="'
                                            )
                                          )
                                        )}

                                        {ReactHtmlParser(
                                          imageParser(
                                            item?.[1]?.content?.content?.[3]?.replaceAll(
                                              `href=${magentoBaseUrl}`,
                                              'href="'
                                            )
                                          )
                                        )}
                                      </div>

                                      {item?.[1]?.content?.content?.[4] ? (
                                        <div className="megamenu-img-grid uppercase">
                                          {ReactHtmlParser(
                                            imageParser(
                                              item?.[1]?.content?.content?.[4]?.replaceAll(
                                                `href=${magentoBaseUrl}`,
                                                'href="'
                                              )
                                            )
                                          )}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </nav>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </Popover>
                  );
                } else {
                  returnValue = (
                    <a
                      href={item?.[0]?.content?.url
                        .replace('{{config path="web/unsecure/base_url"}}', "/")
                        .toLowerCase()}
                      onMouseEnter={() => {
                        setIsShowing(false);
                      }}
                      className="text-[15px] text-[#222e46] font-bold hover:text-skin-secondary hover:underline hover:underline-offset-4 hover:decoration-[#a80f16] hover:decoration-4 whitespace-pre level-top"
                    >
                      {item?.[0]?.content?.label}
                    </a>
                  );
                }
                return returnValue;
              })}
            </Popover.Group>
          </div>
        </div>
      </Popover>
    </div>
  );
}

export default LayoutTwoNavbar;
