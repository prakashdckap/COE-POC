import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ReplyIcon } from "@heroicons/react/outline";
import Label from "../../theme-files/label/index";
import UseRegionList from "../../helper/hooks/use-region-list";
import useAddAddress from "../../helper/hooks/customer/use-add-address";
import LoadingSpinner from "../../helper/loading-spinner";
import TextInput from "../../theme-files/text-input";
import SelectOption from "../../theme-files/select-option";
import SubHeading from "../../theme-files/sub-heading";
import useValidateAddress from "../../helper/hooks/use-validate-address";
import NewAddressConfirm from "../checkout/module/layout-two/new-address-confirm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AddAddress() {
  const history = useRouter();
  const [billingEnabled, setbillingEnabled] = useState(false);
  const [shippingEnabled, setshippingEnabled] = useState(false);
  const [values, setvalues] = useState();
  const [ConfirmedAddressPopup, setConfirmedAddressPopup] = useState(false);
  const [clicked, setclicked] = useState(false);
  const { userAddAddress, loading } = useAddAddress();
  const countries = useSelector((state) => state.countries);
  const customerDetails = useSelector((state) => state.customerDetails);
  const [selectedRegion, setSelectedRegion] = useState();

  const { handleValidateAddress, addressVerificationLoading } = useValidateAddress();
  const addressList = useSelector((state) => state.customerAddressList);
  const [open, setOpen] = useState(false);
  // dropdown datas
  const [dropdownSelectedData, setdropdownSelectedData] = useState({
    country: {
      code: "US",
      name: "United States",
      platformId: null,
    },
  });

  // Get regions list
  const { regions } = UseRegionList(
    dropdownSelectedData?.country ? dropdownSelectedData?.country?.code : null
  );

  // Clearing region based on country change
  useEffect(() => {
    setdropdownSelectedData({ ...dropdownSelectedData, region: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownSelectedData.country]);

  const handleAddAddress = (e) => {
    e.preventDefault();

    let selectedRegion = {};
    if (regions?.length) {
      if (dropdownSelectedData?.region?.platformId) {
        selectedRegion = { id: parseInt(dropdownSelectedData?.region?.platformId, 10) };
        setSelectedRegion(dropdownSelectedData?.region?.name);
      } else {
        selectedRegion = null;
      }
    } else if (values?.region) {
      selectedRegion = { region: values?.region };
      setSelectedRegion(values?.region);
    } else {
      selectedRegion = null;
      setSelectedRegion(selectedRegion);
    }

    if (values) {
      const { firstName, lastName, city, street1, postcode, telephone } = values;
      const { country } = dropdownSelectedData;

      if (
        firstName &&
        lastName &&
        city &&
        street1 &&
        postcode &&
        telephone &&
        telephone?.replace(/\D/g, "")?.length == 10 &&
        country &&
        selectedRegion
      ) {
        let streetArr = [];
        if (values?.street1 && values?.street2) {
          streetArr = [values?.street1, values?.street2];
        } else {
          streetArr = [values?.street1];
        }
        const data = {
          address: {
            company: values?.company,
            firstName: values?.firstName,
            lastName: values?.lastName,
            street: streetArr,
            city: values?.city,
            postcode: values?.postcode,
            telephone: values?.telephone,
            fax: values?.telephone,
            region: selectedRegion,
            country: dropdownSelectedData?.country?.code,
            defaultBilling: billingEnabled,
            defaultShipping: shippingEnabled,
          },
        };
        // userAddAddress(data);
        setConfirmedAddressPopup(data);

        handleValidateAddress(
          {
            street: [values?.street1, values?.street2],
            country: dropdownSelectedData?.country?.code,
            city: values?.city,
            region: dropdownSelectedData?.region?.code,
            zip: values?.postcode,
          },
          setOpen,
          data
        );
      }
    }
  };

  useEffect(() => {
    setbillingEnabled(addressList?.length ? false : true);
    setshippingEnabled(addressList?.length ? false : true);
  }, []);

  useEffect(() => {
    values &&
      setvalues({
        ...values,
        firstName: customerDetails?.firstName,
        lastName: customerDetails?.lastName,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create a new array from the countries array and sort it by the name property
  const sortedCountries = [...countries]?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <form
        className="divide-y add-address divide-gray-200 account-info lg:col-span-9 border border-[#ebebeb]"
        onSubmit={(e) => handleAddAddress(e)}
      >
        <div className="p-5">
          <div>
            <SubHeading className="text-[14px] leading-6 font-semibold text-[#282828] uppercase border-b border-b-black pb-2.5">
              Contact Information
            </SubHeading>
          </div>

          <div className="mt-[10px] grid grid-cols-12 gap-6 mb-[40px]">
            <div className="col-span-12">
              <TextInput
                type="text"
                label="First Name"
                name="firstName"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
            </div>

            <div className="col-span-12">
              <TextInput
                type="text"
                label="Last Name"
                name="lastName"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
            </div>
            <div className="col-span-12">
              <TextInput
                type="text"
                label="Company"
                name="company"
                values={values}
                setvalues={setvalues}
                isClicked={clicked}
              />
            </div>

            <div className="col-span-12">
              <TextInput
                type="text"
                label="Phone number"
                name="telephone"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
                formatNumber
              />
              {values?.telephone &&
              values?.telephone?.replace(/\D/g, "")?.length < 10 &&
              clicked ? (
                <p className="text-[#e02b27] font-normal text-[12px] capitalize mt-2">
                  This is a required field. Please enter a valid day-time phone number in case we
                  need to call you to confirm order or delivery.
                </p>
              ) : null}
            </div>
          </div>
          <div>
            <SubHeading className="text-[14px] leading-6 font-semibold text-[#282828] uppercase border-b border-b-black pb-2.5">
              ADDRESS
            </SubHeading>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <TextInput
                type="text"
                label="Street Address: Line 1"
                name="street1"
                values={values}
                setvalues={setvalues}
                isRequired
                returnOnlyValue
                isClicked={clicked}
              />
            </div>
            <div className="col-span-12">
              <TextInput
                type="text"
                label="Street Address: Line 2"
                name="street2"
                values={values}
                setvalues={setvalues}
                returnOnlyValue
                isClicked={clicked}
              />
            </div>
            <div className="col-span-12">
              <TextInput
                type="text"
                label="City"
                name="city"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
            </div>
            <div className="col-span-12">
              <TextInput
                type="text"
                label="Zipcode"
                name="postcode"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
            </div>
            <div className="col-span-12 country-select">
              <SelectOption
                label="country"
                data={sortedCountries}
                displayKey="name"
                placeholder="Please select a country."
                setdropdownSelectedData={setdropdownSelectedData}
                dropdownSelectedData={dropdownSelectedData}
                name="country"
                isRequired
                isClicked={clicked}
              />
            </div>
            {regions?.length ? (
              <div className="col-span-12 country-select">
                <SelectOption
                  label="State, Region, or Province"
                  data={regions}
                  displayKey="name"
                  placeholder="Please select a region, state or province."
                  setdropdownSelectedData={setdropdownSelectedData}
                  dropdownSelectedData={dropdownSelectedData}
                  name="region"
                  isRequired
                  isClicked={clicked}
                />
              </div>
            ) : (
              <div className="col-span-12">
                <TextInput
                  type="text"
                  label="State, Region, or Province"
                  name="region"
                  values={values}
                  setvalues={setvalues}
                  isRequired
                  isClicked={clicked}
                />
              </div>
            )}
          </div>
          {addressList?.length ? (
            <>
              <div className="col-spn-12 sm:col-span-6 mt-5 switch">
                <Label>
                  <Switch
                    checked={billingEnabled}
                    onChange={setbillingEnabled}
                    className={classNames(
                      billingEnabled ? "bg-black" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-5 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        billingEnabled ? "translate-x-6" : "translate-x-0",
                        "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                  &nbsp;&nbsp; Use as my default billing address
                </Label>
              </div>

              <div className="col-spn-12 sm:col-span-6 mt-5 switch">
                <Label>
                  <Switch
                    checked={shippingEnabled}
                    onChange={setshippingEnabled}
                    className={classNames(
                      shippingEnabled ? "bg-black" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-5 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        shippingEnabled ? "translate-x-6" : "translate-x-0",
                        "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                  &nbsp;&nbsp; Use as my default shipping address
                </Label>
              </div>
            </>
          ) : null}
          <div className="pt-3 divide-y divide-gray-200">
            <div className="mt-1 py-4 block md:flex add-btn justify-between">
              <button
                onClick={() => setclicked(true)}
                type="submit"
                className="md:inline-flex items-center uppercase px-3 py-1 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
              >
                {loading ? <LoadingSpinner message="loading" /> : "Save Address"}
              </button>
              <button
                onClick={() => history.push("/account")}
                type="button"
                className="items-center px-3 py-1 uppercase text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
              >
                <i className="h-5 w-4 inline-block align-middle">
                  <ReplyIcon />
                </i>{" "}
                Go Back
              </button>
            </div>
          </div>
        </div>
      </form>
      {open && (
        <NewAddressConfirm
          ConfirmedAddressPopup={ConfirmedAddressPopup}
          setConfirmedAddressPopup={setConfirmedAddressPopup}
          selectedRegion={selectedRegion}
          setOpen={setOpen}
        />
      )}
    </>
  );
}