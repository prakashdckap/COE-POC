import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import ReferralsSubmissionInput from "./referrals-submission-input";
import { AxiosGraphQL } from "../../../helper/axios";
import { SET_NOTIFICATION } from "../../../redux/actions";
import LoadingSpinner from "../../../helper/loading-spinner";

export default function ReferralsSubmission({ setupdated }) {
  const dispatch = useDispatch();
  const [error, seterror] = useState({ name: "", email: "", message: "" });
  const [values, setvalues] = useState([{}]);
  const [message, setmessage] = useState("");
  const [emailErrorIndex, setemailErrorIndex] = useState([]);
  const [loading, setloading] = useState(false);
  const customerToken = useSelector((state) => state.customerToken);

  const count = [1, 2, 3, 4, 5];

  // email validation
  const validateEmail = (email) => {
    const mail = email?.replace(/ /g, "")?.split(",");
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
      return true;
    }

    return false;
  };

  const handleEmailError = () => {
    const errorIndex = [];
    values?.map((item, i) => {
      if (item?.email) {
        if (!validateEmail(item?.email)) {
          errorIndex.push(i);
        }
      }
    });
    setemailErrorIndex(errorIndex);
    return errorIndex;
  };

  const validateNameAndEmail = () => {
    const errorText = "This is a required field";
    // const emailError = "Please enter a valid email address (Ex: johndoe@domain.com).";
    if (!values[0].email && !values[0].name && !message) {
      seterror({ email: errorText, name: errorText, message: errorText });
      return false;
    }
    if (values[0].name && !values[0]?.email && !message) {
      seterror({ email: errorText, name: "", message: errorText });
      return false;
    }
    if (values[0].email && !values[0]?.name && !message) {
      seterror({ email: "", name: errorText, message: errorText });
      return false;
    }
    if (message && !values[0]?.name && !values[0].email) {
      seterror({ email: errorText, name: errorText, message: "" });
      return false;
    }
    if (values[0].email && values[0].name && !message) {
      seterror({ email: "", name: "", message: errorText });
      return false;
    }
    if (!values[0].email && values[0].name && message) {
      seterror({ email: errorText, name: "", message: "" });
      return false;
    }
    if (values[0].email && !values[0].name && message) {
      seterror({ email: "", name: errorText, message: "" });
      return false;
    }
    seterror({ email: "", name: "", message: "" });

    return true;
  };

  const handleSubmit = async () => {
    handleEmailError();
    if (validateNameAndEmail() && !handleEmailError()?.includes(0)) {
      const items = values?.filter((item) => item?.name && item?.email);

      setloading(true);
      const response = await AxiosGraphQL(
        "send-invite-to-friends",
        { items, message },
        customerToken
      );

      setupdated(true);

      if (!response?.errors?.length && response?.sendInviteFriends) {
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: response?.sendInviteFriends,
            type:
              response?.sendInviteFriends === "Your invitations were sent. Thanks!"
                ? "success"
                : "warning",
          })
        );
        setloading(false);
      } else {
        const errorMessage =
          response?.errors?.[0]?.message ||
          response?.errors?.message ||
          response?.errors ||
          "Error occurred while sending the invite";
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: errorMessage,
            type: "error",
          })
        );
      }

      setloading(false);

      const emptyValues = values?.map(() => ({ email: "", name: "" }));
      setvalues(emptyValues);
      setmessage("");
      setemailErrorIndex([]);
    }
  };

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8 mb-8 border ">
      <h2 className="text-[16px] font-light font-sans leading-6 text-[#282828] mb-3">
        SEND INVITATIONS
      </h2>
      <hr className="mt-3 mb-12" />

      <div className="w-full">
        <p className="mb-5 text-[13px] font-sans font-normal">
          Enter contacts of your friends to invite them.
        </p>
        <table className="min-w-full table-auto border-collapse w-full ">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b">
              <th
                scope="col"
                className="py-2 text-left text-sm text-[#282828] font-medium uppercase font-sans"
              >
                #
              </th>
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
            </tr>
          </thead>

          <tbody>
            {count?.map((item) => (
              <ReferralsSubmissionInput
                key={item}
                count={item}
                values={values}
                setvalues={setvalues}
                error={error}
                seterror={seterror}
                emailErrorIndex={emailErrorIndex}
              />
            ))}
          </tbody>
        </table>
        <br />
        <div className="mt-4 text-[13px] font-sans text-[#282828]">
          <h4>Message</h4>
          <textarea
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            className={`m-0 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid  transition  ${error?.message ? "border-[#ed8380] focus:outline-[#ed8380] focus:outline-0":"border-[#ccc] focus:outline-[#ccc] focus:outline-0"}`}
            id="message"
            rows="6"
          />
          {error?.message ? (
            <span className="text-[#e02b27] text-[13px] text-left  block mt-[5px] lg:inline ">{error?.message}</span>
          ) : null}
        </div>
        <div className="pt-1 divide-y divide-gray-200">
          <div className="pr-0 mt-3 ">
            <button
              onClick={() => handleSubmit()}
              type="button"
              className="inline-flex justify-center w-[170px] uppercase items-center px-4 py-2 border text-xs border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-primary bg-skin-secondary hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
            >
              {loading ? <LoadingSpinner /> : "Send Invitations"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReferralsSubmission.propTypes = {
  setupdated: PropTypes.func.isRequired,
};
