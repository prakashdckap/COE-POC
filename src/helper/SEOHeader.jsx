import Head from "next/head";
import PropTypes from "prop-types";
import Axios from "axios";

import { removeCache } from "./removeCache";
import constants from "./constant";

const SEOHead = ({ title, description, image, keywords, canonicalUrl }) => {
  const titleContent = title || "Element Vape - Online Vape Shop - Vape Mods, Kits & E-Liquid";
  const descriptionContent =
    description ||
    "Shop incredible deals at Element Vape, a progressive online retail establishment serving the vaping community with mod kits, pod systems, and premium eJuice.";
  const imageContent =
    removeCache(image) ||
    "https://www.elementvape.com/media/favicon/default/Element_Vape_Favicon_32x32_3_.ico";
  const keywordsContent =
    keywords ||
    "vape, vape shop, online vape vaping, vape website, online vape site, vaporizers. vape products, vape mod, vape tank, vape accessory, vape kit";

  return (
    <Head>
      <title>{titleContent}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="title" content={titleContent} />
      <meta name="description" content={descriptionContent} />
      <meta name="robots" content="index" />
      <meta name="keywords" content={keywordsContent} />
      {image ? <meta itemProp="image" content={imageContent} /> : ""}

      {/* twitter */}
      <meta name="twitter:title" content={titleContent} />
      <meta name="twitter:description" content={descriptionContent} />
      {image ? <meta name="twitter:image" content={imageContent} /> : ""}

      {/* Reconciling Tags */}
      <meta property="og:title" content={titleContent} />
      <meta property="og:type" content="ecommerce" />
      <meta property="og:description" content={descriptionContent} />
      {image ? <meta property="og:image" content={imageContent} /> : ""}

      <link rel="icon" href="/theme-1/favicon.ico" />
      <link href="/theme-1/logo.ico" type="image/x-icon" rel="icon" width="36" height="20" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  );
};

SEOHead.defaultProps = {
  title: "",
  description: "",
  image: "",
  keywords: "",
};
SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
};
export default SEOHead;

export const getSitemap = async (filename, context) => {
  const { res } = context;
  const xml = await Axios.get(constants.magentoBaseUrl + filename);
  res.setHeader("Content-Type", "application/xml");
  res.write(xml.data);
  res.end();
};
