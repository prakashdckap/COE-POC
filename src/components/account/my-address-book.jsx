import { useState, useEffect } from "react";
import { PencilAltIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "../../theme-files/link";
import ListItem from "../../theme-files/list-item";
import SubHeading from "../../theme-files/sub-heading";
import UnorderedList from "../../theme-files/unordered-list";
import LoadingSpinner from "../../helper/loading-spinner";
import DELETE_ADDRESS from "../../helper/hooks/customer/use-delete-address";
import Paragraph from "../../theme-files/paragraph";
import PaginationTwo from "../../helper/pagination-two";

export default function MyAddressBook() {
  const history = useRouter();
  const [deleteAddressId, setdeleteAddressId] = useState("");
  const [customerAddressList, setcustomerAddressList] = useState([]);
  const [filteredAddressList, setfilteredAddressList] = useState([]);
  const addressList = useSelector((state) => state.customerAddressList);
  const countries = useSelector((state) => state.countries);

  const [currentPage, setcurrentPage] = useState(1);
  const [contentLimit, setcontentLimit] = useState(10);
  const contentLimitArr = [10, 20, 50];

  const totalCount = addressList?.filter(
    (address) => !address?.defaultBilling && !address?.defaultShipping
  )?.length;
  const pageCount = Math.ceil(totalCount / contentLimit);

  const defaultBillingAddress = customerAddressList?.find((address) => address?.defaultBilling);
  const defaultShippingAddress = customerAddressList?.find((address) => address?.defaultShipping);

  function saveUserAddressDetail(address) {
    history.push({ pathname: "/account/edit-address", query: { id: address.id } });
  }

  const { userDeleteAddress, loading } = DELETE_ADDRESS();

  const handleDeleteAddress = (AddressId) => {
    setdeleteAddressId(AddressId);
    userDeleteAddress(AddressId);
  };

  const handleEditRedirect = (id, addressType) => {
    if (id) {
      history.push({ pathname: "/account/edit-address", query: { id, addressType } });
    } else {
      history?.push("/account/add-address");
    }
  };

  // Pushing to 1st page when the content limit changes
  useEffect(() => {
    setcurrentPage(1);
  }, [contentLimit]);

  // Client side pagination
  useEffect(() => {
    setcustomerAddressList(addressList);

    const startingLimit = currentPage > 1 ? (currentPage - 1) * contentLimit + 1 : currentPage;
    const endingLimit =
      (currentPage - 1) * contentLimit + contentLimit < totalCount
        ? (currentPage - 1) * contentLimit + contentLimit
        : totalCount;
    const defaultEliminatedArr = addressList?.filter(
      (address) => !address?.defaultBilling && !address?.defaultShipping
    );
    // Reverse the array after filtering
    const reversedArr = defaultEliminatedArr?.reverse();

    // Apply pagination to the reversed array
    const paginatedArr = reversedArr?.slice(startingLimit - 1, endingLimit);
    setfilteredAddressList(paginatedArr);
  }, [currentPage, addressList, contentLimit]);

  const formatPhoneNumber = (num = "") => {
    if (num?.length) {
      const cleaned = num.replace(/\D/g, "");
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return null;
    }
    return null;
  };

  // To find country name
  const contriesFind = (country) => {
    let countryName = countries?.find((con) => con?.code === country);
    return countryName?.name;
  };

  return (
    <div className="lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8 border shadow mt-5">
        <div className="border-b-2 border-gray">
          <SubHeading className="text-2xl leading-6 font-light pb-3 text-gray-900">
            DEFAULT ADDRESSES
          </SubHeading>
        </div>
        <UnorderedList role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <ListItem
            key="billing-address"
            className="col-span-1 bg-white rounded-lg divide-y divide-gray-200 md:divide-y-0"
          >
            <div className="w-full flex items-center justify-between pt-5 pb-5 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <SubHeading className="text-gray-900 text-base font-medium truncate">
                    Billing Address
                  </SubHeading>
                </div>
                {defaultBillingAddress?.firstName ? (
                  <div className="mt-1 text-sm truncate">
                    <Paragraph className="mt-1 text-[#282828] text-sm font-light">
                      {defaultBillingAddress?.firstName} {defaultBillingAddress?.lastName}
                    </Paragraph>
                    <Paragraph className="text-black-900 text-sm font-light">
                      {defaultBillingAddress?.street[0]}, {defaultBillingAddress?.street[1]}
                    </Paragraph>
                    <Paragraph className="text-black-900 text-sm font-light">
                      {defaultBillingAddress?.city}, {defaultBillingAddress?.region?.region},{" "}
                      {defaultBillingAddress?.postcode}
                    </Paragraph>
                    <Paragraph className="text-black-900 text-sm font-light">
                      {defaultBillingAddress?.country}
                    </Paragraph>
                    <Paragraph className="text-black-900 text-sm font-light">
                      T: {defaultBillingAddress?.telephone}
                    </Paragraph>
                  </div>
                ) : (
                  <Paragraph className="text-black-900 text-sm font-light mt-2">
                    You have not set a default billing address.
                  </Paragraph>
                )}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleEditRedirect(defaultBillingAddress?.id, "billing")}
                className="inline-flex items-center text-[13px] px-2 py-1 text-skin-inverted bg-[#A80F16] hover:opacity-75 rounded"
              >
                <PencilAltIcon className="w-4" /> &nbsp; CHANGE BILLING ADDRESS
              </button>
            </div>
          </ListItem>
          <ListItem
            key="billing-address"
            className="col-span-1 bg-white rounded-lg divide-y divide-gray-200 md:divide-y-0"
          >
            <div className="w-full flex items-center justify-between pt-5 pb-5 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <SubHeading className="text-gray-900 text-base font-medium truncate">
                    Shipping Address
                  </SubHeading>
                </div>
                {defaultBillingAddress?.firstName ? (
                  <div className="mt-1 text-sm truncate">
                    <Paragraph className="mt-1 text-[#282828] text-[13px] font-light">
                      {defaultShippingAddress?.firstName} {defaultShippingAddress?.lastName}
                    </Paragraph>
                    <Paragraph className="text-[#282828] text-[13px] font-light">
                      {defaultShippingAddress?.street[0]}, {defaultShippingAddress?.street[1]}
                    </Paragraph>
                    <Paragraph className="text-[#282828] text-[13px] font-light">
                      {defaultShippingAddress?.city}, {defaultShippingAddress?.region?.region},{" "}
                      {defaultShippingAddress?.postcode}
                    </Paragraph>
                    <Paragraph className="text-[#282828] text-[13px] font-light">
                      {defaultShippingAddress?.country}
                    </Paragraph>
                    <Paragraph className="text-[#282828] text-[13px] font-light">
                      T: {defaultShippingAddress?.telephone}
                    </Paragraph>
                  </div>
                ) : (
                  <Paragraph className="text-black-900 text-sm font-light mt-2">
                    You have not set a default shipping address.
                  </Paragraph>
                )}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleEditRedirect(defaultShippingAddress?.id, "shipping")}
                className="inline-flex items-center text-[13px] px-2 py-1 text-skin-inverted bg-[#A80F16] hover:opacity-75 rounded"
              >
                <PencilAltIcon className="w-4" /> &nbsp; CHANGE SHIPPING ADDRESS
              </button>
            </div>
          </ListItem>
        </UnorderedList>
      </div>
      <div className="p-[13px] border shadow mt-5">
        <div className="border-b-2 border-gray mb-6">
          <SubHeading className="text-[25px] text-[#282828] leading-6 font-light pb-3">
            ADDITIONAL ADDRESS ENTRIES
          </SubHeading>
        </div>
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="min-w-full table-auto border-collapse w-full address-table">
                {filteredAddressList?.length ? (
                  <thead className="hidden sm:table-header-group">
                    <tr className="border-b">
                      <th
                        scope="col"
                        className=" text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        Street Address
                      </th>
                      <th
                        scope="col"
                        className="  text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        State
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        Zip/Postal Code
                      </th>
                      <th
                        scope="col"
                        className=" text-left text-sm text-[#282828] font-medium uppercase"
                      >
                        Phone
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                ) : null}

                <tbody>
                  {filteredAddressList?.length
                    ? filteredAddressList?.map((address) => (
                        <tr className="flex flex-col sm:table-row " key={address?.id}>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              First Name:{" "}
                            </span>{" "}
                            {address.firstName}
                          </td>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              Last Name:{" "}
                            </span>{" "}
                            {address.lastName}
                          </td>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              Street:{" "}
                            </span>
                            <p className="flex sm:flex-col  table-address-style ">
                              <span className="table-address ">{address.street[0]},</span>{" "}
                              {address.street[1]}
                            </p>
                          </td>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              City:{" "}
                            </span>
                            {address.city}
                          </td>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              Country:{" "}
                            </span>

                            <p className=" table-address-style">
                              {contriesFind(address.country)}
                              {/* {address.country === "US" ? "United States" : address.country} */}
                            </p>
                          </td>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              State:{" "}
                            </span>
                            {address.region.region}
                          </td>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              Zip/Postal Code:{" "}
                            </span>
                            {address.postcode}
                          </td>
                          <td className=" whitespace-nowrap text-sm text-[#282828] flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              Phone:{" "}
                            </span>
                            <p className=" table-address-style">
                              {formatPhoneNumber(address.telephone)}
                            </p>
                          </td>
                          <td className=" whitespace-nowrap text-sm font-medium flex sm:table-cell">
                            <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                              Actions:{" "}
                            </span>
                            <div className="flex flex-wrap sm:flex-col">
                              <button
                                type="button"
                                onClick={() => saveUserAddressDetail(address)}
                                className="text-[#282828] hover:text-[#a80f16] font-semibold mr-2 text-sm capitalize"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleDeleteAddress(parseInt(address.id, 10));
                                }}
                                className="text-[#282828] hover:text-[#a80f16] font-semibold ml-2 text-sm"
                              >
                                {loading && deleteAddressId === address.id ? (
                                  <LoadingSpinner message="Deleting" />
                                ) : (
                                  "Delete"
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {filteredAddressList?.length ? (
          <PaginationTwo
            totalCount={totalCount}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            contentLimit={contentLimit}
            setcontentLimit={setcontentLimit}
            contentLimitArr={contentLimitArr}
            pageCount={pageCount}
          />
        ) : (
          <Paragraph className="text-center font-medium text-lg my-5 w-full text-gray-500">
            You have no other address entries in your address book
          </Paragraph>
        )}
      </div>

      <div className="flex justify-between items-center text-center">
        <Link
          href="/account/add-address"
          className="mt-5 inline-flex items-center px-5 py-2 border border-[#A80F16] text-xs shadow-sm text-skin-inverted hover:text-skin-primary bg-[#A80F16] hover:border-black hover:text-black hover:bg-skin-button-secondary-hover uppercase"
        >
          Add New Address
        </Link>
        <Link
          href="/account"
          className="mt-5 inline-flex items-center px-5 py-2 border border-[#A80F16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#A80F16] hover:border-black hover:text-black hover:bg-skin-button-secondary-hover uppercase text-xs"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
