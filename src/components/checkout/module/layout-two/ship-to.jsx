import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import Heading from "../../../../theme-files/heading";
import PickupLocally from "./pickup-locally";
import HomeAddress from "./home-address";
import useSetPudoShipping from "../../../../helper/hooks/use-set-pudo-shipping";
import useSetShippingAddress from "../../../../helper/hooks/use-set-shipping-address";
import { useRouter } from "next/router";
import { LOADING } from "../../../../redux/actions";

function ShipToOptions({
  setaddressVerificationPopup,
  setenteredAddress,
  showDropdownForm,
  setshowDropDownForm,
  showSavedAddress,
  setshowSavedAddress,
  setPudoLoading,
  values,
  setvalues,
  dropdownSelectedData,
  setdropdownSelectedData,
  checked,
  setchecked,
  pudoLoading,
  open,
  setopen,
}) {
  const history = useRouter();
  const dispatch = useDispatch();
  const [help, sethelp] = useState(false);
  const {
    checkoutShippingAddress,
    customerToken,
    customerCartId,
    guestCartId,
    customerAddressList,
  } = useSelector((state) => state);

  const { handlePickupLocally } = useSetPudoShipping();
  const { handleSetShippingAddress, shippingAddressLoading, shippingMethodLoading } =
    useSetShippingAddress();

  const data = customerAddressList?.length
    ? customerAddressList?.find((address) => address?.defaultShipping)
    : null;

  const defaultShippingAddress = data?.firstName
    ? {
        firstName: data?.firstName,
        lastName: data?.lastName,
        company: data?.company,
        street: data?.street,
        city: data?.city,
        postcode: data?.postcode,
        telephone: data?.telephone,
        region: data?.region?.code,
        country: data?.country,
      }
    : checkoutShippingAddress;
  if (checkoutShippingAddress?.__typename) delete checkoutShippingAddress?.__typename;

  const shippingAddressVariables = {
    cartId: customerToken ? customerCartId : guestCartId,

    shippingAddress: {
      address: defaultShippingAddress,
    },
  };

  const setDefalutAddress = (load) => {
    setPudoLoading(load);
    if (defaultShippingAddress?.firstName && !load)
      handleSetShippingAddress(shippingAddressVariables);
  };

  useEffect(() => {
    dispatch(
      LOADING(shippingAddressLoading || pudoLoading || shippingMethodLoading ? true : false)
    );
  }, [shippingAddressLoading, pudoLoading, shippingMethodLoading]);

  const togglePickUpLocally = () => {
    setchecked("pickUpLocaly");
    history.replace({ pathname: "/checkout", query: { isPudo: true } });
    handlePickupLocally(true, setPudoLoading);
  };

  const toggleHome = () => {
    setchecked("home");
    handlePickupLocally(false, setDefalutAddress);
    history.replace({ pathname: "/checkout", query: {} });
  };

  return (
    <div className={"bg-[#fff] w-full p-[20px] border border-[#e6e6e6]"}>
      <div
        className={pudoLoading || shippingAddressLoading ? "opacity-40 pointer-events-none" : ""}
      >
        <Heading className="uppercase pb-[10px] font-semibold text-lg text-[#282828] border-b-[1px] border-[#d9d9d9]">
          Ship To Options
        </Heading>
        <div className="flex justify-between items-center mb-3 sm:text-center">
          <label
            className={`${
              checked === "home" ? "border-[2px] border-black bg-[#f5f5f5]" : null
            } containerCheck w-1/2 text-[12px] md:text-[15px] text-[#454545]`}
            tabIndex={"-1"}
          >
            <div
              type="button"
              tabIndex={"0"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault(); // Prevent spacebar scrolling
                  setchecked("home");
                }
              }}
            >
              <input
                type="radio"
                onChange={() => setchecked("home")}
                name="radio"
                checked={checked === "home"}
                disabled={pudoLoading || shippingAddressLoading}
              />
              <span className="checkmark top-0 md:top-[4px] left-0 md:left-[35px] lg:right-auto" />
              Home/Business
            </div>
          </label>

          <label
            className={`${
              checked === "pickUpLocaly" ? "border-[2px] border-black bg-[#f5f5f5]" : null
            } containerCheck w-1/2 text-[12px] md:text-[15px] text-[#454545]`}
          >
            <div
              type="button"
              tabIndex={"0"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault(); // Prevent spacebar scrolling
                  togglePickUpLocally();
                }
              }}
            >
              <input
                type="radio"
                onChange={togglePickUpLocally}
                name="radio"
                checked={checked === "pickUpLocaly"}
                disabled={pudoLoading || shippingAddressLoading}
              />
              Pick up locally
              <span className="checkmark top-0 md:top-[4px] left-0 md:left-[35px] right-auto" />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sethelp(!help);
              }}
              onBlur={(e) => {
                e.stopPropagation();
                sethelp(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  sethelp(!help);
                }
              }}
              className="absolute top-[11px] left-auto md:right-[14px] right-[10px]"
            >
              <QuestionMarkCircleIcon
                className={` ${
                  help ? "text-[#333]" : "text-[#bbb]"
                } md:h-5 md:w-5 w-4 h-4   hover:text-[#333] relative`}
              />

              <button
                onClick={() => setchecked("pickUpLocaly")}
                type="button"
                className={`${
                  help ? "visible" : "hidden"
                }  font-medium text-left absolute z-10 mb-6 leading-[1.4] border-[1px] border-[#bbb] border-solid text-xs w-[200px] lg:w-[300px] lg:py-[20px] py-[12px] lg:px-[30px] px-[12px] text-[#333] whitespace-pre-wrap bg-skin-inverted h-auto group-hover:justify-center group-hover:items-center group-hover:flex group-focus:flex  lg:-top-1 lg:-right-3 right-[183px] top-[30px] translate-x-[99%] before:content-[''] before:absolute lg:before:top-4 before:-top-1 lg:before:right-[98.5%] before:right-[10%] lg:before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-t-0 before:border-r-0 lg:before:rotate-45 before:rotate-[135deg]`}
              >
                We&#39;re proud to work with PUDOpoint to offer a convenient Pick-up counter at a
                local business near you! <br />
                <br />
                We will ship the package to the PUDO location you have selected below. Once the
                order is delivered, you &#39;ll receive an email notification that it is ready for
                pick-up with the address location, Order Number, and business operation hours.
                <br />
                <br />
                Pick up the package at your own leisure with adult signature verification and never
                miss a delivery again!
              </button>
            </button>
          </label>
        </div>

        {checked === "home" ? (
          <HomeAddress
            setaddressVerificationPopup={setaddressVerificationPopup}
            setenteredAddress={setenteredAddress}
            showDropdownForm={showDropdownForm}
            setshowDropDownForm={setshowDropDownForm}
            showSavedAddress={showSavedAddress}
            setshowSavedAddress={setshowSavedAddress}
            values={values}
            setvalues={setvalues}
            dropdownSelectedData={dropdownSelectedData}
            setdropdownSelectedData={setdropdownSelectedData}
            open={open}
            setopen={setopen}
            pudoLoading={pudoLoading}
            toggleHome={toggleHome}
          />
        ) : (
          <PickupLocally setchecked={setchecked} />
        )}
      </div>
    </div>
  );
}

export default ShipToOptions;

ShipToOptions.defaultProps = {
  showDropdownForm: false,
  showSavedAddress: false,
  setPudoLoading: false,
  pudoLoading: false,
};

ShipToOptions.propTypes = {
  setaddressVerificationPopup: PropTypes.func.isRequired,
  setenteredAddress: PropTypes.func.isRequired,
  setshowDropDownForm: PropTypes.func.isRequired,
  showDropdownForm: PropTypes.bool,
  showSavedAddress: PropTypes.bool,
  setshowSavedAddress: PropTypes.func.isRequired,
  setPudoLoading: PropTypes.bool,
  pudoLoading: PropTypes.bool,
};
