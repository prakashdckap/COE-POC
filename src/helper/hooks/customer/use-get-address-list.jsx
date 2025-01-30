import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { SET_CUSTOMER_ADDRESS_LIST } from "../../../redux/actions";
import GET_CUSTOMER_ADDRESS_LIST from "../../../components/account/graphql/get-address-list";
import useSetShippingAddress from "../use-set-shipping-address";
import useValidateAddress from "../use-validate-address";
import { useRouter } from "next/router";
import useSetBillingAddress from "../use-set-billing-address";

export default function useGetAddressList() {
  const dispatch = useDispatch();
  const history = useRouter();
  const { customerToken, customerCartId, guestCartId, checkoutShippingAddress, checkoutEmail } =
    useSelector((state) => state);

  const { data: addressList, refetch: addressListRefetch } = useQuery(GET_CUSTOMER_ADDRESS_LIST, {
    skip: !customerToken,
    fetchPolicy: "network-only",
  });

  const { handleSetShippingAddress } = useSetShippingAddress();
  const { handleValidateAddress } = useValidateAddress();
  const { handleSetBillingAddress } = useSetBillingAddress();

  // Storing addresses in redux store
  useEffect(() => {
    if (addressList?.customerAddressList?.length) {
      dispatch(SET_CUSTOMER_ADDRESS_LIST(addressList?.customerAddressList));
      const defualtShipping = addressList?.customerAddressList?.find(
        (addr) => addr?.defaultShipping
      );

      if (defualtShipping?.id) {
        const shippingAddressVariables = {
          cartId: customerToken ? customerCartId : guestCartId,

          shippingAddress: {
            customerAddressId: defualtShipping?.id,
          },
        };
        handleSetShippingAddress(shippingAddressVariables);

        if (
          history?.pathname !== "/account/add-address" &&
          history?.pathname !== "/account/edit-address"
        ) {
          handleValidateAddress({
            street: defualtShipping?.street?.[0] || "",
            country: defualtShipping?.country,
            city: defualtShipping?.city,
            region: defualtShipping?.region?.code,
            zip: defualtShipping?.postcode,
          });
        }
      }

      const defualtBilling = addressList?.customerAddressList?.find((addr) => addr?.defaultBilling);
      if (defualtBilling?.id && customerCartId) {
        const billingAddressVariables = {
          cartId: customerCartId,
          email: checkoutEmail,
          billingAddress: {
            customerAddressId: defualtBilling?.id,
          },
        };
        handleSetBillingAddress(billingAddressVariables);
      }
    }
  }, [addressList]);

  return { addressList, addressListRefetch };
}
