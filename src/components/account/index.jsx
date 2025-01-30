import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ExternalLinkIcon } from "@heroicons/react/outline";

import SubHeading from "../../theme-files/sub-heading/index";
import PageLink from "../../theme-files/link/index";
import useCustomerCart from "../../helper/hooks/customer/use-customer-cart";
import AccountInformation from "./MyAccount/AccountInformation";
import AddressBook from "./MyAccount/Address";
import OrderList from "./MyOrder/OrderList";
import useOrderList from "../../helper/hooks/customer/useOrderList";

export default function MyAccount() {
  const customerCartId = useSelector((state) => state.customerCartId);

  const { cartDetailsRefetch } = useCustomerCart();
  const { orderList } = useOrderList();

  useEffect(() => {
    customerCartId && cartDetailsRefetch();
  }, [customerCartId]);

  return (
    <>
      <AccountInformation />
      <AddressBook />

      {orderList?.length ? (
        <div className="py-5 px-5 border mt-8">
          <div className="flex justify-between items-center border-b pb-2.5 mb-[15px]">
            <SubHeading className="text-lg leading-6 mt-5 mb-4 text-[#282828] uppercase">
              Recent Orders
            </SubHeading>
            <PageLink
              rel="stylesheet"
              href="/account/my-orders"
              className="flex text-xs py-1 px-3 rounded text-white hover:opacity-75 ease-in-out duration-300 font-medium bg-[#a80f16] uppercase"
            >
              View all &nbsp; <ExternalLinkIcon className="w-4" />
            </PageLink>
          </div>

          <OrderList orders={orderList} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
