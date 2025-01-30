import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AxiosGraphQL } from "../../helper/axios";
import Paragraph from "../../theme-files/paragraph";
import UseRegionList from "../../helper/hooks/use-region-list";
import useEstimateShipping from "../../helper/hooks/cart/use-estimate-shipping";
import CheckoutRadio from "../../theme-files/form/CheckoutRadio";
import { SET_ESTIMATE_SHIPPING, SET_SELECTED_STATE } from "../../redux/actions";
import SelectOption from "../../theme-files/select-option";
import useEstimateShippingMethod from "../../helper/hooks/cart/use-estimate-shipping-method";
import _debounce from "lodash/debounce";

function EstimateShipping({ dropdownSelectedData, setdropdownSelectedData, setDisableCheckout }) {
  const dispatch = useDispatch();
  const {
    selectedState,
    availableShippingMethods,
    customerAddressList,
    customerCartId,
    checkoutShippingMethod,
    checkoutShippingAddress,
  } = useSelector((state) => state);
  const countries = useSelector((state) => state?.countries);
  const [open, setOpen] = useState(false);
  const [zip, setzip] = useState(checkoutShippingAddress?.postcode || "");
  const [city, setcity] = useState(checkoutShippingAddress?.city || "");
  const [loading, setloading] = useState(false);
  const [selectedMethod, setselectedMethod] = useState(checkoutShippingMethod?.methodCode || "");
  const [doWeShip, setdoWeShip] = useState(true);
  const [requestObject, setRequestObject] = useState({});
  const history = useRouter();

  useEffect(() => {
    if (!zip) {
      if (!(dropdownSelectedData?.region?.code || city)) {
        setRequestObject({
          country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
        });
      } else {
        setRequestObject({
          city: dropdownSelectedData?.region?.code || city,
          country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
        });
      }
    } else {
      if (zip.length >= 4 && (dropdownSelectedData?.region?.code || city)) {
        setRequestObject({
          city: dropdownSelectedData?.region?.code || city,
          country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
          postcode: zip,
        });
      }
    }
  }, [zip, dropdownSelectedData, city]);

  const { handleEstimateShipping, estimateShipping, estimateShippingLoading } =
    useEstimateShipping();

  const { handleEstimateShippingMethod, estimateShippingMethodLoading } =
    useEstimateShippingMethod();

  useEffect(() => {
    if (history.pathname === "/shoppingcart" || history.pathname === "/cartmodule") {
      const { city: region, country, postcode } = requestObject;
      if (country) {
        handleEstimateShipping(requestObject);
      }
    } else {
      handleEstimateShipping(requestObject);
    }
  }, [requestObject]);

  useEffect(() => {
    if (
      (dropdownSelectedData?.region?.code || city) &&
      (dropdownSelectedData?.country?.code || dropdownSelectedData?.country) &&
      zip &&
      selectedMethod
    )
      handleEstimateShippingMethod(
        {
          city: dropdownSelectedData?.region?.code || city,
          country: dropdownSelectedData?.country?.code || dropdownSelectedData?.country,
          postcode: zip,
        },
        selectedMethod
      );
  }, [selectedMethod]);

  // Get regions list
  const { regions } = UseRegionList(
    dropdownSelectedData?.country
      ? dropdownSelectedData?.country?.code || dropdownSelectedData?.country
      : null
  );

  // Clearing region based on country change
  useEffect(() => {
    setdropdownSelectedData({ ...dropdownSelectedData });
    dispatch(SET_SELECTED_STATE(dropdownSelectedData));
    setselectedMethod("");
  }, [dropdownSelectedData.country, dropdownSelectedData?.region]);

  // Define the debounced function
  const handleDebounceSearch = useCallback(
    _debounce((zipCode) => {
      onSearch(zipCode);
    }, 2000),
    []
  );

  // Function to check zip code for shipping
  const onSearch = async (zipCode) => {
    if (zipCode?.length > 0) {
      setloading(true);
      setselectedMethod("");
      const regex = /^\d+$/;
      /** if (!values?.zip || regex.test(values?.zip) === false) @oldCode */
      if (!zipCode) {
        setloading(false);
      } else {
        dispatch(SET_SELECTED_STATE({ ...dropdownSelectedData, zipCode }));
        const response = await AxiosGraphQL("do-we-ship", { zipcode: zipCode });
        if (response && !response?.errors?.length) {
          setdoWeShip(response?.doWeShip);
          setloading(false);
        } else {
          setloading(false);
        }
      }
    }
  };

  // Initially setting all values from shipping address details
  useEffect(() => {
    if (customerAddressList?.length && customerCartId) {
      const defaultShippingAddress = customerAddressList?.find(
        (address) => address?.defaultShipping
      );
      let addresSelect = {};
      let zipcode = "";

      if (
        defaultShippingAddress?.country &&
        !checkoutShippingAddress?.firstName &&
        !dropdownSelectedData?.region
      ) {
        const defaultCountryObj = countries?.find(
          (con) => con?.code === defaultShippingAddress?.country
        );
        const defaultRegionObj = {
          name: defaultShippingAddress?.region?.region,
          code: defaultShippingAddress?.region?.code,
        };

        addresSelect = {
          country: defaultCountryObj,
          region: defaultRegionObj,
        };
        zipcode = defaultShippingAddress.postcode;
      } else if (checkoutShippingAddress?.firstName && defaultShippingAddress?.country) {
        const defaultCountryObj = countries?.find(
          (con) => con?.code === checkoutShippingAddress?.country
        );
        const defaultRegionObj = {
          name: defaultShippingAddress?.region?.region,
          code: defaultShippingAddress?.region?.code,
        };

        addresSelect = {
          country: defaultCountryObj,
          region: defaultRegionObj,
        };
        zipcode = checkoutShippingAddress.postcode;
      } else {
        const defaultAddress = customerAddressList[0];

        if (defaultAddress?.country) {
          const defaultCountryObj = countries?.find((con) => con?.code === defaultAddress?.country);

          const defaultRegionObj = {
            name: defaultAddress?.region?.region,
            code: defaultAddress?.region?.code,
          };

          addresSelect = {
            country: defaultCountryObj,
            region: defaultRegionObj,
          };
          zipcode = defaultAddress.postcode;
        }
      }

      setdropdownSelectedData(addresSelect);
      dispatch(SET_SELECTED_STATE(addresSelect));
      setzip(zipcode);
    } else if (!dropdownSelectedData?.country) {
      setdropdownSelectedData({
        ...dropdownSelectedData,
        country: countries?.find((item) => item.code === "US"),
      });
      dispatch(
        SET_SELECTED_STATE({
          ...dropdownSelectedData,
          country: countries?.find((item) => item.code === "US"),
        })
      );
    }
  }, []);

  //  to select defualt state/region after country change
  useEffect(() => {
    if (!dropdownSelectedData?.region && dropdownSelectedData?.country?.code && regions) {
      const defaultRegionObj = "";
      setdropdownSelectedData({ ...dropdownSelectedData, region: defaultRegionObj });
    }
  }, [regions]);

  // Choosing selected method as 1 method in estimate shipping response
  useEffect(() => {
    if (
      `${estimateShipping?.estimateShippingCost?.availableShippingMethods}` !==
        `${availableShippingMethods}` ||
      !checkoutShippingMethod?.methodCode
    ) {
      const selected = estimateShipping?.estimateShippingCost?.availableShippingMethods[0] || "";
      setselectedMethod(selected?.methodCode);
      if (selected) dispatch(SET_ESTIMATE_SHIPPING(selected));
    } else if (!estimateShipping?.estimateShippingCost?.availableShippingMethods?.length) {
      setselectedMethod("");
      dispatch(SET_ESTIMATE_SHIPPING({}));
    } else if (estimateShipping?.estimateShippingCost?.shippingMethod?.methodCode) {
      setselectedMethod(estimateShipping?.estimateShippingCost?.shippingMethod.methodCode || "");
    } else {
      setselectedMethod("");
      dispatch(SET_ESTIMATE_SHIPPING({}));
    }
  }, [estimateShipping]);

  // Storing the estimate shipping in redux
  useEffect(() => {
    if (selectedMethod) {
      const selected = estimateShipping?.estimateShippingCost?.availableShippingMethods?.find(
        (item) => item?.methodCode === selectedMethod
      );
      if (selected) dispatch(SET_ESTIMATE_SHIPPING(selected));
    } else {
      dispatch(SET_ESTIMATE_SHIPPING({}));
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (setDisableCheckout) {
      if (estimateShippingMethodLoading || estimateShippingLoading || loading) {
        setDisableCheckout(true);
      } else setDisableCheckout(false);
    }
  }, [estimateShippingMethodLoading, estimateShippingLoading, loading]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full relative flex justify-between border-t  border-[#ebebeb] py-[7px] pr-[30px] pl-[5px]"
      >
        <Paragraph className="text-[14px] leading-[1.35] font-medium uppercase text-[#282828]  whitespace-nowrap">
          Estimate Shipping and Tax
        </Paragraph>
        {/* {open ? <ChevronUp /> : <ChevronDown />} */}
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 absolute right-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 absolute right-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </button>
      {open && (
        <>
          <form
            className={`${
              loading || estimateShippingLoading || estimateShippingMethodLoading
                ? "opacity-50 pointer-events-none"
                : null
            } mt-[15px] mb-[25px]`}
          >
            <p className="text-[12px] text-[#282828] leading-[1.35] mb-[10px]">
              Enter your destination to get a shipping estimate.
            </p>

            <div className="col-span-6 mb-[10px] ">
              <SelectOption
                label="country"
                data={countries}
                displayKey="name"
                placeholder="Please select a country."
                setdropdownSelectedData={(e) => {
                  setdropdownSelectedData({ ...e, region: "", zipCode: "", city: "" });
                  setcity("");
                  setzip("");
                }}
                dropdownSelectedData={dropdownSelectedData}
                name="country"
              />
            </div>

            {regions?.length ? (
              <div className="lg:col-span-2 col-span-6 mb-[10px]">
                <SelectOption
                  label="state/province"
                  data={regions}
                  displayKey="name"
                  placeholder="Please select a state"
                  setdropdownSelectedData={setdropdownSelectedData}
                  dropdownSelectedData={dropdownSelectedData}
                  name="region"
                  // className={"py-[8px] px-[12px] m-0"}
                />
              </div>
            ) : (
              <div className="col-span-6 lg:col-span-2 mt-2">
                <label
                  name="city"
                  className="block text-[13px] font-semibold text-skin-base capitalize"
                >
                  City
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => {
                      setcity(e.target.value);
                      dispatch(
                        SET_SELECTED_STATE({
                          ...dropdownSelectedData,
                          city: e.target.value,
                        })
                      );
                    }}
                    className=" mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A80F16] focus:border-[#A80F16] text-xs placeholder:text-skin-base"
                    // onBlur={(e) => setcity(e.target.value)}
                  />
                </label>
              </div>
            )}

            <div className="col-span-6 lg:col-span-2 mt-2">
              <label
                name="zip"
                className="block text-[13px] font-semibold text-skin-base capitalize"
              >
                Zip
                <input
                  type="number"
                  name="zip"
                  value={zip}
                  onChange={(e) => {
                    setzip(e.target.value);
                    handleDebounceSearch(e.target.value);
                  }}
                  className=" mt-1 block w-full border border-gray-300 shadow-sm py-[11px] px-[10px] focus:outline-none focus:ring-[#A80F16] focus:border-[#A80F16] text-xs placeholder:text-skin-base"
                />
              </label>

              {!doWeShip && zip?.length !== 5 ? (
                <div className="flex my-[10px] bg-[#fdf0d5] p-[10px]  justify-between">
                  <div className="h-10 w-10">
                    <i class="fa-solid fa-triangle-exclamation h-5 w-5 text-[#6F4400] mr-3"></i>
                    {/* <ExclamationCircleIcon className="h-5 w-5 text-[#6f4400] mr-3" /> */}
                  </div>

                  <Paragraph className="text-[#6f4400] text-[13px] leading-[1.35]">
                    Provided Zip/Postal Code seems to be invalid. Example: 12345-6789; 12345. If you
                    believe it is the right one you can ignore this notice.
                  </Paragraph>
                </div>
              ) : null}
            </div>
          </form>
          <div className="mt-[15px] mb-[25px] ">
            {estimateShipping?.estimateShippingCost?.availableShippingMethods?.length
              ? !estimateShippingLoading
                ? estimateShipping?.estimateShippingCost?.availableShippingMethods?.map((item) => (
                    <div key={item?.methodCode} className="">
                      <CheckoutRadio
                        item={item}
                        setselectedMethod={setselectedMethod}
                        selectedMethod={selectedMethod}
                        estimate
                      />
                    </div>
                  ))
                : null
              : !estimateShipping?.estimateShippingCost?.availableShippingMethods?.length && (
                  <>
                    <p className="text-[13px] leading-[1.35] mb-[16px] ">
                      Sorry, no quotes are available for this order at this time
                    </p>
                  </>
                )}
          </div>
        </>
      )}
    </>
  );
}

export default EstimateShipping;
