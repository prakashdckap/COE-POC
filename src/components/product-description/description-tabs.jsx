import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@headlessui/react";
import ReactHtmlParser from "react-html-parser";
import { ChevronDownIcon } from "@heroicons/react/outline";

import SubHeading from "../../theme-files/sub-heading";
import Certificates from "./certificates";
import constants from "../../helper/constant";

function DescriptionTabs({ description, sku, productAttachment }) {
  const [showHideDescription, setShowHideDescription] = useState(true);
  const [showHideCertificates, setShowHideCertificates] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [pdf, setPdf] = useState({});
  const descriptionRef = useRef();

  useEffect(() => {
    setCertificates(productAttachment);
  }, []);

  useEffect(() => {
    setShowHideDescription(true);
    setShowHideCertificates(true);
  }, []);

  return (
    <div>
      <div className="block md:hidden">
        <div className="w-full mx-auto">
          {description && (
            <div
              onClick={() => {
                setShowHideDescription((showHideDescriptio) => !showHideDescriptio);
                setShowHideCertificates(false);
              }}
              onKeyUp={() => {
                setShowHideDescription((showHideDescriptio) => !showHideDescriptio);
                setShowHideCertificates(false);
              }}
              role="link"
              tabIndex="0"
              className="w-full flex justify-between px-[10px] text-[#000] font-normal"
            >
              <span className="text-[14px] uppercase tracking-[1px]">Description</span>
              <span
                className={`md:hidden transition-all  ease-in-out my-auto mx-0 ${
                  showHideDescription
                    ? "rotate-180 duration-500 transition-all ease-in-out"
                    : " duration-500 transition-all ease-in-out mb-2.5"
                } `}
              >
                <ChevronDownIcon className="w-[20px] h-[20px] stroke-1" />
              </span>
            </div>
          )}
          <div className="pt-[10px] px-[10px] md:px-0">
            <SubHeading className="sr-only text-sm font-medium">Description</SubHeading>
            {showHideDescription ? (
              <div ref={descriptionRef} className="relative">
                <div
                  className={`text-[14px] relative z-10 text-skin-base space-y-[16px] pdp-description mb-2.5 ${
                    showHideDescription ? "h-[100px] relative overflow-hidden" : ""
                  }  ${showMore ? "gradient-to-t" : "h-full overflow-visible"}`}
                >
                  {description?.length &&
                    ReactHtmlParser(description?.replaceAll("&gt;", ">")?.replaceAll("&lt;", "<"))}
                </div>
                <div
                  className={` ${
                    showMore ? "block" : "hidden"
                  } h-[100px] mt-[-100px] relative bg-gradient-to-b from-transparent to-[#ffffff78]`}
                />
              </div>
            ) : (
              ""
            )}
            {showHideDescription ? (
              <button
                type="button"
                className="table mx-auto my-5 border px-[15px] uppercase py-[7px] border-solid border-[#000] text-[#000] text-xs font-sans bg-[#fff] md:hidden"
                onClick={() => {
                  setShowMore((show) => !show);
                  if (!showMore)
                    descriptionRef.current.scrollIntoView({ behavior: "smooth", top: "-30px" });
                }}
              >
                Show {showMore ? "More" : "Less"}
              </button>
            ) : (
              ""
            )}
          </div>
          {certificates?.length ? (
            <div
              onClick={() => {
                setShowHideCertificates((showHideCertificate) => !showHideCertificate);
                setShowHideDescription(false);
              }}
              onKeyUp={() => {
                setShowHideCertificates((showHideCertificate) => !showHideCertificate);
                setShowHideDescription(false);
              }}
              role="link"
              tabIndex="0"
              className="w-full flex justify-between px-[10px] text-[#000] font-normal"
            >
              <span className="text-[14px] uppercase tracking-[1px]">Certificate of Analysis</span>
              <span
                className={`md:hidden transition-all  ease-in-out my-auto mx-0 ${
                  showHideCertificates
                    ? "rotate-180 duration-500 transition-all ease-in-out"
                    : "duration-500 transition-all ease-in-out mb-8"
                } `}
              >
                <ChevronDownIcon className="w-[20px] h-[20px] stroke-1" />
              </span>
            </div>
          ) : (
            ""
          )}

          {showHideCertificates && certificates?.length ? (
            <div className="pt-[10px] mb-[50px] px-[10px] md:px-0">
              <SubHeading className="sr-only text-sm font-medium">
                Certificate of Analysis
              </SubHeading>
              <Certificates certificates={certificates} setPdf={setPdf} />
              <button
                type="button"
                className="table mx-auto mt-3 border px-5 border-black md:hidden"
                onClick={() => {
                  setShowMore((show) => !show);
                  if (!showMore)
                    descriptionRef.current.scrollIntoView({ behavior: "instant", top: "-30px" });
                }}
              >
                Show {showMore ? "More" : "Less"}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-full mx-auto hidden md:block mt-16 md:mt-10 md:col-span-4">
        <Tab.Group as="div">
          <div className="border-b-2 border-[#ebebeb] flex justify-between">
            <Tab.List className="-mb-px flex space-x-8 no-scrollbar overflow-x-auto pl-[10px]">
              {description && (
                <Tab
                  className={({ selected }) => `
                   ${
                     selected
                       ? "border-skin-dark text-skin-base"
                       : "border-transparent text-gray-700"
                   }
                    "whitespace-nowrap pb-[18px] border-b-[3px] font-normal text-sm uppercase"`}
                >
                  <span className="text-[14px] uppercase tracking-[1px]">Description</span>
                </Tab>
              )}
              {certificates?.length ? (
                <Tab
                  className={({ selected }) => `
                   ${
                     selected
                       ? "border-skin-dark text-skin-base"
                       : "border-transparent text-gray-700"
                   }
                    "whitespace-nowrap pb-[18px] border-b-[3px] font-normal text-sm uppercase"`}
                >
                  <span className="text-[14px] uppercase tracking-[1px]">
                    Certificate of Analysis
                  </span>
                </Tab>
              ) : (
                ""
              )}
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
            <Tab.Panel ref={descriptionRef} className="pt-[10px] mb-[50px] px-[10px] md:px-0">
              <SubHeading className="sr-only text-sm font-medium">Description</SubHeading>
              <div
                className={`text-[14px] text-skin-base space-y-[16px] pdp-description ${
                  showMore ? " overflow-hidden" : ""
                }`}
              >
                {description?.length &&
                  ReactHtmlParser(description?.replaceAll("&gt;", ">")?.replaceAll("&lt;", "<"))}
              </div>
            </Tab.Panel>
            {certificates?.length ? (
              <Tab.Panel className="pt-[10px] mb-[50px] px-[10px] md:px-0">
                <SubHeading className="sr-only text-sm font-medium">
                  Certificate of Analysis
                </SubHeading>
                <Certificates certificates={certificates} setPdf={setPdf} />
                <button
                  type="button"
                  className="table mx-auto mt-3 border px-5 border-black md:hidden"
                  onClick={() => {
                    setShowMore((show) => !show);
                    if (!showMore)
                      descriptionRef.current.scrollIntoView({ behavior: "instant", top: "-30px" });
                  }}
                >
                  Show {showMore ? "More" : "Less"}
                </button>
              </Tab.Panel>
            ) : (
              ""
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
      {pdf?.file ? (
        <div className="fixed  py-[30px] px-[15px] md:px-[30px] top-0 left-0 bottom-0 w-full z-[999] bg-[rgba(51,51,51,.55)] flex justify-center items-start">
          <div className="w-[1000px] justify-between bg-white relative">
            <span
              onClick={() => setPdf({})}
              className="text-[30px] md:text-[48px] font-light text-[#6f6f6f] leading-[30px] md:leading-[48px] absolute right-0 top-0 z-[9999] w-[30px] md:w-[48px] text-center cursor-pointer"
            >
              ×
            </span>
            <div className="p-[30px] md:p-[48px] border-none max-w-[1000px] relative max-h-[calc(100vh - 30px)] md:max-h-[calc(100vh - 60px)]">
              <iframe
                title="downloadable"
                src={constants.magentoBaseUrl + pdf?.file}
                width="100%"
                height="500px"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DescriptionTabs;

DescriptionTabs.propTypes = {
  description: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
};
