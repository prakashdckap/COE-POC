import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import CardDetails from "../../components/checkout/payment/card-details";

function CheckoutRadio({
  item,
  setselectedMethod,
  selectedMethod,
  shippingMethodLoading,
  estimate,
  payment,
  estimateCheckout,
  estimateSelectedMethod,
  setEstimateSelectedMethod,
  estimateShippingMethodLoading,
  isDisabled = false,
}) {
  const checkoutShippingMethod = useSelector((state) => state.checkoutShippingMethod);
  const checkoutPaymentMethod = useSelector((state) => state.checkoutPaymentMethod);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);

  const history = useRouter();
  const { pathname } = history;

  let displayText = "";
  let checked;

  if (estimate) {
    displayText = item?.description;
    checked = item?.methodCode === selectedMethod;
  } else if (payment) {
    displayText = item?.methodName;
    checked = checkoutPaymentMethod?.methodCode
      ? checkoutPaymentMethod?.methodCode === item?.methodCode
      : item?.methodCode === "authnetcim";
  } else if (estimateCheckout) {
    displayText = `${item?.description}-${item.methodName}`;
    checked = item?.methodCode === estimateSelectedMethod;
  } else {
    displayText = `${item?.description}-${item.methodName}`;
    checked = checkoutShippingMethod?.methodCode === item?.methodCode;
  }

  const updateSelectedMethod = (e) => {
    if (selectedMethod !== e.target.value) {
      // let a = document?.querySelector("#" + item?.methodCode);
      // a.checked = false;
      !estimateSelectedMethod
        ? setselectedMethod(e.target.value)
        : setEstimateSelectedMethod(e.target.value);
    }
  };

  return (
    <div
      className={`${
        shippingMethodLoading || estimateShippingMethodLoading
          ? "opacity-50 pointer-events-none"
          : null
      }  ${
        history.pathname == "/cartmodule"
          ? ""
          : " border border-gray-400 flex items-center w-full justify-between  rounded p-4 mb-4"
      } `}
      id={item?.methodCode + "_method"}
    >
      {history.pathname !== "/cartmodule" ? (
        <>
          <div onClick={updateSelectedMethod}>
            <input
              disabled={isDisabled}
              className="focus:ring-indigo-500 h-4 w-5 text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed z-10 border-gray-300 flex items-center cursor-pointer"
              type="radio"
              id={item?.methodCode}
              value={item?.methodCode}
              checked={checked}
              aria-label={
                item?.methodCode !== "sezzlepay"
                  ? displayText
                  : "shipping method"
              }
            />
          </div>

          <label
            htmlFor={estimate ? item?.method_title : item?.methodName}
            className={`${
              shippingMethodLoading || estimateShippingMethodLoading ? "cursor-not-allowed" : ""
            } ml-3 text-[13px] font-semibold text-gray-700 flex items-center justify-between w-full`}
          >
            {item?.methodCode === "mr_quadpay" ? (
              <span className="pr-2 flex">
                <svg
                  width="37"
                  height="23"
                  viewBox="0 0 74 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Zip</title>
                  <path
                    d="M1 4.66667C1 2.64162 2.64162 1 4.66667 1H69.3333C71.3584 1 73 2.64162 73 4.66667V41.3333C73 43.3584 71.3584 45 69.3333 45H4.66667C2.64162 45 1 43.3584 1 41.3333V4.66667Z"
                    fill="#1A0826"
                  />
                  <path
                    d="M27.4662 16.689L29.3432 31.9599H47.6971L45.82 16.689H27.4662Z"
                    fill="#AA8FFF"
                  />
                  <path
                    d="M32.7021 10.8616C33.8727 11.962 34.0332 13.6929 33.0607 14.7276C32.0881 15.7623 30.3508 15.709 29.1802 14.6085C28.0096 13.508 27.849 11.7771 28.8215 10.7424C29.7941 9.70775 31.5315 9.76107 32.7021 10.8616Z"
                    fill="#FFFFFA"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M66.9321 22.1878C66.5096 18.7533 63.8117 16.677 60.1482 16.689H47.9445L49.8216 31.96H55.3138L54.9396 28.9058H60.7518C65.3206 28.9058 67.4149 26.0568 66.9321 22.1878ZM60.1542 24.6263L54.4085 24.6323L53.9558 20.9685L59.7318 20.9745C61.0898 20.9926 61.7838 21.7532 61.8985 22.8034C61.9709 23.4734 61.6631 24.6263 60.1542 24.6263Z"
                    fill="#FFFFFA"
                  />
                  <path
                    d="M8.35195 27.6926L8.87703 31.96H27.2127L26.6092 27.0769H18.063L17.9845 26.4673L25.8608 20.9685L25.3357 16.689H7L7.59751 21.5781H16.1618L16.2403 22.1878L8.35195 27.6926Z"
                    fill="#FFFFFA"
                  />
                  <path
                    d="M4.66667 2H69.3333V0H4.66667V2ZM72 4.66667V41.3333H74V4.66667H72ZM69.3333 44H4.66667V46H69.3333V44ZM2 41.3333V4.66667H0V41.3333H2ZM4.66667 44C3.19391 44 2 42.8061 2 41.3333H0C0 43.9107 2.08934 46 4.66667 46V44ZM72 41.3333C72 42.8061 70.8061 44 69.3333 44V46C71.9107 46 74 43.9107 74 41.3333H72ZM69.3333 2C70.8061 2 72 3.19391 72 4.66667H74C74 2.08934 71.9107 0 69.3333 0V2ZM4.66667 0C2.08934 0 0 2.08934 0 4.66667H2C2 3.19391 3.19391 2 4.66667 2V0Z"
                    fill="#1A0826"
                  />
                </svg>
                <span className="ml-1">Pay in 4 installments</span>
              </span>
            ) : (
              item?.methodCode !== "sezzlepay" && (
                <span className="pr-2 flex flex-col">{displayText}</span>
              )
            )}
            {item?.methodCode === "authnetcim" ? <img src="/assets/card.svg" alt="card" /> : ""}
            {item?.methodCode === "sezzlepay" ? (
              <img
                src="https://media.sezzle.com/branding/sezzle-logos/sezzle-pay-over-time-no-interest@2x.png"
                alt={displayText}
                style={{ maxHeight: 24 }}
              />
            ) : (
              ""
            )}
            {!payment ? (
              <strong className="whitespace-nowrap">&#x24;{item?.amount?.toFixed(2)}</strong>
            ) : null}
          </label>
        </>
      ) : (
        <>
          <label
            htmlFor={estimate ? item?.method_title : item?.methodName}
            className={`${
              shippingMethodLoading || estimateShippingMethodLoading ? "cursor-not-allowed" : ""
            } text-[13px] font-semibold text-gray-700 flex items-center justify-between w-full`}
          >
            {item?.methodCode === "mr_quadpay" && (
              <span className="pr-2 flex">
                <svg
                  width="37"
                  height="23"
                  viewBox="0 0 74 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Zip</title>
                  <path
                    d="M1 4.66667C1 2.64162 2.64162 1 4.66667 1H69.3333C71.3584 1 73 2.64162 73 4.66667V41.3333C73 43.3584 71.3584 45 69.3333 45H4.66667C2.64162 45 1 43.3584 1 41.3333V4.66667Z"
                    fill="#1A0826"
                  />
                  <path
                    d="M27.4662 16.689L29.3432 31.9599H47.6971L45.82 16.689H27.4662Z"
                    fill="#AA8FFF"
                  />
                  <path
                    d="M32.7021 10.8616C33.8727 11.962 34.0332 13.6929 33.0607 14.7276C32.0881 15.7623 30.3508 15.709 29.1802 14.6085C28.0096 13.508 27.849 11.7771 28.8215 10.7424C29.7941 9.70775 31.5315 9.76107 32.7021 10.8616Z"
                    fill="#FFFFFA"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M66.9321 22.1878C66.5096 18.7533 63.8117 16.677 60.1482 16.689H47.9445L49.8216 31.96H55.3138L54.9396 28.9058H60.7518C65.3206 28.9058 67.4149 26.0568 66.9321 22.1878ZM60.1542 24.6263L54.4085 24.6323L53.9558 20.9685L59.7318 20.9745C61.0898 20.9926 61.7838 21.7532 61.8985 22.8034C61.9709 23.4734 61.6631 24.6263 60.1542 24.6263Z"
                    fill="#FFFFFA"
                  />
                  <path
                    d="M8.35195 27.6926L8.87703 31.96H27.2127L26.6092 27.0769H18.063L17.9845 26.4673L25.8608 20.9685L25.3357 16.689H7L7.59751 21.5781H16.1618L16.2403 22.1878L8.35195 27.6926Z"
                    fill="#FFFFFA"
                  />
                  <path
                    d="M4.66667 2H69.3333V0H4.66667V2ZM72 4.66667V41.3333H74V4.66667H72ZM69.3333 44H4.66667V46H69.3333V44ZM2 41.3333V4.66667H0V41.3333H2ZM4.66667 44C3.19391 44 2 42.8061 2 41.3333H0C0 43.9107 2.08934 46 4.66667 46V44ZM72 41.3333C72 42.8061 70.8061 44 69.3333 44V46C71.9107 46 74 43.9107 74 41.3333H72ZM69.3333 2C70.8061 2 72 3.19391 72 4.66667H74C74 2.08934 71.9107 0 69.3333 0V2ZM4.66667 0C2.08934 0 0 2.08934 0 4.66667H2C2 3.19391 3.19391 2 4.66667 2V0Z"
                    fill="#1A0826"
                  />
                </svg>
                <span className="ml-1">Pay in 4 installments</span>
              </span>
            )}
            {item?.methodCode === "authnetcim" ? <img src="/assets/card.svg" alt="card" /> : ""}
            {item?.methodCode === "sezzlepay" ? (
              <img
                src="https://media.sezzle.com/branding/sezzle-logos/sezzle-pay-over-time-no-interest@2x.png"
                alt={displayText}
                style={{ maxHeight: 24 }}
              />
            ) : (
              ""
            )}
          </label>
          <div>
            <div>
              {item?.methodCode !== "sezzlepay" && (
                <span className=" mb-[5px] flex flex-col text-[13px] leading-[1.35] font-bold text-[#282828]">
                  {displayText}
                </span>
              )}
            </div>

            <div className="flex items-center mb-[10px]">
              <div onClick={updateSelectedMethod}>
                <input
                  // disabled={!checkoutShippingAddress?.firstName && pathname === "/checkout"}
                  className="focus:ring-indigo-500 h-[13px] w-[13px] text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed z-10 border-gray-300 flex items-center cursor-pointer"
                  type="radio"
                  onChange={(e) =>
                    !estimateSelectedMethod
                      ? setselectedMethod(e.target.value)
                      : setEstimateSelectedMethod(e.target.value)
                  }
                  value={item?.methodCode}
                  checked={checked}
                />
              </div>
              {!payment ? (
                <p className="whitespace-nowrap text-[13px] leading-[1.35] font-normal text-[#282828] pl-2 ">
                  <span className="pr-1">{item?.methodName}</span>&#x24;{item?.amount?.toFixed(2)}
                </p>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

CheckoutRadio.defaultProps = {
  item: {},
  shippingMethodLoading: false,
  estimate: false,
  selectedMethod: "",
  payment: false,
};

CheckoutRadio.propTypes = {
  item: PropTypes.shape({
    methodName: PropTypes.string,
    amount: PropTypes.number,
    description: PropTypes.string,
    methodCode: PropTypes.string,
    method_code: PropTypes.string,
    carrier_title: PropTypes.string,
    method_title: PropTypes.string,
  }),
  setselectedMethod: PropTypes.func.isRequired,
  shippingMethodLoading: PropTypes.bool,
  estimate: PropTypes.bool,
  selectedMethod: PropTypes.string,
  payment: PropTypes.bool,
};

export default CheckoutRadio;
