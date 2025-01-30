import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShippingAddress from "./shipping-address";
import SelectInput from "../../../theme-files/select-input";

function CheckoutInformation() {
  // dropdown datas
  const [dropdownSelectedData, setdropdownSelectedData] = useState({});
  const [isSelected, setisSelected] = useState(false);
  const customerToken = useSelector((state) => state.customerToken);
  const addresses = [
    {
      name: "Mythireyan",
      lane: "Lane1",
    },
    {
      name: "Karthik",
      lane: "Lane2",
    },
    {
      name: "Praveen",
      lane: "Lane3",
    },
    {
      name: "Vignesh",
      lane: "Lane4",
    },
  ];

  return customerToken ? (
    <div>
      <SelectInput
        label="Shipping Addresses"
        data={addresses}
        displayKey="name"
        setdropdownSelectedData={setdropdownSelectedData}
        dropdownSelectedData={dropdownSelectedData}
        name="shippingAddress"
      />

      <div className="relative w-full mb-5 mt-5 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
        <div className="theme-1 flex mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
          <input
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 flex items-center cursor-pointer"
            type="radio"
            onClick={() => setisSelected(!isSelected)}
            value={isSelected}
            checked={!!isSelected}
          />
          <span className="text-sm ml-3">Add New Address</span>
        </div>
      </div>

      {isSelected ? <ShippingAddress /> : null}
    </div>
  ) : (
    <ShippingAddress />
  );
}

export default CheckoutInformation;
