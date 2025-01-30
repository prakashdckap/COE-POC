import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RewardsMenu from "./rewards-menu";
import ReferralsSubmission from "./referrals-submission";
import ReferralsList from "./referrals-list";
import { AxiosGraphQL } from "../../../helper/axios";

export default function Referral() {
  const [invitedCount, setinvitedCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [contentLimit, setcontentLimit] = useState(10);
  const [referralsList, setreferralsList] = useState([]);
  const [updated, setupdated] = useState(false);
  const contentLimitArr = [10, 20, 50];
  const [loading, setloading] = useState(false);
  const customerToken = useSelector((state) => state.customerToken);

  const totalCount = invitedCount;
  const pageCount = Math.ceil(totalCount / contentLimit);

  useEffect(() => {
    setcurrentPage(1);
  }, [contentLimit]);

  useEffect(() => {
    setloading(true);
    const getReferralsList = async () => {
      const response = await AxiosGraphQL(
        "get-referrals",
        {
          pageSize: contentLimit,
          currPage: currentPage,
        },
        customerToken
      );
      if (response?.getReferrals && !response?.data?.errors?.length) {
        setreferralsList(response?.getReferrals?.data);
        setinvitedCount(response?.getReferrals?.count);
        setloading(false);
        setupdated(false);
      }
      setloading(false);
    };

    getReferralsList();
  }, [currentPage, contentLimit, updated]);

  return (
    <>
      <RewardsMenu />
      <div className="py-6 px-4 sm:p-5 lg:pb-8 border ">
        {invitedCount ? (
          <div className="border border-[#ccc] border-dashed mb-5 py-1 px-2 text-[13px] font-sans text-[#282828]">
            You have invited {invitedCount} {invitedCount === 1 ? "friend" : "friends"}
          </div>
        ) : null}

        <ReferralsSubmission setupdated={setupdated} />

        <ReferralsList
          loading={loading}
          referralsList={referralsList}
          totalCount={totalCount}
          currentPage={currentPage}
          contentLimit={contentLimit}
          setcontentLimit={setcontentLimit}
          setcurrentPage={setcurrentPage}
          contentLimitArr={contentLimitArr}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
