// import { Link } from "heroicons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteItemModal from "../../cart/delete-item-modal";
import useAddCartItemToWishlist from "../../../helper/hooks/customer/use-add-cart-item-to-wishlist";
import useUpdateCartItem from "../../../helper/hooks/cart/use-update-cart-item";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, ExclamationIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { SET_NOTIFICATION } from "../../../redux/actions";
import { removeCache } from "../../../helper/removeCache";
import {
  Gtag_AddToWishlistEvent,
  Gtag_RemoveCartItemEvent,
} from "../../../utils/google-tags/events";

const CartList = ({
  cartItem,
  product,
  handleUpdateItem,
  handleUpdateCart,
  updateProductInCartLoading,
}) => {
  const { handleAddCartItemToWishlist, addCartItemToWishlistLoading } = useAddCartItemToWishlist();

  const history = useRouter();
  const dispatch = useDispatch();
  const { cartItems, customerToken } = useSelector((state) => state);

  //state for cartlist
  const [show, setshow] = useState(false);
  const [qty, setQty] = useState(cartItem?.quantity);
  const [maxQty, setMaxQty] = useState(cartItem?.quantity);

  //  to get/validate max saleable qty
  useEffect(() => {
    if (Array.isArray(cartItem?.customOptions) && cartItem?.customOptions?.length) {
      if (Array.isArray(cartItem?.product?.options)) {
        // spread array to get all slected options
        let qtyArray = [];
        if (cartItem?.product?.productType === "bundle") {
          /** to get slectedOption from customOptions for @bundle products */
          if (Array.isArray(cartItem?.product?.bundleProductOptions?.bundleItems?.[0]?.options))
            cartItem?.product?.bundleProductOptions?.bundleItems?.[0]?.options?.map((item) => {
              // to get selected option from customOptions
              let customOptions = {};
              cartItem?.customOptions?.find((option) => {
                if (option?.value === item?.uid) customOptions = item;
                else return null;
              });
              // to get slectedOption from customOptions
              if (customOptions?.uid) {
                qtyArray.push({
                  ...customOptions,
                  saleQty: customOptions?.product?.sale_qty / customOptions?.quantity,
                });
              }
            });
        } else {
          /** to get slectedOption from customOptions for @config and @simple products */
          cartItem?.product?.options?.map((item) => {
            // to get selected parent option
            const customOptions = cartItem?.customOptions?.find(
              (option) => option?.code === item?.attributeCode
            );

            // to get slectedOption from customOptions
            const selectedOption =
              customOptions &&
              item?.attributeOptions?.find(
                (optionSelected) => optionSelected?.optionCode === customOptions?.value
              );
            if (customOptions && selectedOption) {
              qtyArray.push(selectedOption);
            }
          });
        }
        const maxSaleQty = Math.max(...qtyArray.map((opt) => opt.saleQty));
        const minSaleQty = Math.min(...qtyArray.map((opt) => opt.saleQty));
        setMaxQty(minSaleQty);
      }
    } else {
      setMaxQty(product?.saleQty);
    }
    setQty(cartItem?.quantity);
  }, [cartItem]);

  const showErrorMessage = (message) => {
    dispatch(
      SET_NOTIFICATION({
        status: true,
        message: message || "The requested qty is not available",
        type: "warning",
      })
    );
    setTimeout(() => setQty(cartItem?.quantity), 1000);
  };

  //This method used to add to wishlist the cart-item
  const handleAddToWishlist = (cartList) => {
    handleAddCartItemToWishlist(cartList);
    Gtag_AddToWishlistEvent(product);
  };

  const Increment = () => {
    if (qty < 40 && qty < maxQty) {
      const newQty = qty + 1 || 1;
      setQty(newQty);
      handleUpdateCart(cartItem?.productId, newQty);
    } else {
      showErrorMessage(
        qty >= 40 ? "The requested qty exceeds the maximum qty allowed in shopping cart" : ""
      );
    }
  };

  const Decrement = () => {
    if (qty - 1 && qty > 0) {
      const newQty = qty - 1 || 1;
      setQty(newQty);
      handleUpdateCart(cartItem?.productId, newQty);
    }
  };

  const updateQty = (e) => {
    let updatedQty = parseInt(e.target.value, 10);
    updatedQty = isNaN(updatedQty) ? "" : updatedQty;

    setQty(updatedQty);
    if (updatedQty > 40) {
      showErrorMessage("The requested qty exceeds the maximum qty allowed in shopping cart");
    }
  };

  const updateCartQty = (e) => {
    if (!qty) {
      setQty(cartItem?.quantity);
    } else if (qty != cartItem?.quantity) {
      if (qty <= maxQty) handleUpdateCart(cartItem?.productId, qty);
      else showErrorMessage();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (qty <= maxQty) {
        handleUpdateCart(cartItem.productId, qty);
      } else showErrorMessage();
    }
  };

  const { customUrl } = product || {};

  // Add query for edit cart
  const handleEditCartItem = (cartItem) => {
    const query = {
      isEditCart: true,
      qty: cartItem?.quantity,
      productUid: cartItem?.productId,
    };
    if (cartItem?.product?.productType === "bundle") {
      cartItem?.customOptions?.forEach((data) => {
        query[cartItem?.product?.sku] = data?.value;
      });
    } else {
      cartItem?.customOptions?.forEach((data) => {
        query[data?.code] = data?.value;
      });
    }
    const editCart = {
      pathname: `/${customUrl?.split(".")[0]}`,
      query,
    };
    history.push(editCart);
  };

  return (
    <tbody
      className={` checkout-summary__product shopping-cart__wrapper ${
        updateProductInCartLoading || addCartItemToWishlistLoading
          ? "opacity-40 pointer-events-none"
          : null
      }`}
    >
      <tr className="item-info">
        <td
          data-th="items"
          className="md:pt-[27px] md:px-[8px] md:pb-[10px] relative pl-[75px] pt-[25px] md:mb-[0px] mb-[20px]  col item "
        >
          <Link href={cartItem?.product?.customUrl || ""}>
            <a
              href={cartItem?.product?.customUrl || ""}
              className="md:table-cell md:max-w-[100%] md:pr-[20px] md:static md:align-top md:w-[1%] block left-0 max-w-[60px] p-0 absolute top-[15px] w-[100%]"
            >
              <span className="align-top inline-block max-w-[100%] md:w-[165px] w-[100px]">
                <span className="h-auto p-0 block overflow-hidden relative z-[1]">
                  <img
                    src={
                      cartItem?.product?.image?.url &&
                      removeCache(JSON?.parse(cartItem?.product?.image?.url))
                    }
                    className="static m-auto w-auto align-middle"
                    alt={cartItem?.product?.name + "Product Image"}
                  />
                </span>
              </span>
            </a>
          </Link>
          <div className="md:table-cell md:align-top md:w-[99%] md:whitespace-normal md:text-left text-center">
            <strong className="inline-block font-medium mt-[-6px] mb-[5px] text-[13px] leading-[1.35] font-sans ">
              <Link href={cartItem?.product?.customUrl || ""}>
                <a
                  href={cartItem?.product?.customUrl || ""}
                  className="text-[#000] hover:text-[#A80F16]"
                >
                  {cartItem?.product?.name}
                </a>
              </Link>
            </strong>
            <div className="flex items-center my-[10px]">
              {cartItem?.customOptions.length
                ? cartItem.customOptions.map((customOption) => {
                    // Regular expression to match numbers followed by "-pack"
                    const packMatch = cartItem?.product?.name?.match(/(\d+)-pack/i);
                    const packSize = packMatch ? packMatch[1] : null;

                    // Adjusting the value name if pack size is found
                    const adjustedValueName = packSize
                      ? `${packSize} x ${customOption.valueName}`
                      : customOption.valueName;

                    return (
                      <React.Fragment key={customOption.code}>
                        <p className="font-bold text-[12px] font-sans leading-[1.35] text-[#000]">
                          {customOption.name}:
                        </p>
                        <p className="text-[12px] font-sans leading-[1.35] text-[#000] pl-[4px]">
                          {adjustedValueName}
                        </p>
                      </React.Fragment>
                    );
                  })
                : ""}
            </div>
            {cartItem?.quantity > 40 ||
              (cartItem?.quantity > maxQty && (
                <div
                  className={`cart-item error-message flex ${
                    cartItem?.quantity > 40 ? "justify-between" : "justify-none "
                  }`}
                >
                  <div>
                    <ExclamationIcon className="w-5 h-5 bg-[#fef0d5]" fill="#e02b27" />
                  </div>
                  {cartItem?.quantity > 40 ? (
                    <div>The requested qty exceeds the maximum qty allowed in shopping cart</div>
                  ) : (
                    <div className="ml-3">The requested qty is not available</div>
                  )}
                </div>
              ))}
          </div>
        </td>

        <td className="pt-[20px] px-[10px] pb-[8px] align-text-top col price">
          <p className="leading-[1.35] text-[14px] font-bold pricetable" title="PRICE">
            &#x24;{(cartItem?.rowTotal / cartItem?.quantity)?.toFixed(2)}
          </p>
        </td>
        <td className="pt-[20px] px-[10px] pb-[8px] align-text-top text-center col qty ">
          <div className="flex justify-center items-center qtytable" title="QTY">
            {product?.productType === "bundle" ? (
              ""
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[17px] h-[17px] pr-[5px] cursor-pointer"
                id={cartItem?.quantity}
                onClick={Decrement}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            )}
            <div className="w-[47px]">
              <input
                value={qty}
                type="number"
                className="text-[14px] w-[100%] border-[1px] border-[#aaa] h-[30px] text-center "
                onKeyPress={handleKeyPress}
                onChange={(e) => updateQty(e)}
                onBlur={updateCartQty}
              />
            </div>{" "}
            {product?.productType === "bundle" ? (
              ""
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[17px] h-[17px] pl-[5px] cursor-pointer"
                id={cartItem?.quantity}
                onClick={Increment}
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          </div>
        </td>
        <td className="pt-[20px] px-[10px] pb-[8px] align-text-top text-right  col subtotal">
          <p className="leading-[1.35] text-[14px] font-bold subtotaltable" title="SUBTOTAL">
            &#x24;{cartItem?.rowTotal?.toFixed(2)}
          </p>
        </td>
      </tr>
      <tr className="border-b-[1px] border-b-[#ebebeb] ">
        <td colSpan={4}>
          <div className="flex pt-[8px] pb-[10px] px-[10px] justify-end ">
            {customerToken && (
              <div className="flex justify-end items-center  shopping-cart__icon mr-[10px] mb-[10px]">
                {customerToken ? (
                  <button
                    title="Move to Wishlist"
                    type="button"
                    className="flex items-center justify-center"
                    onClick={() => handleAddToWishlist(cartItem)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="bg-skin-button-accent-hover h-[20px] w-[20px] text-skin-inverted hover:bg-skin-inverted hover:text-skin-base hover:border hover:border-skin-dark transition-all duration-300 ease-in-out rounded-full p-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
            )}
            {/* {customerToken ? ( */}
            <button
              title="Edit item parameters"
              type="button"
              className="flex items-center justify-center mr-[10px] mb-[10px]"
              onClick={() => handleEditCartItem(cartItem)}
            >
              <PencilIcon className="bg-skin-button-accent-hover h-[20px] w-[20px] text-skin-inverted hover:bg-skin-inverted hover:text-skin-base hover:border hover:border-skin-dark duration-300 rounded-full p-1" />
            </button>
            {/* ) : null} */}
            <button
              title="Remove item"
              type="button"
              className="rounded-full hover:fill-[#000] fill-[#fff]  mb-[10px]"
              onClick={() => {
                setshow(true);
                Gtag_RemoveCartItemEvent(product);
              }}
            >
              <svg
                className="bg-skin-button-accent-hover h-[20px] w-[20px] text-skin-inverted hover:bg-skin-inverted hover:text-skin-base hover:border hover:border-skin-dark transition-all duration-300 ease-in-out rounded-full p-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </button>
            <DeleteItemModal show={show} setshow={setshow} productId={cartItem?.productId} />
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default CartList;
