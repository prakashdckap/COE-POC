import { useState } from "react";
import { useMutation } from "@apollo/client";
import SET_PAYMENT_METHOD from "../../components/checkout/graphql/mutation/checkout-payment-method";

export default function useSetZipPaymentMethod() {
  const [setZipPaymentMethod, { loading: ZipPayemntMethodLoading }] =
    useMutation(SET_PAYMENT_METHOD);
  const [ZipPaymentMethodResponse, setZipPaymentMethodResponse] = useState([]);

  const handleZipPaymentMethod = (data) => {
    setZipPaymentMethod(data)
      .then((res) => {
        if (res.data && !res.errors) {
          setZipPaymentMethodResponse(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleZipPaymentMethod, ZipPaymentMethodResponse, ZipPayemntMethodLoading };
}
