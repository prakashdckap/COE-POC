import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShipmentProgress from "../../../../../../../src/components/cms/shipping-tracking-result/shipment-progress";
import DeliveryStatus from "../../../../../../../src/components/cms/shipping-tracking-result/delivery-status";
import TrackingInformation from "../../../../../../../src/components/cms/shipping-tracking-result/tracking-information";
import {
  SET_NOTIFICATION,
  UPDATE_SHIPPING_TRACKING_DETAILS,
} from "../../../../../../../src/redux/actions";
import { useRouter } from "next/router";
import { AxiosGraphQL } from "../../../../../../../src/helper/axios";
import ReactHtmlParser from "react-html-parser";
import constants from "../../../../../../../src/helper/constant";
import SEOHead from "../../../../../../../src/helper/SEOHeader";

function ShippingTrackingResult() {
  const shippingTrackingDetails = useSelector((state) => state.shippingTrackingDetails);
  const [tracking, setTracking] = useState({});
  const [loading, setLoading] = useState(false);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [topCmsBanner, setTopCmsBanner] = useState({});
  const [bottomCmsBanner, setBottomCmsBanner] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setTracking(shippingTrackingDetails);
  }, [shippingTrackingDetails]);

  useEffect(() => {
    const { id, email } = router.query;
    if (shippingTrackingDetails?.orderId !== id && id && email) {
      let value = {
        orderId: id,
        email: decodeURIComponent(email),
      };
      trackingDetail(value);
    }
  }, [router]);

  async function trackingDetail(value) {
    setTrackingLoading(true);
    const response = await AxiosGraphQL("check-order-status", value);
    if (response.checkOrderStatus && response) {
      dispatch(UPDATE_SHIPPING_TRACKING_DETAILS(response.checkOrderStatus));
      setTracking(response.checkOrderStatus);
      setTrackingLoading(false);
    } else {
      setTrackingLoading(false);
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Make sure that you have entered the Order Number and Email Address correctly.",
          type: "warning",
        })
      );
    }
  }
  const trackingNumberExists = useMemo(() => tracking?.trackingNumber, [tracking]);

  useEffect(() => {
    setLoading(true);
    cmscontentApi();
  }, []);

  async function cmscontentApi() {
    setLoading(true);
    let identifirevalue = {
      identifiers: ["shipping_tracking_banner_top", "shipping_tracking_banner_bottom"],
    };
    const response = await AxiosGraphQL("tracking-cms-content", identifirevalue);
    if (response) {
      const cmsBlockContent = response?.cmsBlocks?.items;
      setLoading(false);
      cmsBlockContent?.map((cmsBlock) => {
        if (cmsBlock?.identifier == "shipping_tracking_banner_top") {
          setTopCmsBanner(cmsBlock);
        } else if (cmsBlock?.identifier == "shipping_tracking_banner_bottom") {
          setBottomCmsBanner(cmsBlock);
        }
      });
    } else {
      setLoading(false);
    }
  }

  return (
    <>
      <SEOHead
        title="Tracking Information"
        description="Tracking Information"
        canonicalUrl={`${constants.replaceUrl}`}
      />
      <div className={`${loading || trackingLoading ? "relative" : ""}`}>
        <div
          className={`w-11/12 mx-auto font-sans text-[#282828] ${
            loading || trackingLoading ? "relative opacity-[0.5]" : ""
          }`}
        >
          <h1 className="text-center text-2xl font-semibold my-7">Tracking Information</h1>
          <TrackingInformation tracking={tracking} />
          <div className="tracking-cmsbanner mt-[30px]">
            {ReactHtmlParser(
              topCmsBanner?.content
                ?.replaceAll("&gt;", ">")
                ?.replaceAll("&lt;", "<")
                ?.replaceAll("{{media url=", `${constants.magentoBaseUrl}media/`)
                .replaceAll("}}", "")
                .replaceAll('href="https://www.elementvape.com', 'href="')
            )}
          </div>
          {tracking?.trackingNumber === null || tracking?.trackingNumber === "" ? (
            <div className="py-[30px] text-[22px] font-sans text-[#282828]">
              Tracking number is not associated with any order on our store.
            </div>
          ) : (
            <div className="flex flex-wrap pb-6">
              <ShipmentProgress tracking={tracking} />
              <DeliveryStatus tracking={tracking} />
            </div>
          )}
          <div className="tracking-cmsbanner my-[30px]">
            {ReactHtmlParser(
              bottomCmsBanner?.content
                ?.replaceAll("&gt;", ">")
                ?.replaceAll("&lt;", "<")
                ?.replaceAll("{{media url=", `${constants.magentoBaseUrl}media/`)
                .replaceAll("}}", "")
                .replaceAll('href="https://www.elementvape.com', 'href="')
            )}
          </div>
        </div>
        {loading || trackingLoading ? (
          <div className="absolute top-[10%] left-[50%]">
            <span className="">
              <i className="fa fa-spinner animate-spin text-[50px]" aria-hidden="true" />
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default React.memo(ShippingTrackingResult);