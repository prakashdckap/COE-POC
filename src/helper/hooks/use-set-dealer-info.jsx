import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import DEALER_INFO from "../../components/checkout/graphql/mutation/dealer-info";
import { useRouter } from "next/router";
import useSetPudoShipping from "./use-set-pudo-shipping";

export default function useSetDealerInfo() {
  const [setDealerInfo, { loading: dealerInfoLoading }] = useMutation(DEALER_INFO);
  const [dealerInfoResponse, setDealerInfoResponse] = useState([]);
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const { guestCartId, checkoutShippingAddress } = useSelector((state) => state);
  const history = useRouter();
  const { handlePickupLocally } = useSetPudoShipping();

  const handleDealerInfo = (data) => {
    setDealerInfo({
      skip: !data,
      variables: {
        cartId: customerToken ? customerCartId : guestCartId,
        setDealer: true,
        dealerInfo: data,
      },
    })
      .then((res) => {
        if (res.data && !res.errors) {
          setDealerInfoResponse(res);
          if (history?.query?.isPudo && !checkoutShippingAddress?.firstName) {
            handlePickupLocally(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleDealerInfo, dealerInfoResponse, dealerInfoLoading };
}
