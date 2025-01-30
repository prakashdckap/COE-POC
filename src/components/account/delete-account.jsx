import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import Paragraph from "../../theme-files/paragraph";
import Label from "../../theme-files/label";
import DELETE_CUSTOMER_ACCOUNT from "./graphql/query/delete-customer-account";
import LoadingSpinner from "../../helper/loading-spinner";
import { SET_NOTIFICATION } from "../../redux/actions";

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const [password, setpassword] = useState("");
  const [checked, setchecked] = useState(false);
  const [response, setresponse] = useState({});
  const [deleteAccount, { data: deleteData, loading: deleteLoading }] =
    useLazyQuery(DELETE_CUSTOMER_ACCOUNT);

  // Handle Delete Function
  const handleDeleteAccount = (e) => {
    e.preventDefault();
    deleteAccount({ variables: { password } });
    setpassword("");
  };

  // To store query response in a local state
  useEffect(() => {
    if (deleteData?.deleteCustomerRequest) setresponse(deleteData);
  }, [deleteData]);

  // To Display Success Message
  useEffect(() => {
    if (response?.deleteCustomerRequest) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: deleteData?.deleteCustomerRequest,
          type: "success",
        })
      );
    }
  }, [response]);

  return (
    <div
      className="w-[220px] border items-center justify-between p-5 mt-5"
      style={{ borderBottom: "1px solid #e5e7eb" }}
    >
      <Paragraph className="mt-1 text-[#282828] text-[13px] font-normal">
        All your orders, personal data and other information related to your account or purchases
        will be lost. You will not be able to restore access to your account after we approve your
        removal request.
      </Paragraph>
      <form>
        <Label
          htmlFor="proceed-checkbox-input"
          className="block text-[13px] font-normal text-[#282828] pt-5"
        >
          <input
            id="proceed-checkbox-input"
            name="proceed-checkbox-input"
            type="checkbox"
            onClick={() => setchecked(!checked)}
            checked={checked}
          />
          <span> &nbsp; I understand and I want to delete my account</span>
        </Label>

        {checked ? (
          <Label
            htmlFor="mobile"
            className="block  text-[13px] mt-5 font-semibold text-skin-base capitalize"
          >
            Current Password <span className="text-red-500">*</span>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              className="border-0 bg-transparent bg-white border-b-2 mt-2 py-2 focus:outline-none"
            />
          </Label>
        ) : null}

        <button
          onClick={(e) => handleDeleteAccount(e)}
          onKeyDown={(e) => e.key === "Enter" && handleDeleteAccount(e)}
          disabled={!password}
          type="submit"
          className="w-[150px] inline-flex items-center px-3 mt-5 py-2 h-8 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleteLoading ? <LoadingSpinner message="loading" /> : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
