import PropTypes from "prop-types";

function DeliveryStatus({ tracking }) {
 
  return (
    <div className="w-full md:w-4/12 lg:w-[17rem] xl:w-[17rem] mt-5 bg-zinc-50">
      <ol className="overflow-hidden py-7 flex flex-row justify-around md:flex-col">
        <li className="relative w-3/12 md:w-full pb-10 flex items-start justify-around items-center flex-row md:flex-col">
          <div className="flex items-center flex-col">
            <span
              className={`z-10 w-16 h-16 md:w-[90px] md:h-[90px] flex items-center justify-center rounded-full ${
                tracking?.shipmentStatus === "0" ||
                tracking?.shipmentStatus === "1" ||
                tracking?.shipmentStatus === "2" ||
                tracking?.shipmentStatus === "3"
                  ? "bg-[#3a801c]"
                  : "bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 md:w-12 md:h-12"
                viewBox="0 0 49.968 49.967"
              >
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M49.968,21.063a5.39,5.39,0,0,0-5.384-5.384H42.917L37.8,3.323a5.384,5.384,0,1,0-9.948,4.121l3.411,8.235H18.706l3.411-8.235a5.384,5.384,0,0,0-9.948-4.121L7.051,15.679H5.384a5.384,5.384,0,0,0-1.3,10.608l2.47,18.524a6.078,6.078,0,0,0,5.889,5.156H37.528a6.078,6.078,0,0,0,5.889-5.156l2.47-18.525A5.392,5.392,0,0,0,49.968,21.063ZM30.556,6.324a2.456,2.456,0,1,1,4.538-1.88l4.654,11.235H34.431ZM14.874,4.444a2.456,2.456,0,1,1,4.538,1.88l-3.875,9.355H10.22Zm25.642,39.98a3.142,3.142,0,0,1-2.987,2.615H12.44a3.141,3.141,0,0,1-2.987-2.615l-2.4-17.977H42.913Zm4.068-20.905H5.384a2.456,2.456,0,1,1,0-4.912h39.2a2.456,2.456,0,1,1,0,4.912Zm0,0"
                  transform="translate(0 0)"
                  fill="#fff"
                />
              </svg>
            </span>
            <span className="text-sm my-3.5 font-bold tracking-wide">Ordered</span>
          </div>
          <div
            className={`h-1.5 w-2.5 -mt-10 md:mt-0 md:ml-0 md:w-2 md:h-10 ${
              tracking?.shipmentStatus === "1" ||
              tracking?.shipmentStatus === "2" ||
              tracking?.shipmentStatus === "3"
                ? "bg-[#3a801c]"
                : "bg-gray-200"
            } rounded text-transparent`}
            aria-hidden="true"
          >
            .
          </div>
        </li>
        <li className="relative w-3/12 md:w-full pb-10 flex items-start justify-around items-center flex-row md:flex-col">
          <div className="flex items-center flex-col">
            <span
              className={`z-10 w-16 h-16 md:w-[90px] md:h-[90px] flex items-center justify-center rounded-full ${
                tracking?.shipmentStatus === "1" ||
                tracking?.shipmentStatus === "2" ||
                tracking?.shipmentStatus === "3"
                  ? "bg-[#3a801c]"
                  : "bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Group_7"
                data-name="Group 7"
                width="52.592"
                height="36.857"
                className="w-10 h-10 md:w-12 md:h-12"
                viewBox="0 0 52.592 36.857"
              >
                <path
                  id="Path_11"
                  data-name="Path 11"
                  d="M50.807,83.431l-3.581-1.55-3.041-5.918a4.789,4.789,0,0,0-4.309-2.618H34.639V71.865A4.831,4.831,0,0,0,29.825,67H4.791A4.818,4.818,0,0,0,0,71.865V94.527a2.952,2.952,0,0,0,2.912,2.994h.669c0,.117-.012.164-.012.235a6.082,6.082,0,0,0,12.164.047v-.059a1.827,1.827,0,0,0-.012-.235H35.954v.235a6.082,6.082,0,0,0,12.164.047V97.5h1.515a2.962,2.962,0,0,0,2.959-2.959V86.155A2.945,2.945,0,0,0,50.807,83.431ZM9.664,101.525A3.734,3.734,0,1,1,13.4,97.791,3.728,3.728,0,0,1,9.664,101.525ZM32.29,95.2H15.171a6.074,6.074,0,0,0-11.014,0H2.96a.608.608,0,0,1-.611-.646V88.5H32.29Zm0-23.319V86.155H2.349V71.877a2.471,2.471,0,0,1,2.442-2.513H29.825a2.488,2.488,0,0,1,2.466,2.5ZM34.639,75.7h5.237a2.478,2.478,0,0,1,2.231,1.327l2.348,4.544H34.639Zm7.409,25.82a3.734,3.734,0,1,1,3.734-3.734A3.728,3.728,0,0,1,42.048,101.525Zm8.207-6.975a.608.608,0,0,1-.611.646h-2.09a6.078,6.078,0,0,0-11.014,0h-1.9V83.924H46.145l3.734,1.644a.691.691,0,0,1,.376.634Z"
                  transform="translate(0 -67.004)"
                  fill="#fff"
                />
              </svg>
            </span>
            <span className="text-sm my-3.5 font-bold tracking-wide">In Transit</span>
          </div>
          <div
            className={`h-1.5 w-2.5 -mt-10 md:mt-0 md:ml-0 md:w-2 md:h-10 ${
              tracking?.shipmentStatus === "2" ||
              tracking?.shipmentStatus === "3"
                ? "bg-[#3a801c]"
                : "bg-gray-200"
            } rounded text-transparent`}
            aria-hidden="true"
          >
            .
          </div>
        </li>
        <li className="relative w-3/12 md:w-full pb-10 flex items-start justify-around items-center flex-row md:flex-col">
          <div className="flex items-center flex-col">
            <span
              className={`z-10 w-16 h-16 md:w-[90px] md:h-[90px] flex items-center justify-center rounded-full ${
                tracking?.shipmentStatus === "2" || tracking?.shipmentStatus === "3"
                  ? "bg-[#3a801c]"
                  : "bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="53.678"
                height="41.2"
                className="w-10 h-10 md:w-12 md:h-12"
                viewBox="0 0 53.678 41.2"
              >
                <g id="Tracking" transform="translate(-1.9 -8.9)">
                  <path
                    id="Path_12"
                    data-name="Path 12"
                    d="M55.217,32.848,44.152,21.783A2.654,2.654,0,0,0,42.261,21h-15.3v1.783h4.457v13.37H33.2V22.783h9.065a.891.891,0,0,1,.631.261l1.521,1.521H40.326a1.783,1.783,0,0,0-1.783,1.783V34.37a1.783,1.783,0,0,0,1.783,1.783H53.7v7.13a.891.891,0,0,1-.891.891H50.95a6.231,6.231,0,0,0-12.336,0H25.994a6.231,6.231,0,0,0-12.336,0H11.8a.891.891,0,0,1-.891-.891V35.261H9.13v8.022A2.674,2.674,0,0,0,11.8,45.957h1.854a6.22,6.22,0,0,0,1.81,3.565H2V51.3H44.783a6.244,6.244,0,0,0,6.168-5.348H52.8a2.674,2.674,0,0,0,2.674-2.674v-9.8a.891.891,0,0,0-.261-.63ZM15.37,45.065a4.457,4.457,0,1,1,4.457,4.457A4.457,4.457,0,0,1,15.37,45.065Zm8.814,4.457a6.219,6.219,0,0,0,1.81-3.565H38.615a6.219,6.219,0,0,0,1.81,3.565Zm20.6,0a4.457,4.457,0,1,1,4.457-4.457,4.457,4.457,0,0,1-4.457,4.457ZM40.326,34.37V26.348H46.2l7.5,7.5v.522Z"
                    transform="translate(0 -1.304)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <rect
                    id="Rectangle_8"
                    data-name="Rectangle 8"
                    width="1"
                    height="1"
                    transform="translate(19.217 44)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <rect
                    id="Rectangle_9"
                    data-name="Rectangle 9"
                    width="1"
                    height="1"
                    transform="translate(44.217 44)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <rect
                    id="Rectangle_10"
                    data-name="Rectangle 10"
                    width="4"
                    height="3"
                    transform="translate(2.217 40)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <rect
                    id="Rectangle_11"
                    data-name="Rectangle 11"
                    width="2"
                    height="2"
                    transform="translate(4.217 36)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <rect
                    id="Rectangle_12"
                    data-name="Rectangle 12"
                    width="2"
                    height="2"
                    transform="translate(4.217 33)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <path
                    id="Path_13"
                    data-name="Path 13"
                    d="M13.587,32.174A11.587,11.587,0,1,0,2,20.587,11.587,11.587,0,0,0,13.587,32.174Zm0-21.391a9.8,9.8,0,1,1-9.8,9.8,9.8,9.8,0,0,1,9.8-9.8Z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <path
                    id="Path_14"
                    data-name="Path 14"
                    d="M14.239,29.043a.891.891,0,0,0,.63-.261c.574-.574,5.609-5.72,5.609-9.543A6.239,6.239,0,0,0,8,19.239c0,3.824,5.035,8.969,5.609,9.543A.891.891,0,0,0,14.239,29.043Zm0-14.261A4.462,4.462,0,0,1,18.7,19.239c0,2.287-2.8,5.821-4.457,7.622-1.652-1.8-4.457-5.334-4.457-7.622a4.462,4.462,0,0,1,4.457-4.457Z"
                    transform="translate(-0.652 -0.435)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <path
                    id="Path_15"
                    data-name="Path 15"
                    d="M17.348,19.674a2.674,2.674,0,1,0-2.674,2.674A2.674,2.674,0,0,0,17.348,19.674Zm-3.565,0a.891.891,0,1,1,.891.891A.891.891,0,0,1,13.783,19.674Z"
                    transform="translate(-1.087 -0.87)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                  <rect
                    id="Rectangle_13"
                    data-name="Rectangle 13"
                    width="2"
                    height="2"
                    transform="translate(37.217 36)"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.2"
                  />
                </g>
              </svg>
            </span>
            <span className="text-sm sm:my-3.5  text-center font-bold tracking-wide">
              Out for Delivery
            </span>
          </div>
          <div
            className={`h-1.5 w-2.5 -mt-10 md:mt-0 md:ml-0 md:w-2 md:h-10 ${
              tracking?.shipmentStatus === "3"
                ? "bg-[#3a801c]"
                : "bg-gray-200"
            } rounded text-transparent"
            aria-hidden="true`}
          >
            .
          </div>
        </li>
        <li className="relative w-3/12 md:w-full pb-10 flex items-start justify-around items-center flex-row md:flex-col">
          <div className="flex items-center flex-col">
            <span
              className={`z-10 w-16 h-16 md:w-[90px] md:h-[90px] flex items-center justify-center rounded-full ${
                tracking?.shipmentStatus === "3" ? "bg-[#3a801c]" : "bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46.638"
                height="46.638"
                className="w-10 h-10 md:w-12 md:h-12"
                viewBox="0 0 46.638 46.638"
              >
                <g id="stay-home" transform="translate(-0.001 0)">
                  <path
                    id="Path_16"
                    data-name="Path 16"
                    d="M39.173,26.929V15.978a2.745,2.745,0,0,0,.7-.092,2.729,2.729,0,0,0,.664-5L22.344.382A2.732,2.732,0,0,0,19.585.367L1.362,10.888A2.73,2.73,0,0,0,2.73,15.979V33.994a2.778,2.778,0,0,0,.911,5.4H26.991A10.02,10.02,0,1,0,39.173,26.929ZM1.945,13.7a.908.908,0,0,1,.329-1.239L20.5,1.944a.909.909,0,0,1,.92.006l.011.006,18.2,10.507a.907.907,0,1,1-.91,1.569L21.407,4.039a.911.911,0,0,0-.911,0L15.39,6.986A.911.911,0,0,0,16.3,8.564l4.65-2.685,16.4,9.468V26.625q-.363-.026-.732-.027a10.038,10.038,0,0,0-9.628,7.242h-.575V22a.911.911,0,0,0-.911-.911H16.4a.911.911,0,0,0-.911.911V33.84H4.551V15.348L9.2,12.664a.911.911,0,0,0-.911-1.578L3.184,14.034a.907.907,0,0,1-1.239-.33ZM24.595,33.84H17.307V22.909h7.287ZM3.641,37.575a.956.956,0,1,1,0-1.913h23c-.03.315-.046.634-.046.956s.016.642.046.956Zm32.978,7.242a8.2,8.2,0,1,1,8.2-8.2A8.207,8.207,0,0,1,36.619,44.816Z"
                    transform="translate(0 0)"
                    fill="#fff"
                  />
                  <path
                    id="Path_17"
                    data-name="Path 17"
                    d="M193.636,128.78a3.644,3.644,0,1,0-3.644-3.644A3.648,3.648,0,0,0,193.636,128.78Zm0-5.465a1.822,1.822,0,1,1-1.822,1.822A1.824,1.824,0,0,1,193.636,123.315Z"
                    transform="translate(-172.684 -110.426)"
                    fill="#fff"
                  />
                  <path
                    id="Path_18"
                    data-name="Path 18"
                    d="M125.881,99.677a.911.911,0,0,0,0-1.822h0a.911.911,0,0,0,0,1.822Z"
                    transform="translate(-113.585 -88.941)"
                    fill="#fff"
                  />
                  <path
                    id="Path_19"
                    data-name="Path 19"
                    d="M346.122,348.391a2.733,2.733,0,0,0-3.864,0l-2.514,2.514-.427-.427a2.733,2.733,0,0,0-3.864,3.864l2.359,2.359a2.733,2.733,0,0,0,3.864,0l4.446-4.446a2.733,2.733,0,0,0,0-3.864Zm-1.288,2.576-4.446,4.446a.911.911,0,0,1-1.288,0l-2.359-2.359a.911.911,0,0,1,1.288-1.288l1.071,1.071a.911.911,0,0,0,1.288,0l3.158-3.158a.911.911,0,1,1,1.288,1.288Z"
                    transform="translate(-304.168 -315.929)"
                    fill="#fff"
                  />
                </g>
              </svg>
            </span>
            <span className="text-sm md:my-3.5 my-[9px] font-bold tracking-wide">Delivered</span>
          </div>
        </li>
      </ol>
    </div>
  );
}

DeliveryStatus.propTypes = {
  tracking: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

export default DeliveryStatus;