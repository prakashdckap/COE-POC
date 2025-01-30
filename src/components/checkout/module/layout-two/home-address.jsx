import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { PlusCircleIcon } from "@heroicons/react/solid";
import Paragraph from "../../../../theme-files/paragraph";
import ShippingAddress from "../../information/shipping-address";
import SubHeading from "../../../../theme-files/sub-heading";
import SavedAddressCard from "./saved-address-card";
import useSetShippingAddress from "../../../../helper/hooks/use-set-shipping-address";
import useValidateAddress from "../../../../helper/hooks/use-validate-address";
import UseRegionList from "../../../../helper/hooks/use-region-list";

export default function HomeAddress({
  setaddressVerificationPopup,
  setenteredAddress,
  showDropdownForm,
  setshowDropDownForm,
  showSavedAddress,
  setshowSavedAddress,
  values,
  setvalues,
  dropdownSelectedData,
  setdropdownSelectedData,
  open,
  setopen,
  pudoLoading,
  toggleHome,
}) {
  const {
    checkoutShippingAddress,
    customerAddressList,
    customerToken,
    customerCartId,
    guestCartId,
    isShippingAddressVerified,
    cartDetails,
    availableShippingMethods,
  } = useSelector((state) => state);

  const { shippingAddressLoading, shippingResponse, handleSetShippingAddress } =
    useSetShippingAddress();
  const {
    handleValidateAddress,
    addressVerificationLoading,
    shippingAddressLoading: AddressLoading,
  } = useValidateAddress();
  const [selectedRegionFullName, setSelectedRegionName] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleSelectedAddress = (id) => {
    const selectedAddress = customerAddressList?.find((address) => address?.id === id);
    setSelectedAddressId(id);
    // SHIPPING ADDRESS
    if (selectedAddress?.id) {
      const { firstName, lastName, company, street, city, postcode, telephone, region, country } =
        selectedAddress;

      const data = {
        firstName,
        lastName,
        company,
        street,
        city,
        postcode,
        telephone,
        region: region.code,
        country,
      };

      const shippingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,

        shippingAddress: {
          customerAddressId: selectedAddress?.id,
        },
      };

      handleValidateAddress(
        {
          street: data?.street,
          country: data?.country,
          city: data?.city,
          region: data?.region,
          zip: data?.postcode,
        },
        setaddressVerificationPopup,
        shippingAddressVariables,
        true
      );
      setenteredAddress(data);
    }
  };

  useEffect(() => {
    if (shippingResponse?.data) {
      setshowSavedAddress(false);
    }
  }, [shippingResponse]);

  useEffect(() => {
    if (
      checkoutShippingAddress?.dealerId ||
      availableShippingMethods?.find((method) => method?.methodCode?.includes("pudo"))
        ?.methodCode ||
      !availableShippingMethods?.length
    ) {
      toggleHome && toggleHome();
    } else if (!isShippingAddressVerified && checkoutShippingAddress?.firstName) {
      handleValidateAddress(
        {
          street: checkoutShippingAddress?.street?.[0] || "",
          country: checkoutShippingAddress?.country,
          city: checkoutShippingAddress?.city,
          region: checkoutShippingAddress?.region,
          zip: checkoutShippingAddress?.postcode,
        },
        setaddressVerificationPopup
      );
      delete checkoutShippingAddress.__typename;
      setenteredAddress(checkoutShippingAddress);
    } else if (checkoutShippingAddress?.firstName && !shippingAddressLoading) {
      const { firstName, lastName, company, street, city, postcode, telephone, region, country } =
        checkoutShippingAddress;
      const data = {
        firstName,
        lastName,
        company,
        street,
        city,
        postcode,
        telephone,
        region,
        country,
      };

      const shippingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,

        shippingAddress: {
          address: data,
        },
      };
      !pudoLoading && handleSetShippingAddress(shippingAddressVariables);
    }
  }, []);

  useEffect(() => {
    if (!cartDetails?.shippingAddress?.firstName) {
      const defaultShippingAddress = customerAddressList?.find(
        (address) => address.defaultShipping
      );
      if (defaultShippingAddress?.id) {
        handleSelectedAddress(defaultShippingAddress?.id);
      }
    }
  }, []);

  const { firstName, lastName, street, city, region, country, postcode, telephone } =
    checkoutShippingAddress;

  const { regions } = UseRegionList(country || null);

  useEffect(() => {
    if (region) {
      const regionName = regions?.find((state) => state.code === region)?.name || "";
      setSelectedRegionName(regionName);
    }
  }, [regions, region]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const capitalizeStr = (str) => {
    if (str) {
      const capitalStr = str.split(" ").map(capitalize).join(" ");
      return capitalStr;
    } else str;
  };

  return checkoutShippingAddress?.firstName ? (
    <div>
      <div
        className={`${
          addressVerificationLoading || AddressLoading ? "opacity-50 pointer-events-none" : ""
        } flex flex-col md:flex-row flex-wrap justify-between border border-[#bfbfbf] py-[20px] px-[25px] -mt-[14px]`}
      >
        <div className="text-md font-medium mb-2 text-[14px] leading-[19px]">
          <Paragraph>
            {firstName} {lastName}
          </Paragraph>
          <Paragraph>
            {capitalizeStr(street[0])} {capitalizeStr(street[1])}
          </Paragraph>
          <Paragraph>
            {capitalizeStr(city)}, {selectedRegionFullName || region}, {postcode}
          </Paragraph>
          <Paragraph>{country}</Paragraph>
          <Paragraph>{telephone}</Paragraph>
        </div>

        <div className="flex items-start md:items-end justify-end flex-col">
          {customerAddressList?.length ? (
            <button
              type="button"
              className="underline text-skin-primary capitalize text-[13px] "
              onClick={() => {
                setshowSavedAddress(!showSavedAddress);
                setshowDropDownForm(false);
              }}
            >
              Choose a saved shipping address
            </button>
          ) : null}

          <button
            type="button"
            className="mt-5 md:mt-0 underline text-[13px] text-skin-primary capitalize flex items-center mb-2.5"
            onClick={() => {
              setshowDropDownForm(!showDropdownForm);
              setshowSavedAddress(false);
              setvalues({});
              if (open) {
                setopen(!open);
              }
            }}
          >
            <PlusCircleIcon className="h-4 mt-1" />
            <span className="ml-[2px]">Add new shipping Address </span>
          </button>
        </div>
      </div>

      {showDropdownForm ? (
        <div className="mt-8 border border-[#bfbfbf] py-[22px] px-[24px] p-2">
          <SubHeading className="text-lg font-semibold font-Montserrat pb-[5px] mt-3">
            Add New Shipping Address
          </SubHeading>
          <ShippingAddress
            setshowDropDownForm={setshowDropDownForm}
            setaddressVerificationPopup={setaddressVerificationPopup}
            setenteredAddress={setenteredAddress}
            values={values}
            setvalues={setvalues}
            dropdownSelectedData={dropdownSelectedData}
            setdropdownSelectedData={setdropdownSelectedData}
          />
        </div>
      ) : null}

      {showSavedAddress && customerAddressList?.length ? (
        <div
          className={`mt-8 border-2 p-2 ${
            addressVerificationLoading || AddressLoading || shippingAddressLoading
              ? "opacity-50 pointer-events-none cursor-none select-none"
              : null
          }`}
        >
          <SubHeading className="text-lg font-semibold mb-10 mt-3 pl-3.5">
            Your Saved Shipping Address
          </SubHeading>

          <div className="grid grid-cols-6 gap-5 px-[12px] h-[310px] overflow-y-auto">
            {customerAddressList?.map((address) => {
              return (
                <SavedAddressCard
                  key={address.id}
                  id={address.id}
                  firstName={address.firstName}
                  lastName={address.lastName}
                  street={address.street}
                  city={address.city}
                  region={address.region.region}
                  country={address.country}
                  postcode={address.postcode}
                  telephone={address.telephone}
                  handleSelectedAddress={handleSelectedAddress}
                  shippingAddressLoading={shippingAddressLoading}
                  addressVerificationLoading={addressVerificationLoading}
                  AddressLoading={AddressLoading}
                  selectedAddressId={selectedAddressId}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <ShippingAddress
      setshowDropDownForm={setshowDropDownForm}
      setaddressVerificationPopup={setaddressVerificationPopup}
      setenteredAddress={setenteredAddress}
      values={values}
      setvalues={setvalues}
      dropdownSelectedData={dropdownSelectedData}
      setdropdownSelectedData={setdropdownSelectedData}
    />
  );
}

HomeAddress.defaultProps = {
  showDropdownForm: false,
  showSavedAddress: false,
};

HomeAddress.propTypes = {
  setaddressVerificationPopup: PropTypes.func.isRequired,
  setenteredAddress: PropTypes.func.isRequired,
  setshowDropDownForm: PropTypes.func.isRequired,
  showDropdownForm: PropTypes.bool,
  showSavedAddress: PropTypes.bool,
  setshowSavedAddress: PropTypes.func.isRequired,
  toggleHome: PropTypes.func.isRequired,
};
