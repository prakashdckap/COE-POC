import { useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import client from "../src/helper/graphql";

const SectionBannerOne = dynamic(() => import("../src/components/home/section-banner-one"), {
  loading: () => <SectionSckeleton />,
});
const SectionBannerTwo = dynamic(() => import("../src/components/home/section-banner-two"), {
  loading: () => <SectionSckeleton />,
});
const SectionSlider = dynamic(() => import("../src/components/home/section-slider"), {
  loading: () => <HomeSliderSckeleton />,
});
const SectionBrands = dynamic(() => import("../src/components/home/section-brands"), {
  loading: () => <HomeSliderSckeleton />,
});
const Trending = dynamic(() => import("../src/components/home/trending"), {
  loading: () => <ProductCardSckeleton />,
});
const SectionInsta = dynamic(() => import("../src/components/home/section-insta"), {
  loading: () => <HomeSliderSckeleton />,
});
const NewArrivals = dynamic(() => import("../src/components/home/new-arrivals"), {
  loading: () => <ProductCardSckeleton />,
});
const BestSellers = dynamic(() => import("../src/components/home/best-sellers"), {
  loading: () => <SectionSckeleton />,
});
const SectionBannerThree = dynamic(() => import("../src/components/home/section-banner-three"), {
  loading: () => <SectionSckeleton />,
});

import HOME_PAGE_CMS from "../src/components/home/graphql/query/home-page-cms";
import SEOHead from "../src/helper/SEOHeader";
import { SET_OFFER_NOTIFICATION } from "../src/redux/actions";
import { HomeSliderSckeleton, SectionSckeleton } from "../src/components/FallBackUI/homePage";
import ProductCardSckeleton from "../src/theme-files/carousel-section/Assets/ProductCardSckeleton";
import constants from "../src/helper/constant";

export default function Home({ homePageCMSData }) {
  const dispatch = useDispatch();

  const homePageCMS = homePageCMSData?.getHomePageCMS;

  const homePageSlider = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "BannerSlider"),
    [homePageCMS]
  );
  const featureBrands = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "FeaturedBrands"),
    [homePageCMS]
  );
  const newArrivals = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "NewArrivals"),
    [homePageCMS]
  );
  const bestSellers = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "BestSellers"),
    [homePageCMS]
  );
  const trending = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "Trending"),
    [homePageCMS]
  );
  const homePageSliderMobile = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "BannerSliderMobile"),
    [homePageCMS]
  );
  const cardSectionOneLeft = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "CardSection1-left"),
    [homePageCMS]
  );
  const cardSectionOneRight = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "CardSection1-right"),
    [homePageCMS]
  );
  const cardSectionTwoLeft = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "CardSection2-left"),
    [homePageCMS]
  );
  const cardSectionTwoRight = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "CardSection2-right"),
    [homePageCMS]
  );
  const fourCardSectionOne = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "4CardScetion-1"),
    [homePageCMS]
  );
  const fourCardSectionTwo = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "4CardScetion-2"),
    [homePageCMS]
  );
  const fourCardSectionThree = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "4CardScetion-3"),
    [homePageCMS]
  );
  const fourCardSectionFour = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "4CardScetion-4"),
    [homePageCMS]
  );
  const headerOfferNotification = useMemo(
    () => homePageCMS?.find((content) => content?.section_name === "offerNotification"),
    [homePageCMS]
  );

  const setOfferNotification = useCallback(() => {
    if (headerOfferNotification?.content.length) {
      dispatch(SET_OFFER_NOTIFICATION(headerOfferNotification?.content));
    }
  }, [headerOfferNotification]);

  useEffect(() => {
    setOfferNotification();
  }, [setOfferNotification]);

  return (
    <>
      <SEOHead canonicalUrl={`${constants.replaceUrl}`} />
      <section className="home" id="main_content">
        <SectionSlider
          data={homePageSlider?.content[0]}
          homePageSliderMobile={homePageSliderMobile?.content[0]}
        />
        <SectionBannerOne
          cardSectionOneLeft={cardSectionOneLeft}
          cardSectionOneRight={cardSectionOneRight}
        />
        <Trending trending={trending?.content[0]} />
        <NewArrivals newArrivals={newArrivals?.content[0]} />
        <SectionBannerTwo
          cardSectionTwoLeft={cardSectionTwoLeft}
          cardSectionTwoRight={cardSectionTwoRight}
        />
        <BestSellers bestSellers={bestSellers?.content[0]} />
        <SectionBrands featureBrands={featureBrands?.content[0]} />
        <SectionBannerThree
          fourCardSectionOne={fourCardSectionOne}
          fourCardSectionTwo={fourCardSectionTwo}
          fourCardSectionThree={fourCardSectionThree}
          fourCardSectionFour={fourCardSectionFour}
        />
        <SectionInsta />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { data: homePageCMSData } = await client.query({
    query: HOME_PAGE_CMS,
  });
  return {
    props: { homePageCMSData },
    revalidate: 2,
  };
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  homePageCMSData: PropTypes.any.isRequired,
};
