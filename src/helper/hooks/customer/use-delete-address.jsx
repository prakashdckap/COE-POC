import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import DeleteAddress from "../../../components/account/graphql/delete-address";
import { SET_NOTIFICATION } from "../../../redux/actions";
import useGetAddressList from "./use-get-address-list";

function UserDeleteAddress() {
  const [mutation, { loading }] = useMutation(DeleteAddress);
  const dispatch = useDispatch();
  const { addressListRefetch } = useGetAddressList();

  const userDeleteAddress = (AddressId) => {
    mutation({
      variables: {
        addressId: AddressId,
      },
    })
      .then((res) => {
        if (!res?.errors?.length && !res?.data?.errors?.length) {
          addressListRefetch();
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Address has been successfully deleted.",
              type: "success",
            })
          );
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

  return { userDeleteAddress, loading };
}

export default UserDeleteAddress;
