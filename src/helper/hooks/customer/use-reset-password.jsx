import { useState } from "react";
import { AxiosGraphQL } from "../../axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { SET_NOTIFICATION } from "../../../redux/actions";

function useResetPassword() {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const history = useRouter();
  const dispatch = useDispatch();
  // Api to reset the password
  const handleResetPassword = async (resetPassword) => {
    setloading(true);
    const response = await AxiosGraphQL("reset-password", resetPassword);
    if (response && !response?.errors?.length) {
      if (response?.data?.resetPassword === true) {
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: "Password reset successfully",
            type: "success",
          })
        );
        history.push("/login");
        setloading(false);
        setError("");
      }
      setloading(false);
    } else {
      if (
        response?.errors?.[0].message == "The password token is mismatched. Reset and try again."
      ) {
        setloading(false);
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: "Your password reset link has expired.",
            type: "warning",
          })
        );
      } else {
        setError(response?.errors?.[0].message ? response?.errors?.[0].message : "");
      }

      setloading(false);
    }
  };

  return { loading, error, handleResetPassword };
}

export default useResetPassword;
