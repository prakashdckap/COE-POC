import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import AddAddress from "../../../components/account/graphql/add-address";
import { SET_NOTIFICATION } from "../../../redux/actions";
import useGetAddressList from "./use-get-address-list";
import { useState } from "react";

function UserADDADDRESS() {
  const [mutation, { loading }] = useMutation(AddAddress);
  const history = useRouter();
  const dispatch = useDispatch();
  // const { addressListRefetch } = useGetAddressList();

  const userAddAddress = (addressObj) => {
    mutation({
      variables: addressObj,
    })
      .then((res) => {
        if (!res?.errors?.length && !res?.data?.errors?.length) {
          // addressListRefetch();
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Your address has been successfully saved.",
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
                "Error occured while adding address",
              type: "error",
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return { userAddAddress, loading };
}

export default UserADDADDRESS;
