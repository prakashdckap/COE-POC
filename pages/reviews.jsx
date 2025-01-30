import axios from "axios";
import React from "react";
import client from "../src/helper/graphql";
import HOME_PAGE_CMS from "../src/components/home/graphql/query/home-page-cms";
import NewArrivals from "../src/components/home/new-arrivals";
import SectionInsta from "../src/components/home/section-insta";
import Review from "../src/components/review/review";
import constants from "../src/helper/constant";

export default function Reviews({homePageCMSData }) {
  const newArrivals = homePageCMSData?.getHomePageCMS?.find(
    (content) => content?.section_name === "NewArrivals"
  );

  return (
    <>
      <Review/>
      <section style={{ marginBottom: "40px" }} className="home">
        <NewArrivals newArrivals={newArrivals?.content[0]} />
      </section>
      <SectionInsta />
    </>
  );
}

export async function getServerSideProps() {
  const { data: homePageCMSData } = await client.query({
    query: HOME_PAGE_CMS,
  });
 
    return {props: {homePageCMSData } };

}
