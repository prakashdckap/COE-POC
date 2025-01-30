import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import EditAddress from "../../../components/account/graphql/edit-address";
import { SET_NOTIFICATION } from "../../../redux/actions";
import useGetAddressList from "./use-get-address-list";

function useEditAddress() {
  const [mutation, { loading }] = useMutation(EditAddress);
  const history = useRouter();
  const dispatch = useDispatch();
  // const { addressListRefetch } = useGetAddressList();

  const userEditAddress = (addressObj) => {
    mutation({
      variables: addressObj,
    })
      .then((res) => {
        if (!res?.errors?.length && !res?.data?.errors?.length) {
          // addressListRefetch();
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Your address has been successfully updated.",
              type: "success",
            })
          );
          history.push("/account/address-book");
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message:
                res?.data?.errors[0]?.message ||
                res?.errors[0]?.message ||
                "Error occured while updating the address",
              type: "error",
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return { userEditAddress, loading };
}

export default useEditAddress;
