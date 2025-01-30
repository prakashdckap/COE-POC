// import { useMutation } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// import CREATE_SEZZLE_CHECKOUT from "../../../components/checkout/graphql/mutation/create-checkout";
import { SET_SEZZLE_URL } from "../../../redux/actions";
import { AxiosGet } from "../../axios";

function useCreateSezzleUrl(sezzlePaymentMethodResponse) {
  const dispatch = useDispatch();
  const checkoutPaymentMethod = useSelector((state) => state.checkoutPaymentMethod);
  const sezzleUrl = useSelector((state) => state.sezzleUrl);
  const { platformId, grandTotal } = useSelector((state) => state.cartDetails || {});
  const customerToken = useSelector((state) => state.customerToken);

  // const [createSezzleCheckout, { data: sezzleData, called, loading }] =
  //   useMutation(CREATE_SEZZLE_CHECKOUT);

  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const createSezzleCheckout = async (updatedCart = false) => {
    setLoading(true);
    const variables = {
      cartId: platformId,
      updatedCart: updatedCart || false,
    };

    try {
      const response = await AxiosGet("create-sezzle-url", variables, customerToken);
      const sezzleCheckoutUrl = response?.data?.createSezzleCheckout?.checkout_url;
      if (response && sezzleCheckoutUrl) {
        setLoading(false);
        updatedUrl(sezzleCheckoutUrl);
        return sezzleCheckoutUrl;
      } else if (response && response?.errors?.length) {
        setLoading(false);
      } else {
        setLoading(false);
        updatedUrl(sezzleUrl || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSezzleUrl = () => {
    if (checkoutPaymentMethod?.methodCode === "sezzlepay") {
      // update sezzle URL if any cart item is updated and sezzle payment is selcted in checkout
      // createSezzleCheckout({
      //   variables: {
      //     cartId: platformId,
      //     updatedCart: true,
      //   },
      // });
      createSezzleCheckout(true);
    }
  };

  useEffect(() => {
    if (
      platformId &&
      checkoutPaymentMethod?.methodCode === "sezzlepay" &&
      sezzlePaymentMethodResponse?.data?.setPaymentMethod?.paymentMethod === "sezzlepay"
    ) {
      const isCartUpdated =
        sezzleUrl?.grandTotal && grandTotal !== sezzleUrl?.grandTotal ? true : false;
      // createSezzleCheckout({
      //   variables: {
      //     cartId: platformId,
      //     updatedCart: isCartUpdated,
      //   },
      // });
      createSezzleCheckout(isCartUpdated);
    }
  }, [
    checkoutPaymentMethod?.methodCode,
    sezzlePaymentMethodResponse?.data?.setPaymentMethod?.paymentMethod,
  ]);

  const totalMismatch = useMemo(() => {
    return grandTotal;
  }, [sezzleUrl?.url]);

  useEffect(() => {
    if (sezzleUrl?.url && grandTotal !== totalMismatch) {
      updateSezzleUrl();
    }
  }, [grandTotal]);

  const updatedUrl = (url) => {
    if (url) {
      dispatch(SET_SEZZLE_URL({ url, grandTotal }));
      setCheckoutUrl(url);
    }
  };

  // useEffect(() => {
  //   const url = sezzleData?.createSezzleCheckout?.checkout_url || "";
  //   if (!sezzleUrl) {
  //     updatedUrl(url);
  //   } else if (sezzleUrl && url) {
  //     updatedUrl(url);
  //   }
  // }, [sezzleData]);

  return { checkoutUrl, updateSezzleUrl, sezzleUrlLoading: loading };
}

export default useCreateSezzleUrl;
