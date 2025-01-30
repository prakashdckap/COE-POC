import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Switch } from "@headlessui/react";
import useCustomerCart from "../../../../helper/hooks/customer/use-customer-cart";
import { Check, Minus } from "heroicons-react";

export default function Toggle({ routeShipping }) {
  const { customerCartId, guestCartId, customerToken, cartDetails } = useSelector((state) => state);
  const [enabled, setEnabled] = useState(cartDetails?.routeShippingProtection ? true : false);
  const [enabledState, setStateEnabled] = useState(true);
  const { cartDetailsRefetch } = useCustomerCart();

  /** to avoid duplicate API call which causing @Internal @Server @Error compare in below function*/
  const validateDuplicateApiCall = () => {
    try {
      if (enabled && cartDetails?.routeShippingProtection) {
        return true;
      } else if (!enabled && !cartDetails?.routeShippingProtection) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    /** @commented due to miss match of routeShipping fee from cart API */
    const duplicateApiCall = validateDuplicateApiCall() || false;
    if (!duplicateApiCall) routeShipping(enabled);
  }, [enabled]);

  useEffect(() => {
    if (cartDetails?.routeShippingProtection && enabled) {
      setStateEnabled(true);
    } else if (cartDetails?.applicableRouteShipping) {
      setStateEnabled(false);
    }
  }, [cartDetails]);

  useEffect(() => {
    setEnabled(cartDetails?.routeShippingProtection ? true : false);
  }, [cartDetails]);

  return (
    <div className="mt-3 ml-2">
      <Switch
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
        className={`${enabled ? "bg-[#000]" : "bg-[#6a6a6d]"}
          relative inline-flex h-[16px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-[2px] focus:outline-[#bd1121]`}
      >
        <span
          className={`${
            enabled ? "text-skin-inverted" : "text-[#414141]"
          } text-[9px]  absolute pl-[2px] pr-[2px]`}
        >
          {enabled ? (
            <Check width={16} height={16} className="absolute left-1 pb-[3px]" />
          ) : (
            <Minus width={16} height={16} className="absolute left-4 pb-[3px] text-[#fff]" />
          )}
        </span>
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}

Toggle.propTypes = {
  routeShipping: PropTypes.func.isRequired,
};
