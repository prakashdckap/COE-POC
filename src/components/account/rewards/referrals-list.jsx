import PropTypes from "prop-types";
import PaginationTwo from "../../../helper/pagination-two";
import Paragraph from "../../../theme-files/paragraph";

export default function ReferralsList({
  loading,
  referralsList,
  totalCount,
  currentPage,
  contentLimit,
  setcontentLimit,
  setcurrentPage,
  contentLimitArr,
  pageCount,
}) {
  return (
    <div
      className={`${
        loading ? "opacity-40 pointer-events-none" : null
      } py-6 px-4 sm:p-6 lg:pb-8 mb-8 border  referrals-table`}
    >
      <h2 className="text-[16px] font-light font-sans leading-6 text-[#282828] mb-3 uppercase">
        Referrals
      </h2>
      <hr />
      {referralsList?.length ? (
        <>
          <table className="w-full mt-6 referrals-list-table">
            <thead className="hidden sm:table-header-group border-b">
              <tr className="border-b">
                <th
                  scope="col"
                  className="py-2 text-left text-sm text-[#282828] font-medium uppercase font-sans"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-2 text-left text-sm text-[#282828] font-medium uppercase font-sans"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="py-2 text-left text-sm text-[#282828] font-medium uppercase font-sans"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="py-2 text-left text-sm text-[#282828] font-medium uppercase font-sans"
                >
                  Points
                </th>
              </tr>
            </thead>

            <tbody>
              {referralsList?.length
                ? referralsList?.map((list) => (
                    <tr key={list?.referral_id} className="flex flex-col sm:table-row mb-6">
                      <td
                        data-th="Name"
                        className="py-2 whitespace-nowrap text-sm text-[#282828] flex sm:table-cell"
                      >
                        <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                          Name:{" "}
                        </span>{" "}
                        <Paragraph name="name" className=" block w-full  text-sm">
                          {list?.name || "Anonymous Visitor"}
                        </Paragraph>
                      </td>

                      <td
                        data-th="Email"
                        className="py-2 whitespace-nowrap text-sm text-[#282828] flex sm:table-cell"
                      >
                        <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                          Email:{" "}
                        </span>{" "}
                        <Paragraph
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="block w-full  text-sm"
                        >
                          {list?.email || "-"}
                        </Paragraph>
                      </td>

                      <td
                        data-th="Status"
                        className="py-2 whitespace-nowrap text-sm text-[#282828] flex sm:table-cell"
                      >
                        <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                          Status:{" "}
                        </span>{" "}
                        <Paragraph name="status" className="   block w-full  text-sm">
                          {list?.status === "visited" ? "Visited by Referral Link" : "Message Sent"}
                        </Paragraph>
                      </td>
                      <td
                        data-th="Points"
                        className="py-2 whitespace-nowrap text-sm text-[#282828] flex sm:table-cell"
                      >
                        <span className="font-bold text-sm Capitalize block sm:hidden mr-2">
                          Points:{" "}
                        </span>{" "}
                        <Paragraph name="points" className="   block w-full  text-sm ">
                          {list?.points_amount || "-"}
                        </Paragraph>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          <PaginationTwo
            totalCount={totalCount}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            contentLimit={contentLimit}
            setcontentLimit={setcontentLimit}
            contentLimitArr={contentLimitArr}
            pageCount={pageCount}
          />
        </>
      ) : (
        <Paragraph className="my-3 font-[13px] text-gray-700">There are no Referrals</Paragraph>
      )}
    </div>
  );
}

ReferralsList.defaultProps = {
  loading: false,
  referralsList: [],
  totalCount: 0,
  currentPage: 0,
  contentLimit: 0,
  contentLimitArr: [],
  pageCount: 0,
};

ReferralsList.propTypes = {
  loading: PropTypes.bool,
  referralsList: PropTypes.arrayOf(),
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  contentLimit: PropTypes.number,
  setcontentLimit: PropTypes.func.isRequired,
  setcurrentPage: PropTypes.func.isRequired,
  contentLimitArr: PropTypes.arrayOf(),
  pageCount: PropTypes.number,
};
