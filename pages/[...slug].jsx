import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import ProductListing from "../src/components/product-listing/magento-plp";
import client from "../src/helper/graphql";
import URL_HANDLER from "../src/helper/graphql/query/url-handler";
import ProductDescription from "../src/components/product-description";
import CmsPage from "../src/components/cmsPage";
import SEOHead, { getSitemap } from "../src/helper/SEOHeader";
import constants from "../src/helper/constant";

export default function DynamicSlug({ data }) {
  let component;
  let head;

  const router = useRouter();
  if (!data.urlHandler) return router.push("/");
  if (data?.urlHandler?.entityType === "category") {
    component = (
      <ProductListing
        products={data?.urlHandler?.content?.products}
        category={data?.urlHandler?.content?.category || {}}
        totalCount={data?.urlHandler?.content?.totalCount}
        categoryId={data?.urlHandler?.entityId}
      />
    );
    head = (
      <SEOHead
        title={data?.urlHandler?.content?.category?.seo?.pageTitle}
        description={data?.urlHandler?.content?.category?.seo?.metaDescription}
        image={data?.urlHandler?.content?.category?.image?.url}
        keywords={data?.urlHandler?.content?.category?.seo?.metaKeywords}
        canonicalUrl={`${constants.replaceUrl}/${router?.query?.slug?.[0]}`}
      />
    );
  } else if (data?.urlHandler?.entityType === "product") {
    component = <ProductDescription product={data?.urlHandler?.content?.product} />;
    head = (
      <SEOHead
        title={data?.urlHandler?.content?.product?.seo?.pageTitle}
        description={data?.urlHandler?.content?.product?.seo?.metaDescription}
        image={data?.urlHandler?.content?.product?.image?.url}
        keywords={data?.urlHandler?.content?.product?.seo?.metaKeywords}
        canonicalUrl={`${constants.replaceUrl}/${router?.query?.slug?.[0]}`}
      />
    );
  } else if (data?.urlHandler?.entityType === "cms-page") {
    component = <CmsPage cmsId={data.urlHandler.entityId} />;
  } else if (data?.urlHandler?.entityType === "custom") {
    component = (
      <ProductListing
        products={data?.urlHandler?.content?.products}
        brandId={data?.urlHandler?.content?.products?.[0]?.brands || {}}
        totalCount={data?.urlHandler?.content?.totalCount}
        categoryId={""}
      />
    );
    head = (
      <SEOHead
        title={data?.urlHandler?.content?.products?.[0]?.seo?.pageTitle}
        description={data?.urlHandler?.content?.products?.[0]?.seo?.metaDescription}
        image={data?.urlHandler?.content?.products?.[0]?.image?.url}
        keywords={data?.urlHandler?.content?.products?.[0]?.seo?.metaKeywords}
        canonicalUrl={`${constants.replaceUrl}/${router?.query?.slug?.[0]}`}
      />
    );
  }
  return (
    <div>
      {head}
      {component}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const sitemapPattern = /sitemap-[0-9]-[0-9]+.xml/;
  if (params.slug[0] === "sitemap.xml" || sitemapPattern.test(params.slug[0])) {
    const sitemapFileName = params.slug[0];
    await getSitemap(sitemapFileName, context);
  }

  const { slug } = context.query;

  const urlKey = slug?.join("/");

  try {
    const { data } = await client.query({
      query: URL_HANDLER,
      variables: {
        urlKey,
        contentData: true,
      },
    });
    if (data?.urlHandler) {
      if (data?.urlHandler?.redirection) {
        return {
          redirect: {
            permanent: false,
            destination: data?.urlHandler?.targetPath,
          },
          props: {},
        };
      }
      return {
        props: { data }, // will be passed to the page component as props
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: `/productSearch?q=${slug}`,
      },
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/productSearch?q=${slug}`,
      },
      props: {},
    };
  }
}
DynamicSlug.defaultProps = {
  data: {},
};
DynamicSlug.propTypes = {
  data: PropTypes.shape({
    urlHandler: PropTypes.shape({
      content: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
      entityType: PropTypes.string,
      entityId: PropTypes.number,
    }),
  }),
};
