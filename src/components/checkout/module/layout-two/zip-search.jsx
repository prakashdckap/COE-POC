import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import PropTypes from "prop-types";
import { SearchIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import TextInput from "../../../../theme-files/text-input";
import { AxiosGraphQL } from "../../../../helper/axios";
import LoadingSpinner from "../../../../helper/loading-spinner";
import Paragraph from "../../../../theme-files/paragraph";
import SubHeading from "../../../../theme-files/sub-heading";
import { SET_NOTIFICATION } from "../../../../redux/actions";
import useSetShippingAddress from "../../../../helper/hooks/use-set-shipping-address";
import useSetBillingAddress from "../../../../helper/hooks/use-set-billing-address";
import UseRegionList from "../../../../helper/hooks/use-region-list";
// import useSetDealerInfo from "../../../../helper/hooks/use-set-dealer-info";

function ZipSearch({ inputValues, seterror, setchecked }) {
  const dispatch = useDispatch();
  const customerToken = useSelector((state) => state.customerToken);
  const guestCartId = useSelector((state) => state.guestCartId);
  const customerCartId = useSelector((state) => state.customerCartId);
  const checkoutEmail = useSelector((state) => state.checkoutEmail);
  const checkoutBillingAddress = useSelector((state) => state.checkoutBillingAddress);
  const [loading, setLoading] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [addresses, setaddresses] = useState([]);
  const [checkedRadio, setcheckedRadio] = useState({});
  const [values, setvalues] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});

  const { handleSetShippingAddress, shippingResponse, shippingAddressLoading } =
    useSetShippingAddress();
  const { handleSetBillingAddress, billingResponse, billingAddressLoading } =
    useSetBillingAddress();

  const { regions } = UseRegionList(selectedAddress?.countryid);

  // Function to search whether local pickup is available
  const onSearch = async (e) => {
    e.preventDefault();
    setclicked(true);
    setLoading(true);
    if (values?.zip?.length > 0) {
      const regex = /^\d+$/;
      if (!parseInt(values?.zip, 10) || regex.test(parseInt(values?.zip, 10)) === false) {
        setLoading(false);
      } else {
        const response = await AxiosGraphQL(
          "/pick-up-locally",
          {
            zipcode: values?.zip,
          },
          customerToken
        );
        if (response && response?.data?.pickUpLocally?.length) {
          setLoading(false);
          setaddresses(response?.data?.pickUpLocally);
        } else if (response && response?.errors?.length) {
          setLoading(false);
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: response?.errors[0]?.message,
              type: "error",
            })
          );
        } else {
          setLoading(false);
          setaddresses([]);
        }
      }
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleRegion = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    const res = regions?.find((reg) => reg?.platformId === selectedAddress?.provinceid);

    const { firstName, lastName, phone } = inputValues;
    if (firstName && lastName && phone && res?.code) {
      const { address1, address2, city, postalCode, countryid } = selectedAddress;

      setcheckedRadio(selectedAddress);
      seterror(false);

      let addressArr = [];
      if (address1 && address2) {
        addressArr = [address1, address2];
      } else {
        addressArr = [address1];
      }

      const dealerObj = {
        dealerId: selectedAddress?.dealerid,
        dealerName: selectedAddress?.name,
        dealerNo: selectedAddress?.number,
        dealerHours: selectedAddress?.hours,
      };

      const data = {
        firstName,
        lastName,
        // company: "DCKAP",
        street: addressArr,
        city,
        postcode: postalCode,
        telephone: phone,
        region: res?.code || "CA",
        country: countryid,
      };

      const shippingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,

        shippingAddress: {
          address: data,
        },
      };
      handleSetShippingAddress(
        shippingAddressVariables,
        "pickupLocally",
        setchecked,
        "",
        "",
        "",
        dealerObj
      );

      const billingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,
        email: checkoutEmail,
        billingAddress: {
          address: data,
          sameAsShipping: false,
        },
      };

      if (!checkoutBillingAddress?.firstName) handleSetBillingAddress(billingAddressVariables);
    } else {
      seterror(true);
    }
  }, [regions, selectedAddress]);

  // Displaying notification once the address is set
  useEffect(() => {
    if (shippingResponse?.data) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Shipping Address Saved Successfully",
          type: "success",
        })
      );
    } else if (billingResponse?.data) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Billing Address Saved Successfully",
          type: "success",
        })
      );
    }
  }, [shippingResponse, billingResponse, dispatch]);

  return (
    <>
      <form className="flex justify-between items-center w-full">
        <div className="w-[90%] mr-2">
          <TextInput
            type="number"
            label="zip"
            name="zip"
            placeholder="Enter 5-Digit Zipcode"
            values={values}
            setvalues={setvalues}
            isRequired
            placeholderColor
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center bg-[#A80F16] mt-[25px] w-10 h-[42px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={(e) => onSearch(e)}
          disabled={!values?.zip || loading}
        >
          {loading ? (
            <LoadingSpinner className="m-0" />
          ) : (
            <SearchIcon className="text-white w-5 h-5 text-center" />
          )}
        </button>
      </form>

      {addresses?.length && customerToken ? (
        <div
          className={`mt-5 ${
            billingAddressLoading || shippingAddressLoading ? "opacity-50" : null
          }`}
        >
          <Paragraph className="font-bold py-5 text-sm text-[#282828]">
            Please select one of the below locations. We will ship the package to the local
            destination that you have selected.
          </Paragraph>

          <div className="h-[310px] overflow-y-auto">
            {addresses?.map((address) => {
              const {
                dealerid,
                number,
                name,
                address1,
                address2,
                city,
                province,
                postalCode,
                country,
                hours,
                distance,
              } = address;
              return (
                <div
                  className="border-[2px] border-[#979797] my-5 py-[10px] px-[15px] text-[#282828] leading-6"
                  key={address?.dealerid}
                >
                  <SubHeading className="font-semibold text-[15px] mb-2.5">
                    {name} <span className="ml-2">({number})</span>
                  </SubHeading>

                  <Paragraph className="text-[13px] leading-5">
                    {address1 || null} {address2 || null}, {city || null}, {province || null},{" "}
                    {postalCode || null}, {country || null}
                  </Paragraph>

                  <Paragraph className="font-bold text-[13px]">
                    ({distance} {" mi"})
                  </Paragraph>
                  <Paragraph className="text-[13px] leading-5">{hours}</Paragraph>

                  <label
                    className={`${
                      dealerid === checkedRadio?.dealerid ? "border-[2px] border-black" : null
                    } containerCheck w-full ${
                      billingAddressLoading || shippingAddressLoading ? "cursor-not-allowed" : null
                    } my-[7px] py-[7px]`}
                  >
                    <input
                      type="radio"
                      onClick={() => handleRegion(address)}
                      name="address"
                      checked={dealerid === checkedRadio?.dealerid}
                    />
                    <span>Ship to this address</span>
                    <span className="checkmark" />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {clicked && !addresses?.length && !loading && customerToken ? (
        <div className="flex mt-5 bg-[#fff7f6] p-[10px] justify-between">
          <div className="h-10 w-10">
            <ExclamationCircleIcon className="h-5 w-5 text-skin-primary mr-3" />
          </div>

          <Paragraph className="text-[#A80F16] text-[12px] font-medium">
            We&apos;re sorry. We currently don&apos;t ship to the zip Code you entered. Please try
            another Zip Code to pickup locally from or try selecting Home/Business. Need more
            information?{" "}
            <Link href="/contact">
              <a className="underline hover:decoration-[#A80F16] inline">Please Contact Us</a>
            </Link>
          </Paragraph>
        </div>
      ) : null}
    </>
  );
}

export default ZipSearch;

ZipSearch.defaultProps = {
  inputValues: {},
};
ZipSearch.propTypes = {
  inputValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.number,
  }),
  seterror: PropTypes.func.isRequired,
  setchecked: PropTypes.func.isRequired,
};
