import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { ReplyIcon } from "@heroicons/react/outline";
import { SET_NOTIFICATION } from "../../redux/actions";
import UseChangePassword from "../../helper/hooks/customer/use-change-password";
import Label from "../../theme-files/label";
import SubHeading from "../../theme-files/sub-heading";
import TextInput from "../../theme-files/text-input";
import LoadingSpinner from "../../helper/loading-spinner";
import PasswordStrengthChecker from "./password-strength-checker";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountInformation() {
  const dispatch = useDispatch();
  const history = useRouter();
  const customerDetails = useSelector((state) => state.customerDetails);
  const [values, setvalues] = useState({});
  const [SubscribeNowEnabled, setSubscribeNowEnabled] = useState(history.query.password === "true");
  const [clicked, setclicked] = useState(false);
  const { handleChangePassword, changePasswordLoading } = UseChangePassword();
  const [errorText, setErrorText] = useState({ password: "", confirmPassword: "" });

  const validateNewPassword = () => {
    const { newpassword } = values;
    if (newpassword?.length < 6) {
      setErrorText({
        ...errorText,
        password: (errorText.password =
          "Minimum length of this field must be equal or greater than 6 symbols. Leading and trailing spaces will be ignored."),
      });
      return false;
    }
    if (
      !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?~`=+-/.:;"'_|<>)}{(\[\]])[a-zA-Z0-9!@#$%^&*?~`=+-/.:;"'_|<>)}{(\[\]]{6,}$/.test(
        newpassword
      )
    ) {
      setErrorText({
        ...errorText,
        password: (errorText.password =
          "Minimum of different classes of characters in password is 4. Classes of characters: Lower Case, Upper Case, Digits, Special Characters."),
      });
      return false;
    }
    setErrorText({ ...errorText, password: "" });
    return true;
  };

  const validateConfirmPassword = () => {
    const { newpassword, confirmpassword } = values;
    if (newpassword !== confirmpassword) {
      setErrorText({
        ...errorText,
        confirmPassword: (errorText.confirmPassword = "Password doesn't match"),
      });
      return false;
    }
    setErrorText({ ...errorText, confirmPassword: "" });
    return true;
  };

  const handlePasswordChange = () => {
    setclicked(true);
    const { currentpassword, newpassword, confirmpassword } = values;
    const data = {
      currentPassword: currentpassword,
      newPassword: newpassword,
    };

    if (currentpassword === newpassword) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Current password and new password cannot be the same!",
          type: "warning",
        })
      );
    } else {
      if (
        currentpassword &&
        newpassword &&
        confirmpassword &&
        newpassword === confirmpassword &&
        validateNewPassword() &&
        validateConfirmPassword()
      )
        handleChangePassword(data, setvalues, setclicked);
      if (
        newpassword !== confirmpassword &&
        newpassword &&
        confirmpassword &&
        validateConfirmPassword()
      )
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: "Confirm Password does not match with the New Password",
            type: "error",
          })
        );
    }
  };

  useEffect(() => {
    validateNewPassword();
  }, [values?.newpassword]);

  useEffect(() => {
    if (clicked) {
      validateConfirmPassword();
    }
  }, [values?.confirmpassword]);

  const saveAccountInformation = () => {
    history.push("/account");
    setTimeout(() => {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "You saved the account information.",
          type: "success",
        })
      );
    }, 2000);
  };
  return (
    <form
      className="divide-y divide-gray-200 account-info py-6 lg:col-span-9"
      action="#"
      method="POST"
    >
      <div className="py-5 px-4 sm:p-6 lg:pb-8 border">
        <div>
          <SubHeading className="text-lg leading-6 text-gray-900 uppercase">
            Account Information
          </SubHeading>
        </div>
        <hr className="mt-3 mb-3" />

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <TextInput
              type="text"
              label="First Name"
              name="firstname"
              placeholder={customerDetails.firstName}
              isDisabled
              isRequired
            />
          </div>

          <div className="col-span-12">
            <TextInput
              type="text"
              label="Last Name"
              placeholder={customerDetails.lastName}
              isDisabled
              isRequired
            />
          </div>
        </div>

        <div className="col-spn-12 sm:col-span-6 mt-5 switch">
          <Label className="flex items-center">
            <Switch
              checked={SubscribeNowEnabled}
              onChange={setSubscribeNowEnabled}
              className={classNames(
                SubscribeNowEnabled ? "bg-black" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-5 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  SubscribeNowEnabled ? "translate-x-6" : "translate-x-0",
                  "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
            &nbsp;&nbsp; Change Password
          </Label>
        </div>
        {(() => {
          if (SubscribeNowEnabled) {
            return (
              <div className="mt-10">
                <div>
                  <SubHeading className="text-lg leading-6 text-gray-900 uppercase">
                    Change Password
                  </SubHeading>
                </div>
                <hr className="mt-3 " />
                <div className="pt-5">
                  <TextInput
                    type="password"
                    label="Current Password"
                    name="currentpassword"
                    values={values}
                    setvalues={setvalues}
                    isRequired
                    isClicked={clicked}
                  />
                </div>
                <div className="pt-5">
                  <TextInput
                    type="password"
                    label="New Password"
                    name="newpassword"
                    values={values}
                    setvalues={setvalues}
                    isRequired
                    isClicked={clicked}
                  />
                  {values?.newpassword && errorText.password ? (
                    <p className="text-[#e02b27] text-sm mt-2">{errorText.password}</p>
                  ) : null}
                </div>
                <PasswordStrengthChecker passwordinput={values?.newpassword} />
                <div className="pt-5">
                  <TextInput
                    type="password"
                    label="Confirm Password"
                    name="confirmpassword"
                    values={values}
                    setvalues={setvalues}
                    isRequired
                    isClicked={clicked}
                  />
                  {values?.confirmpassword && errorText.confirmPassword ? (
                    <p className="text-[#e02b27] text-sm mt-2">{errorText.confirmPassword}</p>
                  ) : null}
                </div>
              </div>
            );
          }
          return "";
        })()}

        <div className="pt-1 divide-y divide-gray-200">
          <div className="mt-10 block md:flex justify-between">
            <button
              onClick={() => {
                if (SubscribeNowEnabled) {
                  handlePasswordChange();
                } else saveAccountInformation();
              }}
              type="button"
              className={`${
                changePasswordLoading
                  ? "w-full md:w-[70px] text-center mb-2 md:mb-0 px-3 py-1 text-sm border border-[#a80f16] shadow-sm text-skin-inverted  bg-[#a80f16] ease-in-out duration-300"
                  : "w-full md:w-[70px] text-center mb-2 md:mb-0 px-3 py-1 text-sm border border-[#a80f16] shadow-sm text-skin-inverted  bg-[#a80f16] ease-in-out duration-300 hover:text-skin-primary hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
              }`}
            >
              {changePasswordLoading ? <LoadingSpinner /> : "Save"}
            </button>
            <button
              type="button"
              className="w-full md:w-auto items-center px-3 py-1 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
              onClick={() => history.push("/account")}
            >
              <i className="h-5 w-4 inline-block align-middle">
                <ReplyIcon />
              </i>{" "}
              Go Back
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
