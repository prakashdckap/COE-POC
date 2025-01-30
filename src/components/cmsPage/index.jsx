import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import HtmlParser from "react-html-parser";
import Link from "next/link";
import { ChevronRight } from "heroicons-react";
import { useRouter } from "next/router";
import SubHeading from "../../theme-files/sub-heading";
import OrderedList from "../../theme-files/ordered-list";
import ListItem from "../../theme-files/list-item";
import Customerreview from "../home/About-customerreview";
import constants from "../../helper/constant";
import SectionInsta from "../home/section-insta";
import { useSelector } from "react-redux";
import SEOHead from "../../helper/SEOHeader";

export default function CmsPage({ cmsId }) {
  const [cmsPageObj, setCmsPageObj] = useState({});
  const [loading, setloading] = useState(false);
  const [hostName, setHostName] = useState("");
  const customerToken = useSelector((state) => state.customerToken);

  const { asPath } = useRouter();
  const history = useRouter();
  const pathname = history?.query?.slug[0];

  const productlisting = {
    breadcrumbs: [{ id: 1, href: "/", name: "Home" }],
    name: asPath?.replace("/", "")?.replace("-", " "),
    href: "/",
  };
  useEffect(() => {
    setHostName(`${window.location.protocol}//${window.location.host}/`);
  }, []);

  useEffect(() => {
    setloading(true);
    axios
      .post("/api/cms-page", { id: cmsId })
      .then((response) => {
        setCmsPageObj(response.data.data.cmsPage);
        console.log({
          data: response.data.data.cmsPage?.content
            ?.replaceAll("&gt;", ">")
            ?.replaceAll("&lt;", "<")
            ?.replaceAll("&amp;nbsp;", ""),
        });
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        return err;
      });
  }, [cmsId]);

  return (
    <>
      <SEOHead
        title={cmsPageObj?.meta_title}
        description={cmsPageObj?.meta_description}
        keywords={cmsPageObj?.meta_keywords}
        canonicalUrl={`${constants.replaceUrl}/${pathname}`}
      />
      <div
        className={`${asPath === "/coupons" ? "" : "container mx-auto"} mt-5 mb-10`}
        id="main_content"
      >
        <div className={`${asPath === "/coupons" ? "mx-auto container" : ""}`}>
          <nav aria-label="Breadcrumb" className="px-[10px]">
            <OrderedList role="list" className="flex items-center">
              {productlisting?.breadcrumbs.map((breadcrumb) => (
                <ListItem key={breadcrumb.id}>
                  <div className="flex items-center">
                    <Link href={breadcrumb.href}>
                      <a className="text-[13px] font-normal text-gray-900 hover:underline">
                        {breadcrumb.name}
                      </a>
                    </Link>
                    <ChevronRight className="h-4 text-gray-500" />
                  </div>
                </ListItem>
              ))}
              <ListItem className="text-[13px]" key={productlisting.href}>
                <SubHeading className="font-bold text-skin-base capitalize">
                  {productlisting.name === "about" ? "About us" : productlisting.name}
                </SubHeading>
              </ListItem>
            </OrderedList>
          </nav>
          {cmsPageObj?.url_key !== "coupons" && (
            <h1 className="text-[26px] font-normal text-center text-[#282828] mt-[25px] mb-[30px] font-famile-style">
              {cmsPageObj?.content_heading === "About Us" ? "" : cmsPageObj?.content_heading}
            </h1>
          )}
        </div>

        {asPath === "/reward-program" && constants.showReviewWidgetURL.includes(asPath) ? (
          <div className="mt-2.5">
            <Customerreview />
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <div className="min-h-[100vh] flex justify-center items-center">
            <svg
              className="h-[100px] animate-pulse"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              fill="#cacaca"
            >
              <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z" />
            </svg>
          </div>
        ) : (
          <div
            className={` ${pathname} pages cms-page ${
              asPath === "/about" ? "" : "px-[10px] py-[10px]"
            }`}
          >
            {HtmlParser(
              cmsPageObj?.content
                ?.replaceAll("&gt;", ">")
                ?.replaceAll("&lt;", "<")
                ?.replaceAll('href="https://admin.elementvape.com/', `href=${hostName}`)
                ?.replaceAll(`button`, `a`)
                ?.replaceAll(
                  `onclick="location.href='https://admin.elementvape.com/customer/account/login/'`,
                  `href=${hostName}${customerToken ? "account" : "login"}`
                )
                ?.replaceAll(
                  `onclick="location.href='https://admin.elementvape.com/coupons'`,
                  `href=${hostName}coupons`
                )
                ?.replaceAll(
                  `onclick="location.href='${constants.magentoBaseUrl}/customer/account/login/'`,
                  `href=${hostName}${customerToken ? "account" : "login"}`
                )
                ?.replaceAll(
                  `onclick="location.href='${constants.magentoBaseUrl}/coupons'`,
                  `href=${hostName}coupons`
                )
                ?.replaceAll("&amp;nbsp;", "")
                ?.replaceAll("", "")
                ?.replaceAll(`alt="Shop Hidden`, `alt="Shop`)
                ?.replaceAll('"', "")
                ?.replaceAll("&amp;copy;", "©")
                ?.replaceAll("/shippingtracking/index/index/", "/shippingtracking")
                ?.replaceAll("/customer/account/login", "/login")
            )}
          </div>
        )}
        {asPath !== "/reward-program" &&
        (constants.showReviewWidgetURL.includes(asPath) || asPath === "/shipping-and-handling") ? (
          <div className="mt-5">
            <Customerreview />
          </div>
        ) : (
          ""
        )}
        {asPath === "/about" && constants.showReviewWidgetURL.includes(asPath) ? (
          <div className="mt-20">
            <SectionInsta />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

CmsPage.propTypes = {
  cmsId: PropTypes.number.isRequired,
};
