import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ForgetPassword from "../../../components/forget-password/graphql/mutation/index";
import { SET_NOTIFICATION } from "../../../redux/actions";

function useForgetPassword() {
  const [value, setValue] = useState({});
  const [forgetPasswordMutation, { loading }] = useMutation(ForgetPassword);
  const dispatch = useDispatch();
  const history = useRouter();

  const handleInputChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const userForgetPassword = (event) => {
    forgetPasswordMutation({
      variables: {
        email: value.email,
      },
    }).then(({ data }) => {
      if (data?.passwordResetEmail) {
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message:
              "If there is an account associated with the given email address you will receive an email with a link to reset your password.",
            type: "success",
          })
        );
        history.push("/login");
      } else {
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message:
              "The email address does not exist on our website. Verify the email address and try again.",
            type: "error",
          })
        );
      }
    });
  };

  return { userForgetPassword, loading, handleInputChange };
}

export default useForgetPassword;