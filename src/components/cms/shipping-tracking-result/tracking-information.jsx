import Link from "next/link";
import PropTypes from "prop-types";

function TrackingInformation({ tracking }) {
  return (
    <div className="w-full bg-[#fafafa] border p-5">
      <h2 className="border-b pb-2.5 mb-5 font-semibold text-neutral-800">General Information</h2>
      <ul className="w-full flex flex-wrap">
        <li className="w-full md:w-6/12 flex mb-5 text-neutral-800">
          <h4 className="w-5/12 md:w-3/12 text-sm font-semibold">Order:</h4>
          <h4 className="w-5/12 md:w-3/12 text-sm font-bold pl-[15px]">#{tracking?.orderId}</h4>
        </li>
        <li className="w-full md:w-6/12 flex mb-5 text-neutral-800">
          <h4 className="w-5/12 md:w-3/12 text-sm font-semibold">Order Status:</h4>
          <h4 className="w-5/12 md:w-3/12 text-sm font-bold capitalize pl-[15px]">
            {tracking?.orderStatus == "complete" ? "shipped" : tracking?.orderStatus}
          </h4>
        </li>
        <li className="w-full md:w-6/12 flex mb-5 text-neutral-800">
          <h4 className="w-5/12 md:w-3/12 text-sm font-semibold">Carrier:</h4>
          <span className="inline-block text-sm font-bold  pl-[15px]">
            {tracking?.carrier == "usps"
              ? "United States Postal Service"
              : tracking?.carrier == "fedex"
              ? "Federal Express"
              : tracking?.carrier?.toUpperCase()}
          </span>
        </li>
        <li className="w-full md:w-6/12 flex mb-5 text-neutral-800">
          <h4 className="w-5/12 md:w-3/12 text-sm font-semibold">Tracking Number:</h4>
          <span className="inline-block pl-[15px] text-sm font-bold">
            {tracking?.trackingNumber}
          </span>
        </li>
        <li className="w-full md:w-6/12 flex mb-5 text-neutral-800">
          <h4 className="w-5/12 md:w-3/12 text-sm font-semibold">Direct Tracking Link:</h4>
          {tracking?.orderStatus === "complete" && tracking?.trackingUrl === "" ? (
            <h4 className="w-5/12 text-sm font-bold">View shipping status below</h4>
          ) : tracking?.trackingUrl === "" || tracking?.trackingUrl === null ? (
            <h4 className="w-5/12 md:w-3/12 text-sm font-bold">Unavailable at the moment</h4>
          ) : (
            <h4 className="w-5/12 md:w-3/12 text-sm font-medium underline underline-offset-2 pl-[15px]">
              <Link href={`${tracking?.trackingUrl}`}>
                <a>Click Here</a>
              </Link>
            </h4>
          )}
        </li>
        <li className="w-full md:w-6/12 flex mb-5 text-neutral-800">
          <h4 className="w-full text-sm font-semibold">
            {tracking?.adultSignature} for vape orders. For detailed tracking updates, <br /> please
            see below.
          </h4>
        </li>
      </ul>
    </div>
  );
}

TrackingInformation.propTypes = {
  tracking: PropTypes.objectOf(
    PropTypes.shape({
      orderStatus: PropTypes.string,
      adultSignature: PropTypes.string,
      carrier: PropTypes.string,
      trackingNumber: PropTypes.string,
      trackingUrl: PropTypes.string,
    })
  ).isRequired,
};

export default TrackingInformation;
