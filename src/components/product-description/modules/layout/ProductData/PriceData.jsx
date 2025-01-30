import Image from "next/image";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { InformationCircleOutline } from "heroicons-react";
import Paragraph from "../../../../../theme-files/paragraph";
import SubHeading from "../../../../../theme-files/sub-heading";
import Review from "../../../../review";
import SezzlePdpModel from "../../../SezzlePayModel";
import sezzle from "../../../../../../public/assets/icons/sezzle_icon.svg";
import constants from "../../../../../helper/constant";

export default function PriceData({
  isInstock,
  calculatedPrice,
  selectOptionsPrice,
  product,
  myRef,
}) {
  const [showZipPopUp, setShowZipPopUp] = useState(false);
  const [shortDes, setshortDes] = useState("");
  const [sumAmount, setSumAmount] = useState(calculatedPrice);
  const [strickPrice, setStrickPrice] = useState(0);

  const { id, short_description, priceRange } = product;

  // Short Description Replacing the URL
  useEffect(() => {
    if (short_description?.html) {
      const des = ReactHtmlParser(
        short_description?.html
          ?.replaceAll(constants?.replaceUrl, "")
          .replaceAll("&gt;", ">")
          .replaceAll("&lt;", "<")
      );
      setshortDes(des);
    }
  }, [short_description?.value]);

  useEffect(() => {
    // to update strick-out price
    const regularPrice = priceRange?.minPrice?.regularPrice?.value;
    if (regularPrice && priceRange?.minPrice?.finalPrice?.value !== regularPrice) {
      setStrickPrice(regularPrice);
    } else {
      setStrickPrice(0);
    }
  }, [priceRange?.minPrice?.regularPrice?.value]);

  useEffect(() => {
    if (selectOptionsPrice) {
      const amount = (
        Number(calculatedPrice) + (selectOptionsPrice ? Number(selectOptionsPrice) : 0)
      ).toFixed(2);
      setSumAmount(Number(amount));
    } else {
      setSumAmount(Number(calculatedPrice));
    }
  }, [calculatedPrice, selectOptionsPrice]);

  return (
    <>
      {/*########### Start Mobile ###########*/}
      <div className="mt-4 flex justify-center mb-[20px] md:hidden">
        <SubHeading className="sr-only text-sm font-medium">Reviews</SubHeading>
        <Review pdp productId={id} myRef={myRef} />
      </div>
      <div className=" relative md:hidden content-center py-4 mb-1.5 border-t border-gray-300">
        {isInstock ? (
          <Paragraph className="text-2xl font-semibold text-skin-base text-center">
            {strickPrice ? (
              <span>
                <del>${strickPrice}</del> &nbsp;{" "}
              </span>
            ) : (
              ""
            )}
            &#x24; {sumAmount}
          </Paragraph>
        ) : (
          ""
        )}
        <Paragraph
          className={` ${
            isInstock
              ? "text-[#207338]"
              : "text-[#ff1800] w-full text-center flex justify-center items-center"
          } font-bold text-xs absolute right-0 top-[26px]`}
        >
          {!isInstock && <span className="fa fa-times-circle text-[25px]" />}
          <span className="ml-1">
            {isInstock ? "In " : "Out of "}
            Stock
          </span>
        </Paragraph>
      </div>
      {/*########### End Mobile ###########*/}

      {/*########### Desktop Price Start ###########*/}
      <div className="hidden md:flex items-center md:items-start justify-between content-center pb-[13.5px] mt-[15px]">
        {isInstock ? (
          <Paragraph className="text-[25px] font-semibold text-[#000]">
            {strickPrice ? (
              <span>
                <del>${strickPrice}</del> &nbsp;{" "}
              </span>
            ) : (
              ""
            )}
            &#x24;
            {sumAmount}
          </Paragraph>
        ) : (
          " "
        )}
        <Paragraph
          className={` ${
            isInstock
              ? "text-[#207338]"
              : "text-[#ff1800] w-full text-center flex justify-center items-center"
          } font-bold text-[12px] mt-[2px]`}
        >
          {!isInstock && <span className="fa fa-times-circle text-[25px]" />}
          <span className="ml-1">
            {isInstock ? "In " : "Out of "}
            Stock
          </span>
        </Paragraph>
      </div>
      {/*########### Desktop Price End ###########*/}

      {isInstock && (
        <div className="border-b border-gray-300">
          <div
            role="button"
            tabIndex="0"
            className="text-[14px] flex items-center flex-wrap text-[#282828] font-Montserrat font-medium cursor-pointer mb-2 PDP-sezzel-text"
            onClick={() => setShowZipPopUp(true)}
            onKeyUp={() => setShowZipPopUp(true)}
          >
            or 4 interest-free payments of{" "}
            <span className="font-extrabold text-[1.2em] mx-[3px]">
              ${(sumAmount / 4).toFixed(2)}
            </span>{" "}
            with{" "}
            <span className="mx-[3px] mt-1">
              <Image height={18} width={72} src={sezzle} alt="Sezzle - Buy now pay later." />
            </span>
            <span role="button" className="flex" tabIndex="0">
              <InformationCircleOutline className="h-[16px] w-[13px] md:w-[16px]" />
            </span>
          </div>
          <SezzlePdpModel isOpen={showZipPopUp} onClose={() => setShowZipPopUp(false)} />
        </div>
      )}

      {/*########### Desktop Reviews ###########*/}
      <div className="mt-[19px] hidden md:flex">
        <SubHeading className="sr-only text-sm font-medium">Reviews</SubHeading>
        <Review myRef={myRef} pdp productId={id} />
      </div>

      {/*########### Product Description ###########*/}
      {short_description ? (
        <div className="my-0 md:mb-[20px] md:mt-[21px] pb-0 md:pb-[1px] pdp-short-description">
          <div className="text-[13px] text-skin-base font-normal leading-[1.35] mt-5 md:mt-0 short_description-links">
            {shortDes}
          </div>
        </div>
      ) : null}
    </>
  );
}
