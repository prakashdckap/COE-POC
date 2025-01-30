import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";

function ShipmentProgress({ tracking }) {
  const [trackingArr, setTrackingArr] = useState([]);

  useEffect(() => {
    setTrackingArr(tracking?.trackingInfo);
  }, [tracking]);

  return (
    <div className="w-full md:flex-1 lg:flex-1 xl:flex-1 mt-5 pr-3.5">
      <h2 className="border-b pb-2.5 mb-5 font-semibold text-neutral-800">Shipment Progress</h2>
      {tracking?.trackingInfo === null ? (
        <div className="py-[30px] md:text-[20px] text-[18px] font-medium font-sans text-[#282828]">
          Tracking information is not available at this time. Please check back later or
          double-check the tracking number entered and try again
        </div>
      ) : (
        <nav aria-label="Progress">
          <ol className="overflow-hidden lastLine">
            {trackingArr?.map(({ time, date, status, location, locationString }) => (
              <li className="relative pb-[26px]" key={time}>
                <div
                  className="-ml-2 absolute top-4 left-[15.5px] w-[3px] h-full last bg-[#3a801c] text-transparent"
                  aria-hidden="true"
                >
                  .
                </div>
                <div className="flex justify-between mr-2.5 text-[#282828] font-sans">
                  <div className="relative flex items-start group w-[50%]">
                    <span className="h-9 flex">
                      <span className="relative z-10 w-[18px] h-[18px] flex items-center justify-center lastCircle bg-[#3a801c] rounded-full" />
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col text-neutral-800">
                      <span className="text-[13px] mb-2.5 font-semibold tracking-wide">
                        {status}
                      </span>
                      <span className="text-[12.5px] font-medium text-skin-base">
                        <span>{time}</span>-<span>{date}</span>
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="ml-4 min-w-0 flex flex-col text-neutral-800">
                      <span className="text-[13px] mb-2.5 font-medium tracking-wide">
                        {locationString?.length
                          ? locationString
                          : `${location?.city ? `${location?.city?.toUpperCase()},` : ""} ${
                              location?.state ? location?.state : ""
                            }`}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

ShipmentProgress.propTypes = {
  tracking: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

export default ShipmentProgress;
