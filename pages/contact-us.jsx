import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronRight } from "heroicons-react";
import IframeResizer from "iframe-resizer-react";
import Customerreview from "../src/components/home/About-customerreview";
import SEOHead from "../src/helper/SEOHeader";
import OrderedList from "../src/theme-files/ordered-list";
import ListItem from "../src/theme-files/list-item";
import SubHeading from "../src/theme-files/sub-heading";
import constants from "../src/helper/constant";

export default function DoWeShip() {
  const { asPath } = useRouter();
  const productlisting = {
    breadcrumbs: [{ id: 1, href: "/", name: "Home" }],
    name: asPath?.replace("/", "")?.replace("-", " "),
    href: "/",
  };
  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Contact"
        canonicalUrl={`${constants.replaceUrl}/contact-us`}
      />

      <div className="container mx-auto mt-5" id="main_content">
        <nav aria-label="Breadcrumb" className="px-0">
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
        <h1 className="text-[24px] font-normal text-center text-[#282828] mt-[25px]">Contact Us</h1>
      </div>
      <div className="container mx-auto flex justify-center mb-5">
        <IframeResizer
          title="Contact form"
          src="https://formcrafts.com/a/gtsjqhy?iframe=true&resizer=false&innerHeight=909"
          width="100%"
          className="mt-10"
          scrolling="no"
          style={{
            maxWidth: "100%",
            border: 0,
            boxShadow: "0 0 0 0 rgba(30, 30, 30, .1), 0px 1px 2px rgb(30, 30, 30, 0)",
            borderRadius: "3px",
          }}
        />
      </div>
      <div className="container mx-auto flex justify-center my-5 text-[15px]">
        <span className="font-semibold px-1">Helpcode: </span> 717326
      </div>
      <div className="container mx-auto mb-5">
        <Customerreview />
      </div>
    </>
  );
}
