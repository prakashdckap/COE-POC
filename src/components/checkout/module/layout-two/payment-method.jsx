import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Heading from "../../../../theme-files/heading";
import CardDetails from "../../payment/card-details";
import ShippingAddress from "../../information/shipping-address";
import useSetBillingAddress from "../../../../helper/hooks/use-set-billing-address";
import Paragraph from "../../../../theme-files/paragraph";
import SelectOption from "../../../../theme-files/select-option";
import LoadingSpinner from "../../../../helper/loading-spinner";
import CheckoutRadio from "../../../../theme-files/form/CheckoutRadio";
import { SET_CHECKOUT_PAYMENT_METHOD } from "../../../../redux/actions";
import SezzlePay from "./SezzlePay";

function PaymentMethods({
  handleZipPaymentMethod,
  values,
  setvalues,
  dropdownSelectedData,
  setdropdownSelectedData,
  validCvvError,
  setValidCvvError,
  setshowDropDownForm,
  open,
  setopen,
}) {
  const dispatch = useDispatch();
  const [isSameAddress, setisSameAddress] = useState(false);
  const [isError, setisError] = useState(false);
  const checkoutBillingAddress = useSelector((state) => state.checkoutBillingAddress);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const checkoutEmail = useSelector((state) => state.checkoutEmail);
  const customerAddressList = useSelector((state) => state.customerAddressList);
  const checkoutShippingMethod = useSelector((state) => state.checkoutShippingMethod);

  const [addresses, setaddresses] = useState([]);
  const [selectedMethod, setselectedMethod] = useState("");
  const cartDetails = useSelector((state) => state.cartDetails);

  const availablePaymentMethods = useSelector((state) => state.availablePaymentMethods);
  const checkoutPaymentMethod = useSelector((state) => state.checkoutPaymentMethod);

  // Initially rendering payment method
  useEffect(() => {
    if (availablePaymentMethods?.length && !selectedMethod) {
      setselectedMethod(availablePaymentMethods[0]?.methodCode);
    }
  }, [availablePaymentMethods]);

  // Function to format an array of addresses to display in the dropdown.
  const formatArr = (addressArr) => {
    const formattedArr = [];
    addressArr?.map((address) =>
      formattedArr?.push({
        name: `${address?.firstName} ${address?.lastName}, ${address?.street[0]} ${address?.street[1]}, ${address?.city}, ${address?.region?.region} ${address?.postcode}, ${address?.country}`,
        id: address?.id,
      })
    );
    formattedArr?.push({
      name: "Add New Billing Address",
      id: "new_billing",
    });
    return formattedArr;
  };

  // Passing address list to the address format function
  useEffect(() => {
    setaddresses(formatArr(customerAddressList));
  }, [customerAddressList?.length]);

  const { handleSetBillingAddress, billingAddressLoading } = useSetBillingAddress();

  // Intially setting up same as shipping checkbox
  useEffect(() => {
    const defaultBillingAddress = customerAddressList.length
      ? customerAddressList?.find((address) => address?.defaultBilling)
      : customerAddressList.length && customerAddressList[0];

    // Default Billing Address
    const {
      firstName: billingFirstName,
      lastName: billingLastName,
      company: billingCompany,
      city: billingCity,
      country: billingCountry,
      postcode: billingPostcode,
      region: billingRegion,
      street: billingStreet,
      telephone: billingTelephone,
    } = checkoutBillingAddress?.firstName
      ? checkoutBillingAddress
      : defaultBillingAddress?.firstName
      ? defaultBillingAddress
      : {};

    // Checkout Shipping Address
    const {
      firstName: shippingFirstName,
      lastName: shippingLastName,
      company: shippingCompany,
      city: shippingCity,
      country: shippingCountry,
      postcode: shippingPostcode,
      region: shippingRegion,
      street: shippingStreet,
      telephone: shippingTelephone,
    } = checkoutShippingAddress;

    if (!defaultBillingAddress?.id && checkoutShippingAddress?.firstName) {
      setisSameAddress(true);
    } else if (
      billingFirstName === shippingFirstName &&
      billingLastName === shippingLastName &&
      billingCompany === shippingCompany &&
      billingCity === shippingCity &&
      billingCountry === shippingCountry &&
      (billingRegion?.code === shippingRegion || billingRegion === shippingRegion) &&
      billingTelephone === shippingTelephone &&
      billingStreet?.[0] === shippingStreet?.[0] &&
      billingPostcode === shippingPostcode
    ) {
      setisSameAddress(true);
    }
  }, [checkoutShippingAddress]);

  // Setting billing address if the checkbox is ticked.
  useEffect(() => {
    const newBillingAddressObj = { ...checkoutShippingAddress };
    if (isSameAddress) {
      // eslint-disable-next-line no-underscore-dangle
      delete newBillingAddressObj?.__typename;
      delete newBillingAddressObj?.dealerId;
      delete newBillingAddressObj?.dealerName;
      delete newBillingAddressObj?.dealerNo;
      delete newBillingAddressObj?.dealerHours;

      const billingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,
        email: checkoutEmail,
        billingAddress: {
          address: newBillingAddressObj,
          sameAsShipping: false,
        },
      };
      if (billingAddressVariables?.billingAddress?.address?.firstName)
        handleSetBillingAddress(billingAddressVariables, setisError);
    } else {
      setisError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSameAddress, checkoutShippingAddress]);

  // checking is there any error while setting the same as shipping address
  useEffect(() => {
    if (isError) setisSameAddress(false);
  }, [isError]);

  const handleEditBillingAddress = () => {
    setopen(true);
    setshowDropDownForm(false);
    if (checkoutBillingAddress) {
      setvalues({
        ...values,
        city: checkoutBillingAddress?.city,
        phone: checkoutBillingAddress?.telephone,
        address1: checkoutBillingAddress?.street,
        zip: checkoutBillingAddress?.postcode,
      });
    }
  };

  const handleUpdateBillingAddress = () => {
    const selectedAddress = customerAddressList?.find(
      (address) => address?.id === dropdownSelectedData?.select_billing?.id
    );
    const { firstName, lastName, street, city, postcode, telephone, region, country, company } =
      selectedAddress;
    const data = {
      firstName,
      lastName,
      company,
      street,
      city,
      postcode,
      telephone,
      region: region?.code,
      country,
      saveInAddressBook: false,
    };

    const billingAddressVariables = {
      cartId: customerToken ? customerCartId : guestCartId,
      email: checkoutEmail,
      billingAddress: {
        address: data,
        sameAsShipping: false,
      },
    };

    handleSetBillingAddress(billingAddressVariables, setisError, setopen);
  };

  const handleCancelBillingAddress = () => {
    if (
      checkoutBillingAddress?.firstName === checkoutShippingAddress?.firstName &&
      checkoutBillingAddress?.lastName === checkoutShippingAddress?.lastName &&
      checkoutBillingAddress?.city === checkoutShippingAddress?.city &&
      checkoutBillingAddress?.company === checkoutShippingAddress?.company &&
      checkoutBillingAddress?.region === checkoutShippingAddress?.region &&
      checkoutBillingAddress?.country === checkoutShippingAddress?.country &&
      checkoutBillingAddress?.telephone === checkoutShippingAddress?.telephone &&
      checkoutBillingAddress?.postcode === checkoutShippingAddress?.postcode &&
      checkoutBillingAddress?.street[0] === checkoutShippingAddress?.street[0]
    )
      setisSameAddress(true);

    setopen(false);
  };

  const staticPaymentMethods = [{ methodName: "Debit / Credit Card", methodCode: "authnetcim" }];

  useEffect(() => {
    const selected = staticPaymentMethods?.find((method) => method?.methodCode === selectedMethod);
    const availableSelected = availablePaymentMethods?.find(
      (method) => method?.methodCode === selectedMethod
    );
    if (checkoutShippingAddress?.firstName && selectedMethod) {
      if (selectedMethod === "sezzlepay") {
        handleZipPaymentMethod({
          variables: {
            cartId: customerToken ? customerCartId : guestCartId,
            paymentMethod: selectedMethod,
          },
        });
      }
      if (availableSelected?.methodCode) dispatch(SET_CHECKOUT_PAYMENT_METHOD(availableSelected));
    } else if (availableSelected?.methodCode) {
      dispatch(SET_CHECKOUT_PAYMENT_METHOD(availableSelected));
    } else if (selectedMethod && selected?.methodCode) {
      dispatch(SET_CHECKOUT_PAYMENT_METHOD(selected));
    }
  }, [availablePaymentMethods, selectedMethod]);

  useEffect(() => {
    if (!checkoutShippingAddress?.firstName && !selectedMethod) {
      setselectedMethod(staticPaymentMethods[0]?.methodCode);
    }
  }, [staticPaymentMethods]);

  useEffect(() => {
    if (!checkoutShippingAddress?.firstName) setisSameAddress(true);
  }, []);

  return (
    <div
      className={`bg-[#fff] mt-[25px] p-[20px] text-[#282828] border border-[#e6e6e6] ${
        billingAddressLoading && "opacity-50 pointer-events-none"
      }`}
    >
      <Heading className="uppercase pb-[10px] font-semibold text-lg border-b-[1px] border-[#d9d9d9]">
        Payment Method
      </Heading>
      <div className="inline-block text-sm mt-[20px]">
        <span className="text-[13px] font-semibold">Please Note:</span>
        <span className="text-[#000] text-[13px] ml-1">
          Billing Address must match the exact Billing Address associated with the chosen payment
          method
        </span>
      </div>
      <div className="col-span-6 my-[10px]">
        <label
          className="containercheckbox"
          aria-label="My billing and shipping address are the same"
        >
          <input
            type="checkbox"
            className="mr-2 h-[13px] w-[13px] bg-[#000]"
            onClick={() => {
              setvalues({});
              setshowDropDownForm(false);
              setisSameAddress(!isSameAddress);
              if (isSameAddress) setopen(true);
            }}
            checked={isSameAddress}
            tabIndex="-1"
            role="checkbox"
            aria-label="My billing and shipping address are the same"
          />
          <span
            className="checkbox-checkmark rounded-sm focus:outline-[2px] focus:outline-[#000]"
            tabIndex="0"
            role="checkbox"
            aria-checked={isSameAddress}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setvalues({});
                setshowDropDownForm(false);
                setisSameAddress(!isSameAddress);
                if (isSameAddress) setopen(true);
                e.preventDefault(); // Prevents scrolling on Space
              }
            }}
          />
        </label>
        <span className="text-[#000] font-medium text-[14px]">
          My billing and shipping address are the same
        </span>
      </div>

      {(!open || isSameAddress) && checkoutBillingAddress?.firstName ? (
        <div className="text-sm font-normal mb-2 text-[14px] pl-[25px] mt-[5px]">
          <Paragraph>
            {" "}
            {checkoutBillingAddress?.firstName} {checkoutBillingAddress?.lastName}
          </Paragraph>
          <Paragraph>
            {checkoutBillingAddress?.street[0] || null} {checkoutBillingAddress?.street[1] || null}
          </Paragraph>
          <Paragraph>
            {checkoutBillingAddress?.city}, {checkoutBillingAddress?.region},{" "}
            {checkoutBillingAddress?.postcode}
          </Paragraph>
          <Paragraph>{checkoutBillingAddress?.country}</Paragraph>
          <Paragraph>{checkoutBillingAddress?.telephone}</Paragraph>

          {!isSameAddress ? (
            <button
              type="button"
              className="text-sm text-skin-primary mt-2"
              onClick={() => handleEditBillingAddress()}
            >
              Edit
            </button>
          ) : null}
        </div>
      ) : null}

      {!isSameAddress && open ? (
        <>
          <h3 className="font-semibold text-[#292c2d] text-[13px]">
            Billing Address <span className="text-red-500">*</span>
          </h3>
          <SelectOption
            placeholder="-- Choose Billing Address --"
            data={addresses}
            displayKey="name"
            dropdownSelectedData={dropdownSelectedData}
            setdropdownSelectedData={setdropdownSelectedData}
            name="select_billing"
            setvalues={setvalues}
            values={values}
          />

          {dropdownSelectedData?.select_billing?.id !== "new_billing" && !isSameAddress ? (
            <div className="flex my-5 justify-end">
              <button
                type="button"
                onClick={() => handleCancelBillingAddress()}
                className="border  shadow-sm text-xs font-normal text-black px-2 py-2 bg-white transition-all ease-out duration-300 border-black text-skin-base disabled:cursor-not-allowed hover:border-[#a80f16] hover:bg-[#000] hover:text-white disabled:opacity-50 uppercase mr-1"
              >
                Cancel
              </button>
              <button
                disabled={!dropdownSelectedData?.select_billing}
                onClick={() => handleUpdateBillingAddress()}
                type="button"
                className="flex justify-center w-[25%] border border-transparent transition-all ease-out duration-300 shadow-sm text-xs font-normal text-white px-2 py-2 hover:text-skin-base disabled:cursor-not-allowed disabled:opacity-50 uppercase bg-[#a80f16] ml-1"
              >
                {billingAddressLoading ? <LoadingSpinner message="updating" /> : "Update"}
              </button>
            </div>
          ) : null}
        </>
      ) : null}

      {dropdownSelectedData?.select_billing?.id === "new_billing" && !isSameAddress && open ? (
        <div className="my-5">
          <ShippingAddress
            isBillingAddress
            handleCancelBillingAddress={handleCancelBillingAddress}
            setopen={setopen}
            seterror={setisError}
            values={values}
            setvalues={setvalues}
            dropdownSelectedData={dropdownSelectedData}
            setdropdownSelectedData={setdropdownSelectedData}
          />
          <hr className="mt-5" />
        </div>
      ) : null}

      {/** Payment Methods */}

      {!availablePaymentMethods?.length
        ? staticPaymentMethods?.map((item) => (
            <div key={item?.methodName}>
              <CheckoutRadio
                item={item}
                setselectedMethod={setselectedMethod}
                selectedMethod={selectedMethod}
                staticPaymentMethods={staticPaymentMethods}
                payment
              />
              <div className="mb-5">
                {item?.methodCode === "authnetcim" && selectedMethod === "authnetcim" ? (
                  <CardDetails validCvvError={validCvvError} setValidCvvError={setValidCvvError} />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        : null}

      {cartDetails?.grandTotal > 35
        ? availablePaymentMethods?.map((item) => (
            <>
              <CheckoutRadio
                key={item?.methodName}
                item={item}
                setselectedMethod={setselectedMethod}
                selectedMethod={selectedMethod}
                payment
                isDisabled={item.methodCode === "sezzlepay" && !checkoutShippingMethod?.methodName}
              />
              <div className="mb-5">
                {item?.methodCode === "authnetcim" && selectedMethod === "authnetcim" ? (
                  <CardDetails validCvvError={validCvvError} setValidCvvError={setValidCvvError} />
                ) : (
                  ""
                )}
              </div>
            </>
          ))
        : availablePaymentMethods?.map((item) =>
            item.methodCode !== "mr_quadpay" ? (
              <>
                <CheckoutRadio
                  key={item?.methodName}
                  item={item}
                  setselectedMethod={setselectedMethod}
                  selectedMethod={selectedMethod}
                  payment
                />
                <div className="mb-5">
                  {item?.methodCode === "authnetcim" && selectedMethod === "authnetcim" ? (
                    <CardDetails
                      validCvvError={validCvvError}
                      setValidCvvError={setValidCvvError}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : null
          )}
      {selectedMethod === "sezzlepay" && <SezzlePay grandTotal={cartDetails?.grandTotal} />}
    </div>
  );
}

PaymentMethods.defaultProps = {
  values: "",
  dropdownSelectedData: "",
};

PaymentMethods.propTypes = {
  handleZipPaymentMethod: PropTypes.func.isRequired,
  values: PropTypes.shape(),
  setvalues: PropTypes.func.isRequired,
  dropdownSelectedData: PropTypes.shape(),
  setdropdownSelectedData: PropTypes.func.isRequired,
};

export default PaymentMethods;
