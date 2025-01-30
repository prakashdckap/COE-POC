import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import REGISTER from "../../../components/register/graphql/mutation/register";
import { SET_NOTIFICATION } from "../../../redux/actions";
import useLogin from "./use-login";

function useRegister() {
  const [registerMutation, { loading }] = useMutation(REGISTER);
  const { userLogin } = useLogin();
  const dispatch = useDispatch();

  const userRegistration = (event, data) => {
    event.preventDefault();
    registerMutation({
      variables: {
        customer: data,
      },
    })
      .then((res) => {
        if (res?.data?.register && !res?.data?.errors?.length && !res?.errors?.length) {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Your registration has been successfully completed.",
              type: "success",
            })
          );
          userLogin({ email: data?.email, passwd: data?.password });
        }
      })
      .catch((err) => console.log(err));
  };

  return { userRegistration, loading };
}

export default useRegister;
