import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { X } from "heroicons-react";
import UserADDADDRESS from "../../../../helper/hooks/customer/use-add-address";
import LoadingSpinner from "../../../../helper/loading-spinner";
import UseRegionList from "../../../../helper/hooks/use-region-list";
import useEditAddress from "../../../../helper/hooks/customer/use-edit-address";

export default function NewAddressConfirm({
  ConfirmedAddressPopup,
  setConfirmedAddressPopup,
  selectedRegion,
  setOpen,
}) {
  const currentRef = useRef(null);
  const { userAddAddress, loading, newAddress } = UserADDADDRESS();

  const { userEditAddress } = useEditAddress();

  const [selectedAddress, setSelectedAddr] = useState("entered_address");
  const [verifiedAddress, setverifiedAddress] = useState([]);
  const { verifiedAddressArr } = useSelector((state) => state);
  const [useAddresApi, setUseAddressApi] = useState(null);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    setverifiedAddress(verifiedAddressArr);
    if (Array.isArray(verifiedAddressArr)) {
      if (verifiedAddressArr[0]) setSelectedAddr(verifiedAddressArr[0]?.region_id);
    }

    const validatedAddress = verifiedAddressArr[0];

    let verifiedAddressApi = {
      firstName: ConfirmedAddressPopup?.address?.firstName,
      lastName: ConfirmedAddressPopup?.address?.lastName,
      street: [`${validatedAddress?.street[0]} ${validatedAddress?.street[1]}`],
      city: validatedAddress?.city,
      postcode: validatedAddress?.zip,
      telephone: ConfirmedAddressPopup?.address?.telephone,
      fax: ConfirmedAddressPopup?.address?.fax,
      region: {
        id: Number(validatedAddress?.region_id),
        region: validatedAddress?.region_code,
      },
      country: validatedAddress?.country,
      defaultBilling: ConfirmedAddressPopup?.address?.defaultBilling,
      defaultShipping: ConfirmedAddressPopup?.address?.defaultShipping,
    };
    setUseAddressApi({ address: verifiedAddressApi, addressId: ConfirmedAddressPopup?.addressId });
  }, [verifiedAddressArr]);

  // This method for outside click to close the addressVerificationPopup
  const handleClickOutsidePopup = (event) => {
    if (ConfirmedAddressPopup) {
      if (
        currentRef.current &&
        !currentRef.current.contains(event.target) &&
        event.target.innerText !== "PLACE ORDER"
      ) {
        setOpen(false);
      }
    }
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

  //outside click to close addressVerificationPopup
  useEffect(() => {
    document.addEventListener("click", handleClickOutsidePopup);
    return () => {
      document.removeEventListener("click", handleClickOutsidePopup);
    };
  }, []);

  const changeAddress = (e) => {
    if (e.target.checked) {
      setSelectedAddr(e.target.name);
    }
  };

  return (
    <>
      <div className="fixed h-screen md:h-full top-0 left-0 w-full  z-50 bg-[#F4F4F3] md:bg-[rgba(51,51,51,.55)]">
        <div
          className={`bg-skin-inverted mt-0 md:mt-14 px-2 py-1.5 text-center w-full bg-white sm:w-[40rem] mx-auto h-full md:h-auto`}
          ref={currentRef}
        >
          <div
            className={`border-[3px] border-black bg-white rounded-lg p-6 pb-8 relative h-full md:h-auto`}
          >
            <button type="button" onClick={() => setOpen(false)}>
              <i className="absolute top-2 right-3 bg-black text-skin-inverted rounded-full p-1 cursor-pointer">
                <X />
              </i>
            </button>
            <h3 className="uppercase text-[22px] font-bold tracking-[.03em] font-sans mt-4">
              {" "}
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
                          className={`text-center md:text-left md:w-[50%]  mb-[10px] md:mb-0 ml-4 text-[15px] font-semibold ${
                            selectedAddress === address?.region_id
                              ? " text-[#285f27]"
                              : "text-[#7e7e7e]"
                          }`}
                        >
                          {ConfirmedAddressPopup?.address?.firstName || null}{" "}
                          {ConfirmedAddressPopup?.address?.lastName || null} <br />
                          {capitalizeStr(address?.street[0]) || null},{" "}
                          {address?.street[1] ? `${capitalizeStr(address?.street[1])},` : null}{" "}
                          {capitalizeStr(address?.city)}, {capitalizeStr(address?.region)},{" "}
                          {address?.zip},{address?.country}
                        </p>
                        <button
                          onClick={(e) => {
                            setClicked(e.target.innerText);
                            if (ConfirmedAddressPopup?.addressId) {
                              userEditAddress(useAddresApi);
                            } else {
                              userAddAddress(useAddresApi);
                            }
                          }}
                          type="button"
                          className={`${
                            selectedAddress === address?.region_id
                              ? "bg-[#333] hover:text-[#000] hover:bg-white"
                              : "bg-white text-[#000] hover:text-[#fff] hover:bg-[#333]"
                          } text-skin-inverted rounded-[2px] transition-all ease-in-out duration-300 border-[#333] min-w-[164px] max-w-[164px] border-2 text-sm font-semibold py-2 px-3 hover:text-skin-inverted ml-4 whitespace-nowrap`}
                        >
                          {loading && clicked == "Use this address" ? (
                            <LoadingSpinner message="loading" />
                          ) : (
                            "Use this address"
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border flex items-center py-4 pl-2 pr-5 mt-2">
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
                <div className="flex items-center flex-col  md:flex-row justify-between">
                  <p
                    className={`text-center md:text-left md:w-[50%]  mb-[10px] md:mb-0 ml-4 text-[15px] font-semibold ${
                      selectedAddress === "entered_address" ? " text-[#285f27]" : "text-[#7e7e7e]"
                    }`}
                  >
                    {ConfirmedAddressPopup?.address?.firstName || null}{" "}
                    {ConfirmedAddressPopup?.address?.lastName || null} <br />
                    {ConfirmedAddressPopup?.address?.street[0] || null}{" "}
                    {ConfirmedAddressPopup?.address?.street[1]
                      ? `${ConfirmedAddressPopup?.address?.street[1]}, `
                      : null}{" "}
                    {ConfirmedAddressPopup?.address?.city} {selectedRegion}{" "}
                    {ConfirmedAddressPopup?.address?.postcode},{" "}
                    {ConfirmedAddressPopup?.address?.country}
                  </p>
                  <button
                    onClick={(e) => {
                      setClicked(e.target.innerText);
                      if (ConfirmedAddressPopup?.addressId) {
                        userEditAddress(ConfirmedAddressPopup);
                      } else {
                        userAddAddress(ConfirmedAddressPopup);
                      }
                    }}
                    type="button"
                    className={`${
                      selectedAddress === "entered_address"
                        ? "bg-[#333] hover:text-[#000] hover:bg-white"
                        : "bg-white text-[#000] hover:text-[#fff] hover:bg-[#333]"
                    } text-skin-inverted rounded-[2px] transition-all ease-in-out duration-300 border-[#333] min-w-[164px] max-w-[164px] border-2 text-sm font-semibold py-2 px-3 hover:text-skin-inverted ml-4 whitespace-nowrap`}
                  >
                    {loading && clicked == "Use original" ? (
                      <LoadingSpinner message="loading" />
                    ) : (
                      "Use original"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
