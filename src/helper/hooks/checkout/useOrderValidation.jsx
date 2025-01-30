import { useDispatch, useSelector } from "react-redux";
import { SET_CHECKOUT_ERROR, SET_NOTIFICATION } from "../../../redux/actions";
import { AxiosGraphQL } from "../../axios";

function useOrderValidation(setOrderValidating) {
  const dispatch = useDispatch();
  const { platformId } = useSelector((state) => state.cartDetails);

  const handleOrderVerification = async (dobValues, fileUploadValues, ageVerificationDetails) => {
    // Order Validation for selected Address and @etc...
    try {
      setOrderValidating(true);
      let variables = {
        cartId: platformId,
      };

      if (
        dobValues?.dob &&
        fileUploadValues?.file &&
        fileUploadValues?.fileType &&
        ageVerificationDetails?.meta?.confirmation
      ) {
        variables = {
          cartId: platformId,
          dob: dobValues.dob,
          image: fileUploadValues.file,
          fileType: fileUploadValues.fileType,
          veratadDetail: ageVerificationDetails.result.detail,
          veratadAction: ageVerificationDetails.result.action,
          veratadTimestamp: ageVerificationDetails.meta.timestamp,
          veratadConfirmation: ageVerificationDetails.meta.confirmation.toString(),
        };
      }
      const response = await AxiosGraphQL("place-order-validation", variables);

      if (response && !response?.errors?.length) {
        setOrderValidating(false);
        return response.data.placeOrderValidation.orderFlag || "";
      } else if (response?.errors?.length) {
        const message = response?.errors[0]?.message;
        if (message.includes("Due to the state rules and regulations")) {
          dispatch(SET_CHECKOUT_ERROR({ localRules: message }));
        } else {
          dispatch(SET_CHECKOUT_ERROR({ localRules: message, title: true }));
        }
      }
      setOrderValidating(false);
      return false;
    } catch (error) {
      console.error("Error in API call:", error);
      setOrderValidating(false);
      return false;
    }
  };

  return { handleOrderVerification };
}

export default useOrderValidation;
