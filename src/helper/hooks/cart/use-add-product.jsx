import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import CREATE_CART from "../../../components/cart/graphql/mutation/create-cart";
import ADD_TO_CART from "../../../components/cart/graphql/mutation/add-to-cart";
import {
  UPDATE_GUEST_CART_ID,
  UPDATE_CART_ITEMS,
  SHOW_CART,
  UPDATE_CART_DETAIL,
  SET_NOTIFICATION,
  SET_CART_SUCCESS,
} from "../../../redux/actions";
import useCustomerCart from "../customer/use-customer-cart";

export default function useAddProduct(setShow) {
  // Local State
  const dispatch = useDispatch();
  const [response, setresponse] = useState([]);
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const [getCartId, { loading: cartLoading }] = useMutation(CREATE_CART);
  const [addProductToCart, { loading: addProductToCartLoading }] = useMutation(ADD_TO_CART);
  const { CustomerCartDetails, cartDetailsRefetch } = useCustomerCart();

  // Add Product mutation and function
  const handleAddProduct = (productData, cartId) => {
    addProductToCart({
      variables: {
        cartId: customerToken
          ? customerCartId
          : guestCartId || (cartId && cartId?.data?.createCart),
        lineItems: productData,
      },
    }).then((res) => {
      setresponse(res);

      if (!res?.data?.addToCart?.errors?.length) {
        const items = res?.data?.addToCart?.cart?.cartItems;
        items?.map((item) => {
          if (item?.product?.id === productData[0]?.productId) {
            dispatch(SET_CART_SUCCESS(item?.product));
          }
        });
        if (res?.data?.addToCart) {
          dispatch(UPDATE_CART_DETAIL(res.data?.addToCart?.cart));
          if (setShow) setShow(false);
        }
        if (items) {
          dispatch(UPDATE_CART_ITEMS(items));
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          dispatch(SHOW_CART(true));

          setTimeout(() => {
            dispatch(SHOW_CART(false));
          }, 5000);
        }
      } else {
        let errorText = res?.data?.addToCart?.errors[0]?.message;

        // regex for the avialable qty
        let regex = /available qty:\s*"(-?\d+)"/;

        // matches the available quantity in the error text
        let match = typeof errorText === "string" ? errorText?.match(regex) : "";

        const errorMessage = () => {
          // Check if message exists and is not an object
          const message = res?.data?.addToCart?.errors[0]?.message;

          if (message && typeof message !== "object") {
            // Check if message matches the specific error for out of stock
            if (message === "Call to a member function getSku() on null") {
              return "This product is out of stock";
            }
            //  Check if a match was found
            else if (match) {
              return "There are no source items with the in stock status";
            }
            // Default case when message does not match any specific error
            else {
              return message;
            }
          }
          // Fallback case when message is either undefined or an object
          else {
            return "Something went wrong";
          }
        };

        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: errorMessage(),
            type: "warning",
          })
        );
      }
    });
  };

  // Checking the cart id and if there is no cart id creating an empty cart and adding products to the cart
  const addToCart = (productData) => {
    if (!customerToken) {
      if (!guestCartId) {
        getCartId().then((cartId) => {
          if (cartId?.data?.createCart) {
            dispatch(UPDATE_GUEST_CART_ID(cartId?.data?.createCart));
            handleAddProduct(productData, cartId);
          } else {
            dispatch(UPDATE_GUEST_CART_ID(""));
          }
        });
      } else {
        handleAddProduct(productData);
      }
    } else {
      handleAddProduct(productData);
    }
  };

  return { addToCart, addProductToCartLoading, cartLoading, response };
}
