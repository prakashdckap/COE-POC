import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SubHeading from "../../../theme-files/sub-heading";
import CheckoutRadio from "../../../theme-files/form/CheckoutRadio";
import { SET_CHECKOUT_PAYMENT_METHOD } from "../../../redux/actions";

function PaymentMethod() {
  const dispatch = useDispatch();
  const availablePaymentMethods = useSelector((state) => state.availablePaymentMethods);
  const [selectedMethod, setselectedMethod] = useState({});

  useEffect(() => {
    if (selectedMethod) {
      const selected = availablePaymentMethods?.find(
        (method) => method?.methodName === selectedMethod
      );
      if (selected?.methodName) dispatch(SET_CHECKOUT_PAYMENT_METHOD(selected));
    }
  }, [availablePaymentMethods, dispatch, selectedMethod]);

  return (
    <form>
      <SubHeading className="mb-5 capitalize text-xl font-medium mt-5">Payment Method</SubHeading>
      {availablePaymentMethods.map((item) => (
        <CheckoutRadio
          key={item?.methodName}
          item={item}
          setselectedMethod={setselectedMethod}
          payment
        />
      ))}
    </form>
  );
}

export default PaymentMethod;
