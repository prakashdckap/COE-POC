import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import VALIDATE_ADDRESS from "../../components/checkout/graphql/query/validate-address";
import { SET_IS_SHIPPING_ADDRESS_VERIFIED, SET_VERIFIED_ADDRESS_ARR } from "../../redux/actions";
import useSetShippingAddress from "./use-set-shipping-address";
import UserADDADDRESS from "./customer/use-add-address";
import { useRouter } from "next/router";
import useEditAddress from "./customer/use-edit-address";

export default function useValidateAddress() {
  const dispatch = useDispatch();
  const history = useRouter();
  const { customerToken, customerCartId, guestCartId } = useSelector((state) => state);
  const [
    addressVerification,
    { data: verifiedAddress, loading: addressVerificationLoading, refetch },
  ] = useLazyQuery(VALIDATE_ADDRESS);
  const { handleSetShippingAddress, shippingAddressLoading } = useSetShippingAddress();

  const { userAddAddress, loading, newAddress } = UserADDADDRESS();
  const { userEditAddress } = useEditAddress();

  const toSmallCase = (str) => {
    if (str) {
      const stringWithoutSpaces = str.toLowerCase().replace(/\s+/g, "");
      return stringWithoutSpaces;
    } else str;
  };

  useEffect(() => {
    if (verifiedAddress?.validateAddress?.data?.length) {
      dispatch(SET_VERIFIED_ADDRESS_ARR(verifiedAddress?.validateAddress?.data));
    } else if (verifiedAddress) {
      dispatch(SET_VERIFIED_ADDRESS_ARR([]));
    }

    // if (verifiedAddress?.validateAddress) dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(true));
  }, [verifiedAddress]);

  const validationToOpenAddressPopup = (enteredAdd = {}, validAddr = {}, addressVariable = {}) => {
    const { street, city, region, country, zip } = enteredAdd;
    const {
      street: validStreet,
      city: validCity,
      region: validRegion,
      country: validCountry,
      zip: validZip,
      region_code: validRegionCode,
    } = validAddr;

    if (
      zip === validZip &&
      toSmallCase(city) === toSmallCase(validCity) &&
      toSmallCase(country) === toSmallCase(validCountry) &&
      toSmallCase(region) === toSmallCase(validRegionCode) &&
      toSmallCase(street.toString().replaceAll(",", "")) ===
        toSmallCase(validStreet.toString().replaceAll(",", ""))
    ) {
      if (history?.pathname === "/account/add-address") {
        userAddAddress(addressVariable?.shippingAddress?.address);
      } else if (history?.pathname === "/account/edit-address") {
        userEditAddress(addressVariable?.shippingAddress?.address);
      } else if (
        addressVariable?.cartId &&
        addressVariable?.shippingAddress?.address &&
        history?.pathname !== "/account/add-address" &&
        history?.pathname !== "/account/edit-address"
      ) {
        handleSetShippingAddress(addressVariable);
        dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(true));
      }

      return false;
    }
    dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(false));
    return true;
  };

  const handleValidateAddress = (
    address,
    setaddressVerificationPopup,
    addressFullData,
    createOrUpdateAddress
  ) => {
    if (address?.country)
      addressVerification({
        skip: !address?.country || !customerToken,
        fetchPolicy: "no-cache",
        variables: {
          address,
        },
      }).then(({ data }) => {
        try {
          const shippingAddressVariables = createOrUpdateAddress
            ? addressFullData
            : {
                cartId: customerToken ? customerCartId : guestCartId,
                shippingAddress: {
                  address: addressFullData,
                },
              };
          if (shippingAddressVariables?.shippingAddress.customerAddressId) {
            handleSetShippingAddress(shippingAddressVariables);
            dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(true));
          } else if (data?.validateAddress?.data && data?.validateAddress?.data?.[0]) {
            const open = validationToOpenAddressPopup(
              address,
              data?.validateAddress?.data[0],
              shippingAddressVariables
            );
            setaddressVerificationPopup && setaddressVerificationPopup(open);
          } else {
            dispatch(SET_IS_SHIPPING_ADDRESS_VERIFIED(false));
            setaddressVerificationPopup && setaddressVerificationPopup(true);
          }
        } catch (error) {}
      });
  };

  return { handleValidateAddress, addressVerificationLoading, shippingAddressLoading };
}
