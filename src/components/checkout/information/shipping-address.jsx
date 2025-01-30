import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import Paragraph from "../../../theme-files/paragraph";
import useSetShippingAddress from "../../../helper/hooks/use-set-shipping-address";
import useSetBillingAddress from "../../../helper/hooks/use-set-billing-address";
import SelectOption from "../../../theme-files/select-option";
import TextInput from "../../../theme-files/text-input";
import UseRegionList from "../../../helper/hooks/use-region-list";
import { SET_NOTIFICATION } from "../../../redux/actions";
import LoadingSpinner from "../../../helper/loading-spinner";
import { AxiosGraphQL } from "../../../helper/axios";
import UnorderedList from "../../../theme-files/unordered-list";
import ListItem from "../../../theme-files/list-item";
import useValidateAddress from "../../../helper/hooks/use-validate-address";

function ShippingAddress({
  setshowDropDownForm,
  isBillingAddress,
  setenteredAddress,
  setaddressVerificationPopup,
  handleCancelBillingAddress,
  seterror,
  setopen,
  values,
  setvalues,
  dropdownSelectedData,
  setdropdownSelectedData,
}) {
  const dispatch = useDispatch();
  const history = useRouter();
  const [clicked, setclicked] = useState(false);
  const [saveInAddressBook, setsaveInAddressBook] = useState(true);
  const [showTooltip, setshowTooltip] = useState(false);
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const customerDetails = useSelector((state) => state.customerDetails);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const checkoutBillingAddress = useSelector((state) => state.checkoutBillingAddress);
  const checkoutEmail = useSelector((state) => state?.checkoutEmail);
  const countries = useSelector((state) => state?.countries);
  const { handleSetShippingAddress, shippingResponse, shippingAddressLoading } =
    useSetShippingAddress();
  const { handleSetBillingAddress, billingResponse, billingAddressLoading } =
    useSetBillingAddress();
  const { handleValidateAddress, addressVerificationLoading } = useValidateAddress();

  const [loading, setloading] = useState(false);

  const [doWeShip, setdoWeShip] = useState(true);

  let buttonText;
  if (isBillingAddress) {
    buttonText = "Update";
  } else {
    buttonText = "Ship To This Address";
  }

  // Get regions list
  const { regions } = UseRegionList(
    dropdownSelectedData?.country ? dropdownSelectedData?.country?.code : null
  );

  const setShippingAddress = (open) => {
    if (!open) {
      setshowDropDownForm(false);
      setaddressVerificationPopup(false);
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Shipping Address Saved Successfully",
          type: "success",
        })
      );
    } else setaddressVerificationPopup(open);
  };

  // Submiting the address data and storing the email
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values?.zip?.length > 10) {
      return false;
    }

    const { firstName, lastName, address1, address2, city, zip, phone, region } = values;
    const { country, region: reg } = dropdownSelectedData;

    if (
      firstName &&
      lastName &&
      address1 &&
      city &&
      zip &&
      phone &&
      phone?.length === 10 &&
      country &&
      (region || reg?.code)
    ) {
      let addressArr = [];
      if (address1 && address2) {
        addressArr = [address1, address2];
      } else {
        addressArr = [address1];
      }

      const data = {
        firstName,
        lastName,
        street: addressArr,
        city,
        postcode: zip,
        telephone: phone,
        region: regions?.length ? reg?.code : values?.region,
        country: country?.code,
        saveInAddressBook,
      };

      const billingAddressVariables = {
        cartId: customerToken ? customerCartId : guestCartId,
        email: checkoutEmail,
        billingAddress: {
          address: data,
          sameAsShipping: false,
        },
      };

      if (!isBillingAddress && data?.region) {
        handleValidateAddress(
          {
            street: data?.street,
            country: data?.country,
            city: data?.city,
            region: data?.region,
            zip: data?.postcode,
          },
          setShippingAddress,
          data
        );
        setenteredAddress(data);
      } else if (data?.firstName && data?.region)
        handleSetBillingAddress(billingAddressVariables, seterror, setopen, setvalues, values);
    }
  };

  // Displaying notification once the address is set
  useEffect(() => {
    if (shippingResponse?.data) {
      setShippingAddress(false);
    } else if (billingResponse?.data) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Billing Address Saved Successfully",
          type: "success",
        })
      );
    }
  }, [
    shippingResponse,
    history,
    billingResponse,
    dispatch,
    checkoutShippingAddress?.firstName,
    checkoutBillingAddress?.firstName,
  ]);

  // Function to check zip code for shipping
  const onSearch = async () => {
    setloading(true);
    if (values?.zip?.length > 0) {
      const regex = /^\d+$/;
      /** if (!values?.zip || regex.test(values?.zip) === false) @oldCode */
      if (!values?.zip) {
        setloading(false);
      } else {
        const response = await AxiosGraphQL("do-we-ship", { zipcode: values?.zip });
        if (response && !response?.errors?.length) {
          setdoWeShip(response?.doWeShip);
          setloading(false);
        } else {
          setloading(false);
        }
      }
    } else {
      setloading(false);
    }
  };

  useEffect(() => {
    if (setvalues)
      setvalues({
        ...values,
        firstName: customerDetails?.firstName,
        lastName: customerDetails?.lastName,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dropdownSelectedData?.country === "" && countries) {
      setdropdownSelectedData({
        ...dropdownSelectedData,
        country: countries.filter((ele) => ele.code === "US")[0],
        region: regions?.[0] || "",
      });
    }
  }, []);

  useEffect(() => {
    if (dropdownSelectedData?.country?.code) {
      setdropdownSelectedData({
        ...dropdownSelectedData,
        region: regions?.[0] || "",
      });
    }
  }, [regions]);

  return (
    <div
      className={`mt-5 md:mt-0 md:col-span-2 add-new-address ${
        loading || addressVerificationLoading ? "opacity-50" : null
      }`}
    >
      <div className="flex items-center justify-start" aria-label="Required field indicator">
        <span className="text-[#e02b27] m-1 text-[14px]">*</span>{" "}
        <span className="text-[#282828] font-Montserrat font-normal leading-2 text-[14px]">
          Indicates a required field
        </span>
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="sm:rounded-md">
          <div className="bg-white">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <TextInput
                  type="text"
                  label="Legal First Name"
                  name="firstName"
                  values={values}
                  setvalues={setvalues}
                  isRequired
                  isClicked={clicked}
                />
              </div>

              <div className="col-span-6">
                <TextInput
                  type="text"
                  label="Legal Last Name"
                  name="lastName"
                  values={values}
                  setvalues={setvalues}
                  isRequired
                  isClicked={clicked}
                />
              </div>

              <div className="col-span-6">
                <TextInput
                  type="text"
                  label="Address"
                  name="address1"
                  values={values}
                  setvalues={setvalues}
                  isRequired
                  isClicked={clicked}
                />
              </div>

              <div className="col-span-6">
                <TextInput
                  type="text"
                  label="Unit, Apt, Suite, etc (Optional)"
                  name="address2"
                  values={values}
                  setvalues={setvalues}
                  isClicked={clicked}
                />
              </div>

              <div className="col-span-6 lg:col-span-2">
                <TextInput
                  type="text"
                  label="city"
                  name="city"
                  values={values}
                  setvalues={setvalues}
                  isRequired
                  isClicked={clicked}
                />
              </div>

              {regions?.length ? (
                <div className="lg:col-span-2 col-span-6 mt-1">
                  <SelectOption
                    label="state"
                    data={regions}
                    displayKey="name"
                    placeholder="-- Please Select --"
                    setdropdownSelectedData={setdropdownSelectedData}
                    dropdownSelectedData={dropdownSelectedData}
                    name="region"
                    isRequired
                    isClicked={clicked}
                    className="w-full lg:w-[260px]"
                  />
                </div>
              ) : (
                <div className="col-span-6 lg:col-span-2">
                  <TextInput
                    type="text"
                    label="State"
                    name="region"
                    values={values}
                    setvalues={setvalues}
                    isRequired
                    isClicked={clicked}
                  />
                </div>
              )}

              <div className="col-span-6 lg:col-span-2">
                <TextInput
                  type="text"
                  label="zip / postal code"
                  name="zip"
                  values={values}
                  setvalues={setvalues}
                  isRequired
                  isClicked={clicked}
                  blurFunction={onSearch}
                />
                {values?.zip?.length > 10 ? (
                  <div className="flex pt-2 justify-between text-[#e02b27] text-xs">
                    Please enter less or equal than 10 symbols.
                  </div>
                ) : (
                  ""
                )}
              </div>

              {!doWeShip &&
              values?.zip?.length !== 5 &&
              dropdownSelectedData?.country?.code &&
              dropdownSelectedData?.country?.code === "US" ? (
                <div className="col-span-6 flex mt-5 bg-[#fdf0d5] p-5 justify-between">
                  <div className="h-10 w-10">
                    <ExclamationCircleIcon className="h-5 w-5 text-[#6f4400] mr-3" />
                  </div>

                  <Paragraph className="text-[#6f4400] leading-5">
                    Provided Zip/Postal Code seems to be invalid. Example: 12345-6789; 12345. If you
                    believe it is the right one you can ignore this notice.
                  </Paragraph>
                </div>
              ) : null}

              {!doWeShip &&
              dropdownSelectedData?.country?.code &&
              dropdownSelectedData?.country?.code === "US" ? (
                <div className="col-span-6">
                  <div className=" mt-5 bg-[#fff7f6] p-5 border-2 border-t-4 border-[#A80F16] rounded-md">
                    <Paragraph className="text-[#A80F16] leading-5 mb-3">
                      We currently do not ship to your Zip Code due to lack of shipping courier in
                      your area. We recommend to:
                    </Paragraph>

                    <UnorderedList className="text-[#A80F16]">
                      <div className="flex">
                        <span className="mr-2">-</span>
                        <ListItem>
                          Enter your place of work address or a location where an adult is present
                          to receive the package
                        </ListItem>
                      </div>

                      <div className="flex">
                        <span className="mr-2">-</span>

                        <ListItem>Check our Pick-Up Locally option</ListItem>
                      </div>

                      <div className="flex">
                        <span className="mr-2">-</span>
                        <ListItem>
                          Sign up to be notified at{" "}
                          <Link href="/do-we-ship">
                            <a className="hover:underline hover:decoration-[#A80F16] inline font-semibold">
                              Zip Code Checker
                            </a>
                          </Link>{" "}
                          as we are increasing coverage weekly
                        </ListItem>
                      </div>
                    </UnorderedList>
                  </div>
                </div>
              ) : null}

              <div className="col-span-6">
                <SelectOption
                  label="country"
                  data={countries}
                  displayKey="name"
                  placeholder="-- Please Select --"
                  setdropdownSelectedData={setdropdownSelectedData}
                  dropdownSelectedData={dropdownSelectedData}
                  name="country"
                  isRequired
                  isClicked={clicked}
                />
                {dropdownSelectedData?.country?.code &&
                dropdownSelectedData?.country?.code !== "US" ? (
                  <div className="flex mt-5 bg-[#fdf0d5] p-5 justify-between">
                    <Paragraph className="text-[#6f4400] text-[14px] leading-5">
                      Note: FX fees, duties, VAT, and any other shipping related fees are not
                      covered and customers are responsible for these payments. If your order is
                      rejected by customs or has wrong address delivery, any charges for the return
                      package is subject to deduction from the original payment.
                    </Paragraph>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="col-span-6 relative">
                <span className="">
                  <TextInput
                    type="text"
                    label="phone number"
                    name="phone"
                    values={values}
                    setvalues={setvalues}
                    isRequired
                    isClicked={clicked}
                    formatNumber
                  />

                  <span
                    className={`${
                      isBillingAddress ? "question-mark-billing" : "question-mark-shipping"
                    } flex flex-row-reverse`}
                  >
                    <div
                      role="link"
                      tabIndex="0"
                      onClick={() => setshowTooltip(!showTooltip)}
                      onKeyDown={() => setshowTooltip(!showTooltip)}
                      onBlur={() => setshowTooltip(false)}
                      className="relative  whitespace-pre inline-block items-center group font-semibold text-[#a8a8a8] text-xs ml-2.5 focus:text-[#a80f16] cursor-pointer"
                    >
                      <span
                        className={` ${
                          showTooltip
                            ? "border-[#333] text-[#333]"
                            : "border-[#8a8c8e] text-[#8a8c8e]"
                        } border  hover:border-[#333] hover:text-[#333] text-[11px] flex items-center justify-center h-[14px] w-[14px] rounded-full`}
                      >
                        ?
                      </span>
                      {showTooltip ? (
                        <div
                          className="bg-white text-[12px] field-tooltip-content lg:w-[300px] sm:w-[270px] w-[200px] md:px-[30px] 
                          md:py-[20px] p-[12px] lg:border-none border-[1px] border-[#999]  text-[#282828] font-medium shadow-question-custom 
                          rounded-[1px]  absolute lg:left-[29px] left-auto lg:top-[-18px] top-[28px] lg:right-0 right-[-14px] z-[2] 
                          transform-none
                           before:content-['']
                           after:content-['']
                           "
                        >
                          For delivery questions.
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </span>
                </span>
                {clicked && values?.phone?.length > 0 && values?.phone?.length !== 10 ? (
                  <p className="text-[#e02b27]  text-[13px] leading-[1.35] font-normal mt-2 font-famile-style">
                    This is a required field. Please enter a valid day-time phone number in case we
                    need to call you to confirm order or delivery.
                  </p>
                ) : null}
              </div>

              <div className="col-span-6">
                <label htmlFor="Address-book-checkbox" className="containercheckbox">
                  <input
                    type="checkbox"
                    className="mr-2 h-[13px] w-[13px]"
                    id="Address-book-checkbox"
                    onClick={() => setsaveInAddressBook(!saveInAddressBook)}
                    checked={saveInAddressBook}
                  />
                  <span className="checkbox-checkmark rounded-sm" />
                </label>
                <span className="text-gray-700 font-semibold text-[13px] capitalize">
                  Save in address book
                </span>
              </div>
            </div>
          </div>

          <div
            className={` w-full items-center mt-5 ${
              isBillingAddress
                ? " flex justify-end "
                : " flex justify-between sm:flex-row flex-col gap-[10px] "
            }`}
          >
            <button
              onClick={() => {
                if (isBillingAddress) {
                  handleCancelBillingAddress();
                } else {
                  setshowDropDownForm(false);
                }
              }}
              type="button"
              className={`${
                isBillingAddress
                  ? " w-20 font-normal py-2 mr-2"
                  : " px-[10px] py-[7px] sm:w-[45%] w-[100%] font-semibold "
              }   text-xs text-center uppercase border border-skin-dark transition-all ease-out duration-300 hover:bg-[#000] hover:text-white hover:border-skin-secondary  disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setclicked(true);
              }}
              type="submit"
              className={`${
                isBillingAddress
                  ? " w-[40%] font-normal py-2 "
                  : " py-[7px] px-[10px] sm:w-[45%] w-[100%] font-semibold "
              }flex justify-center  border border-transparent shadow-sm text-xs transition-all ease-in-out duration-300 text-white  hover:text-skin-base disabled:cursor-not-allowed disabled:opacity-50 uppercase bg-skin-secondary`}
            >
              {shippingAddressLoading || billingAddressLoading ? (
                <LoadingSpinner message="processing" />
              ) : (
                buttonText
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddress;

ShippingAddress.defaultProps = {
  setshowDropDownForm: false,
  isBillingAddress: false,
};

ShippingAddress.propTypes = {
  setshowDropDownForm: PropTypes.bool,
  isBillingAddress: PropTypes.bool,
  setenteredAddress: PropTypes.func.isRequired,
  setaddressVerificationPopup: PropTypes.func.isRequired,
  handleCancelBillingAddress: PropTypes.func.isRequired,
  seterror: PropTypes.func.isRequired,
  setopen: PropTypes.func.isRequired,
  values: PropTypes.shape.isRequired,
  dropdownSelectedData: PropTypes.shape.isRequired,
  setvalues: PropTypes.func.isRequired,
  setdropdownSelectedData: PropTypes.func.isRequired,
};
