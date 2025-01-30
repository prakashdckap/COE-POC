import React from "react";
import PropTypes from "prop-types";

export default function ReferralsSubmissionInput({
  count,
  values,
  setvalues,
  error,
  emailErrorIndex,
}) {
  const handleValueChange = (e, type) => {
    const valuesArr = [...values];
    valuesArr[count - 1] = { ...valuesArr[count - 1], [type]: e.target.value };
    setvalues(valuesArr);
  };

  return (
    <tr className="flex flex-col sm:table-row mb-6  w-full">
      <td
        data-th="#"
        className="lg:w-[5%] align-top py-2 whitespace-nowrap text-[13px] text-[#282828] flex justify-center sm:table-cell"
      >
        <span className="font-bold text-sm block sm:hidden mr-2">#: </span> {count}
      </td>
      <span className="text-center font-bold text-sm block sm:hidden mr-2">Name: </span>{" "}
      <td
        data-th="Name"
        className=" block lg:mr-[10px] py-2 pr-5 whitespace-nowrap text-sm text-[#282828]"
      >
        <input
          type="text"
          name="name"
          className="mt-1 border-b-[#ebebeb]  block w-full border-b border-[#d1d1d1] h-[40px] px-[4px] focus:outline-none text-xs 2xl:text-sm lg:mb-2 "
          value={values[count - 1]?.name}
          onChange={(e) => handleValueChange(e, "name")}
        />
        {error?.name && count === 1 ? (
          <span className="text-[#e02b27] text-[13px]  sm:text-left text-center block my-[10px] lg:inline lg:my-0">
            {error?.name}
          </span>
        ) : null}
      </td>
      <span className="text-center font-bold text-sm block sm:hidden mr-2">Email: </span>
      <td
        data-th="Email"
        className={`${
          emailErrorIndex?.includes(count - 1) ? " lg:my-0" : null
        } lg:w-[50%] py-2 whitespace-nowrap text-sm text-[#282828] table-cell`}
      >
        <input
          type="text"
          name="email"
          id="email"
          autoComplete="email"
          className="mt-1 block w-full border-b border-gray-300 h-[40px]  px-1 focus:outline-none text-xs 2xl:text-sm lg:mb-2 "
          value={values[count - 1]?.email}
          onChange={(e) => handleValueChange(e, "email")}
        />
        {error?.email && count === 1 ? (
          <span className="text-[#e02b27] text-[13px] sm:text-left text-center block my-[10px] lg:inline lg:my-0 ">
            {error?.email}
          </span>
        ) : null}
        {emailErrorIndex?.includes(count - 1) && values[count - 1]?.email ? (
          <span className="text-[#e02b27] text-[13px] sm:text-left text-center block my-[10px] lg:inline lg:my-0  referrals-error">
            Please enter a valid email address (Ex: johndoe@domain.com)
          </span>
        ) : null}
      </td>
    </tr>
  );
}

ReferralsSubmissionInput.defaultProps = {
  count: 1,
  values: [],
  error: {},
  emailErrorIndex: [],
};
ReferralsSubmissionInput.propTypes = {
  count: PropTypes.number,
  values: PropTypes.arrayOf(),
  setvalues: PropTypes.func.isRequired,
  error: PropTypes.shape(),
  emailErrorIndex: PropTypes.arrayOf(),
};
