import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import MERGE_CARTS from "../../../components/cart/graphql/mutation/merge-carts";
import useCustomerCart from "../customer/use-customer-cart";
import { UPDATE_CART_DETAIL, UPDATE_CART_ITEMS, UPDATE_GUEST_CART_ID } from "../../../redux/actions";

export default function useMergeCarts() {
  const dispatch = useDispatch();
  const { cartDetailsRefetch } = useCustomerCart();

  const [mergeCarts, { loading: mergeCartsLoading }] = useMutation(MERGE_CARTS);

  const handleMergeCarts = (cartIdObj) => {
    mergeCarts({
      variables: cartIdObj,
    })
      .then((res) => {
        if (!res?.errors?.length && res?.data?.mergeCarts) {
          
          dispatch(UPDATE_GUEST_CART_ID(""));
          // cartDetailsRefetch();
          dispatch(UPDATE_CART_ITEMS(res?.data?.mergeCarts?.cartItems));
          dispatch(UPDATE_CART_DETAIL(res?.data?.mergeCarts));
        } else {
          console.log(res?.errors[0]?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleMergeCarts, mergeCartsLoading };
}
