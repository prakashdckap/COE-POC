import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import REORDER from "../../../components/account/graphql/mutation/re-order";
import useCustomerCart from "./use-customer-cart";
import {
  SET_ERROR,
  SET_NOTIFICATION,
  UPDATE_CART_DETAIL,
  UPDATE_CART_ITEMS,
} from "../../../redux/actions";

export default function useReorder() {
  const [reorder, { loading: reorderLoading }] = useMutation(REORDER);
  const { cartDetailsRefetch } = useCustomerCart();
  const history = useRouter();
  const dispatch = useDispatch();

  const handleReorder = (orderId) => {
    reorder({
      skip: !orderId,
      variables: {
        orderNumber: orderId,
      },
    }).then((res) => {
      if (res?.data?.customerReorder?.cart?.cartId) {
        if (res?.data?.customerReorder?.cart?.cartId) cartDetailsRefetch();
        dispatch(UPDATE_CART_ITEMS(res?.data?.customerReorder?.cart?.cartItems));
        dispatch(UPDATE_CART_DETAIL(res?.data?.customerReorder?.cart));

        history?.push("/shoppingcart");
        if (res?.data?.customerReorder?.errors?.length) {
          setTimeout(() => {
            dispatch(SET_ERROR(res?.data?.customerReorder?.errors));
          }, 2000);
        } else {
          dispatch(
            SET_NOTIFICATION({
              status: true,
              message: "Item Added To Cart Successfully !",
              type: "success",
            })
          );
        }
      } else {
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: "Error Occured During Reorder.",
            type: "error",
          })
        );
      }
    });
  };
  return { handleReorder, reorderLoading };
}
