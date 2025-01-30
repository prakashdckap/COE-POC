import React from "react";
import Brands from "../src/components/brand";
import constants from "../src/helper/constant";
import SEOHead from "../src/helper/SEOHeader";

export default function brands() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <SEOHead
        title={`Vape Brands - ${currentYear} List`}
        canonicalUrl={`${constants.replaceUrl}/brands`}
      />
      <Brands />
    </>
  );
}
