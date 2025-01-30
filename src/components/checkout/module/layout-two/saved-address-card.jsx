import React from "react";
import PropTypes from "prop-types";
import Paragraph from "../../../../theme-files/paragraph";
import LoadingSpinner from "../../../../helper/loading-spinner";

export default function SavedAddressCard({
  id,
  firstName,
  lastName,
  street,
  city,
  region,
  country,
  postcode,
  telephone,
  handleSelectedAddress,
  shippingAddressLoading,
  addressVerificationLoading,
  AddressLoading,
  selectedAddressId,
}) {
  return (
    <div className=" bg-[#f6f6f6] p-[20px] border border-solid text-[13px] leading-5 border-[#d9d9d9] lg:col-span-3 col-span-6">
      <Paragraph>
        {" "}
        {firstName} {lastName}
      </Paragraph>
      <Paragraph className="break-words">
        {street[0]} {street[1]}
      </Paragraph>
      <Paragraph>
        {city}, {region}, {postcode}
      </Paragraph>
      <Paragraph>{country}</Paragraph>
      <Paragraph>{telephone}</Paragraph>

      <button
        type="button"
        className="text-sm block w-full items-center px-5 py-[7px] mt-2.5 text-center text-[11px] font-bold uppercase border border-solid mx-auto border-[#000] bg-[#fff]"
        // className="text-sm block w-full items-center px-5 py-2 mt-3 text-center mx-auto border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-primary bg-skin-secondary hover:bg-skin-button-secondary-hover disabled:cursor-not-allowed"
        onClick={() => handleSelectedAddress(id)}
        disabled={shippingAddressLoading}
      >
        {(addressVerificationLoading || AddressLoading) && selectedAddressId == id ? (
          <LoadingSpinner message="loading" />
        ) : (
          "Ship Here"
        )}
      </button>
    </div>
  );
}

SavedAddressCard.defaultProps = {
  id: 0,
  firstName: "",
  lastName: "",
  street: [],
  city: "",
  region: "",
  country: "",
  postcode: "",
  telephone: "",
  shippingAddressLoading: PropTypes.bool,
};

SavedAddressCard.propTypes = {
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  street: PropTypes.arrayOf(PropTypes.string),
  city: PropTypes.string,
  region: PropTypes.string,
  country: PropTypes.string,
  postcode: PropTypes.string,
  telephone: PropTypes.string,
  handleSelectedAddress: PropTypes.func.isRequired,
  shippingAddressLoading: PropTypes.bool,
};
