import { useAcceptJs } from "react-acceptjs";
import { useDispatch, useSelector } from "react-redux";
import { SET_NOTIFICATION } from "../../../redux/actions";
import constants from "../../constant";

function useAccepectJsValidation() {
  const dispatch = useDispatch();
  const paymentDetails = useSelector((state) => state.paymentDetails);
  const environment = process.env.NEXT_PUBLIC_SEZZLE_API_MODE === "live" ? "PRODUCTION" : "SANDBOX";

  const authData = {
    apiLoginID: constants.ACCEPT_JS_APP_LOGIN_ID,
    clientKey: constants.ACCEPT_JS_CLIENT_KEY,
  };
  const { dispatchData, loading: creditCardLoading } = useAcceptJs({ environment, authData });

  async function handleAcceptJs() {
    const { cardNumber, month, year, cvv } = paymentDetails;

    try {
      if (cardNumber && month && year && cvv) {
        const cardData = {
          cardNumber,
          month: month.id,
          year: year?.year?.toString().slice(-2),
          cardCode: cvv,
        };
        const res = await dispatchData({ cardData });

        return {
          acceptjsKey: res?.opaqueData?.dataDescriptor,
          acceptjsValue: res?.opaqueData?.dataValue,
        };
      }
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Card Details Cannot Be Empty.",
          type: "error",
        })
      );
    } catch (err) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: err?.messages?.message[0]?.text || "Something Went Wrong",
          type: "error",
        })
      );
    }
    return null;
  }

  return { handleAcceptJs, creditCardLoading };
}

export default useAccepectJsValidation;
