import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { PencilAltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

import PageLink from "../../../theme-files/link";
import ListItem from "../../../theme-files/list-item";
import SubHeading from "../../../theme-files/sub-heading";
import UnorderedList from "../../../theme-files/unordered-list";
import DisplayAddress from "./DisplayAddress";

export default function AddressBook() {
  const history = useRouter();
  const customerAddressList = useSelector((state) => state.customerAddressList);

  const defaultBillingAddress = customerAddressList?.find((address) => address?.defaultBilling);
  const defaultShippingAddress = customerAddressList?.find((address) => address?.defaultShipping);

  const handleEditRedirect = (id, addressType) => {
    if (id) {
      history.push({ pathname: "/account/edit-address", query: { id, addressType } });
    } else {
      history?.push("/account/add-address");
    }
  };

  return (
    <div className="py-5 px-5 border mt-8">
      <div className="flex justify-between items-center border-b pb-2.5 mb-[15px]">
        <SubHeading className="text-lg leading-6 mt-5 mb-4 text-[#282828] uppercase">
          Address Book
        </SubHeading>
        <PageLink
          href="./account/address-book"
          className="flex text-xs py-1 px-3 rounded text-white hover:opacity-75 ease-in-out duration-300 font-medium bg-[#a80f16] uppercase"
        >
          <span className="hidden md:block">Manage Addresses</span> &nbsp;{" "}
          <ExternalLinkIcon className="w-4" />
        </PageLink>
      </div>

      <UnorderedList role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
        <ListItem
          key="billing-address"
          className="col-span-1 bg-white rounded-lg divide-y divide-gray-200 md:divide-y-0"
        >
          <DisplayAddress address={defaultBillingAddress} type="billing" />
          <div>
            <button
              type="button"
              onClick={() => handleEditRedirect(defaultBillingAddress?.id, "billing")}
              className="mt-5 md:mt-0 flex text-sm text-gray-700 font-medium hover:text-[#a80f16] uppercase md:text-xs lg:text-sm"
            >
              <PencilAltIcon className="w-4" /> &nbsp; Edit Address
              <span className="sr-only">edit default billing address</span>
            </button>
          </div>
        </ListItem>
        <ListItem
          key="shipping-address"
          className="col-span-1 bg-white rounded-lg divide-y divide-gray-200 md:divide-y-0"
        >
          <DisplayAddress address={defaultShippingAddress} type="shipping" />
          <div>
            <button
              type="button"
              onClick={() => handleEditRedirect(defaultShippingAddress?.id, "shipping")}
              className="mt-5 md:mt-0 flex text-sm text-gray-700 font-medium hover:text-[#a80f16] uppercase md:text-xs lg:text-sm"
            >
              <PencilAltIcon className="w-4" /> &nbsp; Edit Address
              <span className="sr-only">edit default shipping address</span>
            </button>
          </div>
        </ListItem>
      </UnorderedList>
    </div>
  );
}
