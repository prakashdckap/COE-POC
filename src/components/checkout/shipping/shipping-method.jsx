import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import SubHeading from "../../../theme-files/sub-heading";
import CheckoutRadio from "../../../theme-files/form/CheckoutRadio";
import useSetShippingMethod from "../../../helper/hooks/use-set-shipping-method";
import LoadingSpinner from "../../../helper/loading-spinner";

function ShippingMethod() {
  const availableShippingMethods = useSelector((state) => state.availableShippingMethods);
  const [selectedMethod, setselectedMethod] = useState({});
  const { handleShippingMethod, shippingMethodLoading } = useSetShippingMethod();

  useEffect(() => {
    if (selectedMethod) {
      const selected = availableShippingMethods?.find(
        (method) => method?.methodName === selectedMethod
      );
      if (selected?.methodName) handleShippingMethod(selected);
    }
  }, [selectedMethod]);

  return (
    <form>
      <SubHeading className="mb-5 capitalize text-xl font-medium mt-5">Shipping Method</SubHeading>
      {availableShippingMethods.map((item) => (
        <CheckoutRadio
          key={item?.methodName}
          item={item}
          setselectedMethod={setselectedMethod}
          shippingMethodLoading={shippingMethodLoading}
        />
      ))}

      <Link href="/checkout/payment">
        <a className="inline-flex justify-center capitalize py-2 px-4 mt-5 border border-transparent  text-sm font-medium rounded-md text-white bg-skin-button-accent hover:bg-skin-button-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {shippingMethodLoading ? <LoadingSpinner message="loading" /> : "Continue to payment"}
        </a>
      </Link>
    </form>
  );
}

export default ShippingMethod;
