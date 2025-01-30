import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useSetShippingAddress from "./use-set-shipping-address";
import useSetBillingAddress from "./use-set-billing-address";

export default function useGetDefaultAddresses() {
  const history = useRouter();
  const [defaultShipping, setdefaultShipping] = useState({});
  const [defaultBilling, setdefaultBilling] = useState({});
  // const checkoutBillingAddress = useSelector((state) => state.checkoutBillingAddress);
  // const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const checkoutEmail = useSelector((state) => state.checkoutEmail);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const customerToken = useSelector((state) => state.customerToken);
  const customerAddressList = useSelector((state) => state.customerAddressList);
  const { handleSetShippingAddress, shippingAddressLoading } = useSetShippingAddress();
  const { handleSetBillingAddress, billingAddressLoading } = useSetBillingAddress();

  // Storing checkout billing and shipping addresses in redux store
  const handleDefaultAddresses = () => {
    if (customerAddressList?.length && customerCartId) {
      const defaultShippingAddress = customerAddressList?.find(
        (address) => address?.defaultShipping
      )
        ? customerAddressList?.find((address) => address?.defaultShipping)
        : customerAddressList[0];
      const defaultBillingAddress = customerAddressList?.find((address) => address?.defaultBilling)
        ? customerAddressList?.find((address) => address?.defaultBilling)
        : customerAddressList[0];

      setdefaultBilling(defaultBillingAddress);
      setdefaultShipping(defaultShippingAddress);

      // SHIPPING ADDRESS
      if (defaultShippingAddress?.id && customerCartId) {
        const { id } = defaultShippingAddress;

        const shippingAddressVariables = {
          cartId: customerToken ? customerCartId : guestCartId,
          shippingAddress: {
            customerAddressId: id,
          },
        };
        handleSetShippingAddress(shippingAddressVariables);
      }

      // BILLING ADDRESS
      if (defaultBillingAddress?.id && customerCartId) {
        const { id } = defaultBillingAddress;
        const billingAddressVariables = {
          cartId: customerToken ? customerCartId : guestCartId,
          email: checkoutEmail,
          billingAddress: {
            customerAddressId: id,
            sameAsShipping: false,
          },
        };
        handleSetBillingAddress(billingAddressVariables);
      }
    } else {
      history?.push("/checkout");
    }
  };

  return {
    handleDefaultAddresses,
    defaultShipping,
    defaultBilling,
    shippingAddressLoading,
    billingAddressLoading,
  };
}
