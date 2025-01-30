import { PencilAltIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

import PageLink from "../../../theme-files/link";
import Paragraph from "../../../theme-files/paragraph";
import SubHeading from "../../../theme-files/sub-heading";
import useCustomerDetails from "../../../helper/hooks/customer/use-customer-details";

export default function AccountInformation({}) {
  const { data, customerDetailsReload } = useCustomerDetails();
  const newsletterSubcription = useSelector((state) => state.newsletterSubcription);

  return (
    <div className="py-5 px-5 border">
      <div>
        <SubHeading className="text-lg leading-6 border-b pb-2.5 mb-[15px] text-[#282828] uppercase">
          Account Information
        </SubHeading>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div
          className={`${
            customerDetailsReload ? "opacity-40" : null
          } col-span-12 sm:col-span-12 md:col-span-6`}
        >
          <Paragraph className="mb-1 text-sm text-[#282828] font-medium">
            CONTACT INFORMATION
          </Paragraph>
          {customerDetailsReload ? (
            <span className="px-5">
              <i class="fa fa-spinner animate-spin" aria-hidden="true" />
            </span>
          ) : (
            <>
              <span
                className="font-light text-sm"
                aira-label={data?.customerDetails?.firstName}
                tabIndex="0"
                role="information"
              >
                {data?.customerDetails?.firstName}
              </span>
              &nbsp;
              <span
                className="font-light text-sm"
                aira-label={data?.customerDetails?.lastName}
                tabIndex="0"
                role="information"
              >
                {data?.customerDetails?.lastName}
              </span>
              <Paragraph
                className="font-light text-sm"
                aira-label={data?.customerDetails?.email}
                tabIndex="0"
                role="information"
              >
                {data?.customerDetails?.email}
              </Paragraph>
            </>
          )}
          <div className="flex">
            <PageLink
              href="/account/account-information"
              className="mt-5 flex text-sm text-gray-700 font-medium hover:text-[#a80f16] uppercase whitespace-nowrap md:text-xs lg:text-sm"
            >
              <PencilAltIcon className="w-4" /> &nbsp;
              <span aria-label="Edit user information">Edit</span>
            </PageLink>
            &nbsp; &nbsp; &nbsp;
            <PageLink
              href={{
                pathname: "/account/account-information",
                query: { password: true },
              }}
              aira-label="edit user information"
              className="mt-5 flex text-sm text-gray-700 font-medium hover:text-[#a80f16] uppercase whitespace-nowrap md:text-xs lg:text-sm"
            >
              <PencilAltIcon className="w-4" /> &nbsp; Change password
            </PageLink>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12  md:col-span-6">
          <Paragraph className="mb-1 text-sm text-gray-900 font-medium">NEWSLETTERS</Paragraph>
          {newsletterSubcription === true ? (
            <span className="font-light text-sm">
              You are subscribed to &quot;General Subscription&quot;.
            </span>
          ) : (
            <span className="font-light text-sm">
              You aren&apos;t subscribed to our newsletter.
            </span>
          )}

          <div className="flex">
            <PageLink
              href="/account/newsletter-subscriptions"
              className="mt-5 flex text-sm text-gray-700 font-medium hover:text-[#a80f16] uppercase md:text-xs lg:text-sm"
            >
              <PencilAltIcon className="w-4" /> &nbsp;
              <span aria-label="Edit newsletter subscriptions">Edit</span>
            </PageLink>
          </div>
        </div>
      </div>
    </div>
  );
}
