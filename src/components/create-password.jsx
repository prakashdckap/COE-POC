import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../helper/loading-spinner";
import PasswordStrengthBar from "../helper/password-strength-bar";
import useResetPassword from "../helper/hooks/customer/use-reset-password";

export default function CreatePassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const history = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  const [checked, setchecked] = useState(false);

  const { email, token } = history.query;
  const { loading, error, handleResetPassword } = useResetPassword();
  const [emailToken, setEmailToken] = useState(false);

  const path = history?.asPath;

  const updatePassword = () => {
    setShowErrors(true);
    if (password && cpassword && password === cpassword) {
      let resetPassword = {
        email: emailToken?.email,
        resetPasswordToken: token,
        newPassword: password,
      };
      handleResetPassword(resetPassword);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(path?.split("?")?.[1]);
    let uri = path?.split("?")?.[1]?.split("&"); // used this method to fix if email has + sign

    const paramsObject = { ...emailToken };

    if (Array.isArray(uri)) {
      // used this block to fix if email has + sign (e.g., pranavpr+11@dckap.com)
      uri.forEach((e) => {
        let decode = e?.split("=");
        if (decode[0] && decode[1]) {
          if (decode[0] === "email") {
            // Handle '+' sign correctly in the email
            paramsObject[decode[0]] = customDecodeURIComponent(decode[1].replace(/\+/g, "%2B"));
          } else {
            paramsObject[decode[0]] = decode[1];
          }
        }
      });
    } else {
      for (const [key, value] of params) {
        paramsObject[key] = value;
      }
    }

    if (paramsObject.token && paramsObject.email) {
      setEmailToken(paramsObject);
    }
  }, [path]);

  function customDecodeURIComponent(str) {
    // Decode the URL and restore any '+' characters in emails
    let decodedStr = decodeURIComponent(str);
    return decodedStr.replace(/ /g, "+");
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl text-[#282828] font-normal">Set a New Password</h1>
      <form onSubmit={updatePassword}>
        <div className="w-full md:w-[50%] mb-3 mt-5">
          <div className="mt-2">
            <label htmlFor="label" className="text-[13px] font-semibold">
              New Password <span className="text-[#f00]">*</span>
            </label>
            <input
              type={`${checked ? "text" : "password"}`}
              name="password"
              onChange={({ target: { value } }) => setPassword(value)}
              className="w-full h-10 border-b border-[#e1e1e1] text-base focus:outline-none"
            />
          </div>
          <PasswordStrengthBar password={password} />
          <div className="mt-2">
            <label htmlFor="label" className="text-[13px] font-semibold">
              Confirm New Password <span className="text-[#f00]">*</span>
            </label>
            <input
              type={`${checked ? "text" : "password"}`}
              name="confirm password"
              onChange={({ target: { value } }) => setCPassword(value)}
              className="w-full h-10 border-b border-[#e1e1e1] text-base focus:outline-none"
            />
          </div>
          <div className="flex w-fit flex-col">
            {/* eslint-disable-next-line no-nested-ternary */}
            {showErrors ? (
              cpassword !== password ? (
                <small className="text-red-600 mt-3">Password does not match! </small>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {error ? <small className="text-red-600 mt-3">{error}</small> : null}
            <div className="flex mt-1">
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => setchecked(!checked)}
              />
              <span className="inline-block pl-2 text-[14px] text-[#282828]">Show password</span>
            </div>

            <button
              type="button"
              onClick={updatePassword}
              className="border bg-skin-primary text-skin-inverted uppercase py-2 px-4 mt-3 text-xs hover:text-skin-base hover:bg-skin-inverted hover:border"
            >
              {loading ? <LoadingSpinner message="Updating Password" /> : "set a new password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
