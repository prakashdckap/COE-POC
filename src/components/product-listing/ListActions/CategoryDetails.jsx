import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";

import { cleanHTML, clearLandingPageHTML, removeCache } from "../../../helper/removeCache";
import { findMissingElements } from "../helper";

export default function CategoryDetails({ category = {} }) {
  const history = useRouter();
  const [filter, setfilter] = useState([]);

  const { image, name, description, categoryLandingPage } = category;
  const { asPath, query } = history;

  /** ######### @ADA compliance DO NOT REMOVE ######### */
  const screenReaderText = useMemo(() => {
    if (query?.filters) {
      try {
        const urlFilter = JSON.parse(query?.filters);
        const optionsArray = urlFilter.map(({ options }) => options).flat();
        setfilter(optionsArray);
        if (optionsArray?.length !== filter?.length) {
          if (optionsArray?.length > filter?.length) {
            const missing = findMissingElements(optionsArray, filter, "label");
            if (missing?.length) {
              return `Filter ${missing[missing?.length - 1]?.label} added`;
            }
            return "Filter updated";
          } else if (optionsArray?.length < filter?.length) {
            const missing = findMissingElements(filter, optionsArray, "label");
            if (missing?.length) {
              return `Filter ${missing[missing?.length - 1]?.label} removed`;
            }
            return "Filter removed";
          }
        }
        return "";
      } catch (error) {
        setfilter([]);
        return "";
      }
    } else {
      setfilter([]);
      return "";
    }
  }, [query?.filters]);
  /** ######### @ADA compliance DO NOT REMOVE ######### */

  return (
    <>
      {/*########## Category Image ##########*/}
      {image?.url ? (
        <div className="mt-5 category-img">
          <Image
            src={removeCache(image?.url)}
            width="1073"
            layout="responsive"
            height="400"
            alt={image?.label}
          />
        </div>
      ) : (
        !history.query.q && (
          <div
            className="text-[22px] text-[#000000] font-medium flex justify-center items-center pb-[10px] uppercase"
            tabIndex={0}
          >
            {name}
          </div>
        )
      )}
      {/*########## Category Description ##########*/}
      {description?.value ? (
        <div
          className={`${
            image?.url ? "mt-[20px]" : ""
          } font-normal pb-3 text-sm text-[#333] leading-[20px]`}
          dangerouslySetInnerHTML={{
            __html: cleanHTML(description?.value),
          }}
        />
      ) : (
        ""
      )}
      {/*########## Category CMS ##########*/}
      {categoryLandingPage?.isEnabled ? (
        <div
          className={`${
            asPath === "/mad-hatter" || asPath === "/delta-8"
              ? "plp-description-1"
              : "plp-description"
          }`}
          dangerouslySetInnerHTML={{
            __html: clearLandingPageHTML(categoryLandingPage?.value),
          }}
        />
      ) : null}
      {/*########## Search Category ##########*/}
      {history.query.q && (
        <div
          className="flex justify-center items-center text-[24px] text-[#282828]"
          aria-live="polite"
          role="textbox"
          tabIndex={0}
        >
          Search results for: '{history.query.q}'
        </div>
      )}

      <span className="sr-only" aria-live="polite" role="textbox">
        {screenReaderText}
      </span>
    </>
  );
}
