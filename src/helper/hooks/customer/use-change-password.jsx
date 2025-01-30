import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import CHANGE_PASSWORD from "../../../components/account/graphql/mutation/change-password";
import { SET_NOTIFICATION } from "../../../redux/actions";
import useLogout from "./use-logout";

function UseChangePassword() {
  const dispatch = useDispatch();
  const [changePassword, { loading: changePasswordLoading }] = useMutation(CHANGE_PASSWORD);
  const { logout } = useLogout();

  const handleChangePassword = (data, setvalues, setclicked) => {
    changePassword({
      skip: !data,
      variables: data,
    })
      .then((res) => {
        if (!res?.errors?.length) {
          setvalues({ currentpassword: "", newpassword: "", confirmpassword: "" });
          setclicked(false);
          logout(true);
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "You saved the account information.",
              type: "success",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { handleChangePassword, changePasswordLoading };
}

export default UseChangePassword;
