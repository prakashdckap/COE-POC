import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TrackingInformation from "../../../src/components/cms/shipping-tracking-result/tracking-information";
import ShipmentProgress from "../../../src/components/cms/shipping-tracking-result/shipment-progress";
import DeliveryStatus from "../../../src/components/cms/shipping-tracking-result/delivery-status";

export default function ShippingTrackingResult() {
  const shippingTrackingDetails = useSelector((state) => state.shippingTrackingDetails);
  const [tracking, setTracking] = useState({});

  useEffect(() => {
    setTracking(shippingTrackingDetails);
  }, [shippingTrackingDetails]);

  return (
    <>
      <div className="w-11/12 mx-auto px-20 font-sans text-[#282828]">
        <h1 className="text-center text-2xl font-semibold my-7">Tracking Information</h1>
        <TrackingInformation tracking={tracking} />

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
      </div>
    </>
  );
}
