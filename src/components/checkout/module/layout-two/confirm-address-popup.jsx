import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { X } from "heroicons-react";
import PropTypes from "prop-types";
import useSetShippingAddress from "../../../../helper/hooks/use-set-shipping-address";
import LoadingSpinner from "../../../../helper/loading-spinner";
import useSetDealerInfo from "../../../../helper/hooks/use-set-dealer-info";
import UseRegionList from "../../../../helper/hooks/use-region-list";
import { useRouter } from "next/router";

export default function ConfirmAddressPopup({
  setaddressVerificationPopup,
  enteredAddress,
  setshowDropDownForm,
  setshowSavedAddress,
  addressVerificationPopup,
}) {
  const {
    verifiedAddressArr,
    customerCartId,
    customerToken,
    guestCartId,
    checkoutShippingAddress,
  } = useSelector((state) => state);

  const { handleDealerInfo } = useSetDealerInfo();
  const history = useRouter();

  const { handleSetShippingAddress, shippingAddressLoading } = useSetShippingAddress();

  const [verifiedAddress, setverifiedAddress] = useState([]);
  const [selectedAddress, setSelectedAddr] = useState("entered_address");
  const [selectedRegionFullName, setSelectedRegionName] = useState("");

  const currentRef = useRef(null);

  useEffect(() => {
    setverifiedAddress(verifiedAddressArr);
    if (Array.isArray(verifiedAddressArr)) {
      if (verifiedAddressArr[0]) setSelectedAddr(verifiedAddressArr[0]?.region_id);
    }
  }, [verifiedAddressArr]);

  const selectShippingAddress = (type, address) => {
    if (type === "original") {
      const shippingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,

        shippingAddress: {
          address: enteredAddress,
        },
      };
      handleSetShippingAddress(
        shippingAddressVariables,
        "",
        "",
        setaddressVerificationPopup,
        setshowDropDownForm,
        setshowSavedAddress
      );
    } else {
      const shippingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,

        shippingAddress: {
          address: {
            firstName: enteredAddress?.firstName,
            lastName: enteredAddress?.lastName,
            company: enteredAddress?.company,
            street: address?.street?.filter((street) => street),
            city: address?.city,
            postcode: address?.zip,
            telephone: enteredAddress?.telephone,
            region: address?.region_id,
            country: address?.country,
          },
        },
      };
      handleSetShippingAddress(
        shippingAddressVariables,
        "",
        "",
        setaddressVerificationPopup,
        setshowDropDownForm,
        setshowSavedAddress
      );
    }
  };

  const { street, city, region, country, postcode } = enteredAddress;

  const { regions } = UseRegionList(country || null);

  useEffect(() => {
    if (regions && region) {
      const regionName = regions?.find((state) => state.code === region)?.name;
      setSelectedRegionName(regionName);
    }
  }, [regions]);

  const handleRegion = () => {
    if (history?.query?.isPudo === "true")
      handleDealerInfo({
        dealerId: checkoutShippingAddress?.dealerId,
        dealerName: checkoutShippingAddress?.dealerName,
        dealerNo: checkoutShippingAddress?.dealerNo,
        dealerHours: checkoutShippingAddress?.dealerHours,
      });
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const capitalizeStr = (str) => {
    if (str) {
      const capitalStr = str.split(" ").map(capitalize).join(" ");
      return capitalStr;
    } else str;
  };

  const changeAddress = (e) => {
    if (e.target.checked) {
      setSelectedAddr(e.target.name);
    }
  };

  return (
    <div className="fixed h-screen md:h-full top-0 left-0 w-full  z-50 bg-[#F4F4F3] md:bg-[rgba(51,51,51,.55)]">
      <div
        className={`${
          shippingAddressLoading ? "cursor-not-allowed" : null
        } bg-skin-inverted mt-0 md:mt-14 px-2 py-1.5 text-center w-full bg-white sm:w-[40rem] mx-auto h-full md:h-auto`}
        ref={currentRef}
      >
        <div
          className={`${
            shippingAddressLoading ? "opacity-40 pointer-events-none" : null
          } border-[3px] border-black bg-white rounded-lg p-6 pb-8 relative h-full md:h-auto`}
        >
          <button type="button" onClick={() => setaddressVerificationPopup(false)}>
            <i className="absolute top-2 right-3 bg-black text-skin-inverted rounded-full p-1 cursor-pointer">
              <X />
            </i>
          </button>

          <h3 className="uppercase text-[22px] font-bold tracking-[.03em] font-sans mt-4">
            Confirm Your Address
          </h3>
          <p className="text-center text-[#7c7c7c] text-[15px] mt-3">
            {`We couldn't exact address you entered, but did find a close match. please make sure your
            mailing address is correct to ensure accurate delivery`}
          </p>
          <div className="mt-4">
            <h5 className="text-center text-[16px] font-semibold">Suggested address:</h5>
            <div className="max-h-60 overflow-auto">
              {verifiedAddress?.length ? (
                verifiedAddress?.map((address, i) => (
                  <div
                    className="border flex items-center justify-around py-4 pl-2 pr-5 mt-2"
                    key={address?.region_id}
                  >
                    <input
                      type="radio"
                      name={address?.region_id}
                      checked={selectedAddress === address?.region_id ? true : false}
                      defaultChecked={i === 0 ? true : false}
                      className="checked border-[2px] border-black h-3 w-3 text-[15px] text-[#454545] bg-black accent-black"
                      onChange={changeAddress}
                    />
                    <div className="flex items-center flex-col md:flex-row justify-between">
                      <p
                        className={`text-center md:text-left mb-[10px] md:mb-0 ml-4 text-[15px] font-semibold ${
                          selectedAddress === address?.region_id
                            ? " text-[#285f27]"
                            : "text-[#7e7e7e]"
                        }`}
                      >
                        {capitalizeStr(address?.street[0]) || null},{" "}
                        {address?.street[1] ? `${capitalizeStr(address?.street[1])}, ` : null}
                        {capitalizeStr(address?.city)}, {capitalizeStr(address?.region)},{" "}
                        {address?.country}, {address?.zip}
                      </p>
                      <button
                        onClick={() => {
                          selectShippingAddress("change", address);
                          if (checkoutShippingAddress?.dealerId) handleRegion();
                        }}
                        type="button"
                        className={`${
                          selectedAddress === address?.region_id
                            ? "bg-[#333] hover:text-[#000] hover:bg-white"
                            : "bg-white text-[#000] hover:text-[#fff] hover:bg-[#333]"
                        } text-skin-inverted rounded-[2px] transition-all ease-in-out duration-300 border-[#333] min-w-[164px] max-w-[164px] border-2 text-sm font-semibold py-2 px-3 hover:text-skin-inverted ml-4 whitespace-nowrap`}
                      >
                        {/* Use this address */}
                        Use this address
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border flex items-center py-4 pl-2 pr-5 mt-2">
                  {/* <span className="text-sm text-skin-primary">* Address Not Found</span> */}
                  <span className="text-[15px] leading-[1.35] Suggested-address-message">
                    * No Suggested Address Found, Choose Original Address
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h5 className="text-center text-[16px] font-semibold">Address entered:</h5>
            <div className="border flex items-center justify-around py-4 pl-2 pr-5 mt-2">
              <input
                type="radio"
                name="entered_address"
                checked={selectedAddress === "entered_address" ? true : false}
                className="checked border-[2px] border-black h-3 w-3 text-[15px] text-[#454545] bg-black accent-black"
                onChange={changeAddress}
              />
              <div className="flex items-center flex-col md:flex-row justify-between">
                <p
                  className={`text-center md:text-left mb-[10px] md:mb-0 ml-4 text-[15px] font-semibold ${
                    selectedAddress === "entered_address" ? " text-[#285f27]" : "text-[#7e7e7e]"
                  }`}
                >
                  {street?.[0] || null}, {street?.[1] ? `${street?.[1]}, ` : null}
                  {city}, {selectedRegionFullName || region}, {country}, {postcode}
                </p>
                <button
                  onClick={() => {
                    selectShippingAddress("original");
                    if (checkoutShippingAddress?.dealerId) handleRegion();
                  }}
                  type="button"
                  className={`${
                    selectedAddress === "entered_address"
                      ? "bg-[#333] hover:text-[#000] hover:bg-white"
                      : "bg-white text-[#000] hover:text-[#fff] hover:bg-[#333]"
                  } text-skin-inverted rounded-[2px] transition-all ease-in-out duration-300 border-[#333] min-w-[164px] max-w-[164px] border-2 text-sm font-semibold py-2 px-3 hover:text-skin-inverted ml-4 whitespace-nowrap`}
                >
                  Use original
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmAddressPopup.defaultProps = {
  enteredAddress: {},
};

ConfirmAddressPopup.propTypes = {
  setaddressVerificationPopup: PropTypes.func.isRequired,
  enteredAddress: PropTypes.shape(),
  setshowDropDownForm: PropTypes.func.isRequired,
  setshowSavedAddress: PropTypes.func.isRequired,
};
